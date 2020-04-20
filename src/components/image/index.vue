<template>
      <div class="list">
        <imageitem
          :key="image.uuid"
          v-for="image in model.images"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:image="image"></imageitem>
      </div>
</template>
<script>
export default {
    props: ['model','view'],
    components: {
      imageitem: () => import('./imageItem')
    }
}
</script>