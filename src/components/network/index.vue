<template>
      <div class="list">
        <networkitem
          :key="network.uuid"
          v-for="network in model.networks"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:network="network"></networkitem>
      </div>
</template>
<script>
export default {
    props: ['model','view'],
    components: {
      networkitem: () => import('./NetworkItem')
    }
}
</script>