<template>
  <div
    :class="'component index' + index"
    :style="{
      top: t + 'px',
      left: l + 'px',
      width: w + 'px',
      height: h + 'px'
    }"
  >
    <div :class="'zone zone-' + z">
      <select v-model="component.placement">
        <option disabled value="">Please select one</option>
        <option v-for="zone in zones" :value="zone.name">
          {{ zone.tag }}
        </option>
      </select>
    </div>
    <div class="name">
      <input v-model="component.name" @change="handleChange" />
    </div>
    <div
      class="sizing"
      v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'"
    >
      ({{ component.min }}/{{ component.size }}/{{ component.max }})
    </div>
    <div class="icon" @click="viewComponent"><i class="fas fa-server" /></div>
    <tenant_interface
      v-for="(componentInterface, subindex) in component.interfaces"
      :key="subindex"
      :model="model"
      :view="view"
      :component="component"
      :interface="componentInterface"
      :index="index"
      :subindex="subindex"
    ></tenant_interface>
  </div>
</template>
<script>
import TenantConsts from "./tenantConstants";
import tenant_interface from "./tenant_interface";
export default {
  name: "tenant_component",
  props: ["model", "view", "component", "index"],
  components: {
    tenant_interface
  },
  methods: {
    handleChange: function(e) {
      if (e.target.value === "") {
        this.model.deleteComponent(this.component);
      }
    },
    viewComponent: function(e) {
      this.view.navigation = "Component";
      this.view.detail = "Component";
      this.view.entity = this.component;
    }
  },
  computed: {
    t: function() {
      return (
        TenantConsts.DY +
        TenantConsts.NET_HEIGHT +
        this.index * (TenantConsts.DY + TenantConsts.CMP_HEIGHT)
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
    },
    z: function() {
      return this.component.placement.substr(0, 1).toUpperCase();
    },
    zones: function() {
      return [
        { name: "OTHER", tag: "O" },
        { name: "EXT", tag: "E" },
        { name: "INT", tag: "I" },
        { name: "MGMT", tag: "M" },
        { name: "ROUTER", tag: "R" }
      ];
    }
  }
};
</script>
