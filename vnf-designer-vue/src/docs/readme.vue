<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="1">
      <a id="VNF_Designer_0"></a>VNF Designer
    </h1>
    <blockquote>
      <p class="has-line-data" data-line-start="2" data-line-end="3">
        A simple web-based tool to design virtualised network functions.
      </p>
    </blockquote>
    <h2 class="code-line" data-line-start="4" data-line-end="5">
      <a id="Content_4"></a>Content
    </h2>
    <ul>
      <li class="has-line-data" data-line-start="6" data-line-end="7">
        <strong
          ><a href @click.prevent="swapDoc('introduction')"
            >Introduction</a
          ></strong
        >: capabilities of the VNF Designer
      </li>
      <li class="has-line-data" data-line-start="7" data-line-end="8">
        <strong
          ><a href @click.prevent="swapDoc('installation')"
            >Installation</a
          ></strong
        >: instructions for setting up the VNF Designer
      </li>
      <li class="has-line-data" data-line-start="8" data-line-end="9">
        <strong><a href @click.prevent="swapDoc('ui')">GUI</a></strong
        >: graphical user interface of the VNF designer
      </li>
      <li class="has-line-data" data-line-start="9" data-line-end="10">
        <strong><a href @click.prevent="swapDoc('usage')">Usage</a></strong
        >: how to design VNFs
      </li>
      <li class="has-line-data" data-line-start="10" data-line-end="11">
        <strong><a href @click.prevent="swapDoc('example')">Example</a></strong
        >: reference example
      </li>
      <li class="has-line-data" data-line-start="11" data-line-end="12">
        <strong><a href @click.prevent="swapDoc('model')">Model</a></strong
        >: description of the internal model
      </li>
      <li class="has-line-data" data-line-start="12" data-line-end="14">
        <strong
          ><a href @click.prevent="swapDoc('templates')">Templates</a></strong
        >: description of the rendering templates
      </li>
    </ul>
    <p class="has-line-data" data-line-start="14" data-line-end="15">
      For further questions please contact:
      <a href="mailto:bernard@tsai.eu">bernard@tsai.eu</a>
    </p>
    <h2 class="code-line" data-line-start="16" data-line-end="17">
      <a id="License_16"></a>License
    </h2>
    <p class="has-line-data" data-line-start="18" data-line-end="19">
      VNF Designer is based on the work of many great
      <a href @click.prevent="swapDoc('credits')">projects</a> and the support
      of my dear family.
    </p>
    <p class="has-line-data" data-line-start="20" data-line-end="21">
      Copyright © 2018, Bernard Tsai. (Apache Version 2.0 License)
    </p>
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
