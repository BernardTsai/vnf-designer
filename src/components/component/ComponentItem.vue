<template>
    <div class="item">
        <div class="name"   v-on:click="pick(component)"><i class="fas fa-server"/>&nbsp;{{component.name}}</div>
        <div class="button" v-on:click="del(component)"><i class="fas fa-minus"/></div>
    </div>
</template>
<script>
import { deleteComponent } from '../../vnf_modules/model'
export default {
    props:    ['model','view','component'],
    methods:  {
      pick: function(entity) {
        this.view.detail='Component';
        this.view.entity=entity;
      },
      del: function(entity) {
        deleteComponent(entity)
        if ( this.view.detail === 'Component' ) {
          this.view.detail='';
          this.view.entity=null;
        }
      }
    }
}
</script>