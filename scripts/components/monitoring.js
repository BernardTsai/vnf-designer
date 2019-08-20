Vue.component( 'monitoring_network',
  {
    props:   ['model','view','network','index'],
    computed: {
      t: function(index) {
        return NET_HEIGHT;
      },
      l: function(index) {
        return CMP_WIDTH + (this.index+1) * (DX+NET_WIDTH) - 1;
      },
      w: function(index) {
        return NET_WIDTH;
      },
      h: function(index) {
        var count  = 0

        for (var index in this.model.components) {
          component = this.model.components[index]
          count += component.max
        }

        return DY + count * (DY+CMP_HEIGHT2);
      }
    },
    template: `
      <div
        :class="'network monitoring_network network' + index"
        :id="'monitoring_network_' + network.name"
        :style="{
          top:         t + 'px',
          left:        l + 'px',
          width:       w + 'px',
          height:      h + 'px'
        }">
        <div class="icon"
          :title="network.name + '\\nipv4: ' + network.ipv4 + '\\nipv6: ' + network.ipv6">
          <i class="fas fa-network-wired"/>
        </div>
        <input v-model="network.name" readonly>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'monitoring_component',
  {
    props:   ['model','view','component','name','index'],
    computed: {
      t: function() {
        return DY+NET_HEIGHT + this.index * (DY+CMP_HEIGHT2);
      },
      l: function(index) {
        return DX;
      },
      w: function() {
        return CMP_WIDTH
      },
      h: function() {
        return CMP_HEIGHT2
      },
      z: function() {
        return this.component.placement.substr(0,1).toUpperCase();
      }
    },
    template: `
      <div
        :class="'component monitoring_component index' + index"
        :id="'monitoring_component_' + name"
        :style="{
          top:    t + 'px',
          left:   l + 'px',
          width:  w + 'px',
          height: h + 'px'
        }">
        <div class="name">{{name}}</div>
        <div class="icon"><i class="fas fa-server"/></div>
        <monitoring_port
          v-for="(interface, subindex) in component.component.interfaces"
          :key="subindex"
          :model="model"
          :view="view"
          :component="component.component"
          :interface="interface"
          :name="name"
          :index="index"
          :subindex="subindex"></monitoring_port>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'monitoring_port',
  {
    props:   ['model','view','component','interface', 'name','index', 'subindex'],
    computed: {
      t: function() {
        return 0;
      },
      l: function() {
        return CMP_WIDTH + (this.i) * (DX+NET_WIDTH) + NET_WIDTH/2 -0.5;
      },
      w: function() {
        return NET_WIDTH
      },
      h: function() {
        return CMP_HEIGHT2
      },
      i: function() {
        for (var index2=0; index2 < this.model.networks.length; index2++) {
          if (this.interface.network == this.model.networks[index2].name) {
            return index2
          }
        }

        return this.model.networks.length;
      },
      a: function() {
        return (this.interface.attributes == "" ? "" : ' (' + this.interface.attributes + ')')
      }
    },
    template: `
      <div
        :class="'port monitoring_port network' + i"
        :id="'monitoring_port_' + name + '_' + interface.network"
        :title="name + ':' + interface.network + a "
        :style="{
          top:    t + 'px',
          left:   l + 'px',
          width:  w + 'px',
          height: h + 'px',
          'line-height': h + 'px'
        }"><i class="fa fa-bullseye"/>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component(
  'monitoring',
  {
    props:    ['model','view'],
    methods: {
      refresh: function() {
        var self    = this
        var request = new XMLHttpRequest();

        // callback function to process the results
        function refreshCB() {
          // hide loading indicator
          indicator = document.querySelector("#monitoring .indicator")
          indicator.style.display = "none"

          if (this.readyState == 4) {
            // update in 10 seconds
            if (view.detail == "Monitoring") {
              setTimeout(function(){self.refresh()}, 10000)
            }

            // check status
            if (this.status != 200) {
              return
            }

            inventory = jsyaml.safeLoad(request.responseText)

            // reset all networks, components and ports
            elements = document.querySelectorAll(".monitoring_network")
            for (var element of elements) {
              element.querySelector(".icon").style.color = null
              element.querySelector("input").style.color = null
            }

            elements = document.querySelectorAll(".monitoring_component")
            for (var element of elements) {
              element.querySelector(".icon").style.color = null
              element.querySelector(".name").style.color = null
            }

            elements = document.querySelectorAll(".monitoring_port")
            for (var element of elements) {
              element.style.color = null
            }

            // update network status
            for (var network of inventory.networks) {
              element = document.querySelector("#monitoring_network_" + network.name)
              if (element) {
                if (network.status == "ACTIVE") {
                  element.querySelector(".icon").style.color = "green"
                  element.querySelector("input").style.color = "green"
                } else {
                  element.querySelector(".icon").style.color = "red"
                  element.querySelector("input").style.color = "red"
                }
              }
            }
            // update server status
            for (var server of inventory.servers) {
              element = document.querySelector("#monitoring_component_" + server.name)
              if (element) {
                if (server.status == "ACTIVE") {
                  element.querySelector(".icon").style.color = "green"
                  element.querySelector(".name").style.color = "green"
                } else {
                  element.querySelector(".icon").style.color = "red"
                  element.querySelector(".name").style.color = "red"
                }
              }
            }
            // update port status
            for (var port of inventory.ports) {
              element = document.querySelector("#monitoring_port_" + port.name)
              if (element) {
                element.style.color = (port.status == "ACTIVE" ? "green" : "red")
              }
            }
          }
        }

        // check if the webpage has been loaded from file
        if (window.location.hostname == "") {
          return
        }

        // issue request to server backend
        request.onreadystatechange = refreshCB

        var params  = "tenant="   + model.tenant.name          + "&" +
                      "url="      + model.tenant.auth.url      + "&" +
                      "username=" + model.tenant.auth.username + "&" +
                      "password=" + model.tenant.auth.password

        request.open('GET', '/inventory', true);  // asynchronous request
        request.send(params);

        // switch indicator
        indicator = document.querySelector("#monitoring .indicator")
        indicator.style.display = "unset"
      }
    },
    computed: {
      components: function() {
        var result = []
        var index  = 0

        for (var index in this.model.components) {
          component = this.model.components[index]

          if (component.max == 1) {
            result.push({index: index, name: component.name, component: component })
            index++
          } else {
            for (var i=01; i<=component.max; i++) {
              result.push({index: index, name: component.name + "-" + String(i), component: component })
              index++
            }
          }
        }

        // get status on next tick
        this.$nextTick(this.refresh)

        return result
      }
    },
    template: `
    <div id="monitoring">
      <div class="vnf" @click="refresh">VNF: {{model.vnf}}</div>
      <div class="version">Version: {{model.version}}</div>
      <div class="tenant">Tenant: {{model.tenant.name}}</div>
      <div class="date">Timestamp: {{view.now}}</div>
      <div class="indicator"><i class="fas fa-heartbeat"/></div>
      <monitoring_network
        v-for="(network, index) in model.networks"
        :key="'network-' + index"
        :model="model"
        :view="view"
        :network="network"
        :index="index"></monitoring_network>
      <monitoring_component
        v-for="(component, index) in components"
        :key="'component-' + component.index"
        :model="model"
        :view="view"
        :component="component"
        :name="component.name"
        :index="index"></monitoring_component>
    </div>`
  }
)
