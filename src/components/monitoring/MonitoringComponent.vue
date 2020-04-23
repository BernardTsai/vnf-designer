<template>
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
          v-for="(componentInterface, subindex) in component.component.componentInterfaces"
          :key="subindex"
          :model="model"
          :view="view"
          :component="component.component"
          :componentInterface="componentInterface"
          :name="name"
          :index="index"
          :subindex="subindex"></monitoring_port>
      </div>
</template>
<script>
import { DX, DY, NET_HEIGHT, CMP_WIDTH, CMP_HEIGHT2 } from '../tenant/TenantConstants'
import monitoring_port from './MonitoringPort'
export default {
    props:   ['model','view','component','name','index'],
    components: {
      monitoring_port
    },
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
    }
}
</script>