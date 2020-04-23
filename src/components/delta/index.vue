<template>
    <div id="deltaform">
      <div class="title">
        <div class="current">Current State:</div>
        <div class="target">Target State:</div>
      </div>
      <div class="header">
        <div class="current">
          {{difference.header.current}}
        </div>
        <div class="target">
          {{difference.header.target}}
        </div>
      </div>
      <div class="flavors">
        <div class="subtitle">
          <div class="current">Flavors:</div>
          <div class="target">Flavors:</div>
        </div>
        <div v-for="flavor in difference.flavors" class="flavor">
          <div v-bind:class="'current ' + flavor.delta"><i v-if="flavor.current.name !== ''" class="fas fa-microchip"/>&nbsp;{{flavor.current.name}}</div>
          <div v-bind:class="'target ' + flavor.delta"><i v-if="flavor.target.name !== ''" class="fas fa-microchip"/>&nbsp;{{flavor.target.name}}</div>
        </div>
      </div>
      <div class="images">
        <div class="subtitle">
          <div class="current">Images:</div>
          <div class="target">Images:</div>
        </div>
        <div v-for="image in difference.images" class="image">
          <div v-bind:class="'current ' + image.delta"><i v-if="image.current.name !== ''" class="fas fa-hockey-puck"/>&nbsp;{{image.current.name}}</div>
          <div v-bind:class="'target ' + image.delta"><i v-if="image.target.name !== ''" class="fas fa-hockey-puck"/>&nbsp;{{image.target.name}}</div>
        </div>
      </div>
      <div class="networks">
        <div class="subtitle">
          <div class="current">Networks:</div>
          <div class="target">Networks:</div>
        </div>
        <div v-for="network in difference.networks" class="network">
          <div v-bind:class="'current ' + network.delta"><i v-if="network.current.name !== ''" class="fas fa-cloud"/>&nbsp;{{network.current.name}}</div>
          <div v-bind:class="'target ' + network.delta"><i v-if="network.target.name !== ''" class="fas fa-cloud"/>&nbsp;{{network.target.name}}</div>
        </div>
      </div>
      <div class="components">
        <div class="subtitle">
          <div class="current">Components:</div>
          <div class="target">Components:</div>
        </div>
        <div v-for="component in difference.components" class="component">
          <div v-bind:class="'current ' + component.delta"><i v-if="component.current.name !== ''" class="fas fa-server"/>&nbsp;{{component.current.name}}</div>
          <div v-bind:class="'target ' + component.delta"><i v-if="component.target.name !== ''" class="fas fa-server"/>&nbsp;{{component.target.name}}</div>
        </div>
      </div>
    </div>
