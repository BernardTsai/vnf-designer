<template>
  <div id="appnavigation">
    <tenantform
      v-if="view.navigation === 'Tenant'"
      :model="model"
      :view="view"
    >
    </tenantform>
    <flavors
      v-if="view.navigation === 'Flavor'"
      :model="model"
      :view="view"
    >
    </flavors>
    <images
      v-if="view.navigation === 'Image'"
      :model="model"
      :view="view"
    >
    </images>
    <networks
      v-if="view.navigation === 'Network'"
      :model="model"
      :view="view"
    >
    </networks>
    <components
      v-if="view.navigation === 'Component'"
      :model="model"
      :view="view"
    >
    </components>
  </div>
</template>

<script>
import flavors from "@/components/flavors/flavors";
import tenantform from "@/components/tenant/tenantform";
import images from "@/components/image/images";
import networks from "@/components/network/networks";
import components from "@/components/component/components";
export default {
  name: "appnavigation",
  props: ["model", "view"],
  components: {
    flavors,
    tenantform,
    images,
    networks,
    components
  }
};
</script>
