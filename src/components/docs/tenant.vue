<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Tenant</h1>
    <p >
      A tenant represents a pool of virtual compute, storage and network
      resources for a virtualised network function.
    </p>
    <h2>Editing a Tenant</h2>
    <p >
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p >
      <img
        :src="require('./images/overview.png')"
        alt="Overview"
      />
    </p>
    <p >
      The web-form for the tenant will be presented in the selector region on
      the left side of the page and will allow to:
    </p>
    <ul>
      <li>
        specify the name of the VNF,
      </li>
      <li>
        specify the version of the VNF,
      </li>
      <li>
        specify the name of the tenant,
      </li>
      <li>
        specify the username for accessing the tenant,
      </li>
      <li>
        specify the password for accessing the tenant,
      </li>
      <li>
        specify the URL for accessing the Blue Planet API,
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
