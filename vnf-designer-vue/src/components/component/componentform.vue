<template>
  <div id="componentform">
    <div class="header">Component: {{ component.name }}</div>

    <div class="line">
      <label for="name">Name:</label>
      <input
        class="col5"
        v-model="component.name"
        id="name"
        name="name"
        required
      />
      <label
        for="name"
        v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
        >User:</label
      >
      <input
        class="col5"
        v-model="component.user"
        id="user"
        name="user"
        required
        v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
      />
    </div>
    <div class="line">
      <label for="placement">Placement:</label>
      <select
        id="placement"
        name="placement"
        v-model="component.placement"
        :class="{ valid: zones.includes(component.placement) }"
        required
      >
        <option disabled value="">Please select one</option>
        <option v-for="zone in zones" :value="zone">
          {{ zone }}
        </option>
      </select>
      <label
        for="flavor"
        v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
        >Flavor:</label
      >
      <select
        id="flavor"
        name="flavor"
        v-model="component.flavor"
        :class="{ valid: flavors.includes(component.flavor) }"
        v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
        required
      >
        <option disabled value="">Please select one</option>
        <option v-for="flavor in flavors" :value="flavor">
          {{ flavor }}
        </option>
      </select>
      <label
        for="image"
        v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
        >Image:</label
      >
      <select
        id="image"
        name="image"
        v-model="component.image"
        :class="{ valid: images.includes(component.image) }"
        v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
        required
      >
        <option disabled value="">Please select one</option>
        <option v-for="image in images" :value="image">
          {{ image }}
        </option>
      </select>
    </div>
    <div
      class="line"
      v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
    >
      <label for="min">Minimum:</label>
      <input
        id="min"
        name="min"
        v-model.number="component.min"
        type="number"
        required
      />
      <label for="size">Size:</label>
      <input
        id="size"
        name="size"
        v-model.number="component.size"
        type="number"
        required
      />
      <label for="max">Maximum:</label>
      <input
        id="max"
        name="max"
        v-model.number="component.max"
        type="number"
        required
      />
    </div>

    <div
      v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
      class="subheader"
    >
      Volumes:
    </div>

    <div
      v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
      class="line"
    >
      <label class="top">Name:</label>
      <label class="top">Size:</label>
      <label class="top">Type:</label>
      <label class="top">Attributes:</label>
      <label @click="addVolume"><i class="fas fa-plus-circle"/></label>
    </div>
    <div
      v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
      class="line"
      v-for="(volume, index) in component.volumes"
    >
      <input
        :id="'volumes_' + index + '_name'"
        :name="'volumes_' + index + '_name'"
        v-model="volume.name"
        required
      />
      <input
        :id="'volumes_' + index + '_size'"
        :name="'volumes_' + index + '_size'"
        v-model.number="volume.size"
        type="number"
        required
      />
      <select
        :id="'volumes_' + index + '_type'"
        :name="'volumes_' + index + '_type'"
        v-model="volume.type"
        :class="{ valid: storagetypes.includes(volume.type) }"
        required
      >
        <option disabled value="">Please select one</option>
        <option v-for="storagetype in storagetypes" :value="storagetype">
          {{ storagetype }}
        </option>
      </select>
      <input
        :id="'volumes_' + index + '_attributes'"
        :name="'volumes_' + index + '_attributes'"
        v-model="volume.attributes"
      />
      <label @click="delVolume(volume)"
        ><i class="fas fa-minus-circle"
      /></label>
    </div>

    <div class="subheader">Interfaces:</div>

    <div class="line">
      <label class="top">Network:</label>
      <label class="top">Attributes:</label>
      <label class="top"></label>
      <label class="top"></label>
      <label @click="addInterface()"><i class="fas fa-plus-circle"/></label>
    </div>
    <div
      class="line"
      v-for="(componentInterface, index) in component.interfaces"
    >
      <select
        :id="'interfaces_' + index + '_network'"
        :name="'interfaces_' + index + '_network'"
        v-model="componentInterface.network"
        :class="{
          valid: all_networks.includes(componentInterface.network)
        }"
        required
      >
        <option disabled value="">Please select one</option>
        <option v-for="network in all_networks" :value="network">
          {{ network }}
        </option>
      </select>
      <input
        class="col3"
        :id="'interfaces_' + index + '_attributes'"
        :name="'interfaces_' + index + '_attributes'"
        v-model="componentInterface.attributes"
      />
      <label @click="delInterface(componentInterface)"
        ><i class="fas fa-minus-circle"
      /></label>
    </div>

    <div class="subheader" v-if="component.placement != 'ROUTER'">
      Services:
    </div>

    <div class="line" v-if="component.placement != 'ROUTER'">
      <label class="top">Name:</label>
      <label class="top">Network</label>
      <label class="top">Protocol</label>
      <label class="top">Range:</label>
      <label @click="addService()"><i class="fas fa-plus-circle"/></label>
    </div>
    <div
      class="line"
      v-for="(service, index) in component.services"
      v-if="component.placement != 'ROUTER'"
    >
      <input
        :id="'services_' + index + '_name'"
        :name="'services_' + index + '_name'"
        v-model="service.name"
        required
      />
      <select
        :id="'services_' + index + '_network'"
        :name="'services_' + index + '_network'"
        v-model="service.network"
        :class="{ valid: service.network !== '' }"
      >
        <option disabled value="">Please select one</option>
        <option
          v-for="componentInterface in component.interfaces"
          :value="componentInterface.network"
        >
          {{ componentInterface.network }}
        </option>
      </select>
      <select
        :id="'services_' + index + '_protocol'"
        :name="'services_' + index + '_protocol'"
        v-model="service.protocol"
        :class="{ valid: protocols.includes(service.protocol) }"
        required
      >
        <option disabled value="">Please select one</option>
        <option v-for="protocol in protocols" :value="protocol">
          {{ protocol }}
        </option>
      </select>
      <input
        :id="'services_' + index + '_range'"
        :name="'services_' + index + '_range'"
        v-model="service.range"
        required
      />
      <label @click="delService(service)"
        ><i class="fas fa-minus-circle"
      /></label>
    </div>

    <div class="subheader" v-if="component.placement != 'ROUTER'">
      Dependencies:
    </div>

    <div class="line" v-if="component.placement != 'ROUTER'">
      <label class="top">Component:</label>
      <label class="top">Service:</label>
      <label class="top">Network</label>
      <label @click="addDependency()"
        ><i class="fas fa-plus-circle"
      /></label>
    </div>
    <div
      class="line"
      v-for="(dependency, index) in component.dependencies"
      v-if="component.placement != 'ROUTER'"
    >
      <select
        :id="'dependencies_' + index + '_component'"
        :name="'dependencies_' + index + '_component'"
        v-model="dependency.component"
        :class="{ valid: components.includes(dependency.component) }"
        required
      >
        <option disabled value="">Please select one</option>
        <option v-for="component in components" :value="component">
          {{ component }}
        </option>
      </select>
      <select
        :id="'dependencies_' + index + '_service'"
        :name="'dependencies_' + index + '_service'"
        v-model="dependency.service"
        :class="{
          valid: services2.includes(
            dependency.component + ':' + dependency.service
          )
        }"
        required
      >
        <option disabled value="">Please select one</option>
        <option
          v-for="service in services"
          v-if="service.component === dependency.component"
          :value="service.service"
        >
          {{ service.service }}
        </option>
      </select>
      <select
        :id="'dependencies_' + index + '_network'"
        :name="'dependencies_' + index + '_network'"
        v-model="dependency.network"
        :class="{ valid: interfaces.includes(dependency.network) }"
        required
      >
        <option disabled value="">Please select one</option>
        <option
          v-for="componentInterface in component.interfaces"
          :value="componentInterface.network"
        >
          {{ componentInterface.network }}
        </option>
      </select>

      <label @click="delDependency(dependency)"
        ><i class="fas fa-minus-circle"
      /></label>
    </div>

    <div
      v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
      class="subheader"
    >
      User Data:
    </div>

    <div
      v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
      class="line"
    >
      <textarea class="userdata" v-model="component.userdata"></textarea>
    </div>

    <div class="line">&nbsp;</div>
  </div>
