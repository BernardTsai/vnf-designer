<template>
  <div id="appdetail">
    <flavorform
      v-if="view.detail === 'Flavor'"
      :model="model"
      :view="view"
      :flavor="view.entity"
    ></flavorform>
    <imageform
      v-if="view.detail === 'Image'"
      :model="model"
      :view="view"
      :image="view.entity"
    ></imageform>
    <networkform
      v-if="view.detail === 'Network'"
      :model="model"
      :view="view"
      :network="view.entity"
    ></networkform>
    <componentform
      v-if="view.detail === 'Component'"
      :model="model"
      :component="view.entity"
    ></componentform>
    <exportform
      v-if="view.detail === 'Export'"
      :model="model"
      :view="view"
      :templates="templates"
    ></exportform>
    <importform
      v-if="view.detail === 'Import'"
      :model="model"
      :view="view"
    ></importform>
    <tenant
      v-if="view.detail === 'Tenant'"
      :model="model"
      :view="view"
    ></tenant>
  </div>
</template>
<script>
import tenant from "./tenant/tenant";
import flavorform from "./flavors/flavorform";
import imageform from "./image/imageform";
import networkform from "./network/networkform";
import componentform from "./component/componentform";
import exportform from "./export/exportform";
import importform from "./import/importform";

export default {
  name: "appdetail",
  props: ["model", "current", "target", "view", "templates"],
  components: {
    flavorform,
    imageform,
    networkform,
    componentform,
    tenant,
    exportform,
    importform
  }
};
</script>
