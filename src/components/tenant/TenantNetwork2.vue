<template>
      <div
        class="network dummy"
        v-on:click="handleClick"
        v-bind:style="{
          top:         t + 'px',
          left:        l + 'px',
          width:       w + 'px',
          height:      h + 'px'
        }">
        <div class="icon">
          <i class="fas fa-network-wired"/>
        </div>
        <input class='label' value='new' readonly>
    </div>
</template>
<script>
import {NET_HEIGHT, CMP_WIDTH, DY, DX, NET_WIDTH, CMP_HEIGHT} from './TenantConstants'
import { addNetwork } from '../../vnf_modules/model'
export default {
    props:   ['model','view'],
    methods: {
      handleClick: function() {addNetwork()}
    },
    computed: {
      t: function(index) {
        return NET_HEIGHT;
      },
      l: function(index) {
        return CMP_WIDTH + (this.model.networks.length+1) * (DX+NET_WIDTH) - 1;
      },
      w: function(index) {
        return NET_WIDTH;
      },
      h: function(index) {
        return DY + this.model.components.length * (DY+CMP_HEIGHT);
      }
    }
}
</script>