<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href  @click.prevent="swapDoc('readme')">overview</a>
      </h4>
    </nav>
    <h2>User Interface</h2>
    <p >
      The UI of the VNF Designer is structured into three regions
    </p>
    <p >
      <strong>Header</strong>:
    </p>
    <p >
      the header region is located at the top of the page and displays a set of
      icons which allow to trigger special functions (e.g. importing/export and
      validating the model etc.).
    </p>
    <p >
      <strong>Selector</strong>:
    </p>
    <p >
      the selector region is located at the left of the page and provides an
      overview of all the elements needed to describe a VNF. It has tabs at the
      top to distinguish between resources (flavors, images, networks and
      components) and general information. Underneath it either shows tenant
      related parameters or a list of resources of a specific type.
    </p>
    <p >
      <strong>Details</strong>:
    </p>
    <p >
      this region is located on the right side of the page and shows either:
    </p>
    <ul>
      <li>
        the architectural overview of the VNF,
      </li>
      <li>
        web-forms to describe resource specific parameters or
      </li>
      <li>
        transaction related information (e.g. for importing/exporting a model).
      </li>
    </ul>
    <p >
      <img
        :src="require('./images/ui.png')"
        alt="Graphical User Interface"
      />
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
