<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Artefacts_0"></a>Artefacts
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      The VNF Designer presents following page when clicking on the “Export”
      icon in the header region.
    </p>
    <p class="has-line-data" data-line-start="5" data-line-end="6">
      <img
        :src="require('@/docs/images/export.png')"
        alt="Export"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="7" data-line-end="8">
      Different types of artefacts are created by selecting a different “format”
      from the drop-down box.
    </p>
    <p class="has-line-data" data-line-start="9" data-line-end="10">
      These artefacts will be displayed in the details region and can either be:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="11" data-line-end="12">
        copied to the clip-board by clicking on the “copy” icon or
      </li>
      <li class="has-line-data" data-line-start="12" data-line-end="14">
        downloaded by clicking on the “save” icon.
      </li>
    </ul>
    <p class="has-line-data" data-line-start="14" data-line-end="15">
      An archive will all artefacts can be downloaded after clicking on the
      “archive” icon and will contain:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="16" data-line-end="17">
        <strong>Model</strong>: a model describing the VNF in yaml format,
      </li>
      <li class="has-line-data" data-line-start="17" data-line-end="18">
        <strong>Communication Matrix</strong>: a table in CSV format describing
        the communication patterns between the components,
      </li>
      <li class="has-line-data" data-line-start="18" data-line-end="19">
        <strong>Environment File</strong>: an environment file for accessing the
        OpenStack tenant and
      </li>
      <li class="has-line-data" data-line-start="19" data-line-end="21">
        <strong>Scripts/Templates</strong>: for creating and managing the
        virtualised network function.
      </li>
    </ul>
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
