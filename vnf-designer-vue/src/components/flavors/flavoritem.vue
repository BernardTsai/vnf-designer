<template>
  <div class="item">
    <div class="name" @click="pick(flavor)">
      <i class="fas fa-microchip" />&nbsp;{{ flavor.name }}
    </div>
    <div class="button" @click="del(flavor)">
      <i class="fas fa-minus" />
    </div>
  </div>
</template>
<script>
export default {
  name: "flavoritem",
  props: ["model", "view", "flavor"],
  methods: {
    pick: function(entity) {
      this.view.detail = "Flavor";
      this.view.entity = entity;
    },
    del: function(entity) {
      this.model.deleteFlavor(entity);
      if (this.view.detail === "Flavor") {
        this.view.detail = "";
        this.view.entity = null;
      }
    }
  }
};
</script>
