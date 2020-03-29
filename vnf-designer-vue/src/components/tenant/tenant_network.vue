<template>
  <div
    v-bind:class="'network network' + index"
    v-bind:style="{
      top: t + 'px',
      left: l + 'px',
      width: w + 'px',
      height: h + 'px'
    }"
  >
    <div
      class="icon"
      @click="viewNetwork"
      :title="
        network.name + '\\nipv4: ' + network.ipv4 + '\\nipv6: ' + network.ipv6
      "
    >
      <i class="fas fa-network-wired" />
    </div>
    <input v-model="network.name" @change="handleChange" />
  </div>
</template>
<script>
import TenantConsts from "./tenantConstants";

export default {
  name: "tenant_network",
  props: ["model", "view", "network", "index"],
  methods: {
    handleChange: function(e) {
      if (e.target.value === "") {
        this.model.deleteNetwork(this.network);
      }
    },
    viewNetwork: function(e) {
      this.view.navigation = "Network";
      this.view.detail = "Network";
      this.view.entity = this.network;
      return false;
    }
  },
  computed: {
    t: function(index) {
      return TenantConsts.NET_HEIGHT;
    },
    l: function(index) {
      return (
        TenantConsts.CMP_WIDTH +
        (this.index + 1) * (TenantConsts.DX + TenantConsts.NET_WIDTH) -
        1
      );
    },
    w: function(index) {
      return TenantConsts.NET_WIDTH;
    },
    h: function(index) {
      return (
        TenantConsts.DY +
        this.model.current.components.length *
          (TenantConsts.DY + TenantConsts.CMP_HEIGHT)
      );
    }
  }
};
</script>
