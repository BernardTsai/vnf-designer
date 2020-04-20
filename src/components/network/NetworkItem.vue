<template>
      <div class="item">
        <div class="name"   v-on:click="pick(network)"><i class="fas fa-cloud"/>&nbsp;{{network.name}}</div>
        <div class="button" v-on:click="del(network)"><i class="fas fa-minus"/></div>
      </div>
</template>
<script>
import { deleteNetwork } from '../../vnf_modules/model'
export default {
    props:    ['model','view','network'],
    methods:  {
      pick: function(entity) {
        this.view.detail='Network';
        this.view.entity=entity;
      },
      del: function(entity) {
        deleteNetwork(entity)
        if ( this.view.detail === 'Network' ) {
          this.view.detail='';
          this.view.entity=null;
        }
      }
    }
}
</script>