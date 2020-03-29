<template>
      <div
        class="network dummy"
        @click="handleClick"
        v-bind:style="{
          top:         t + 'px',
          left:        l + 'px',
          width:       w + 'px',
          height:      h + 'px'
        }">
        <div class="icon">
          <i class="fas fa-network-wired"/>
        </div>
        <input class='label' value='new' readonly></div>
      </div>
</template>
<script>
import TenantConsts from "./tenantConstants";
export default {
    name: "tenant_network2",
    props:   ['model','view'],
    methods: {
      handleClick: function() {this.model.addNetwork()}
    },
    computed: {
      t: function(index) {
        return TenantConsts.NET_HEIGHT;
      },
      l: function(index) {
        return TenantConsts.CMP_WIDTH + (this.model.current.networks.length+1) * (TenantConsts.DX+TenantConsts.NET_WIDTH) - 1;
      },
      w: function(index) {
        return TenantConsts.NET_WIDTH;
      },
      h: function(index) {
        return TenantConsts.DY + this.model.current.components.length * (TenantConsts.DY+TenantConsts.CMP_HEIGHT);
      }
    }
}
</script>