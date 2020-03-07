const request = require('request')
const yaml    = require('js-yaml')
const express = require('express')
const  parser = require('body-parser');
const app     = express()
const port    = 3000

//------------------------------------------------------------------------------

function getInventory(req, res) {
  // credentials
  var authUrl  = ""
  var project  = ""
  var username = ""
  var password = ""

  // endpoints
  var novaURL    = ""
  var neutronURL = ""
  var cinderURL  = ""
  var glanceURL  = ""
  var token      = ""

  // inventory information
  var inventory = {
    servers    : null,
    volumes    : null,
    images     : null,
    flavors    : null,
    networks   : null,
    subnets    : null,
    ports      : null
  }

  // completed
  var completed = false

  //----------------------------------------------------------------------------
  // write result
  function writeResult(context) {
    // check if the request has been completed
    if (completed) {
      return
    }

    // check if all results have been retrieved
    if (inventory.servers && inventory.volumes  && inventory.images  &&
        inventory.flavors && inventory.networks && inventory.subnets &&
        inventory.ports ) {
      // write output
      res.set({ 'content-type': 'application/x-yaml; charset=utf-8' })
      res.write(yaml.safeDump(inventory))
      res.end()

      completed = true
    }

  }

  //----------------------------------------------------------------------------
  // list ports callback
  function listPortsCB(error, response, body) {
    // handle errors
    if (error) {
      res.status(400);
      res.write("List Ports Error:\n" + err.toString())
      res.end()
      return
    }

    // collect ports
    inventory.ports = ((response.statusCode == 200) && body.ports) ? body.ports : []

    // write output
    writeResult("ports")
  }

  //----------------------------------------------------------------------------
  // list subnets callback
  function listSubnetsCB(error, response, body) {
    // handle errors
    if (error) {
      res.status(400);
      res.write("List Subnets Error:\n" + err.toString())
      res.end()
      return
    }

    // collect subnets
    inventory.subnets = ((response.statusCode == 200) && body.subnets) ? body.subnets : []

    // write result if available
    writeResult("subnets")
  }

  //----------------------------------------------------------------------------
  // list networks callback
  function listNetworksCB(error, response, body) {
    // handle errors
    if (error) {
      res.status(400);
      res.write("List Networks Error:\n" + err.toString())
      res.end()
      return
    }

    // collect networks
    inventory.networks = ((response.statusCode == 200) && body.networks) ? body.networks : []

    // write result if available
    writeResult("networks")
  }

  //----------------------------------------------------------------------------
  // list images callback
  function listImagesCB(error, response, body) {
    // handle errors
    if (error) {
      res.status(400);
      res.write("List Images Error:\n" + err.toString())
      res.end()
      return
    }

    // collect images
    inventory.images = ((response.statusCode == 200) && body.images) ? body.images : []

    // write result if available
    writeResult("images")
  }

  //----------------------------------------------------------------------------
  // list volumes callback
  function listVolumesCB(error, response, body) {
    // handle errors
    if (error) {
      res.status(400);
      res.write("List Volumes Error:\n" + err.toString())
      res.end()
      return
    }

    // collect volumes
    inventory.volumes = ((response.statusCode == 200) && body.volumes) ? body.volumes : []

    // write result if available
    writeResult("volumes")
  }

  //----------------------------------------------------------------------------
  // list flavors callback
  function listFlavorsCB(error, response, body) {
    // handle errors
    if (error) {
      res.status(400);
      res.write("List Flavors Error:\n" + err.toString())
      res.end()
      return
    }

    // collect flavors
    inventory.flavors = ((response.statusCode == 200) && body.flavors) ? body.flavors : []

    // write result if available
    writeResult("flavors")
  }

  //----------------------------------------------------------------------------
  // list servers callback
  function listServersCB(error, response, body) {
    // handle errors
    if (error) {
      res.status(400);
      res.write("List Servers Error:\n" + err.toString())
      res.end()
      return
    }

    // collect servers
    inventory.servers = ((response.statusCode == 200) && body.servers) ? body.servers : []

    // write result if available
    writeResult("servers")
  }

  //----------------------------------------------------------------------------
  // get tenant information from OpenStack
  function getTenantInformation() {
    // determine all servers
    request({
      method:    "GET",
      url:       novaURL + "/servers/detail",
      headers:   {'Accept': 'application/json', 'X-Auth-Token': token},
      json:      true,
      strictSSL: false
    }, listServersCB)

    // determine all flavors (TODO: proper version management)
    request({
      method:    "GET",
      url:       glanceURL + "/v2/flavors/details",
      headers:   {'Accept': 'application/json', 'X-Auth-Token': token},
      json:      true,
      strictSSL: false
    }, listFlavorsCB)

    // determine all images (TODO: version management for glance API)
    request({
      method:    "GET",
      url:       glanceURL + "/v1/images/detail",
      headers:   {'Accept': 'application/json', 'X-Auth-Token': token},
      json:      true,
      strictSSL: false
    }, listImagesCB)

    // determine all volumes
    request({
     method:    "GET",
     url:       cinderURL + "/volumes/detail",
     headers:   {'Accept': 'application/json', 'X-Auth-Token': token},
     json:      true,
     strictSSL: false
    }, listVolumesCB)

    // determine all networks (TODO: proper version management)
    request({
      method:    "GET",
      url:       neutronURL + "/v2.0/networks",
      headers:   {'Accept': 'application/json', 'X-Auth-Token': token},
      json:      true,
      strictSSL: false
    }, listNetworksCB)

    // determine all subnets (TODO: proper version management)
    request({
      method:    "GET",
      url:       neutronURL + "/v2.0/subnets",
      headers:   {'Accept': 'application/json', 'X-Auth-Token': token},
      json:      true,
      strictSSL: false
    }, listSubnetsCB)

    // determine all subnets (TODO: proper version management)
    request({
      method:    "GET",
      url:       neutronURL + "/v2.0/ports",
      headers:   {'Accept': 'application/json', 'X-Auth-Token': token},
      json:      true,
      strictSSL: false
    }, listPortsCB)

  }

  //----------------------------------------------------------------------------
  // authentication callback
  function authenticationCB(error, response, body) {
    // handle errors
    if (error) {
      res.status(401);
      res.write("Authentication Error:\n" + error.toString())
      res.end()
      return
    }

    // check if service catalog has been provided
    if (!body.access || !body.access.serviceCatalog) {
      res.status(401);
      res.write("Authentication Error:\n" + yaml.safeDump(body))
      res.end()
      return
    }

    // collect endpoints
    for (endpoint of body.access.serviceCatalog) {
      if (endpoint.name == "nova") {
        novaURL = endpoint.endpoints[0].publicURL
      }
      else if (endpoint.name == "glance") {
        glanceURL = endpoint.endpoints[0].publicURL
      }
      else if (endpoint.name == "cinderv2") {
        cinderURL = endpoint.endpoints[0].publicURL
      }
      else if (endpoint.name == "neutron") {
        neutronURL = endpoint.endpoints[0].publicURL
      }
    }

    // collect token
    token = body.access.token.id

    // get tenant information
    getTenantInformation()
  }

  //----------------------------------------------------------------------------
  // determine credentials
  url      = req.body.url      ? req.body.url      : "https://ajjasdjeasd.eu:5000/v2.0/tokens"
  tenant   = req.body.tenant   ? req.body.tenant   : "jjdjjasdjjad"
  username = req.body.username ? req.body.username : "adjajsda"
  password = req.body.password ? req.body.password : "hadhhwdahdas"

  // contruct authentication body
  var body = {
    "auth": {
      "tenantName": tenant,
      "passwordCredentials": {"username": username, "password": password}
    }
  }

  // issue authentication request
  request({
    method:    "POST",
    url:       url,
    headers:   {'Content-Type': 'application/json'},
    body:      body,
    json:      true,
    strictSSL: false
  }, authenticationCB)
}

//------------------------------------------------------------------------------

app.use( parser.json() )                         // support json encoded bodies
app.use( parser.urlencoded({ extended: true }) ) // support encoded bodies
app.use( express.static('.') )                   // static files from root

app.get('/inventory', getInventory)

server = app.listen(port, () => console.log(`VNF Manager listening on port ${port}!`))
server.timeout = 5000
