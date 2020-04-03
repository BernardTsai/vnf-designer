<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Architecture_0"></a>Architecture
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      The architecture of a VNF captures how the components of a VNF communicate
      via networks with one another as shown in the following diagram:
    </p>
    <p class="has-line-data" data-line-start="5" data-line-end="6">
      <img
        :src="require('@/docs/images/overview.png')"
        alt="VNF Overview"
        width="50%"
      />
    </p>
    <h2 class="code-line" data-line-start="8" data-line-end="10">
      <a id="Reset_Model_8"></a>Reset Model
    </h2>
    <p class="has-line-data" data-line-start="11" data-line-end="12">
      To create an overview of a virtualised network function open the VNF
      Designer and reset the model by pressing the <strong>Reset</strong> icon
      located at the top of the webpage.
    </p>
    <p class="has-line-data" data-line-start="13" data-line-end="14">
      This will remove all previously defined entities and allow to define the
      architecture from scratch.
    </p>
    <h2 class="code-line" data-line-start="15" data-line-end="17">
      <a id="Adding_Components_15"></a>Adding Components
    </h2>
    <p class="has-line-data" data-line-start="18" data-line-end="19">
      In order to add components to the architecture hover with the mouse over
      an empty patch on the left side of the details region - an icon for a new
      component will appear.
    </p>
    <p class="has-line-data" data-line-start="20" data-line-end="21">
      Click on this icon to create a new component.
    </p>
    <p class="has-line-data" data-line-start="22" data-line-end="23">
      To change the name of the component simply click on the name and modify
      it.
    </p>
    <p class="has-line-data" data-line-start="24" data-line-end="25">
      The icon will display colored placement/type indictor which can be
      modified by clicking on it:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="26" data-line-end="27">
        <strong>M</strong>: stands for management component,
      </li>
      <li class="has-line-data" data-line-start="27" data-line-end="28">
        <strong>E</strong>: stands for externally visible component,
      </li>
      <li class="has-line-data" data-line-start="28" data-line-end="29">
        <strong>I</strong>: stands for internal component,
      </li>
      <li class="has-line-data" data-line-start="29" data-line-end="30">
        <strong>R</strong>: stands for a router component bridging several
        networks and
      </li>
      <li class="has-line-data" data-line-start="30" data-line-end="32">
        <strong>O</strong>: stands for any other component.
      </li>
    </ul>
    <h2 class="code-line" data-line-start="32" data-line-end="34">
      <a id="Adding_Networks_32"></a>Adding Networks
    </h2>
    <p class="has-line-data" data-line-start="35" data-line-end="36">
      In order to add networks to the architecture hover with the mouse over an
      empty patch on the tops side of the details region - an icon for a new
      network will appear.
    </p>
    <p class="has-line-data" data-line-start="37" data-line-end="38">
      Click on this icon to create a new network.
    </p>
    <p class="has-line-data" data-line-start="39" data-line-end="40">
      To change the name of the network simply click on the name and modify it.
    </p>
    <h2 class="code-line" data-line-start="41" data-line-end="43">
      <a id="ConnectingDisconnecting_Components_tofrom_Networks_41"></a
      >Connecting/Disconnecting Components to/from Networks
    </h2>
    <p class="has-line-data" data-line-start="44" data-line-end="45">
      In order to connect/disconnect components to/from networks simply click on
      the intersection between component and network.
    </p>
    <p class="has-line-data" data-line-start="46" data-line-end="47">
      The sequence in which these ports are created is of relevance since the
      first port will be the port allowing for administrative access for all
      automation procedures.
    </p>
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
