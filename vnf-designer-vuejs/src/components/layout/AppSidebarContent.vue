<template>
      <div id="appnavigation">
        <tenantform
          v-if="view.navigation === 'Tenant'"
          v-bind:model="model"
          v-bind:view="view">
        </tenantform>
        <flavors
          v-if="view.navigation === 'Flavor'"
          v-bind:model="model"
          v-bind:view="view">
        </flavors>
        <images
          v-if="view.navigation === 'Image'"
          v-bind:model="model"
          v-bind:view="view">
        </images>
        <networks
          v-if="view.navigation === 'Network'"
          v-bind:model="model"
          v-bind:view="view">
        </networks>
        <components
          v-if="view.navigation === 'Component'"
          v-bind:model="model"
          v-bind:view="view">
        </components>
      </div>
</template>
<script>
export default {
    props: ['model','view']
}
</script>