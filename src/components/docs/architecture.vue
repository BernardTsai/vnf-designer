<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Architecture</h1>
    <p>
      The architecture of a VNF captures how the components of a VNF communicate
      via networks with one another as shown in the following diagram:
    </p>
    <p>
      <img
        :src="require('./images/overview.png')"
        alt="VNF Overview"
      />
    </p>
    <h2>Reset Model</h2>
    <p>
      To create an overview of a virtualised network function open the VNF
      Designer and reset the model by pressing the <strong>Reset</strong> icon
      located at the top of the webpage.
    </p>
    <p>
      This will remove all previously defined entities and allow to define the
      architecture from scratch.
    </p>
    <h2>Adding Components</h2>
    <p>
      In order to add components to the architecture hover with the mouse over
      an empty patch on the left side of the details region - an icon for a new
      component will appear.
    </p>
    <p>
      Click on this icon to create a new component.
    </p>
    <p>
      To change the name of the component simply click on the name and modify
      it.
    </p>
    <p>
      The icon will display colored placement/type indictor which can be
      modified by clicking on it:
    </p>
    <ul>
      <li>stands for management component,</li>
      <li>stands for externally visible component,</li>
      <li>stands for internal component,</li>
      <li>stands for a router component bridging several networks and</li>
      <li>stands for any other component.</li>
    </ul>
    <h2>Adding Networks</h2>
    <p>
      In order to add networks to the architecture hover with the mouse over an
      empty patch on the tops side of the details region - an icon for a new
      network will appear.
    </p>
    <p>
      Click on this icon to create a new network.
    </p>
    <p>
      To change the name of the network simply click on the name and modify it.
    </p>
    <h2>
      Connecting/Disconnecting Components to/from Networks
    </h2>
    <p>
      In order to connect/disconnect components to/from networks simply click on
      the intersection between component and network.
    </p>
    <p>
      The sequence in which these ports are created is of relevance since the
      first port will be the port allowing for administrative access for all
      automation procedures.
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
