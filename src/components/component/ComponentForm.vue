<template>
<div id="componentform">
        <div class="header">Component: {{component.name}}</div>

        <div class="line">
          <label for="name">Name:</label>
          <input class="col5" v-model="component.name" id="name" name="name" required>
          <label for="name" v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'">User:</label>
          <input class="col5" v-model="component.user" id="user" name="user" required v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'">
        </div>
        <div class="line">
          <label for="placement">Placement:</label>
          <select id="placement" name="placement" v-model="component.placement" v-bind:class="{valid: zones.includes(component.placement)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="zone in zones" v-bind:value="zone">
              {{ zone }}
            </option>
          </select>
          <label for="flavor" v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'">Flavor:</label>
          <select id="flavor" name="flavor" v-model="component.flavor" v-bind:class="{valid: flavors.includes(component.flavor)}"  v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'" required>
            <option disabled value="">Please select one</option>
            <option v-for="flavor in flavors" v-bind:value="flavor">
              {{ flavor }}
            </option>
          </select>
          <label for="image" v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'">Image:</label>
          <select id="image" name="image" v-model="component.image" v-bind:class="{valid: images.includes(component.image)}"  v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'" required>
            <option disabled value="">Please select one</option>
            <option v-for="image in images" v-bind:value="image">
              {{ image }}
            </option>
          </select>
        </div>
        <div class="line" v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'">
          <label for="min">Minimum:</label>
          <input id="min" name="min" v-model.number="component.min" type="number" required>
          <label for="size">Size:</label>
          <input id="size" name="size" v-model.number="component.size" type="number" required>
          <label for="max">Maximum:</label>
          <input id="max" name="max" v-model.number="component.max" type="number" required>
        </div>

        <div  v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'" class="subheader">Volumes:</div>

        <div v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'" class="line">
          <label class="top">Name:</label>
          <label class="top">Size:</label>
          <label class="top">Type:</label>
          <label class="top">Attributes:</label>
          <label v-on:click="addVolume"><i class="fas fa-plus-circle"/></label>
        </div>
        <div v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'" class="line" v-for="(volume,index) in component.volumes">
          <input v-bind:id="'volumes_' + index + '_name'" v-bind:name="'volumes_' + index + '_name'" v-model="volume.name" required>
          <input v-bind:id="'volumes_' + index + '_size'" v-bind:name="'volumes_' + index + '_size'" v-model.number="volume.size" type="number" required>
          <select v-bind:id="'volumes_' + index + '_type'" v-bind:name="'volumes_' + index + '_type'" v-model="volume.type" v-bind:class="{valid: storagetypes.includes(volume.type)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="storagetype in storagetypes" v-bind:value="storagetype">
              {{ storagetype }}
            </option>
          </select>
          <input v-bind:id="'volumes_' + index + '_attributes'" v-bind:name="'volumes_' + index + '_attributes'" v-model="volume.attributes">
          <label v-on:click="delVolume(volume)"><i class="fas fa-minus-circle"/></label>
        </div>

        <div class="subheader">Interfaces:</div>

        <div class="line">
          <label class="top">Network:</label>
          <label class="top">Attributes:</label>
          <label class="top"></label>
          <label class="top"></label>
          <label v-on:click="addInterface()"><i class="fas fa-plus-circle"/></label>
        </div>
        <div class="line" v-for="(componentInterface,index) in component.componentInterfaces">
          <select v-bind:id="'interfaces_' + index + '_network'" v-bind:name="'interfaces_' + index + '_network'" v-model="componentInterface.network" v-bind:class="{valid: all_networks.includes(componentInterface.network)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="network in all_networks" v-bind:value="network">
              {{ network }}
            </option>
          </select>
          <input class="col3" v-bind:id="'interfaces_' + index + '_attributes'" v-bind:name="'interfaces_' + index + '_attributes'" v-model="componentInterface.attributes">
          <label v-on:click="delInterface(componentInterface)"><i class="fas fa-minus-circle"/></label>
        </div>

        <div class="subheader" v-if="component.placement != 'ROUTER'">Services:</div>

        <div class="line" v-if="component.placement != 'ROUTER'">
          <label class="top">Name:</label>
          <label class="top">Network</label>
          <label class="top">Protocol</label>
          <label class="top">Range:</label>
          <label v-on:click="addService()"><i class="fas fa-plus-circle"/></label>
        </div>
        <div class="line" v-for="(service,index) in component.services" v-if="component.placement != 'ROUTER'">
          <input v-bind:id="'services_' + index + '_name'" v-bind:name="'services_' + index + '_name'" v-model="service.name" required>
          <select v-bind:id="'services_' + index + '_network'" v-bind:name="'services_' + index + '_network'" v-model="service.network" v-bind:class="{valid: service.network !== ''}">
            <option disabled value="">Please select one</option>
            <option v-for="componentInterface in component.componentInterfaces" v-bind:value="componentInterface.network">
              {{ componentInterface.network }}
            </option>
          </select>
          <select v-bind:id="'services_' + index + '_protocol'" v-bind:name="'services_' + index + '_protocol'" v-model="service.protocol" v-bind:class="{valid: protocols.includes(service.protocol)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="protocol in protocols" v-bind:value="protocol">
              {{ protocol }}
            </option>
          </select>
          <input v-bind:id="'services_' + index + '_range'" v-bind:name="'services_' + index + '_range'" v-model="service.range" required>
          <label v-on:click="delService(service)"><i class="fas fa-minus-circle"/></label>
        </div>

        <div class="subheader" v-if="component.placement != 'ROUTER'">Dependencies:</div>

        <div class="line" v-if="component.placement != 'ROUTER'">
          <label class="top">Component:</label>
          <label class="top">Service:</label>
          <label class="top">Network</label>
          <label v-on:click="addDependency()"><i class="fas fa-plus-circle"/></label>
        </div>
        <div class="line" v-for="(dependency,index) in component.dependencies" v-if="component.placement != 'ROUTER'">
          <select v-bind:id="'dependencies_' + index + '_component'" v-bind:name="'dependencies_' + index + '_component'" v-model="dependency.component" v-bind:class="{valid: components.includes(dependency.component)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="component in components" v-bind:value="component">
              {{ component }}
            </option>
          </select>
          <select v-bind:id="'dependencies_' + index + '_service'" v-bind:name="'dependencies_' + index + '_service'" v-model="dependency.service" v-bind:class="{valid: services2.includes(dependency.component + ':' + dependency.service)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="service in services" v-if="service.component === dependency.component" v-bind:value="service.service">
              {{ service.service }}
            </option>
          </select>
          <select v-bind:id="'dependencies_' + index + '_network'" v-bind:name="'dependencies_' + index + '_network'" v-model="dependency.network" v-bind:class="{valid: componentInterfaces.includes(dependency.network)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="componentInterface in component.componentInterfaces" v-bind:value="componentInterface.network">
              {{ componentInterface.network }}
            </option>
          </select>

          <label v-on:click="delDependency(dependency)"><i class="fas fa-minus-circle"/></label>
        </div>

        <div v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'" class="subheader">User Data:</div>

        <div v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'" class="line">
          <textarea class="userdata" v-model="component.userdata"></textarea>
        </div>

        <div class="line">&nbsp;</div>

      </div>
