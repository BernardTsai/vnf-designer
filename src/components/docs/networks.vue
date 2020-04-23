<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Networks</h1>
    <p >
      Networks define the L2/L3 communication domains via which components may
      interact.
    </p>
    <h2>Editing a Network</h2>
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
      Then click on the network icon of the network which needs to be modified.
    </p>
    <p >
      <img
        :src="require('./images/network.png')"
        alt="Network"
      />
    </p>
    <p >
      The web-form for the network will be presented in the details region and
      will allow to:
    </p>
    <ul>
      <li>
        modify the name,
      </li>
      <li>
        specify additional attributes for the network as a string,
      </li>
      <li>
        specify if the network has been created externally,
      </li>
      <li>
        specify the IPv4:
        <ul>
          <li>
            CIDR,
          </li>
          <li>
            IP Gateway,
          </li>
          <li>
            DHCP pool start address,
          </li>
          <li>
            DHCP pool end address,
          </li>
        </ul>
      </li>
      <li>
        specify the IPv6:
        <ul>
          <li>
            CIDR,
          </li>
          <li>
            IP Gateway,
          </li>
          <li>
            DHCP pool start address,
          </li>
          <li>
            DHCP pool end address,
          </li>
        </ul>
      </li>
      <li>
        specify the external route information:
        <ul>
          <li>
            route target,
          </li>
          <li>
            exports and
          </li>
          <li>
            imports.
          </li>
        </ul>
      </li>
    </ul>
    <h2>Deleting an Existing Network</h2>
    <p >
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p >
      Then press on the “Networks” tab of the selector region.
    </p>
    <p >
      Remove the network by pressing the “-” sign located to the right of the
      name of the specific network.
    </p>
    <p >
      (Be aware that this might lead to inconsistencies in the model if any
      components have previously referred to this network.)
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
