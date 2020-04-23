<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href  @click.prevent="swapDoc('readme')">overview</a>
      </h4>
    </nav>
    <h1>Usage</h1>
    <p >
      It is assumed that a DevOps team (possibly with the support of a VNF
      supplier) is knowledgeable of the architecture of the VNF and its network
      design but may have to consult experts from the partner systems which
      interact with the VNF.
    </p>
    <p >
      The following process allows such a DevOps team to design virtualised
      network functions in a simple way:
    </p>
    <ol>
      <li>
        <strong
          ><a href @click.prevent="swapDoc('architecture')"
            >Architecture</a
          ></strong
        >: Identify all systems and users (components) which are either part of
        the VNF or which will interact with it. In addition identify all
        separate communication channels (networks) via which these components
        will interact.
      </li>
      <li>
        <strong><a href @click.prevent="swapDoc('flavors')">Flavors</a></strong
        >: Define the dimensions of the virtual machines.
      </li>
      <li>
        <strong><a href @click.prevent="swapDoc('images')">Images</a></strong
        >: Define the required operating systems possibly including application
        specific packages and configurations.
      </li>
      <li>
        <strong
          ><a href @click.prevent="swapDoc('networks')">Networks</a></strong
        >: Define the details of each network.
      </li>
      <li>
        <strong
          ><a href @click.prevent="swapDoc('components')">VNFd’s</a></strong
        >: Define the details of each component.
      </li>
      <li>
        <strong><a href @click.prevent="swapDoc('tenant')">Tenant</a></strong
        >: Define the credentials to access the OpenStack API.
      </li>
      <li>
        <strong
          ><a href @click.prevent="swapDoc('validation')">Validation</a></strong
        >: Validate the design.
      </li>
      <li>
        <strong
          ><a href @click.prevent="swapDoc('artefacts')">Artefacts</a></strong
        >: Generate and download the automation artefacts.
      </li>
    </ol>
    <p >
      The VNF Designer provides following additional functionality:
    </p>
    <ul>
      <li>
        <strong><a href @click.prevent="swapDoc('imports')">Import</a></strong>
        model,
      </li>
      <li>
        <strong><a href @click.prevent="swapDoc('exports')">Export</a></strong>
        model,
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