</template>
<script>
import { addComponentInterface, delComponentInterface, addComponentService, delComponentService, addComponentDependency, delComponentDependency, addComponentVolume, delComponentVolume } from "../../vnf_modules/model"
export default {
    props:    ['model','view','component'],
    computed: {
      services: function() {
        let results = [];

        for (var component of this.model.components) {
          for (var service of component.services) {
            results.push({component: component.name, service: service.name})
          }
        }

        return results;
      },
      services2: function() {
        let results = [];

        for (var component of this.model.components) {
          for (var service of component.services) {
            results.push( component.name + ":" + service.name)
          }
        }

        return results;
      },
      components: function() {
        return this.model.components.filter(x => x.placement != 'ROUTER').map(x => x.name)
      },
      all_networks: function() {
        return this.model.networks.map(x => x.name)
      },
      componentInterfaces: function() {
        return this.component.componentInterfaces.map(x => x.network)
      },
      zones: function() {
        return ['OTHER','EXT','INT','MGMT','ROUTER']
      },
      flavors: function() {
        return this.model.flavors.map(x => x.name)
      },
      images: function() {
        return this.model.images.map(x => x.name)
      },
      storagetypes: function() {
        return ['EXT','INT']
      },
      protocols: function() {
        return ['tcp','udp','icmp','any','sctp','none']
      },
      userdata: function() {
        return this.component.userdata.map(function(data,index){ return {"uuid": uuidv4(), "index": index}})
      }
    },
    methods: {
      addVolume:     function()           { addComponentVolume(this.component); },
      delVolume:     function(volume)     { delComponentVolume(this.component,volume); },
      addInterface:  function()           { addComponentInterface(this.component); },
      delInterface:  function(componentInterface)  { delComponentInterface(this.component,componentInterface); },
      addService:    function()           { addComponentService(this.component); },
      delService:    function(service)    { delComponentService(this.component,service); },
      addDependency: function()           { addComponentDependency(this.component); },
      delDependency: function(dependency) { delComponentDependency(this.component,dependency); },
      addUserdata:   function()           { addUserdata(this.component); },
      delUserdata:   function(userdata)   { delUserdata(this.component,this.component.userdata[userdata.index]); }
    }
}
</script>
<style scoped>
#componentform {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      0px;
  bottom:   0px;
  padding:  8px;

  overflow-y: scroll;
}

#componentform .header {
  font-size:   20px;
  font-weight: bold;
}

#componentform .subheader {
  font-size:   14px;
  font-weight: bolder;
  padding-top: 24px;
  padding-left: 8px;
}

#componentform .line {
  padding-top: 8px;
  padding-left: 24px;
}

#componentform .line label {
  display:     inline-block;
  width:       64px;
  font-weight: bold;
}

#componentform .line label.top {
  width:       200px;
}


#componentform .line input {
  display:     inline-block;
  width:       200px;
}

#componentform .line input.col3 {
  width:       600px;
}

#componentform .line select {
  display:     inline-block;
  width:       200px;
}

#componentform textarea.userdata {
  box-sizing:     border-box;
  width:          800px;
  height:         11em;
  vertical-align: top;
  margin:         0px;
}
</style>