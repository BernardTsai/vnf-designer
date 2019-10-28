var schema = {
  // "$schema":     "http://tsai.eu/vnfd-00-01-00/schema#",
  "title":       "VNF Desciptor",
  "description": "A simple VNF descriptor",
  "type":        "object",
  "required":    ["schema", "vnf", "version", "tenant", "flavors", "images", "networks", "components"],
  "properties": {

    "schema": { "type": "string", "enum": ["1.0.1"],
      "description": "The version of the schema" },

    "vnf": { "type": "string", "minLength": 1,
      "description": "The unique identifier for a virtual network function" },

    "version": { "type": "string", "pattern": "^\\d+\\.\\d+\.\\d+$",
      "description": "Semantic version of the VNF descriptor" },

    "tenant": {
      "description": "The tenant information",
      "type":        "object",
      "required":    ["name","auth"],
      "properties": {
        "name":   { "type": "string", "description": "name of the tenant" },
        "prefix": { "type": "string", "description": "prefix for tenant resources" },

        "auth": {
          "description": "The authentication information",
          "type":        "object",
          "required":    ["username","password","proxy","url","cert","region","vol_api","plugin"],
          "properties": {
            "username": { "type": "string", "description": "username for accessing the API" },
            "password": { "type": "string", "description": "password for accessing the API" },
            "proxy":    { "type": "string", "description": "url for API proxy" },
            "url":      { "type": "string", "description": "url for the API" },
            "cert":     { "type": "string", "description": "location of certificate file" },
            "region":   { "type": "string", "description": "region of tenant" },
            "vol_api":  { "type": "string", "description": "version of volume API" },
            "plugin":   { "type": "string", "description": "authentication plugin" }
          }
        },

        "service": {
          "description": "The parameters of the service network",
          "type":        "object",
          "required":    ["network","cidr","gateway","proxy","port"],
          "properties": {
            "network":  { "type": "string", "description": "name of the service network" },
            "cidr":     { "type": "string", "description": "cidr of the service network" },
            "gateway":  { anyOf:
                          [{ "type": "string", "description": "gateway ip address", "format": "ipv4"  },
                           { "const": ""  }]
                        },
            "proxy":    { anyOf:
                          [{ "type": "string", "description": "gateway ip address", "format": "ipv4"  },
                           { "const": ""  }]
                        },
            "port":     { "type": "string", "description": "proxy port number" }
          }
        },

        "jumphost":     { "type": "string", "description": "jumphost ip address", "format": "ipv4"  },

        "proxy": {
          "description": "The parameters of the http proxy",
          "type":        "object",
          "properties": {
            "http":     { "type": "string", "description": "url for http proxy" },
            "https":    { "type": "string", "description": "url for https proxy" }
          }
        }
      }
    },

    "flavors": {
      "description": "The sizing of virtual servers",
      "type":        "array",
      "items": {
        "title":    "Flavor",
        "type":     "object",
        "required": ["uuid","name","vcpu","ram","disk","public","special"],
        "properties": {

          "uuid": { "type": "string",
            "description": "Unique identifier of the flavor" },

          "name": { "type": "string",
            "description": "Name of the flavor" },

          "vcpu": { "type": "number",
            "description": "Number of virtual core processing units as string" },

          "ram": { "type": "number",
            "description": "Size of memory in megabytes as string" },

          "disk": { "type": "number",
            "description": "Size of local disk in gigabytes as string" },

          "public": { "type": "string", "enum": ['true','false'],
            "description": "Image is a predefined public image" },

          "special": {
            "description": "Additional special attributes",
            "type":        "array",
            "items": {
              "type":        "object",
              "description": "Key-value pair",
              "required": ["key","value"],
              "properties": {
                "key": { "type": "string",
                  "description": "Attribute name" },

                "value": { "type": "string",
                  "description": "Attribute value" }
              }
            }
          }
        }
      }
    },

    "images": {
      "description": "The operating systems for virtual servers",
      "type":        "array",
      "items": {
        "title":    "Image",
        "type":     "object",
        "required": ["uuid","name","disk","container"],
        "properties": {

          "uuid": { "type": "string",
            "description": "Unique identifier of the image" },

          "name": { "type": "string",
            "description": "Name of the image" },

          "version": { "type": "string",
            "description": "Version of the image" },

          "format": { "type": "string", "enum": ['aki','ami','ari','iso','qcow2','raw','vdi','vhd','vhdx','vmdk'],
            "description": "Disk format of the image" },

          "container": { "type": "string", "enum": ['aki','ami','ari','bare','docker','ova','ovf'],
            "description": "Container format of the image" },

          "disk": { "type": "string",
            "description": "Minimum disk requirements" },

          "size": { "type": "string",
            "description": "Size of the image" },

          "checksum": { "type": "string",
            "description": "Checksum of the image" },

          "url": { "type": "string",
            "description": "URL for the image" },

          "special": { "type": "string",
            "description": "Additional special attributes" }
        }
      }
    },

    "networks": {
      "description": "The virtual networks",
      "type":        "array",
      "items": {
        "title":    "Network",
        "type":     "object",
        "required": ["uuid","ipv4", "ipv4gw", "ipv4start", "ipv4end", "ipv6", "ipv6gw", "ipv6start", "ipv6end", "route", "import", "export", "special"],
        "properties": {
          "uuid": { "type": "string",
            "description": "Unique identifier of the virtual network" },

          "name": { "type": "string",
            "description": "Name of the virtual network" },

          "ipv4": { "type": "string",
            "description": "IPv4 CIDR of the virtual network" },

          "ipv4gw": { "type": "string",
            "description": "IPv4 gateway of the virtual network" },

          "ipv4start": { "type": "string",
            "description": "IPv4 start address of the virtual network" },

          "ipv4end": { "type": "string",
            "description": "IPv4 end address of the virtual network" },

          "ipv6": { "type": "string",
            "description": "IPv6 attributes of the virtual network" },

          "ipv6gw": { "type": "string",
            "description": "IPv6 gateway of the virtual network" },

          "ipv6start": { "type": "string",
            "description": "IPv6 start address of the virtual network" },

          "ipv6end": { "type": "string",
            "description": "IPv6 end address of the virtual network" },

          "route": { "type": "string",
            "description": "Comma seperated list of route targets" },

          "export": { "type": "string",
            "description": "Comma seperated list of export targets" },

          "import": { "type": "string",
            "description": "Comma seperated list of import targets" },

          "special": { "type": "string",
            "description": "Additional special attributes" }
        }
      }
    },

    "components": {
      "description": "The virtual servers",
      "type":        "array",
      "items": {
        "title":    "Component",
        "type":     "object",
        "required": ["uuid","name","placement","flavor","image","min","size","max","interfaces","volumes","services","dependencies","userdata"],
        "properties": {

          "uuid": { "type": "string",
            "description": "Unique identifier of the virtual server" },

          "name": { "type": "string",
            "description": "Name of the virtual server" },

          "user": { "type": "string",
            "description": "Name of the user account" },

          "placement": { "type": "string", "enum": ["OTHER", "EXT", "INT", "MGMT", "ROUTER"],
            "description": "Placement of the virtual server or type of component" },

          "flavor": { "type": "string",
            "description": "Name of the virtual server sizing" },

          "image": { "type": "string",
            "description": "Name of the operating system" },

          "min": { "type": "number",
            "description": "Minimum size of the cluster" },

          "size": { "type": "number",
            "description": "Default size of the cluster" },

          "max": { "type": "number",
            "description": "Maximum size of the cluster" },

          "userdata": { "type": "string",
            "description": "Initialisation script" },

          "interfaces": {
            "description": "The interfaces to virtual networks",
            "type":        "array",
            "items": {
              "title":    "Component Interface",
              "type":     "object",
              "required": ["network","attributes"],
              "properties": {

                "network": { "type": "string",
                  "description": "Name of the virtual network" },

                "attributes": { "type": "string",
                  "description": "Additional special attributes" }
              }
            }
          },

          "volumes": {
            "description": "The attached virtual block storage",
            "type":        "array",
            "items": {
              "title": "Component Volume",
              "type":  "object",
              "required": ["name","size","type","attributes"],
              "properties": {

                "name": { "type": "string",
                  "description": "Name of the virtual network" },

                "size": { "type": "number",
                  "description": "Size of the block storage in gigabyte" },

                "type": { "type": "string", "enum": ["EXT", "INT"],
                  "description": "Name of block storage pool" },

                "attributes": { "type": "string",
                  "description": "Additional special attributes" }
              }
            }
          },

          "services": {
            "description": "The exposed services",
            "type":        "array",
            "items": {
              "title":    "Component Service",
              "type":     "object",
              "required": ["name","network","protocol","range"],
              "properties": {

                "name": { "type": "string",
                  "description": "Name of the service" },

                "network": { "type": "string",
                  "description": "The virtual network via which the service is exposed" },

                "protocol": { "type": "string", "enum": ["tcp", "udp", "icmp","sctp","any","none"],
                  "description": "The service protocol" },

                "range": { "type": "string", "minimum": 1,
                  "description": "Port range" }
              }
            }
          },

          "dependencies": {
            "description": "The dependencies to services provided by other componennts",
            "type":        "array",
            "items": {
              "title":      "Component Network",
              "type":       "object",
              "required":   ["component","service","network"],
              "properties": {

                "component": { "type": "string",
                  "description": "Name of the other component"},

                "service": { "type": "string",
                  "description": "The name of the service provided by the other component"},

                "network": { "type": "string",
                  "description": "The virtual network via which the service is consumed" }
              }
            }
          }
        }
      }
    }
  }
}

