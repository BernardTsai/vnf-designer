<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Components</h1>
    <p >
      Components may be internal components of a VNF, external communication
      parters or routers bridging different networks.
    </p>
    <h2>Editing a Component</h2>
    <p >
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p >
      <img
        :src="require('./images/overview.png')"
        alt="Overview"
      />
    </p>
    <p>
      Then click on the component icon of the component which needs to be
      modified.
    </p>
    <p>
      <img
        :src="require('./images/component.png')"
        alt="Component"
      />
    </p>
    <p>
      The web-form for the component will be presented in the details region and
      will allow to:
    </p>
    <ul>
      <li>
        modify the name,
      </li>
      <l>
        specify the placement/type of the component
        (management/external/internal/other/router),
      </l>
      <li>
        specify the flavor of the component (if management,external or
        internal),
      </li>
      <li>
        specify the image of the component (if management,external or internal),
      </li>
      <li>
        specify the minimum size of instances for the component (if
        management,external or internal),
      </li>
      <li>
        specify the default size of instances for the component (if
        management,external or internal),
      </li>
      <li>
        specify the maximum size of instances for the component (if
        management,external or internal),
      </li>
      <li>
        specify volumes for the component:
        <ul>
          <li>
            name,
          </li>
          <li>
            size in gigabytes,
          </li>
          <li>
            storage type (either external or internal) and
          </li>
          <li>
            additional attributes as a string,
          </li>
        </ul>
      </li>
      <li>
        specify the ports for the component:
        <ul>
          <li>
            network,
          </li>
          <li>
            special interface attributes (e.g. fixed IP addresses or allowed
            address pairs),
          </li>
        </ul>
      </li>
      <li>
        specify the exposed service interfaces:
        <ul>
          <li>
            name of the service,
          </li>
          <li>
            network interface via which the service is exposed,
          </li>
          <li>
            protocol (tcp, udp, icmp, sctp, any, none) and
          </li>
          <li>
            port-range (e.g. 22 for ssh or 8080-8081 for a port range),
          </li>
        </ul>
      </li>
      <li>
        specify dependencies to other services:
        <ul>
          <li>
            name of the component,
          </li>
          <li>
            name of the service which the component exposes,
          </li>
          <li>
            network via which the service is consumed and
          </li>
        </ul>
      </li>
      <li>
        specify user data as a list of strings.
      </li>
    </ul>
    <p >
      Specifying fixed IP addresses and/or allowed address pairs for a network
      interface requires adding
    </p>
    <pre><code>fixed: [IP-Address or IP-Address-Range];</code></pre>
    <p>and/or</p>
    <pre><code>allowed: [IP-Address or IP-Address-Range];</code></pre>
    <p >
      to the attribute of the interface.
    </p>
    <h2>Deleting an Existing Component</h2>
    <p >
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p >
      Then press on the “Components” tab of the selector region.
    </p>
    <p >
      Remove the component by pressing the “-” sign located to the right of the
      name of the specific component.
    </p>
    <p >
      (Be aware that this might lead to inconsistencies in the model if any
      other components have previously referred to this component.)
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
