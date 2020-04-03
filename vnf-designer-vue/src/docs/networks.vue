<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Networks_0"></a>Networks
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      Networks define the L2/L3 communication domains via which components may
      interact.
    </p>
    <h2 class="code-line" data-line-start="5" data-line-end="7">
      <a id="Editing_a_Network_5"></a>Editing a Network
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
      Then click on the network icon of the network which needs to be modified.
    </p>
    <p class="has-line-data" data-line-start="14" data-line-end="15">
      <img
        :src="require('@/docs/images/network.png')"
        alt="Network"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="16" data-line-end="17">
      The web-form for the network will be presented in the details region and
      will allow to:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="18" data-line-end="19">
        modify the name,
      </li>
      <li class="has-line-data" data-line-start="19" data-line-end="20">
        specify additional attributes for the network as a string,
      </li>
      <li class="has-line-data" data-line-start="20" data-line-end="21">
        specify if the network has been created externally,
      </li>
      <li class="has-line-data" data-line-start="21" data-line-end="26">
        specify the IPv4:
        <ul>
          <li class="has-line-data" data-line-start="22" data-line-end="23">
            CIDR,
          </li>
          <li class="has-line-data" data-line-start="23" data-line-end="24">
            IP Gateway,
          </li>
          <li class="has-line-data" data-line-start="24" data-line-end="25">
            DHCP pool start address,
          </li>
          <li class="has-line-data" data-line-start="25" data-line-end="26">
            DHCP pool end address,
          </li>
        </ul>
      </li>
      <li class="has-line-data" data-line-start="26" data-line-end="31">
        specify the IPv6:
        <ul>
          <li class="has-line-data" data-line-start="27" data-line-end="28">
            CIDR,
          </li>
          <li class="has-line-data" data-line-start="28" data-line-end="29">
            IP Gateway,
          </li>
          <li class="has-line-data" data-line-start="29" data-line-end="30">
            DHCP pool start address,
          </li>
          <li class="has-line-data" data-line-start="30" data-line-end="31">
            DHCP pool end address,
          </li>
        </ul>
      </li>
      <li class="has-line-data" data-line-start="31" data-line-end="36">
        specify the external route information:
        <ul>
          <li class="has-line-data" data-line-start="32" data-line-end="33">
            route target,
          </li>
          <li class="has-line-data" data-line-start="33" data-line-end="34">
            exports and
          </li>
          <li class="has-line-data" data-line-start="34" data-line-end="36">
            imports.
          </li>
        </ul>
      </li>
    </ul>
    <h2 class="code-line" data-line-start="36" data-line-end="38">
      <a id="Deleting_an_Existing_Network_36"></a>Deleting an Existing Network
    </h2>
    <p class="has-line-data" data-line-start="39" data-line-end="40">
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p class="has-line-data" data-line-start="41" data-line-end="42">
      Then press on the “Networks” tab of the selector region.
    </p>
    <p class="has-line-data" data-line-start="43" data-line-end="44">
      Remove the network by pressing the “-” sign located to the right of the
      name of the specific network.
    </p>
    <p class="has-line-data" data-line-start="45" data-line-end="46">
      (Be aware that this might lead to inconsistencies in the model if any
      components have previously referred to this network.)
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