//------------------------------------------------------------------------------

function validate_schema(object) {
  var ajv    = new Ajv(); // options can be passed, e.g. {allErrors: true}
  var verify = ajv.compile(schema);
  var valid  = verify(object);

  if (!valid) {
    setFocus(verify.errors[0].dataPath)

    return "Schema error:\nfield " + verify.errors[0].message + "\nLocation: " + verify.errors[0].dataPath;
  }

  return '';
}

//------------------------------------------------------------------------------

function validate_xref(object) {

  // construct lookups
  var flavors    = object.flavors.map( x => x.name )
  var images     = object.images.map( x => x.name )
  var networks   = object.networks.map( x => x.name )
  var components = object.components.map( x => x.name )
  var services   = []

  for ( var component of object.components ) {
    for ( var service of component.services ) {
      services.push(component.name + ":" + service.name)
    }
  }

  // check flavors, images, networks and dependencies
  for ( var index =  0; index < object.components.length; index++ ) {
    component = object.components[index]

    // check flavor
    if ( !flavors.includes(component.flavor) ) {
      setFocus(".components[" + index + "].flavor")

      return "Reference error:\ninvalid flavor " + ".components[" + index + "].flavor";
    }

    // check image
    if ( !images.includes(component.image) ) {
      setFocus(".components[" + index + "].image")

      return "Reference error:\ninvalid image " + ".components[" + index + "].image";
    }

    // check interfaces
    var component_networks = []
    for ( var subindex = 0; subindex < component.interfaces.length; subindex++) {
      var interface = component.interfaces[subindex]

      component_networks.push( interface.network )

      if ( !networks.includes(interface.network) ) {
        setFocus(".components[" + index + "].interfaces[" + subindex + "].network")

        return "Reference error\ninvalid network " + ".components[" + index + "].interfaces[" + subindex + "].network";
      }
    }

    // check service networks
    for ( var subindex = 0; subindex < component.services.length; subindex++) {
      service = component.services[subindex]

      if ( !component_networks.includes(service.network) ) {
        setFocus(".components[" + index + "].services[" + subindex + "].network")

        return "Reference error\ninvalid network " + ".components[" + index + "].services[" + subindex + "].network";
      }
    }

    // check dependencies
    for ( var subindex = 0; subindex < component.dependencies.length; subindex++) {
      dependency = component.dependencies[subindex]

      if ( !components.includes(dependency.component) ) {
        setFocus(".components[" + index + "].dependencies[" + subindex + "].component")

        return "Reference error\ninvalid component " + ".components[" + index + "].dependencies[" + subindex + "].component";
      }

      if ( !component_networks.includes(dependency.network) ) {
        setFocus(".components[" + index + "].dependencies[" + subindex + "].network")

        return "Reference error\ninvalid network " + ".components[" + index + "].dependencies[" + subindex + "].component";
      }

      var reference = dependency.component + ":" + dependency.service

      if ( !services.includes(reference) ) {
        setFocus(".components[" + index + "].dependencies[" + subindex + "].service")

        return "Reference error\ninvalid service " + ".components[" + index + "].dependencies[" + subindex + "].service";
      }
    }
  }

  return '';
}

//------------------------------------------------------------------------------
