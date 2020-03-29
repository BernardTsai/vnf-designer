<template>
  <div :is="content" @swapDoc="swapDoc"></div>
</template>
<script>
import readme from "@/docs/readme";
import introduction from "@/docs/introduction";
import installation from "@/docs/installation";
import ui from "@/docs/ui";
import usage from "@/docs/usage";
import example from "@/docs/example";
import model from "@/docs/model";
import templates from "@/docs/templates";
import credits from "@/docs/credits";
import architecture from "@/docs/architecture";
import flavors from "@/docs/flavors";
import images from "@/docs/images";
import networks from "@/docs/networks";
import components from "@/docs/components";
import tenant from "@/docs/tenant";
import validation from "@/docs/validation";
import artefacts from "@/docs/artefacts";
import imports from "@/docs/imports";
import exports from "@/docs/exports";
export default {
  data() {
    return {
      content: null
    };
  },
  components: {
    readme,
    introduction,
    installation,
    ui,
    usage,
    example,
    model,
    templates,
    credits,
    architecture,
    flavors,
    images,
    networks,
    components,
    tenant,
    validation,
    artefacts,
    imports,
    exports
  },
  methods: {
    swapDoc(docname) {
      this.content = docname;
      console.log(docname);
    }
  },
  created() {
    this.swapDoc("readme");
  }
};
</script>
<style>
img {
  width: 50%;
}
body {
  font: 14px Arial;
}
a {
  text-decoration: none;
}
pre {
  background: lightgrey;
  padding: 8px;
}
hr {
  color: lightgrey;
}
table {
  border-collapse: collapse;
}
th {
  background: lightgrey;
  padding-left: 16px;
  padding-right: 16px;
  text-align: left;
}
td {
  border-bottom: 1px solid lightgrey;
  padding-left: 16px;
  padding-right: 16px;
  text-align: left;
}
</style>
