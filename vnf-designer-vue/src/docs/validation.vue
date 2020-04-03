<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Validation_0"></a>Validation
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      Validating the model is achieved by simply clicking on the “Validate” icon
      in the header region.
    </p>
    <p class="has-line-data" data-line-start="5" data-line-end="6">
      <img
        :src="require('@/docs/images/validate.png')"
        alt="Validate"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="7" data-line-end="8">
      The VNF designer will try to focus on the location of any perceived
      inconsistency.
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
