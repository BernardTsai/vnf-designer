<template>
  <div
    :class="'interface network' + n + ' component' + index"
    :style="{
      top: t + 'px',
      left: l + 'px',
      width: w + 'px',
      height: h + 'px'
    }"
    :title="a"
  >
    <div class="serverport"></div>
    <div class="switchport"></div>
  </div>
</template>
<script>
import TenantConsts from "./tenantConstants";
export default {
  name: "tenant_interface",
  props: ["model", "view", "component", "interface", "index", "subindex"],
  computed: {
    t: function() {
      return (
        ((this.subindex + 1) * TenantConsts.CMP_HEIGHT) /
        (this.component.interfaces.length + 1)
      );
    },
    l: function() {
      return TenantConsts.CMP_WIDTH;
    },
    w: function() {
      for (var i = 0; i < this.model.current.networks.length; i++) {
        if (this.interface.network === this.model.current.networks[i].name) {
          return (
            i * (TenantConsts.DX + TenantConsts.NET_WIDTH) +
            TenantConsts.NET_WIDTH
          );
        }
      }

      return 0;
    },
    h: function() {
      return 1;
    },
    n: function() {
      for (var i = 0; i < this.model.current.networks.length; i++) {
        if (this.interface.network === this.model.current.networks[i].name) {
          return i;
        }
      }

      return 0;
    },
    a: function() {
      return (
        this.interface.network +
        (this.interface.attributes != ""
          ? ": " + this.interface.attributes
          : "")
      );
    }
  }
};
</script>
