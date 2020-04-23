<template>
<div id="flavorform">
      <div class="header">Flavor: {{flavor.name}}</div>

      <div class="line">
        <label for="name">Name:</label>
        <input v-model="flavor.name" id="name" name="name" required>
      </div>
      <div class="line">
        <label for="vcpu">vCPU:</label>
        <input v-model.number="flavor.vcpu" id="vcpu" name="vcpu" type="number" required>
      </div>
      <div class="line">
        <label for="ram">RAM:</label>
        <input v-model.number="flavor.ram" id="ram" name="ram" type="number" required>
      </div>
      <div class="line">
        <label for="disk">Disk:</label>
        <input v-model.number="flavor.disk" id="disk" name="disk" type="number" required>
      </div>
      <div class="line">
        <label for="public">Public:</label>
        <select id="public" name="public" v-model="flavor.public" required>
          <option disabled value="">Please select one</option>
          <option value="true">true</option>
          <option value="false">false</option>
          </option>
        </select>
      </div>

      <div class="subheader">Special Attributes:</div>

      <div class="line">
        <label class="top">Attribute:</label>
        <label class="top">Value:</label>
        <label v-on:click="addFlavorAttribute()"><i class="fas fa-plus-circle"/></label>
      </div>
      <div class="line" v-for="(special,index) in flavor.special">
        <input v-bind:id="'special_' + index + 'key'"   v-bind:name="'special_' + index + 'key'"   v-model="special.key"   required>
        <input v-bind:id="'special_' + index + 'value'" v-bind:name="'special_' + index + 'value'" v-model="special.value" required>
        <label v-on:click="delFlavorAttribute(special)"><i class="fas fa-minus-circle"/></label>
      </div>

    </div>
</template>
<script>
import { addFlavorAttribute, delFlavorAttribute } from '../../vnf_modules/model'
export default {
    props:    ['model','view','flavor'],
    methods: {
      addFlavorAttribute: function()          { addFlavorAttribute(this.flavor); },
      delFlavorAttribute: function(attribute) { delFlavorAttribute(this.flavor,attribute); }
    }
}
</script>
<style scoped>
#flavorform {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      0px;
  bottom:   0px;
  padding:  8px;

  overflow-y: scroll;
}

#flavorform .header {
  font-size:   20px;
  font-weight: bold;
}

#flavorform .subheader {
  font-size:   14px;
  font-weight: bolder;
  padding-top: 24px;
  padding-left: 8px;
}

#flavorform .line {
  padding-top: 8px;
  padding-left: 24px;
}

#flavorform .line label {
  display:     inline-block;
  width:       64px;
  font-weight: bold;
}

#flavorform .line label.top {
  width:       200px;
}


#flavorform .line input {
  display:     inline-block;
  width:       200px;
}

#flavorform .line select {
  display:     inline-block;
  width:       200px;
}

</style>