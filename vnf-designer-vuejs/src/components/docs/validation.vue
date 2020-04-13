<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Validation</h1>
    <p>
      Validating the model is achieved by simply clicking on the “Validate” icon
      in the header region.
    </p>
    <p>
      <img
        :src="require('./images/validate.png')"
        alt="Validate"
      />
    </p>
    <p>
      The VNF designer will try to focus on the location of any perceived
      inconsistency.
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
