<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Components_0"></a>Components
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      Components may be internal components of a VNF, external communication
      parters or routers bridging different networks.
    </p>
    <h2 class="code-line" data-line-start="5" data-line-end="7">
      <a id="Editing_a_Component_5"></a>Editing a Component
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
      Then click on the component icon of the component which needs to be
      modified.
    </p>
    <p class="has-line-data" data-line-start="14" data-line-end="15">
      <img
        :src="require('@/docs/images/component.png')"
        alt="Component"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="16" data-line-end="17">
      The web-form for the component will be presented in the details region and
      will allow to:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="18" data-line-end="19">
        modify the name,
      </li>
      <li class="has-line-data" data-line-start="19" data-line-end="20">
        specify the placement/type of the component
        (management/external/internal/other/router),
      </li>
      <li class="has-line-data" data-line-start="20" data-line-end="21">
        specify the flavor of the component (if management,external or
        internal),
      </li>
      <li class="has-line-data" data-line-start="21" data-line-end="22">
        specify the image of the component (if management,external or internal),
      </li>
      <li class="has-line-data" data-line-start="22" data-line-end="23">
        specify the minimum size of instances for the component (if
        management,external or internal),
      </li>
      <li class="has-line-data" data-line-start="23" data-line-end="24">
        specify the default size of instances for the component (if
        management,external or internal),
      </li>
      <li class="has-line-data" data-line-start="24" data-line-end="25">
        specify the maximum size of instances for the component (if
        management,external or internal),
      </li>
      <li class="has-line-data" data-line-start="25" data-line-end="30">
        specify volumes for the component:
        <ul>
          <li class="has-line-data" data-line-start="26" data-line-end="27">
            name,
          </li>
          <li class="has-line-data" data-line-start="27" data-line-end="28">
            size in gigabytes,
          </li>
          <li class="has-line-data" data-line-start="28" data-line-end="29">
            storage type (either external or internal) and
          </li>
          <li class="has-line-data" data-line-start="29" data-line-end="30">
            additional attributes as a string,
          </li>
        </ul>
      </li>
      <li class="has-line-data" data-line-start="30" data-line-end="33">
        specify the ports for the component:
        <ul>
          <li class="has-line-data" data-line-start="31" data-line-end="32">
            network,
          </li>
          <li class="has-line-data" data-line-start="32" data-line-end="33">
            special interface attributes (e.g. fixed IP addresses or allowed
            address pairs),
          </li>
        </ul>
      </li>
      <li class="has-line-data" data-line-start="33" data-line-end="38">
        specify the exposed service interfaces:
        <ul>
          <li class="has-line-data" data-line-start="34" data-line-end="35">
            name of the service,
          </li>
          <li class="has-line-data" data-line-start="35" data-line-end="36">
            network interface via which the service is exposed,
          </li>
          <li class="has-line-data" data-line-start="36" data-line-end="37">
            protocol (tcp, udp, icmp, sctp, any, none) and
          </li>
          <li class="has-line-data" data-line-start="37" data-line-end="38">
            port-range (e.g. 22 for ssh or 8080-8081 for a port range),
          </li>
        </ul>
      </li>
      <li class="has-line-data" data-line-start="38" data-line-end="42">
        specify dependencies to other services:
        <ul>
          <li class="has-line-data" data-line-start="39" data-line-end="40">
            name of the component,
          </li>
          <li class="has-line-data" data-line-start="40" data-line-end="41">
            name of the service which the component exposes,
          </li>
          <li class="has-line-data" data-line-start="41" data-line-end="42">
            network via which the service is consumed and
          </li>
        </ul>
      </li>
      <li class="has-line-data" data-line-start="42" data-line-end="44">
        specify user data as a list of strings.
      </li>
    </ul>
    <p class="has-line-data" data-line-start="44" data-line-end="45">
      Specifying fixed IP addresses and/or allowed address pairs for a network
      interface requires adding
    </p>
    <pre><code class="has-line-data" data-line-start="47" data-line-end="49">fixed: [IP-Address or IP-Address-Range];
</code></pre>
    <p class="has-line-data" data-line-start="50" data-line-end="51">and/or</p>
    <pre><code class="has-line-data" data-line-start="53" data-line-end="55">allowed: [IP-Address or IP-Address-Range];
</code></pre>
    <p class="has-line-data" data-line-start="56" data-line-end="57">
      to the attribute of the interface.
    </p>
    <h2 class="code-line" data-line-start="58" data-line-end="60">
      <a id="Deleting_an_Existing_Component_58"></a>Deleting an Existing
      Component
    </h2>
    <p class="has-line-data" data-line-start="61" data-line-end="62">
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p class="has-line-data" data-line-start="63" data-line-end="64">
      Then press on the “Components” tab of the selector region.
    </p>
    <p class="has-line-data" data-line-start="65" data-line-end="66">
      Remove the component by pressing the “-” sign located to the right of the
      name of the specific component.
    </p>
    <p class="has-line-data" data-line-start="67" data-line-end="68">
      (Be aware that this might lead to inconsistencies in the model if any
      other components have previously referred to this component.)
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
