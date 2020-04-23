<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href  @click.prevent="swapDoc('readme')">overview</a>
      </h4>
    </nav>
    <h1>Installation</h1>
    <p >
      There are two installation options available:
    </p>
    <ol>
      <li>
        <strong>Offline Webpage</strong>: VNF Designer can be started as offline
        webpage allowing to directly start working without having to install
        anything apart from a modern web browser
      </li>
      <li>
        <strong>Web-Server</strong>: installing the VNF Designer as a web
        service allows to make use of additional features
      </li>
    </ol>
    <hr />
    <h2>VNF Designer as Offline Webpage</h2>
    <ul>
      <li>
        Clone and unpack the repository from github (<a
          href="https://github.com/BernardTsai/vnf-designer"
          >https://github.com/BernardTsai/vnf-designer</a
        >) into a local directory and change into it’s root directory
      </li>
      <li>
        Open the webpage “offline.html” in a browser
      </li>
    </ul>
    <hr />
    <h2>VNF Designer as Web Service</h2>
    <p >
      Installing the VNF Designer requires fulfilling a set of prerequisites and
      ideally making use of a nodeenv virtual environment:
    </p>
    <ul>
      <li>
        <strong>node.js and npm</strong> need to be installed (<a
          href="https://nodejs.org/en/download/"
          >https://nodejs.org/en/download/</a
        >)
      </li>
      <li>
        <strong>nodeenv</strong> has been installed (optional - if a virtual
        node environment is needed:
        <a href="https://github.com/ekalinin/nodeenv"
          >https://github.com/ekalinin/nodeenv</a
        >)
      </li>
    </ul>
    <p >
      <strong>Steps:</strong>
    </p>
    <p >
      <strong>A. Repository</strong>: Clone and unpack the repository from
      github (<a href="https://github.com/BernardTsai/vnf-designer"
        >https://github.com/BernardTsai/vnf-designer</a
      >) into a local directory and change into it’s root directory:
    </p>
    <pre><code>git <span>clone</span> https://github.com/BernardTsai/vnf-designer
<span>cd</span> vnf-designer
</code></pre>
    <p>
      <strong>B. Virtual Environment (opt.)</strong>: Create a virtual node
      environment and activate it:
    </p>
    <pre><code>nodeenv --force .
source bin/activate
</code></pre>
    <p>
      <strong>C. Dependencies</strong>: Install missing dependencies:
    </p>
    <pre><code>npm install
</code></pre>
    <p>
      <strong>D. Server</strong>: Start the server:
    </p>
    <pre><code>node index.js
</code></pre>
    <p>
      <strong>E. VNF-Designer</strong>: Access the VNF Designer by opening the
      url <a href="http://localhost:3000">http://localhost:3000</a> in a browser
    </p>
    <hr />
    <h2>Usage</h2>
    <p>
      In order to understand how to design a virtualised network function with
      the help of this tool please refer to following
      <a href @click.prevent="swapDoc('usage')">documentation</a>.
    </p>
    <hr>
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
