<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Export</h1>
    <p >
      To export the model click on the “Export” icon in the header region:
    </p>
    <p >
      <img
        :src="require('./images/overview.png')"
        alt="Overview"
      />
    </p>
    <p >
      Select the “Canonical” format in the export page:
    </p>
    <p >
      <img
        :src="require('./images/export.png')"
        alt="Export"
      />
    </p>
    <p >
      The model will copied to the clipboard when clicking on the “Copy” icon
      and can be downloaded when clicking on the “Save” icon.
    </p>
    <hr />
  </div>
</template>
<script>
export default {
  methods: {
    swapDoc(docname) {
      this.$emit("swapDoc", docname);
    }
  }
};
</script>
