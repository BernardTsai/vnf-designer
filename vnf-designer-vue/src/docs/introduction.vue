<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="VNF_Designer_0"></a>VNF Designer
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      Designing virtualised network functions (VNFs) can turn out to be a rather
      complex task binding a huge amount of resources and slowing down the
      roll-out and change process considerably.
    </p>
    <p class="has-line-data" data-line-start="5" data-line-end="6">
      Simplification is key to streamlining this process.
    </p>
    <p class="has-line-data" data-line-start="7" data-line-end="8">
      The VNF Designer supports an opinionated view of how to consistently and
      efficiently describe the target state of a VNF based on a set of concepts:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="9" data-line-end="10">
        <strong>Standardised Virtual Resources</strong>: VNFs are represented by
        a set of virtual compute, network and storage resources distributed over
        one or more tenants which resemble independently manageable elastic
        pools of virtual resources.
      </li>
      <li class="has-line-data" data-line-start="10" data-line-end="11">
        <strong>Service Interfaces</strong>: All internal and external elements
        communicate via a set of exposed services.
      </li>
      <li class="has-line-data" data-line-start="11" data-line-end="12">
        <strong>IP-Based Communication</strong>: The communication between all
        internal and external elements is based on the layer 3 internet
        protocol.
      </li>
      <li class="has-line-data" data-line-start="12" data-line-end="14">
        <strong>Dependency Management</strong>: The dependencies between
        internal and external elements to the exposed services allows to derive
        the required communication matrix.
      </li>
    </ul>
    <p class="has-line-data" data-line-start="14" data-line-end="15">
      The VNF Designer itself is a simple web-application which can either be
      used as offline webpage (offline.html) or as web-server allowing for
      additional capabilities
    </p>
    <p class="has-line-data" data-line-start="16" data-line-end="17">
      It is capable of:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="17" data-line-end="18">
        <strong>modelling</strong> the networks, components (incl. images and
        flavors), volumes and ports of VNFs,
      </li>
      <li class="has-line-data" data-line-start="18" data-line-end="19">
        <strong>validating</strong> the model design,
      </li>
      <li class="has-line-data" data-line-start="19" data-line-end="20">
        <strong>importing</strong> and exporting models,
      </li>
      <li class="has-line-data" data-line-start="20" data-line-end="21">
        <strong>generating</strong> automation artefacts for deploying VNFs onto
        Blue Planet,
      </li>
      <li class="has-line-data" data-line-start="21" data-line-end="23">
        <strong>documenting</strong> required information such as the
        communication matrix of a VNF.
      </li>
    </ul>
    <p class="has-line-data" data-line-start="23" data-line-end="24">
      It makes use of an internal canonical model which can be rendered with the
      help of jinja like templates into any kind of desired output. These
      rendering capabilities can be extended by adding new templates.
    </p>
    <p class="has-line-data" data-line-start="25" data-line-end="26">
      A model of a demo solution is provided as an example.
    </p>
    <h2 class="code-line" data-line-start="27" data-line-end="29">
      <a id="License_27"></a>License
    </h2>
    <p class="has-line-data" data-line-start="30" data-line-end="31">
      VNF Designer is based on the work of many great
      <a href @click.prevent="swapDoc('credits')">projects</a> and the support
      of my dear family.
    </p>
    <p class="has-line-data" data-line-start="32" data-line-end="33">
      Copyright © 2018, Bernard Tsai. (Apache Version 2.0 License)
    </p>
    <hr />
    <div style="z-index:100; position: fixed; top: 16px; right:16px;">
      <a
        style="text-decoration: none;"
        href
        @click.prevent="swapDoc('overview')"
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
