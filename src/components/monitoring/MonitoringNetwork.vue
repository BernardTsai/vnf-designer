<template>
      <div
        :class="'network monitoring_network network' + index"
        :id="'monitoring_network_' + network.name"
        :style="{
          top:         t + 'px',
          left:        l + 'px',
          width:       w + 'px',
          height:      h + 'px'
        }">
        <div class="icon"
          :title="network.name + '\\nipv4: ' + network.ipv4 + '\\nipv6: ' + network.ipv6">
          <i class="fas fa-network-wired"/>
        </div>
        <input v-model="network.name" readonly>
      </div>
</template>
<script>
import { NET_HEIGHT, CMP_WIDTH, DX, NET_WIDTH, DY, CMP_HEIGHT2 } from '../tenant/TenantConstants'
export default {
    props:   ['model','view','network','index'],
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
        var count  = 0

        for (var index in this.model.components) {
          let component = this.model.components[index]
          count += component.max
        }

        return DY + count * (DY+CMP_HEIGHT2);
      }
    }
}
</script>