</template>
<script>
import { current, target } from '../../vnf_modules/model'
import jsyaml from 'js-yaml'
export default {
    props:    ['model','current','target','view','templates'],
    computed: {
      difference: function() {
        var result = {
          header:     null,
          flavors:    [],
          images:     [],
          networks:   [],
          components: []
        };

        // sort entries
        function cmp(a,b) {
          if (a === b) {
            return 0
          }
          return (a<b ? 1 : -1)
        }

        // convert array to associative array
        function convert(arr, key) {
          var result = {}

          for (var item in arr) {
            var key     = item[key]

            result[key] = item
          }

          return result
        }

        // convert array to associative array (with 2 keys)
        function convert2(arr, key1, key2) {
          var result = {}

          for (var item in arr) {
            var key     = item[key1] + "|" + item[key2]

            result[key] = item
          }

          return result
        }

        // delta header
        result.header = {
          current: current.vnf + '/' + current.tenant.name + ' (' + current.version + ')',
          target:  target.vnf + '/'  + target.tenant.name  + ' (' + target.version  + ')',
          delta:   ''
        }

        if (result.header.current !== result.header.target) {
          result.header.delta = 'update'
        }

        // delta flavors
        var flavors = {}

        for (var flavor of current.flavors) {
          flavors[flavor.name] = {name: flavor.name, current: {name:''}, target: {name:''}, delta: ''}
        }

        for (var flavor of target.flavors) {
          flavors[flavor.name] = {name: flavor.name, current: {name:''}, target: {name:''}, delta: ''}
        }

        for (var flavor of current.flavors) {
          flavors[flavor.name]['current'] = flavor
        }

        for (var flavor of target.flavors) {
          flavors[flavor.name]['target'] = flavor
        }

        for (var key in flavors) {
          var flavor = flavors[key]
          if (flavor.current.name === '' && flavor.target.name  !== '') {flavor.delta = 'create'; continue;}
          if (flavor.target.name  === '' && flavor.current.name !== '') {flavor.delta = 'delete'; continue;}

          if (flavor.current.vcpu    !== flavor.target.vcpu)    { flavor.delta = 'update'; continue;}
          if (flavor.current.ram     !== flavor.target.ram)     { flavor.delta = 'update'; continue;}
          if (flavor.current.disk    !== flavor.target.disk)    { flavor.delta = 'update'; continue;}
          if (flavor.current.public  !== flavor.target.public)  { flavor.delta = 'update'; continue;}

          let currentSpecial = jsyaml.safeDump(flavor.current.special)
          let targetSpecial  = jsyaml.safeDump(flavor.target.special)
          if (currentSpecial !== targetSpecial) { flavor.delta = 'update'; continue;}
        }

        result.flavors = Object.values(flavors).sort(cmp)

        // delta images
        var images = {}

        for (var image of current.images) {
          images[image.name] = {name: image.name, current: {name:''}, target: {name:''}, delta: ''}
        }

        for (var image of target.images) {
          images[image.name] = {name: image.name, current: {name:''}, target: {name:''}, delta: ''}
        }

        for (var image of current.images) {
          images[image.name]['current'] = image
        }

        for (var image of target.images) {
          images[image.name]['target'] = image
        }

        for (var key in images) {
          var image = images[key]
          if (image.current.name === '' && image.target.name  !== '') {image.delta = 'create'; continue;}
          if (image.target.name  === '' && image.current.name !== '') {image.delta = 'delete'; continue;}

          if (image.current.disk      !== image.target.disk)      { image.delta = 'update'; continue;}
          if (image.current.container !== image.target.container) { image.delta = 'update'; continue;}
          if (image.current.url       !== image.target.url)       { image.delta = 'update'; continue;}
          if (image.current.special   !== image.target.special)   { image.delta = 'update'; continue;}
        }

        result.images = Object.values(images).sort(cmp)

        // delta networks
        var networks = {}

        for (var network of current.networks) {
          networks[network.name] = {name: network.name, current: {name:''}, target: {name:''}, delta: ''}
        }

        for (var network of target.networks) {
          networks[network.name] = {name: network.name, current: {name:''}, target: {name:''}, delta: ''}
        }

        for (var network of current.networks) {
          networks[network.name]['current'] = network
        }

        for (var network of target.networks) {
          networks[network.name]['target'] = network
        }

        for (var key in networks) {
          var network = networks[key]
          if (network.current.name === '' && network.target.name  !== '') {network.delta = 'create'; continue;}
          if (network.target.name  === '' && network.current.name !== '') {network.delta = 'delete'; continue;}

          if (network.current.ipv4      !== network.target.ipv4)    { network.delta = 'update'; continue;}
          if (network.current.ipv6      !== network.target.ipv6)    { network.delta = 'update'; continue;}
          if (network.current.route     !== network.target.route)   { network.delta = 'update'; continue;}
          if (network.current.special   !== network.target.special) { network.delta = 'update'; continue;}
        }

        result.networks = Object.values(networks).sort(cmp)

        // delta components
        var components = {}

        for (var component of current.components) {
          components[component.name] = {name: component.name, current: {name:''}, target: {name:''}, delta: ''}
        }

        for (var component of target.components) {
          components[component.name] = {name: component.name, current: {name:''}, target: {name:''}, delta: ''}
        }

        for (var component of current.components) {
          var item = {
            placement:     component.placement,
            flavor:        component.flavor,
            image:         component.image,
            min:           component.min,
            size:          component.size,
            max:           component.max,
            volumes:       convert(component.volumes, 'name'),
            interfaces:    convert(component.interfaces, 'network'),
            services:      convert(component.services, 'name'),
            dependencies:  convert2(component.dependencies, 'component', 'service')
          }

          components[component.name]['current'] = { name: component.name, item: item }
        }

        for (var component of target.components) {
          var item = {
            placement:     component.placement,
            flavor:        component.flavor,
            image:         component.image,
            min:           component.min,
            size:          component.size,
            max:           component.max,
            volumes:       convert(component.volumes, 'name'),
            interfaces:    convert(component.interfaces, 'network'),
            services:      convert(component.services, 'name'),
            dependencies:  convert2(component.dependencies, 'component', 'service')
          }

          components[component.name]['target'] = { name: component.name, item: item }
        }

        for (var key in components) {
          var component = components[key]
          if (component.current.name === '' && component.target.name  !== '') {component.delta = 'create'; continue;}
          if (component.target.name  === '' && component.current.name !== '') {component.delta = 'delete'; continue;}

          if (JSON.stringify(component.current) !== JSON.stringify(component.target )) { component.delta = 'update'; continue;}
        }

        result.components = Object.values(components).sort(cmp)

        // finished
        return result;
      }
    }
}
</script>
<style scoped>
#deltaform {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      0px;
  bottom:   0px;
  padding:  0px;

  overflow-y: scroll;
}

