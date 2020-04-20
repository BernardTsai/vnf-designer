<template>
      <div class="item">
        <div class="name"   v-on:click="pick(image)"><i class="fas fa-hockey-puck"/>&nbsp;{{image.name}}</div>
        <div class="button" v-on:click="del(image)"><i class="fas fa-minus"/></div>
      </div>
</template>
<script>
import { deleteImage } from '../../vnf_modules/model'
export default {
    props:    ['model','view','image'],
    methods:  {
      pick: function(entity) {
        this.view.detail='Image';
        this.view.entity=entity;
      },
      del: function(entity) {
        deleteImage(entity)
        if ( this.view.detail === 'Image' ) {
          this.view.detail='';
          this.view.entity=null;
        }
      }
    }
}
</script>