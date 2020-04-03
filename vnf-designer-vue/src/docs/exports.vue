<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Export_0"></a>Export
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      To export the model click on the “Export” icon in the header region:
    </p>
    <p class="has-line-data" data-line-start="5" data-line-end="6">
      <img
        :src="require('@/docs/images/overview.png')"
        alt="Overview"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="7" data-line-end="8">
      Select the “Canonical” format in the export page:
    </p>
    <p class="has-line-data" data-line-start="9" data-line-end="10">
      <img
        :src="require('@/docs/images/export.png')"
        alt="Export"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="11" data-line-end="12">
      The model will copied to the clipboard when clicking on the “Copy” icon
      and can be downloaded when clicking on the “Save” icon.
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
