<template>
  <div id="appheader" :class="view.mode">
    <div class="logo"><i class="fas fa-cloud" />&nbsp;VNF Designer</div>
    <div id="apptitle" class="label">{{ title }}</div>
    <div id="appbuttons" class="buttons">
      <div @click="context('Tenant')" title="Tenant overview">
        <i class="fas fa-map" />&nbsp;Overview
      </div>
      <div @click="reset" title="Reset model">
        <i class="fas fa-certificate" />&nbsp;Reset
      </div>
      <div @click="validate" title="Validate model">
        <i class="fas fa-check-circle" />&nbsp;Validate
      </div>
      <div @click="context('Import')" title="Import model">
        <i class="fas fa-arrow-alt-circle-down" />&nbsp;Import
      </div>
      <div @click="context('Export')" title="Export model">
        <i class="fas fa-arrow-alt-circle-up" />&nbsp;Export
      </div>
      <div @click="context('Docs')">
        <i class="fas fa-book" />&nbsp;Docs
      </div>
    </div>
    <div id="apptabs" class="tabs">
      <template v-if="view.navigation === 'Tenant'">
        <div class="active">General</div>
        <div @click="context('Flavor')">Flavors</div>
        <div @click="context('Image')">Images</div>
        <div @click="context('Network')">Networks</div>
        <div @click="context('Component')">VNFd's</div>
      </template>
      <template v-if="view.navigation === 'Image'">
        <div @click="context('Tenant')">General</div>
        <div @click="context('Flavor')">Flavors</div>
        <div class="active">Images</div>
        <div @click="context('Network')">Networks</div>
        <div @click="context('Component')">VNFd's</div>
      </template>
      <template v-if="view.navigation === 'Flavor'">
        <div @click="context('Tenant')">General</div>
        <div class="active">Flavors</div>
        <div @click="context('Image')">Images</div>
        <div @click="context('Network')">Networks</div>
        <div @click="context('Component')">VNFd's</div>
      </template>
      <template v-if="view.navigation === 'Network'">
        <div @click="context('Tenant')">General</div>
        <div @click="context('Flavor')">Flavors</div>
        <div @click="context('Image')">Images</div>
        <div class="active">Networks</div>
        <div @click="context('Component')">VNFd's</div>
      </template>
      <template v-if="view.navigation === 'Component'">
        <div @click="context('Tenant')">General</div>
        <div @click="context('Flavor')">Flavors</div>
        <div @click="context('Image')">Images</div>
        <div @click="context('Network')">Networks</div>
        <div class="active">VNFd's</div>
      </template>
    </div>
  </div>
</template>

<script>
// import setContext from "@/view.js";
// import setModel from "@/view.js";
// import view from "@/view.js";
// import misc from "@/misc.js";
import validator from "@/vnf.modules/validator.js";
// import validate_schema from "@/validator.js";
// import deleteComponent from "@/model.js";
// import deleteNetwork from "@/model.js";
// import deleteFlavor from "@/model.js";
// import deleteImage from "@/model.js";
// import addFlavor from "@/model.js";
// import addImage from "@/model.js";
// import addNetwork from "@/model.js";
// import addComponent from "@/model.js";
// import current from "@/model.js";
// import msg from "@/model.js";
// import model from "@/model.js";

export default {
  name: "appheader",
  props: ["model", "view", "misc"],
  computed: {
    title: function() {
      return this.model.current.vnf + " (" + this.model.current.version + ")";
    }
  },
  // created() {
  //   console.log(this.view);
  // },
  methods: {
    context: function(ctxt) {
      this.view.setContext(ctxt);

      // resize appdetail to default values
      var detail = document.getElementById("appdetail");
      detail.style.left = null;
      var tabs = document.getElementById("apptabs");
      tabs.style.display = null;

      this.view.detail = "Tenant";

      switch (ctxt) {
        case "Import":
          this.view.detail = "Import";
          break;
        case "Export":
          this.view.detail = "Export";
          break;
        case "Docs":
          var win = window.open(window.location.href+"docs", "_blank");
          win.focus();
          break;
        default:
      }
    },
    // add: function() {
    //   if (view.navigation === "Flavor") {
    //     model.addFlavor();
    //   }
    //   if (view.navigation === "Image") {
    //     model.addImage();
    //   }
    //   if (view.navigation === "Network") {
    //     model.addNetwork();
    //   }
    //   if (view.navigation === "Component") {
    //     model.addComponent();
    //   }
    // },
    // del: function() {
    //   if (view.navigation === "Flavor") {
    //     model.deleteFlavor();
    //   }
    //   if (view.navigation === "Image") {
    //     model.deleteImage();
    //   }
    //   if (view.navigation === "Network") {
    //     model.deleteNetwork();
    //   }
    //   if (view.navigation === "Component") {
    //     model.deleteComponent();
    //   }
    // },
    validate: function() {
      var object = JSON.parse(JSON.stringify(this.model.current));

      // verify schema
      var msg = validator.validate_schema(object);
      if (msg != "") {
        this.view.modal = msg;
        return;
      }

      // verify xrefs
      msg = validator.validate_xref(object);
      if (msg != "") {
        this.view.modal = msg;
        return;
      }

      // everything is fine
      this.view.modal = "No Validation Errors";
    },
    reset: function() {
      var current = JSON.parse(JSON.stringify(this.misc.emptyModel()));
      this.view.mode = "current";
      this.model.setModel(current);
      this.view.setContext("Tenant");
      this.$forceUpdate(); // whats this?
    }
  }
};
</script>
