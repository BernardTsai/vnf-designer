Vue.component(
  'imageitem',
  {
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
    },
    template: `
      <div class="item">
        <div class="name"   v-on:click="pick(image)"><i class="fas fa-hockey-puck"/>&nbsp;{{image.name}}</div>
        <div class="button" v-on:click="del(image)"><i class="fas fa-minus"/></div>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component(
  'images',
  {
    props:    ['model','view'],
    template: `
      <div class="list">
        <imageitem
          :key="image.uuid"
          v-for="image in model.images"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:image="image"></imageitem>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component(
  'imageform',
  {
    props:    ['model','view','image'],
    computed: {
      container_formats: function() {
        return ['aki','ami','ari','bare','docker','ova','ovf']
      },
      disk_formats: function() {
        return ['aki','ami','ari','iso','qcow2','raw','vdi','vhd','vhdx','vmdk']
      }
    },
    template: `
    <div id="imageform">
      <div class="header">Image: {{image.name}}</div>

      <div class="line">
        <label for="name">Name:</label>
        <input v-model="image.name" id="name" name="name" required>
      </div>
      <div class="line">
        <label for="name">Version:</label>
        <input v-model="image.version" id="version" name="version" required>
      </div>
      <div class="line">
        <label for="format">Format:</label>
        <select id="disk" name="format" v-model="image.format" v-bind:class="{valid: disk_formats.includes(image.format)}" required>
          <option disabled value="">Please select one</option>
          <option v-for="format in disk_formats" v-bind:value="format">
            {{ format }}
          </option>
        </select>
      </div>
      <div class="line">
        <label for="name">Container:</label>
        <select id="container" name="container" v-model="image.container" v-bind:class="{valid: container_formats.includes(image.container)}" required>
          <option disabled value="">Please select one</option>
          <option v-for="format in container_formats" v-bind:value="format">
            {{ format }}
          </option>
        </select>
      </div>
      <div class="line">
        <label for="name">Min. Disk:</label>
        <input v-model="image.disk" id="disk" name="disk" required>
      </div>
      <div class="line">
        <label for="name">Size:</label>
        <input v-model="image.size" id="size" name="size" required>
      </div>
      <div class="line">
        <label for="name">URL:</label>
        <input v-model="image.url" id="url" name="url" required>
      </div>
      <div class="line">
        <label for="name">Checksum:</label>
        <input v-model="image.checksum" id="checksum" name="checksum" required>
      </div>
      <div class="line">
        <label for="name">Attributes:</label>
        <input v-model="image.special" id="special" name="special" required>
      </div>
    </div>`
  }
)
