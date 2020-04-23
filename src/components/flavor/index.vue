<template>
      <div class="list">
        <flavoritem
          :key="flavor.uuid"
          v-for="flavor in model.flavors"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:flavor="flavor"></flavoritem>
      </div>
</template>
<script>
export default {
    props: ['model','view'],
    components: {
      flavoritem: () => import('./flavorItem')
    }
}
</script>