</template>
<script>
export default {
  name: "",
  props: ["model", "view", "component"],
  computed: {
    services: function() {
      let results = [];

      for (var component of this.model.current.components) {
        for (var service of component.services) {
          results.push({ component: component.name, service: service.name });
        }
      }

      return results;
    },
    services2: function() {
      let results = [];

      for (var component of this.model.current.components) {
        for (var service of component.services) {
          results.push(component.name + ":" + service.name);
        }
      }

      return results;
    },
    components: function() {
      return this.model.current.components
        .filter(x => x.placement != "ROUTER")
        .map(x => x.name);
    },
    all_networks: function() {
      return this.model.current.networks.map(x => x.name);
    },
    interfaces: function() {
      return this.component.interfaces.map(x => x.network);
    },
    zones: function() {
      return ["OTHER", "EXT", "INT", "MGMT", "ROUTER"];
    },
    flavors: function() {
      return this.model.current.flavors.map(x => x.name);
    },
    images: function() {
      return this.model.current.images.map(x => x.name);
    },
    storagetypes: function() {
      return ["EXT", "INT"];
    },
    protocols: function() {
      return ["tcp", "udp", "icmp", "any", "sctp", "none"];
    },
    userdata: function() {
      return this.component.userdata.map(function(data, index) {
        return { uuid: uuidv4(), index: index };
      });
    }
  },
  methods: {
    addVolume: function() {
      this.model.addComponentVolume(this.component);
    },
    delVolume: function(volume) {
      this.model.delComponentVolume(this.component, volume);
    },
    addInterface: function() {
      this.model.addComponentInterface(this.component);
    },
    delInterface: function(componentInterface) {
      this.model.delComponentInterface(this.component, componentInterface);
    },
    addService: function() {
      this.model.addComponentService(this.component);
    },
    delService: function(service) {
      this.model.delComponentService(this.component, service);
    },
    addDependency: function() {
      this.model.addComponentDependency(this.component);
    },
    delDependency: function(dependency) {
      this.model.delComponentDependency(this.component, dependency);
    },
    addUserdata: function() {
      this.model.addUserdata(this.component);
    },
    delUserdata: function(userdata) {
      this.model.delUserdata(
        this.component,
        this.component.userdata[userdata.index]
      );
    }
  }
};
</script>
