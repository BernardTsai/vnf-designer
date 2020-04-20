<template>
      <div class="list">
        <componentitem
          :key="component.uuid"
          v-for="component in model.components"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:component="component"></componentitem>
      </div>
</template>
<script>
export default {
    props:    ['model','view'],
    components: {
        componentitem: () => import('./ComponentItem')
    }
}
</script>