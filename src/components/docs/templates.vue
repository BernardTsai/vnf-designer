<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Templates</h1>
    <p>
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
<style scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
th, td {
  text-align: left;
  padding: 16px;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {background-color: #ddd;}
th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(74, 87, 75);
  color: white;
}
</style>