<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Templates_0"></a>Templates
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      The VNF Designer currently supports following jinja templates to render
      artefacts:
    </p>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Template</th>
          <th>Artefact</th>
          <th>Format</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Canonical</strong></td>
          <td>internal model</td>
          <td>yaml</td>
        </tr>
        <tr>
          <td><strong>Communication Matrix</strong></td>
          <td>communication pattern between components</td>
          <td>csv</td>
        </tr>
        <tr>
          <td><strong>VNFds</strong></td>
          <td>VNF descriptor</td>
          <td>json</td>
        </tr>
        <tr>
          <td><strong>NSd</strong></td>
          <td>Network Service descriptor</td>
          <td>json</td>
        </tr>
      </tbody>
    </table>
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
