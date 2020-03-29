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
        <label @click="addFlavorAttribute()"><i class="fas fa-plus-circle"/></label>
      </div>
      <div class="line" v-for="(special,index) in flavor.special">
        <input :id="'special_' + index + 'key'"   :name="'special_' + index + 'key'"   v-model="special.key"   required>
        <input :id="'special_' + index + 'value'" :name="'special_' + index + 'value'" v-model="special.value" required>
        <label @click="delFlavorAttribute(special)"><i class="fas fa-minus-circle"/></label>
      </div>

    </div>
</template>
<script>
export default {
    name: "flavorform",
    props:    ['model','view','flavor'],
    methods: {
      addFlavorAttribute: function()          { this.model.addFlavorAttribute(this.flavor); },
      delFlavorAttribute: function(attribute) { this.model.delFlavorAttribute(this.flavor,attribute); }
    }
}
</script>