<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Import/Export</h1>
    <p >
      To import a model click on the “Import” icon in the header region:
    </p>
    <p >
      <img
        :src="require('./images/overview.png')"
        alt="Overview"
      />
    </p>
    <p >
      Then either upload a model by clicking on the “Load” icon or paste the
      contents of a model into the textarea:
    </p>
    <p >
      <img
        :src="require('./images/import.png')"
        alt="Import"
      />
    </p>
    <p >
      To finally import the model click on the “Import” icon.
    </p>
    <p >
      The VNF Designer will display an error message in the case of any
      validation errors.
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
