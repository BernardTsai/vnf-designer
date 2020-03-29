<template>
  <div class="item">
    <div class="name" @click="pick(image)">
      <i class="fas fa-hockey-puck" />&nbsp;{{ image.name }}
    </div>
    <div class="button" @click="del(image)"><i class="fas fa-minus" /></div>
  </div>
</template>
<script>
export default {
  name: "imageitem",
  props: ["model", "view", "image"],
  methods: {
    pick: function(entity) {
      this.view.detail = "Image";
      this.view.entity = entity;
    },
    del: function(entity) {
      this.model.deleteImage(entity);
      if (this.view.detail === "Image") {
        this.view.detail = "";
        this.view.entity = null;
      }
    }
  }
};
</script>
