<template>
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
    </div>
</template>
<script>
export default {
    props:    ['model','view'],
    components: {
      monitoring_network: () => import('./MonitoringNetwork'),
      monitoring_component: () => import('./MonitoringComponent')
    },
    methods: {
      refresh: function() {
        var self    = this
        var request = new XMLHttpRequest();

        // callback function to process the results
        let refreshCB = () => {
          // hide loading indicator
          let indicator = document.querySelector("#monitoring .indicator")
          indicator.style.display = "none"

          if (this.readyState == 4) {
            // update in 10 seconds
            if (this.view.detail == "Monitoring") {
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
        request.onreadystatechange = refreshCB()

        var params  = "tenant="   + this.model.tenant.name          + "&" +
                      "url="      + this.model.tenant.auth.url      + "&" +
                      "username=" + this.model.tenant.auth.username + "&" +
                      "password=" + this.model.tenant.auth.password

        request.open('GET', '/inventory', true);  // asynchronous request
        request.send(params);

        // switch indicator
        let indicator = document.querySelector("#monitoring .indicator")
        indicator.style.display = "unset"
      }
    },
    computed: {
      components: function() {
        var result = []
        var index  = 0

        for (var index in this.model.components) {
          let component = this.model.components[index]

          if (component.max == 1) {
            result.push({index: index, name: component.name, component: component })
            index++
          } else {
            for (var i=0; i<=component.max; i++) {
              result.push({index: index, name: component.name + "-" + String(i), component: component })
              index++
            }
          }
        }

        // get status on next tick
        this.$nextTick(this.refresh)

        return result
      }
    }
}
</script>
<style>
#monitoring {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      0px;
  bottom:   0px;
  padding:  0px;

  overflow-y: scroll;
}

/*----------------------------------------------------------------------------*/

#monitoring .vnf {
  position:      absolute;
  left:          8px;
  top:           8px;
  height:        18px;
  width:         200px;
  line-height:   18px;
  text-overflow: ellipsis;
  overflow-y:    hidden;
  font-size:     16px;
  font-weight:   bolder;
  white-space:   nowrap;
}

#monitoring .tenant {
  position:      absolute;
  left:          8px;
  top:           26px;
  height:        14px;
  width:         200px;
  line-height:   14px;
  text-overflow: ellipsis;
  overflow-y:    hidden;
  font-size:     12px;
  white-space:   nowrap;
}

#monitoring .version {
  position:      absolute;
  left:          8px;
  top:           40px;
  height:        12px;
  width:         200px;
  line-height:   14px;
  text-overflow: ellipsis;
  overflow-y:    hidden;
  font-size:     10px;
  white-space:   nowrap;
}

#monitoring .date {
  position:      absolute;
  left:          8px;
  top:           52px;
  height:        12px;
  width:         200px;
  line-height:   14px;
  text-overflow: ellipsis;
  overflow-y:    hidden;
  font-size:     10px;
  white-space:   nowrap;
}

#monitoring .indicator {
  position:         absolute;
  right:            16px;
  top:              16px;
  font-size:        10px;
  padding:          8px;
  border-radius:    16px;
  white-space:      nowrap;
  background-color: orange;
  vertical-align:   middle;
  text-align:       center;
  display:          none;
  animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { background-color: orange;  color: black; }
   50% { background-color: #FF4136; color: white; }
  100% { background-color: orange;  color: black; }
}

/*----------------------------------------------------------------------------*/

#monitoring .network {
  position:         absolute;
  border-left:      1px solid #808080;
}

#monitoring .network.dummy {
  opacity: 0;
}

#monitoring .network.dummy:hover {
  opacity: 0.2;
}

#monitoring .network.network0  {border-left-color: #8080ff}
#monitoring .network.network1  {border-left-color: #80ff80}
#monitoring .network.network2  {border-left-color: #ff8080}
#monitoring .network.network3  {border-left-color: #C0C000}
#monitoring .network.network4  {border-left-color: #ff80ff}
#monitoring .network.network5  {border-left-color: #80ffff}
#monitoring .network.network6  {border-left-color: #c080ff}
#monitoring .network.network7  {border-left-color: #ffc080}
#monitoring .network.network8  {border-left-color: #80ffc0}
#monitoring .network.network9  {border-left-color: #80c0ff}
#monitoring .network.network10 {border-left-color: #ff80c0}
#monitoring .network.network11 {border-left-color: #c0ff80}

#monitoring .network input, #monitoring .network .label {
  position:         absolute;
  left:             -20px;
  top:              -16px;
  width:            40px;
  background-color: transparent;
  border:           none;
  line-height:      12px;
  text-align:       center;
  overflow:         hidden;
  text-overflow:    ellipsis;
  white-space:      nowrap;
}

#monitoring .network .icon {
  position:         absolute;
  left:             -20px;
  top:              -32px;
  width:            40px;
  background-color: transparent;
  border:           none;
  line-height:      12px;
  text-align:       center;
  overflow:         hidden;
  text-overflow:    ellipsis;
  white-space:      nowrap;
}


/*----------------------------------------------------------------------------*/

#monitoring .port {
  position:         absolute;
  vertical-align:   middle;
  text-align:       center;
  left:             -20px;
  width:            40px;
}

/*----------------------------------------------------------------------------*/

#monitoring .component {
  position:                  absolute;
  border-top-left-radius:    16px;
  border-bottom-left-radius: 16px;
}

#monitoring .component .zone {
  position:                  absolute;
  left:                      0px;
  top:                       0px;
  width:                     32px;
  height:                    32px;
  line-height:               32px;
  border-top-left-radius:    16px;
  border-bottom-left-radius: 16px;
  vertical-align:            middle;
  text-align:                center;
}

#monitoring .component .zone input {
  position:         absolute;
  left:             0px;
  right:            0px;
  width:            32px;
  height:           32px;
  line-height:      32px;
  background-color: transparent;
  border:           none;
  vertical-align:   middle;
  text-align:       center;
  text-align-last:  center;
  color:            black;
}

#monitoring .component .zone:hover {
  background-color: orange;
  color:            blue;
}

#monitoring .component.dummy {
  opacity: 0;
}

#monitoring .component.dummy:hover {
  opacity: 0.2;
}

#monitoring .component .zone-O { background-color: #AAA }
#monitoring .component .zone-E { background-color: #0C0 }
#monitoring .component .zone-I { background-color: #88F }
#monitoring .component .zone-M { background-color: #F44 }
#monitoring .component .zone-R { background-color: #D0D }

#monitoring .component .name {
  position:         absolute;
  left:             32px;
  right:            16px;
  top:              0px;
  height:           18px;
  text-overflow:    ellipsis;
  overflow:         hidden;
  white-space:      nowrap;
  line-height:      18px;
  padding-left:     4px;
  padding-right:    4px;
  text-align:       right;
}

#monitoring .component .name input {
  background-color: inherit;
  border: none;
  font-size:        14px;
  width:            160px;
  text-overflow:    ellipsis;
}

#monitoring .component.dummy .name {
  font-size:        14px;
}

#monitoring .component .icon {
  position:         absolute;
  right:            2px;
  top:              0px;
  height:          16px;
  line-height:     16px;
  font-size:       14px;
  vertical-align:    middle;
}

</style>