<template>
  <div id="tenant_layout" @click="handleClick">
    <div class="vnf">Network Service: {{ model.current.vnf }}</div>
    <div class="tenant">Tenant: {{ model.current.tenant.name }}</div>
    <div class="version">Version: {{ model.current.version }}</div>
    <div class="date">Timestamp: {{ view.now }}</div>
    <tenant_network
      v-for="(network, index) in model.current.networks"
      :key="'network-' + index"
      :model="model"
      :view="view"
      :network="network"
      :index="index"
    ></tenant_network>
    <tenant_network2
      :key="'network-dummy'"
      :model="model"
      :view="view"
    ></tenant_network2>
    <tenant_component
      v-for="(component, index) in model.current.components"
      :key="'component-' + index"
      :model="model"
      :view="view"
      :component="component"
      :index="index"
    ></tenant_component>
    <tenant_component2
      :key="'component-dummy'"
      :model="model"
      :view="view"
    ></tenant_component2>
  </div>
</template>
<script>
import TenantConsts from "./tenantConstants";
import tenant_network from "./tenant_network";
import tenant_network2 from "./tenant_network2";
import tenant_component from "./tenant_component";
import tenant_component2 from "./tenant_component2";
export default {
  name: "tenant",
  props: ["model", "view"],
  components: {
    tenant_network,
    tenant_network2,
    tenant_component,
    tenant_component2
  },
  methods: {
    handleClick: function(e) {
      var element = document.getElementById("tenant_layout");

      var x =
        element.scrollLeft +
        e.pageX -
        TenantConsts.PXOFFSET -
        TenantConsts.XOFFSET;
      var y =
        element.scrollTop +
        e.pageY -
        TenantConsts.PYOFFSET -
        TenantConsts.YOFFSET;

      var net_index = Math.floor(x / TenantConsts.XSLOT);
      var cmp_index = Math.floor(y / TenantConsts.YSLOT);

      // check if click was in the cross-section of a network and a component
      if (
        0 <= net_index &&
        net_index < this.model.current.networks.length &&
        0 <= cmp_index &&
        cmp_index < this.model.current.components.length
      ) {
        // determine network and component
        var net = this.model.current.networks[net_index];
        var cmp = this.model.current.components[cmp_index];

        // delete interface if component has an interface to that network
        var iface = this.model.hasComponentInterface(cmp, net.name);
        if (iface) {
          this.model.delComponentInterface(cmp, iface);
        } else {
          this.model.addComponentInterface(cmp, net.name);
        }
      }
    }
  }
};
</script>
