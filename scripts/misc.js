
// fixed_ips_filter derives a list of fixed IPs from a string
// format: "fixed: IP1, IP2, IP3, ...;"
// each IP? should either be an IP-address or a
// range with the last octet defining the Range
// e.g. 192.168.178.10-20
function fixed_ips_filter(str) {
  var pattern = /fixed: [^;]*/i
  var result  = []

  // extract the fixed ips part of the string
  str1 = str.match(pattern) || ['']

  // get first occurence
  str2 = str1[0]

  // remove the prefix: "fixed: "
  str3 = str2.substr(7)

  // split into substrings
  str4 = str3.split(",")

  // construct the result
  for (str5 of str4) {
    // check if we have a range
    if (str5.indexOf("-") < 0) {
      result.push(str5)
    } else {
      for (str6 of generate_ip_range(str5) ) {
        result.push(str6)
      }
    }
  }

  // completed
  return result
}

// allowed_ips_filter derives a list of allowed IPs from a string
// format: "allowed: IP1, IP2, IP3, ...;"
// each IP? should either be an IP-address or a
// range with the last octet defining the Range
// e.g. 192.168.178.10-20
function allowed_ips_filter(str) {
  var pattern = /allowed: [^;]*/i
  var result  = []

  // extract the allowed ips part of the string
  str1 = str.match(pattern) || ['']

  // get first occurence
  str2 = str1[0]

  // remove the prefix: "allowed: "
  str3 = str2.substr(9)

  // split into substrings
  str4 = str3.split(",")

  // construct the result
  for (str5 of str4) {
    // check if we have a range
    if (str5.indexOf("-") < 0) {
      result.push(str5)
    } else {
      for (str6 of generate_ip_range(str5) ) {
        result.push(str6)
      }
    }
  }

  // completed
  return result
}

// generate_ip_range generates a list of IP addresses as an array
function generate_ip_range( range ) {
  var result = []

  // split range and determine prefix and range
  pos    = range.lastIndexOf(".")
  prefix = range.substr(0,pos)
  rng    = range.substr(pos+1)

  // split the range and determine first and last index
  parts = rng.split("-")
  first = parseInt( parts[0], 10)
  last  = parseInt( parts[1], 10)

  // construct the result
  for (var index = first; index <= last; index++) {
    result.push(prefix + "." + index)
  }

  // completed
  return result
}

// empty model returns an empty model
function emptyModel() {
  return {
    vnf:        "",
    version:    "",
    tenant: {
      name:          "",
      auth: {
        username:    "",
        password:    "",
        proxy:       "",
        url:         "",
        cert:        "",
        region:      "",
        vol_api:     "",
        plugin:      ""
      },
      service: {
        network:     "",
        cidr:        "",
        gateway:     ""
      },
      proxy: {
        address:     "",
        port:        ""
      },
      jumphost:      ""
    },
    flavors:    [],
    images:     [],
    networks:   [],
    components: []
  }
}

// render a model into a template
function render(model, template_name) {
  var tmpl = templates[template_name]
  var env  = nunjucks.configure({trimBlocks: true})

  env.addFilter('fixed',   fixed_ips_filter )
  env.addFilter('allowed', allowed_ips_filter )

  return nunjucks.renderString(tmpl, model);
}
