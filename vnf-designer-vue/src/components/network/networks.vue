<template>
  <div class="list">
    <networkitem
      :key="network.uuid"
      v-for="network in model.current.networks"
      :model="model"
      :view="view"
      :network="network"
    ></networkitem>
  </div>
</template>
<script>
import networkitem from "./networkitem";

export default {
  name: "networks",
  props: ["model", "view"],
  components: {
    networkitem
  }
};
</script>
