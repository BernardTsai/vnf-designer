<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Artefacts</h1>
    <p >
      The VNF Designer presents following page when clicking on the “Export”
      icon in the header region.
    </p>
    <p >
      <img
        :src="require('./images/export.png')"
        alt="Export"
      />
    </p>
    <p >
      Different types of artefacts are created by selecting a different “format”
      from the drop-down box.
    </p>
    <p >
      These artefacts will be displayed in the details region and can either be:
    </p>
    <ul>
      <li>
        copied to the clip-board by clicking on the “copy” icon or
      </li>
      <li>
        downloaded by clicking on the “save” icon.
      </li>
    </ul>
    <p >
      An archive will all artefacts can be downloaded after clicking on the
      “archive” icon and will contain:
    </p>
    <ul>
      <li>
        <strong>Model</strong>: a model describing the VNF in yaml format,
      </li>
      <li>
        <strong>Communication Matrix</strong>: a table in CSV format describing
        the communication patterns between the components,
      </li>
      <li>
        <strong>Environment File</strong>: an environment file for accessing the
        OpenStack tenant and
      </li>
      <li>
        <strong>Scripts/Templates</strong>: for creating and managing the
        virtualised network function.
      </li>
    </ul>
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
