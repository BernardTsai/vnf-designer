<template>
  <div>
    <h2 class="code-line" data-line-start="0" data-line-end="2">
      <a id="User_Interface_0"></a>User Interface
    </h2>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      The UI of the VNF Designer is structured into three regions
    </p>
    <p class="has-line-data" data-line-start="5" data-line-end="6">
      <strong>Header</strong>:
    </p>
    <p class="has-line-data" data-line-start="7" data-line-end="8">
      the header region is located at the top of the page and displays a set of
      icons which allow to trigger special functions (e.g. importing/export and
      validating the model etc.).
    </p>
    <p class="has-line-data" data-line-start="9" data-line-end="10">
      <strong>Selector</strong>:
    </p>
    <p class="has-line-data" data-line-start="11" data-line-end="12">
      the selector region is located at the left of the page and provides an
      overview of all the elements needed to describe a VNF. It has tabs at the
      top to distinguish between resources (flavors, images, networks and
      components) and general information. Underneath it either shows tenant
      related parameters or a list of resources of a specific type.
    </p>
    <p class="has-line-data" data-line-start="13" data-line-end="14">
      <strong>Details</strong>:
    </p>
    <p class="has-line-data" data-line-start="15" data-line-end="16">
      this region is located on the right side of the page and shows either:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="17" data-line-end="18">
        the architectural overview of the VNF,
      </li>
      <li class="has-line-data" data-line-start="18" data-line-end="19">
        web-forms to describe resource specific parameters or
      </li>
      <li class="has-line-data" data-line-start="19" data-line-end="21">
        transaction related information (e.g. for importing/exporting a model).
      </li>
    </ul>
    <p class="has-line-data" data-line-start="21" data-line-end="22">
      <img
        :src="require('@/docs/images/ui.png')"
        alt="Graphical User Interface"
        width="50%"
      />
    </p>
    <hr />
    <div style="z-index:100; position: fixed; top: 16px; right:16px;">
      <a style="text-decoration: none;" href @click.prevent="swapDoc('readme')"
        >overview</a
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
