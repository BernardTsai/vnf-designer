<template>
  <div class="list">
    <componentitem
      :key="component.uuid"
      v-for="component in model.current.components"
      :model="model"
      :view="view"
      :component="component"
    ></componentitem>
  </div>
</template>
<script>
import componentitem from "./componentitem";
export default {
  name: "components",
  props: ["model", "view"],
  components: {
    componentitem
  }
};
</script>
