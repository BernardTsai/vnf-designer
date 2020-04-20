<template>
      <div
        v-bind:class="'network network' + index"
        v-bind:style="{
          top:         t + 'px',
          left:        l + 'px',
          width:       w + 'px',
          height:      h + 'px'
        }">
        <div class="icon"
          @click="viewNetwork"
          :title="network.name + '\\nipv4: ' + network.ipv4 + '\\nipv6: ' + network.ipv6">
          <i class="fas fa-network-wired"/>
        </div>
        <input v-model="network.name" v-on:change="handleChange">
      </div>
</template>
<script>
import {NET_HEIGHT, CMP_WIDTH, DY, DX, NET_WIDTH, CMP_HEIGHT} from './TenantConstants'
import { deleteNetwork } from '../../vnf_modules/model'
export default {
    props:   ['model','view','network','index'],
    methods: {
      handleChange: function(e) {
        if (e.target.value==="") {deleteNetwork(this.network)}
      },
      viewNetwork: function(e) {
        this.view.navigation = "Network"
        this.view.detail='Network';
        this.view.entity=this.network;
        return false;
      }
    },
    computed: {
      t: function(index) {
        return NET_HEIGHT;
      },
      l: function(index) {
        return CMP_WIDTH + (this.index+1) * (DX+NET_WIDTH) - 1;
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