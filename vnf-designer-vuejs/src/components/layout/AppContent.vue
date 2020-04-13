<template>
      <div id="appdetail">
        <flavorform
          v-if="view.detail === 'Flavor'"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:flavor="view.entity">
        </flavorform>
        <imageform
          v-if="view.detail === 'Image'"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:image="view.entity">
        </imageform>
        <networkform
          v-if="view.detail === 'Network'"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:network="view.entity">
        </networkform>
        <componentform
          v-if="view.detail === 'Component'"
          v-bind:model="model"
          v-bind:component="view.entity">
        </componentform>
        <exportform
          v-if="view.detail === 'Export'"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:templates="templates">
        </exportform>
        <importform
          v-if="view.detail === 'Import'"
          v-bind:model="model"
          v-bind:view="view">
        </importform>
        <deltaform
          v-if="view.detail === 'Delta'"
          v-bind:model="model"
          v-bind:current="current"
          v-bind:target="target"
          v-bind:view="view">
        </deltaform>
        <tenant
          v-if="view.detail === 'Tenant'"
          v-bind:model="model"
          v-bind:view="view">
        </tenant>
        <monitoring
          v-if="view.detail === 'Monitoring'"
          v-bind:model="model"
          v-bind:view="view">
        </monitoring>
      </div>
</template>
<script>
export default {
    props: ['model','current','target','view','templates'],
}
</script>
