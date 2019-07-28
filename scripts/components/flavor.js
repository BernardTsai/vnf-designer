Vue.component(
  'flavoritem',
  {
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
    },
    template: `
      <div class="item">
        <div class="name"   v-on:click="pick(flavor)"><i class="fas fa-microchip"/>&nbsp;{{flavor.name}}</div>
        <div class="button" v-on:click="del(flavor)"><i class="fas fa-minus"/></div>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component(
  'flavors',
  {
    props:    ['model','view'],
    template: `
      <div class="list">
        <flavoritem
          :key="flavor.uuid"
          v-for="flavor in model.flavors"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:flavor="flavor"></flavoritem>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component(
  'flavorform',
  {
    props:    ['model','view','flavor'],
    methods: {
      addFlavorAttribute: function()          { addFlavorAttribute(this.flavor); },
      delFlavorAttribute: function(attribute) { delFlavorAttribute(this.flavor,attribute); }
    },
    template: `
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

    </div>`
  }
)