/*----------------------------------------------------------------------------*/

#deltaform .header {
  display:       flex;
  border-bottom: 1px solid lightgrey;
  font-weight:   bold;
}

#deltaform .header .current {
  flex:         1;
  border-right: 1px solid lightgrey;
  padding-left: 8px;
}

#deltaform .header .target {
  flex:         1;
  padding-left: 8px;
}

#deltaform .header .target.update {
  background-color: lightblue;
}

/*----------------------------------------------------------------------------*/


#deltaform .title {
  border-bottom:    1px solid lightgrey;
  font-size:        12px;
  font-weight:      bold;
  background-color: lightgrey;
  display:          flex;
}

#deltaform .title .current {
  flex:         1;
  border-right: 1px solid white;
  padding-left: 8px;
}

#deltaform .title .target {
  flex:         1;
  padding-left: 8px;
}

/*----------------------------------------------------------------------------*/

#deltaform .subtitle {
  border-bottom:    1px solid lightgrey;
  font-size:        12px;
  font-weight:      bold;
  background-color: white;
  display:          flex;
}

#deltaform .subtitle .current {
  flex:         1;
  border-right: 1px solid lightgrey;
  padding-left: 16px;
}

#deltaform .subtitle .target {
  flex:         1;
  padding-left: 16px;
}

/*----------------------------------------------------------------------------*/

#deltaform .flavors {
}

#deltaform .flavor {
  display:       flex;
  border-bottom: 1px solid lightgrey;
}

#deltaform .flavor .current {
  flex:         1;
  border-right: 1px solid lightgrey;
  padding-left: 24px;
}

#deltaform .flavor .target {
  flex:         1;
  padding-left: 24px;
}

#deltaform .flavor .current.delete {background-color: #f44;}
#deltaform .flavor .target.create  {background-color: lightgreen;}
#deltaform .flavor .target.update  {background-color: lightblue;}

/*----------------------------------------------------------------------------*/

#deltaform .images {
}

#deltaform .image {
  display:       flex;
  border-bottom: 1px solid lightgrey;
}

#deltaform .image .current {
  flex:         1;
  border-right: 1px solid lightgrey;
  padding-left: 24px;
}

#deltaform .image .target {
  flex:         1;
  padding-left: 24px;
}

#deltaform .image .current.delete {background-color: #f44;}
#deltaform .image .target.create  {background-color: lightgreen;}
#deltaform .image .target.update  {background-color: lightblue;}

/*----------------------------------------------------------------------------*/

#deltaform .networks {
}

#deltaform .network {
  display:       flex;
  border-bottom: 1px solid lightgrey;
}

#deltaform .network .current {
  flex:         1;
  border-right: 1px solid lightgrey;
  padding-left: 24px;
}

#deltaform .network .target {
  flex:         1;
  padding-left: 24px;
}

#deltaform .network .current.delete {background-color: #f44;}
#deltaform .network .target.create  {background-color: lightgreen;}
#deltaform .network .target.update  {background-color: lightblue;}

/*----------------------------------------------------------------------------*/

#deltaform .components {
}

#deltaform .component {
  display:       flex;
  border-bottom: 1px solid lightgrey;
}

#deltaform .component .current {
  flex:         1;
  border-right: 1px solid lightgrey;
  padding-left: 24px;
}

#deltaform .component .target {
  flex:         1;
  padding-left: 24px;
}

#deltaform .component .current.delete {background-color: #f44;}
#deltaform .component .target.create  {background-color: lightgreen;}
#deltaform .component .target.update  {background-color: lightblue;}

</style>