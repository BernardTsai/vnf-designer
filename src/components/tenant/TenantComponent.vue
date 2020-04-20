<template>
<div
        v-bind:class="'component index' + index"
        v-bind:style="{
          top:    t + 'px',
          left:   l + 'px',
          width:  w + 'px',
          height: h + 'px'
        }">
        <div v-bind:class="'zone zone-' + z">
          <select v-model="component.placement">
            <option disabled value="">Please select one</option>
            <option v-for="zone in zones" v-bind:value="zone.name">
              {{ zone.tag }}
            </option>
          </select>
        </div>
        <div class="name"><input v-model="component.name" v-on:change="handleChange"></div>
        <div class="sizing" v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'">({{component.min}}/{{component.size}}/{{component.max}})</div>
        <div class="icon" @click="viewComponent"><i class="fas fa-server"/></div>
        <tenant_interface
          v-for="(componentInterface, subindex) in component.componentInterfaces"
          :key="subindex"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:component="component"
          v-bind:componentInterface="componentInterface"
          v-bind:index="index"
          v-bind:subindex="subindex"></tenant_interface>
      </div>
</template>
<script>
import {NET_HEIGHT, CMP_WIDTH, DY, DX, CMP_HEIGHT} from './TenantConstants'
import { deleteComponent } from '../../vnf_modules/model'
import tenant_interface from './TenantInterface'
export default {
    props:   ['model','view','component','index'],
    methods: {
      handleChange: function(e) {
        if (e.target.value==="") {
          deleteComponent(this.component)
        }
      },
      viewComponent: function(e) {
        this.view.navigation = "Component"
        this.view.detail='Component';
        this.view.entity=this.component;
      }
    },
    components: {
      tenant_interface
    },
    computed: {
      t: function() {
        return DY+NET_HEIGHT + this.index * (DY+CMP_HEIGHT);
      },
      l: function() {
        return DX
      },
      w: function() {
        return CMP_WIDTH
      },
      h: function() {
        return CMP_HEIGHT
      },
      z: function() {
        return this.component.placement.substr(0,1).toUpperCase();
      },
      zones: function() {
        return [{name: "OTHER", tag: 'O'}, {name: "EXT", tag: 'E'}, {name: "INT", tag: 'I'}, {name: "MGMT", tag: 'M'}, {name: "ROUTER", tag: 'R'}]
      }
    }
}
</script>