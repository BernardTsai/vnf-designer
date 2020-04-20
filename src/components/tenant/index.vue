<template>
<div id="tenant_layout" v-on:click="handleClick">
      <div class="vnf">VNF: {{model.vnf}}</div>
      <div class="tenant">Tenant: {{model.tenant.name}}</div>
      <div class="version">Version: {{model.version}}</div>
      <div class="date">Timestamp: {{timestamp}}</div>
      <!-- <div class="date">Timestamp: {{view.now}}</div> -->
      <tenant_network
        v-for="(network, index) in model.networks"
        :key="'network-' + index"
        v-bind:model="model"
        v-bind:view="view"
        v-bind:network="network"
        v-bind:index="index"></tenant_network>
      <tenant_network2
        :key="'network-dummy'"
        v-bind:model="model"
        v-bind:view="view"></tenant_network2>
      <tenant_component
        v-for="(component, index) in model.components"
        :key="'component-' + index"
        v-bind:model="model"
        v-bind:view="view"
        v-bind:component="component"
        v-bind:index="index"></tenant_component>
      <tenant_component2
        :key="'component-dummy'"
        v-bind:model="model"
        v-bind:view="view"></tenant_component2>
    </div>
</template>
<script>
import { PXOFFSET, XOFFSET, PYOFFSET, YOFFSET, XSLOT, YSLOT } from './TenantConstants'
import { hasComponentInterface, delComponentInterface, addComponentInterface } from '../../vnf_modules/model'
import { tick, meh } from '../../vnf_modules/view'
export default {
    props:    ['model','view'],
    data() {
      return {
        timestamp: null
      }
    },
    components: {
      tenant_network: () => import('./TenantNetwork'),
      tenant_network2: () => import('./TenantNetwork2'),
      tenant_component: () => import('./TenantComponent'),
      tenant_component2: () => import('./TenantComponent2')
    },
    methods: {
      handleClick: function(e) {
        var element = document.getElementById("tenant_layout")

        var x = element.scrollLeft + e.pageX - PXOFFSET - XOFFSET;
        var y = element.scrollTop  + e.pageY - PYOFFSET - YOFFSET;

        var net_index = Math.floor(x/XSLOT);
        var cmp_index = Math.floor(y/YSLOT);

        // check if click was in the cross-section of a network and a component
        if ( 0 <= net_index && net_index < this.model.networks.length &&
             0 <= cmp_index && cmp_index < this.model.components.length ) {

          // determine network and component
          var net = this.model.networks[net_index];
          var cmp = this.model.components[cmp_index];

          // delete interface if component has an interface to that network
          var iface = hasComponentInterface(cmp,net.name)
          if (iface) {
            delComponentInterface(cmp,iface)
          } else {
            addComponentInterface(cmp,net.name)
          }
        }
      },
      getNow: function() {
         var t = new Date();
        this.timestamp = t.getFullYear()+ "-" +
                  ("0" + t.getMonth()).substr(-2)   + "-" +
                  ("0" + t.getDate()).substr(-2)    + " " +
                  ("0" + t.getHours()).substr(-2)   + ":" +
                  ("0" + t.getMinutes()).substr(-2) + ":" +
                  ("0" + t.getSeconds()).substr(-2);
            }
    },
    created() {
      setInterval(this.getNow, 1000)
    }
}
</script>
<style>
#tenant_layout {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      0px;
  bottom:   0px;
  padding:  8px;

  overflow-y: scroll;
}

/*----------------------------------------------------------------------------*/

#tenant_layout .vnf {
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

#tenant_layout .tenant {
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

#tenant_layout .version {
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

#tenant_layout .date {
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

/*----------------------------------------------------------------------------*/

#tenant_layout .network {
  position:         absolute;
  border-left:      1px solid #808080;
}

#tenant_layout .network.dummy {
  opacity: 0;
}

#tenant_layout .network.dummy:hover {
  opacity: 0.2;
}

