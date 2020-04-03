<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Installation_0"></a>Installation
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      There are two installation options available:
    </p>
    <ol>
      <li class="has-line-data" data-line-start="5" data-line-end="6">
        <strong>Offline Webpage</strong>: VNF Designer can be started as offline
        webpage allowing to directly start working without having to install
        anything apart from a modern web browser
      </li>
      <li class="has-line-data" data-line-start="6" data-line-end="8">
        <strong>Web-Server</strong>: installing the VNF Designer as a web
        service allows to make use of additional features
      </li>
    </ol>
    <hr />
    <h2 class="code-line" data-line-start="10" data-line-end="12">
      <a id="VNF_Designer_as_Offline_Webpage_10"></a>VNF Designer as Offline
      Webpage
    </h2>
    <ul>
      <li class="has-line-data" data-line-start="13" data-line-end="14">
        Clone and unpack the repository from github (<a
          href="https://github.com/BernardTsai/vnf-designer"
          >https://github.com/BernardTsai/vnf-designer</a
        >) into a local directory and change into it’s root directory
      </li>
      <li class="has-line-data" data-line-start="14" data-line-end="15">
        Open the webpage “offline.html” in a browser
      </li>
    </ul>
    <hr />
    <h2 class="code-line" data-line-start="19" data-line-end="21">
      <a id="VNF_Designer_as_Web_Service_19"></a>VNF Designer as Web Service
    </h2>
    <p class="has-line-data" data-line-start="22" data-line-end="23">
      Installing the VNF Designer requires fulfilling a set of prerequisites and
      ideally making use of a nodeenv virtual environment:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="24" data-line-end="25">
        <strong>node.js and npm</strong> need to be installed (<a
          href="https://nodejs.org/en/download/"
          >https://nodejs.org/en/download/</a
        >)
      </li>
      <li class="has-line-data" data-line-start="25" data-line-end="27">
        <strong>nodeenv</strong> has been installed (optional - if a virtual
        node environment is needed:
        <a href="https://github.com/ekalinin/nodeenv"
          >https://github.com/ekalinin/nodeenv</a
        >)
      </li>
    </ul>
    <p class="has-line-data" data-line-start="27" data-line-end="28">
      <strong>Steps:</strong>
    </p>
    <p class="has-line-data" data-line-start="29" data-line-end="30">
      <strong>A. Repository</strong>: Clone and unpack the repository from
      github (<a href="https://github.com/BernardTsai/vnf-designer"
        >https://github.com/BernardTsai/vnf-designer</a
      >) into a local directory and change into it’s root directory:
    </p>
    <pre><code class="has-line-data language-bash" data-line-start="32" data-line-end="35">git <span class="hljs-built_in">clone</span> https://github.com/BernardTsai/vnf-designer
<span class="hljs-built_in">cd</span> vnf-designer
</code></pre>
    <p class="has-line-data" data-line-start="36" data-line-end="37">
      <strong>B. Virtual Environment (opt.)</strong>: Create a virtual node
      environment and activate it:
    </p>
    <pre><code class="has-line-data" data-line-start="39" data-line-end="42">nodeenv --force .
source bin/activate
</code></pre>
    <p class="has-line-data" data-line-start="43" data-line-end="44">
      <strong>C. Dependencies</strong>: Install missing dependencies:
    </p>
    <pre><code class="has-line-data" data-line-start="46" data-line-end="48">npm install
</code></pre>
    <p class="has-line-data" data-line-start="49" data-line-end="50">
      <strong>D. Server</strong>: Start the server:
    </p>
    <pre><code class="has-line-data" data-line-start="52" data-line-end="54">node index.js
</code></pre>
    <p class="has-line-data" data-line-start="55" data-line-end="56">
      <strong>E. VNF-Designer</strong>: Access the VNF Designer by opening the
      url <a href="http://localhost:3000">http://localhost:3000</a> in a browser
    </p>
    <hr />
    <h2 class="code-line" data-line-start="59" data-line-end="61">
      Usage
    </h2>
    <p class="has-line-data" data-line-start="61" data-line-end="62">
      In order to understand how to design a virtualised network function with
      the help of this tool please refer to following
      <a href @click.prevent="swapDoc('usage')">documentation</a>.
    </p>
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
