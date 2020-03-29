<template>
  <div>
    <appheader
      :model="model"
      :view="view"
      :misc="misc">
      </appheader>
    <appnavigation
      :model="model"
      :view="view">
    </appnavigation>
    <!-- v-bind:target="target" -->
    <appdetail
      :model="model"
      :current="current"
      :view="view"
      :templates="templates"
    ></appdetail>
    <modal v-if="view.modal !== ''" :view="view"></modal>
  </div>
</template>
<script>
import appheader from "@/components/appheader";
import appnavigation from "@/components/appnavigation";
import appdetail from "@/components/appdetail";
import modal from "@/components/modal";
import model from "@/vnf.modules/model";
import view from "@/vnf.modules/view";
import misc from "@/vnf.modules/misc";
import templates from "@/vnf.modules/templates";
import current from "@/vnf.modules/model";

export default {
  name: "app",
  data() {
    return {
      model: model,
      view: view,
      misc: misc,
      templates: templates,
      current: current
    };
  },
  components: {
    appdetail,
    appheader,
    appnavigation,
    modal
  },
  created() {
    setInterval(function() {
      var t = new Date();
      view.now =
        t.getFullYear() +
        "-" +
        ("0" + t.getMonth()).substr(-2) +
        "-" +
        ("0" + t.getDate()).substr(-2) +
        " " +
        ("0" + t.getHours()).substr(-2) +
        ":" +
        ("0" + t.getMinutes()).substr(-2) +
        ":" +
        ("0" + t.getSeconds()).substr(-2);
    }, 1000);
  }
};
</script>
<style>

</style>