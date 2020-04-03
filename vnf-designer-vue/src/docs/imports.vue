<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="ImportExport_0"></a>Import/Export
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      To import a model click on the “Import” icon in the header region:
    </p>
    <p class="has-line-data" data-line-start="5" data-line-end="6">
      <img
        :src="require('@/docs/images/overview.png')"
        alt="Overview"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="7" data-line-end="8">
      Then either upload a model by clicking on the “Load” icon or paste the
      contents of a model into the textarea:
    </p>
    <p class="has-line-data" data-line-start="9" data-line-end="10">
      <img
        :src="require('@/docs/images/import.png')"
        alt="Import"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="11" data-line-end="12">
      To finally import the model click on the “Import” icon.
    </p>
    <p class="has-line-data" data-line-start="13" data-line-end="14">
      The VNF Designer will display an error message in the case of any
      validation errors.
    </p>
    <hr />
    <div style="z-index:100; position: fixed; top: 16px; right:16px;">
      <a style="text-decoration: none;" href @click.prevent="swapDoc('usage')"
        >usage</a
      >
    </div>
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
