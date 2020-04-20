<template>
      <div class="item">
        <div class="name"   v-on:click="pick(flavor)"><i class="fas fa-microchip"/>&nbsp;{{flavor.name}}</div>
        <div class="button" v-on:click="del(flavor)"><i class="fas fa-minus"/></div>
      </div>
</template>
<script>
import { deleteFlavor } from '../../vnf_modules/model'
export default {
    props:    ['model','view','flavor'],
    methods:  {
      pick: function(entity) {
        this.view.detail='Flavor';
        this.view.entity=entity;
      },
      del: function(entity) {
        deleteFlavor(entity)
        if ( this.view.detail === 'Flavor' ) {
          this.view.detail='';
          this.view.entity=null;
        }
      }
    }
}
</script>