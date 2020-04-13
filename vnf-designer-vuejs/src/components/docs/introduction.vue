<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('readme')">overview</a>
      </h4>
    </nav>

    <h1>VNF Designer</h1>
    <p>
      Designing virtualised network functions (VNFs) can turn out to be a rather
      complex task binding a huge amount of resources and slowing down the
      roll-out and change process considerably.
    </p>
    <p>
      Simplification is key to streamlining this process.
    </p>
    <p>
      The VNF Designer supports an opinionated view of how to consistently and
      efficiently describe the target state of a VNF based on a set of concepts:
    </p>
    <ul>
      <li>
        <strong>Standardised Virtual Resources</strong>: VNFs are represented by
        a set of virtual compute, network and storage resources distributed over
        one or more tenants which resemble independently manageable elastic
        pools of virtual resources.
      </li>
      <li>
        <strong>Service Interfaces</strong>: All internal and external elements
        communicate via a set of exposed services.
      </li>
      <li>
        <strong>IP-Based Communication</strong>: The communication between all
        internal and external elements is based on the layer 3 internet
        protocol.
      </li>
      <li>
        <strong>Dependency Management</strong>: The dependencies between
        internal and external elements to the exposed services allows to derive
        the required communication matrix.
      </li>
    </ul>
    <p>
      The VNF Designer itself is a simple web-application which can either be
      used as offline webpage (offline.html) or as web-server allowing for
      additional capabilities
    </p>
    <p>
      It is capable of:
    </p>
    <ul>
      <li>
        <strong>modelling</strong> the networks, components (incl. images and
        flavors), volumes and ports of VNFs,
      </li>
      <li>
        <strong>validating</strong> the model design,
      </li>
      <li>
        <strong>importing</strong> and exporting models,
      </li>
      <li>
        <strong>generating</strong> automation artefacts for deploying VNFs onto
        Blue Planet,
      </li>
      <li>
        <strong>documenting</strong> required information such as the
        communication matrix of a VNF.
      </li>
    </ul>
    <p>
      It makes use of an internal canonical model which can be rendered with the
      help of jinja like templates into any kind of desired output. These
      rendering capabilities can be extended by adding new templates.
    </p>
    <p>
      A model of a demo solution is provided as an example.
    </p>
    <h2>License</h2>
    <p>
      VNF Designer is based on the work of many great
      <a href @click.prevent="swapDoc('credits')">projects</a> and the support
      of my dear family.
    </p>
    <p>
      Copyright © 2018, Bernard Tsai. (Apache Version 2.0 License)
    </p>
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