#tenant_layout .network.network0  {border-left-color: #8080ff}
#tenant_layout .network.network1  {border-left-color: #80ff80}
#tenant_layout .network.network2  {border-left-color: #ff8080}
#tenant_layout .network.network3  {border-left-color: #C0C000}
#tenant_layout .network.network4  {border-left-color: #ff80ff}
#tenant_layout .network.network5  {border-left-color: #80ffff}
#tenant_layout .network.network6  {border-left-color: #c080ff}
#tenant_layout .network.network7  {border-left-color: #ffc080}
#tenant_layout .network.network8  {border-left-color: #80ffc0}
#tenant_layout .network.network9  {border-left-color: #80c0ff}
#tenant_layout .network.network10 {border-left-color: #ff80c0}
#tenant_layout .network.network11 {border-left-color: #c0ff80}

#tenant_layout .network input, #tenant_layout .network .label {
  position:         absolute;
  left:             -28px;
  top:              -16px;
  width:            52px;
  background-color: transparent;
  border:           none;
  line-height:      12px;
  text-align:       center;
  overflow:         hidden;
  text-overflow:    ellipsis;
  white-space:      nowrap;
}

#tenant_layout .network .icon {
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

#tenant_layout .interface {
  position:         absolute;
  background-color: #d0d0d0;
}

#tenant_layout .interface.network0  {background-color: #8080ff}
#tenant_layout .interface.network1  {background-color: #80ff80}
#tenant_layout .interface.network2  {background-color: #ff8080}
#tenant_layout .interface.network3  {background-color: #C0C000}
#tenant_layout .interface.network4  {background-color: #ff80ff}
#tenant_layout .interface.network5  {background-color: #80ffff}
#tenant_layout .interface.network6  {background-color: #c080ff}
#tenant_layout .interface.network7  {background-color: #ffc080}
#tenant_layout .interface.network8  {background-color: #80ffc0}
#tenant_layout .interface.network9  {background-color: #80c0ff}
#tenant_layout .interface.network10 {background-color: #ff80c0}
#tenant_layout .interface.network11 {background-color: #c0ff80}

#tenant_layout .interface .serverport {
  position:         absolute;
  left:             -2px;
  top:              -2px;
  width:            5px;
  height:           5px;
  border-radius:    2.5px;
  background-color: inherit;
}

#tenant_layout .interface .switchport {
  position:         absolute;
  right:            -2px;
  top:              -2px;
  width:            5px;
  height:           5px;
  border-radius:    2.5px;
  background-color: inherit;
}

/*----------------------------------------------------------------------------*/

#tenant_layout .component {
  position:                  absolute;
  background-color:          #d0d0d0;
  border-top-left-radius:    16px;
  border-bottom-left-radius: 16px;
}

#tenant_layout .component .zone {
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

#tenant_layout .component .zone select {
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

#tenant_layout .component .zone:hover {
  background-color: orange;
  color:            blue;
}

#tenant_layout .component.dummy {
  opacity: 0;
}

#tenant_layout .component.dummy:hover {
  opacity: 0.2;
}

#tenant_layout .component .zone-O { background-color: #AAA }
#tenant_layout .component .zone-E { background-color: #0C0 }
#tenant_layout .component .zone-I { background-color: #88F }
#tenant_layout .component .zone-M { background-color: #F44 }
#tenant_layout .component .zone-R { background-color: #D0D }

#tenant_layout .component .name {
  position:         absolute;
  left:             32px;
  right:            0px;
  top:              0px;
  height:           18px;
  text-overflow:    ellipsis;
  overflow:         hidden;
  white-space:      nowrap;
  line-height:      18px;
  padding-left:     4px;
  padding-right:    4px;
}

#tenant_layout .component .name input {
  background-color: inherit;
  border: none;
  font-size:        14px;
  width:            140px;
  text-overflow:    ellipsis;
}

#tenant_layout .component.dummy .name {
  font-size:        14px;
}

#tenant_layout .component .sizing {
  position:         absolute;
  left:             32px;
  right:            0px;
  top:              18px;
  height:           14px;
  text-overflow:    ellipsis;
  overflow:         hidden;
  white-space:      nowrap;
  line-height:      14px;
  padding-left:     4px;
  padding-right:    4px;
  font-size:        12px;
}

#tenant_layout .component .icon {
  position:         absolute;
  right:            4px;
  top:              0px;
  height:          32px;
  line-height:     32px;
  font-size:       16px;
  vertical-align:    middle;
}

</style>