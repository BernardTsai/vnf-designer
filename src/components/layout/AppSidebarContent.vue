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
    props: ['model','view'],
    components: {
      tenantform: () => import('../tenant/TenantForm'),
      flavors: () => import('../flavor/index'),
      images: () => import('../image/index'),
      networks: () => import('../network/index'),
      components: () => import('../component/index')
    }
}
</script>
<style>
#appnavigation {
  position:    absolute;
  left:        0px;
  width:       320px;
  bottom:      0px;
  top:         56px;
  overflow-y:  auto;
  overflow-x:  hidden;

  border-right: 1px solid grey;
  min-height:   544px;

  background-color: #eee;
}
#appnavigation > div {
  position:         absolute;
  left:             0px;
  right:            0px;
  top:              0px;
  bottom:           0px;
  background-color: lightgrey;
}

#appnavigation .list .item {
  display:       flex;
  width:         auto;
  padding-left:  8px;
  height:        32px;
  line-height:   32px;
  border-bottom: 1px solid grey;
}

#appnavigation .list .item:hover {
  background-color: lightblue;
}

#appnavigation .list .item .name {
  flex:          1;
  height:        32px;
  line-height:   32px;
  text-overflow: ellipsis;
  overflow:      hidden;
  white-space:   nowrap;
}

#appnavigation .list .item .button {
  float:            right;
  margin-top:       8px;
  margin-right:     4px;
  height:           16px;
  width:            16px;
  font-size:        8px;
  line-height:      16px;
  background-color: darkgrey;
  border:           none;
  border-radius:    8px;
  vertical-align:   middle;
  text-align:       center;
}

#appnavigation .list .item .button:hover {
  background-color: darkgrey;
  color:            white;
}
</style>