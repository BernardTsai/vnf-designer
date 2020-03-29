<template>
  <div class="list">
    <imageitem
      :key="image.uuid"
      v-for="image in model.current.images"
      :model="model"
      :view="view"
      :image="image"
    ></imageitem>
  </div>
</template>
<script>
import imageitem from "./imageitem";
export default {
  name: "images",
  props: ["model", "view"],
  components: {
    imageitem
  }
};
</script>
