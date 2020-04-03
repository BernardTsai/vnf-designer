<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Usage_0"></a>Usage
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      It is assumed that a DevOps team (possibly with the support of a VNF
      supplier) is knowledgeable of the architecture of the VNF and its network
      design but may have to consult experts from the partner systems which
      interact with the VNF.
    </p>
    <p class="has-line-data" data-line-start="5" data-line-end="6">
      The following process allows such a DevOps team to design virtualised
      network functions in a simple way:
    </p>
    <ol>
      <li class="has-line-data" data-line-start="7" data-line-end="8">
        <strong
          ><a href @click.prevent="swapDoc('architecture')"
            >Architecture</a
          ></strong
        >: Identify all systems and users (components) which are either part of
        the VNF or which will interact with it. In addition identify all
        separate communication channels (networks) via which these components
        will interact.
      </li>
      <li class="has-line-data" data-line-start="8" data-line-end="9">
        <strong><a href @click.prevent="swapDoc('flavors')">Flavors</a></strong
        >: Define the dimensions of the virtual machines.
      </li>
      <li class="has-line-data" data-line-start="9" data-line-end="10">
        <strong><a href @click.prevent="swapDoc('images')">Images</a></strong
        >: Define the required operating systems possibly including application
        specific packages and configurations.
      </li>
      <li class="has-line-data" data-line-start="10" data-line-end="11">
        <strong
          ><a href @click.prevent="swapDoc('networks')">Networks</a></strong
        >: Define the details of each network.
      </li>
      <li class="has-line-data" data-line-start="11" data-line-end="12">
        <strong
          ><a href @click.prevent="swapDoc('components')">VNFd’s</a></strong
        >: Define the details of each component.
      </li>
      <li class="has-line-data" data-line-start="12" data-line-end="13">
        <strong><a href @click.prevent="swapDoc('tenant')">Tenant</a></strong
        >: Define the credentials to access the OpenStack API.
      </li>
      <li class="has-line-data" data-line-start="13" data-line-end="14">
        <strong
          ><a href @click.prevent="swapDoc('validation')">Validation</a></strong
        >: Validate the design.
      </li>
      <li class="has-line-data" data-line-start="14" data-line-end="16">
        <strong
          ><a href @click.prevent="swapDoc('artefacts')">Artefacts</a></strong
        >: Generate and download the automation artefacts.
      </li>
    </ol>
    <p class="has-line-data" data-line-start="16" data-line-end="17">
      The VNF Designer provides following additional functionality:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="18" data-line-end="19">
        <strong><a href @click.prevent="swapDoc('imports')">Import</a></strong>
        model,
      </li>
      <li class="has-line-data" data-line-start="19" data-line-end="21">
        <strong><a href @click.prevent="swapDoc('exports')">Export</a></strong>
        model,
      </li>
    </ul>
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
