<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Tenant_0"></a>Tenant
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      A tenant represents a pool of virtual compute, storage and network
      resources for a virtualised network function.
    </p>
    <h2 class="code-line" data-line-start="5" data-line-end="7">
      <a id="Editing_a_Tenant_5"></a>Editing a Tenant
    </h2>
    <p class="has-line-data" data-line-start="8" data-line-end="9">
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p class="has-line-data" data-line-start="10" data-line-end="11">
      <img
        :src="require('@/docs/images/overview.png')"
        alt="Overview"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="12" data-line-end="13">
      The web-form for the tenant will be presented in the selector region on
      the left side of the page and will allow to:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="14" data-line-end="15">
        specify the name of the VNF,
      </li>
      <li class="has-line-data" data-line-start="15" data-line-end="16">
        specify the version of the VNF,
      </li>
      <li class="has-line-data" data-line-start="16" data-line-end="17">
        specify the name of the tenant,
      </li>
      <li class="has-line-data" data-line-start="17" data-line-end="18">
        specify the username for accessing the tenant,
      </li>
      <li class="has-line-data" data-line-start="18" data-line-end="19">
        specify the password for accessing the tenant,
      </li>
      <li class="has-line-data" data-line-start="19" data-line-end="21">
        specify the URL for accessing the Blue Planet API,
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
