Vue.component(
  'componentitem',
  {
    props:    ['model','view','component'],
    methods:  {
      pick: function(entity) {
        this.view.detail='Component';
        this.view.entity=entity;
      },
      del: function(entity) {
        deleteComponent(entity)
        if ( this.view.detail === 'Component' ) {
          this.view.detail='';
          this.view.entity=null;
        }
      }
    },
    template: `
      <div class="item">
        <div class="name"   v-on:click="pick(component)"><i class="fas fa-server"/>&nbsp;{{component.name}}</div>
        <div class="button" v-on:click="del(component)"><i class="fas fa-minus"/></div>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component(
  'components',
  {
    props:    ['model','view'],
    template: `
      <div class="list">
        <componentitem
          :key="component.uuid"
          v-for="component in model.components"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:component="component"></componentitem>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component(
  'componentform',
  {
    props:    ['model','view','component'],
    computed: {
      services: function() {
        results = [];

        for (var component of model.components) {
          for (var service of component.services) {
            results.push({component: component.name, service: service.name})
          }
        }

        return results;
      },
      services2: function() {
        results = [];

        for (var component of model.components) {
          for (var service of component.services) {
            results.push( component.name + ":" + service.name)
          }
        }

        return results;
      },
      components: function() {
        return model.components.map(x => x.name)
      },
      all_networks: function() {
        return model.networks.map(x => x.name)
      },
      interfaces: function() {
        return this.component.interfaces.map(x => x.network)
      },
      zones: function() {
        return ['OTHER','EXT','INT','MGMT']
      },
      flavors: function() {
        return model.flavors.map(x => x.name)
      },
      images: function() {
        return model.images.map(x => x.name)
      },
      storagetypes: function() {
        return ['EXT','INT']
      },
      protocols: function() {
        return ['tcp','udp','icmp','any']
      },
      userdata: function() {
        return this.component.userdata.map(function(data,index){ return {"uuid": uuidv4(), "index": index}})
      }
    },
    methods: {
      addVolume:     function()           { addComponentVolume(this.component); },
      delVolume:     function(volume)     { delComponentVolume(this.component,volume); },
      addInterface:  function()           { addComponentInterface(this.component); },
      delInterface:  function(interface)  { delComponentInterface(this.component,interface); },
      addService:    function()           { addComponentService(this.component); },
      delService:    function(service)    { delComponentService(this.component,service); },
      addDependency: function()           { addComponentDependency(this.component); },
      delDependency: function(dependency) { delComponentDependency(this.component,dependency); },
      addUserdata:   function()           { addUserdata(this.component); },
      delUserdata:   function(userdata)   { delUserdata(this.component,this.component.userdata[userdata.index]); }
    },
    template: `
      <div id="componentform">
        <div class="header">Component: {{component.name}}</div>

        <div class="line">
          <label for="name">Name:</label>
          <input class="col5" v-model="component.name" id="name" name="name" required>
        </div>
        <div class="line">
          <label for="placement">Placement:</label>
          <select id="placement" name="placement" v-model="component.placement" v-bind:class="{valid: zones.includes(component.placement)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="zone in zones" v-bind:value="zone">
              {{ zone }}
            </option>
          </select>
          <label for="flavor">Flavor:</label>
          <select id="flavor" name="flavor" v-model="component.flavor" v-bind:class="{valid: flavors.includes(component.flavor)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="flavor in flavors" v-bind:value="flavor">
              {{ flavor }}
            </option>
          </select>
          <label for="image">Image:</label>
          <select id="image" name="image" v-model="component.image" v-bind:class="{valid: images.includes(component.image)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="image in images" v-bind:value="image">
              {{ image }}
            </option>
          </select>
        </div>
        <div class="line">
          <label for="min">Minimum:</label>
          <input id="min" name="min" v-model.number="component.min" type="number" required>
          <label for="size">Size:</label>
          <input id="size" name="size" v-model.number="component.size" type="number" required>
          <label for="max">Maximum:</label>
          <input id="max" name="max" v-model.number="component.max" type="number" required>
        </div>

        <div v-if="component.placement != 'OTHER'" class="subheader">Volumes:</div>

        <div  v-if="component.placement != 'OTHER'" class="line">
          <label class="top">Name:</label>
          <label class="top">Size:</label>
          <label class="top">Type:</label>
          <label class="top">Attributes:</label>
          <label v-on:click="addVolume"><i class="fas fa-plus-circle"/></label>
        </div>
        <div  v-if="component.placement != 'OTHER'" class="line" v-for="(volume,index) in component.volumes">
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
        <div class="line" v-for="(interface,index) in component.interfaces">
          <select v-bind:id="'interfaces_' + index + '_network'" v-bind:name="'interfaces_' + index + '_network'" v-model="interface.network" v-bind:class="{valid: all_networks.includes(interface.network)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="network in all_networks" v-bind:value="network">
              {{ network }}
            </option>
          </select>
          <input class="col3" v-bind:id="'interfaces_' + index + '_attributes'" v-bind:name="'interfaces_' + index + '_attributes'" v-model="interface.attributes">
          <label v-on:click="delInterface(interface)"><i class="fas fa-minus-circle"/></label>
        </div>

        <div class="subheader">Services:</div>

        <div class="line">
          <label class="top">Name:</label>
          <label class="top">Network</label>
          <label class="top">Protocol</label>
          <label class="top">Range:</label>
          <label v-on:click="addService()"><i class="fas fa-plus-circle"/></label>
        </div>
        <div class="line" v-for="(service,index) in component.services">
          <input v-bind:id="'services_' + index + '_name'" v-bind:name="'services_' + index + '_name'" v-model="service.name" required>
          <select v-bind:id="'services_' + index + '_network'" v-bind:name="'services_' + index + '_network'" v-model="service.network" v-bind:class="{valid: service.network !== ''}">
            <option disabled value="">Please select one</option>
            <option v-for="interface in component.interfaces" v-bind:value="interface.network">
              {{ interface.network }}
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

        <div class="subheader">Dependencies:</div>

        <div class="line">
          <label class="top">Component:</label>
          <label class="top">Service:</label>
          <label class="top">Network</label>
          <label v-on:click="addDependency()"><i class="fas fa-plus-circle"/></label>
        </div>
        <div class="line" v-for="(dependency,index) in component.dependencies">
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
          <select v-bind:id="'dependencies_' + index + '_network'" v-bind:name="'dependencies_' + index + '_network'" v-model="dependency.network" v-bind:class="{valid: interfaces.includes(dependency.network)}" required>
            <option disabled value="">Please select one</option>
            <option v-for="interface in component.interfaces" v-bind:value="interface.network">
              {{ interface.network }}
            </option>
          </select>

          <label v-on:click="delDependency(dependency)"><i class="fas fa-minus-circle"/></label>
        </div>

        <div v-if="component.placement != 'OTHER'" class="subheader">User Data:</div>

        <div v-if="component.placement != 'OTHER'" class="line">
          <label class="top">Data:</label>
          <label v-on:click="addUserdata()"><i class="fas fa-plus-circle"/></label>
        </div>
        <div v-if="component.placement != 'OTHER'" class="line" v-for="(userdata,index) in userdata">
          <textarea class="userdata" v-bind:id="userdata.uuid" v-bind:name="userdata.uuid" v-model="component.userdata[userdata.index]"></textarea>
          <label v-on:click="delUserdata(userdata)"><i class="fas fa-minus-circle"/></label>
        </div>

        <div class="line">&nbsp;</div>

      </div>`
  }
)
