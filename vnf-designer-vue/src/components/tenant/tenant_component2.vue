<template>
  <div
    class="component dummy"
    @click="handleClick"
    :style="{
      top: t + 'px',
      left: l + 'px',
      width: w + 'px',
      height: h + 'px'
    }"
  >
    <div class="'zone zone-O'"></div>
    <div class="icon"><i class="fas fa-server" /></div>
    <div class="name">new component</div>
    <div class="sizing"></div>
  </div>
</template>
<script>
import TenantConsts from "./tenantConstants";
export default {
  name: "tenant_component2",
  props: ["model", "view"],
  methods: {
    handleClick: function() {
      this.model.addComponent();
    }
  },
  computed: {
    t: function() {
      return (
        TenantConsts.DY +
        TenantConsts.NET_HEIGHT +
        this.model.current.components.length *
          (TenantConsts.DY + TenantConsts.CMP_HEIGHT)
      );
    },
    l: function() {
      return TenantConsts.DX;
    },
    w: function() {
      return TenantConsts.CMP_WIDTH;
    },
    h: function() {
      return TenantConsts.CMP_HEIGHT;
    }
  }
};
</script>
