<template>
  <div>
    <h1>VNF Designer</h1>
      <p >
        A simple web-based tool to design virtualised network functions.
      </p>
    <h2>Content</h2>
    <ul>
      <li>
        <strong
          ><a href @click.prevent="swapDoc('introduction')"
            >Introduction</a
          ></strong>: capabilities of the VNF Designer
      </li>
      <li>
        <strong
          ><a href @click.prevent="swapDoc('installation')"
            >Installation</a
          ></strong
        >: instructions for setting up the VNF Designer
      </li>
      <li>
        <strong><a href @click.prevent="swapDoc('ui')">GUI</a></strong
        >: graphical user interface of the VNF designer
      </li>
      <li>
        <strong><a href @click.prevent="swapDoc('usage')">Usage</a></strong
        >: how to design VNFs
      </li>
      <li>
        <strong><a href @click.prevent="swapDoc('example')">Example</a></strong
        >: reference example
      </li>
      <li>
        <strong><a href @click.prevent="swapDoc('model')">Model</a></strong
        >: description of the internal model
      </li>
      <li>
        <strong><a href @click.prevent="swapDoc('templates')">Templates</a></strong
        >: description of the rendering templates
      </li>
    </ul>
    <p >
      For further questions please contact:
      <a href="mailto:bernard@tsai.eu">bernard@tsai.eu</a>
    </p>
    <h2>License</h2>
    <p >
      VNF Designer is based on the work of many great
      <a href @click.prevent="swapDoc('credits')">projects</a> and the support
      of my dear family.
    </p>
    <p >
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
