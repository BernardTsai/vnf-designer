<template>
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
    </div>
</template>
<script>
export default {
    props:    ['model','view','image'],
    computed: {
      container_formats: function() {
        return ['aki','ami','ari','bare','docker','ova','ovf']
      },
      disk_formats: function() {
        return ['aki','ami','ari','iso','qcow2','raw','vdi','vhd','vhdx','vmdk']
      }
    }
}
</script>
<style scoped>
#imageform {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      0px;
  bottom:   0px;
  padding:  8px;

  overflow-y: scroll;
}

#imageform .header {
  font-size:   20px;
  font-weight: bold;
}

#imageform .subheader {
  font-size:   14px;
  font-weight: bolder;
  padding-top: 24px;
  padding-left: 8px;
}

#imageform .line {
  padding-top: 8px;
  padding-left: 24px;
}

#imageform .line label {
  display:     inline-block;
  width:       64px;
  font-weight: bold;
}

#imageform .line label.top {
  width:       200px;
}


#imageform .line input {
  display:     inline-block;
  width:       200px;
}

#imageform .line select {
  display:     inline-block;
  width:       200px;
}

</style>