<template>
    <div id="appheader" v-bind:class="view.mode">
        <div class="logo"><i class="fas fa-cloud"/>&nbsp;VNF Designer</div>
        <div id="apptitle" class="label">{{title}}</div>
        <div id="appbuttons" class="buttons">
          <div v-on:click="context('Tenant')" title="Tenant overview">
            <i class="fas fa-map"/>&nbsp;Overview
          </div>
          <div v-on:click="context('Monitoring')" title="Monitoring overview" v-if="locationHostname">
            <i class="fas fa-heartbeat"/>&nbsp;Monitoring
          </div>
          <div v-on:click="reset" title="Reset model">
            <i class="fas fa-certificate"/>&nbsp;Reset
          </div>
          <div v-on:click="validate" title="Validate model">
            <i class="fas fa-check-circle"/>&nbsp;Validate
          </div>
          <div v-on:click="context('Import')" title="Import model">
            <i class="fas fa-arrow-alt-circle-down"/>&nbsp;Import
          </div>
          <div v-on:click="context('Export')" title="Export model">
            <i class="fas fa-arrow-alt-circle-up"/>&nbsp;Export
          </div>
          <div v-on:click="context('Delta')" title="Compare current and target state">
            <i class="fas fa-arrow-circle-right "/>&nbsp;Compare
          </div>
          <div v-on:click="context('Docs')" title="Documentation" v-if="locationHostname">
            <i class="fas fa-book"/>&nbsp;Docs
          </div>
          <div class="state" v-on:click="toggleState" title="Toggle between current and target state">
            &nbsp;<i class="fas fa-adjust"/>&nbsp; State: {{view.mode}}
          </div>
        </div>
        <div id="apptabs" class="tabs">
          <template v-if="view.navigation === 'Tenant'">
            <div class="active">General</div>
            <div v-on:click="context('Flavor')">Flavors</div>
            <div v-on:click="context('Image')">Images</div>
            <div v-on:click="context('Network')">Networks</div>
            <div v-on:click="context('Component')">Components</div>
          </template>
          <template v-if="view.navigation === 'Image'">
            <div v-on:click="context('Tenant')">General</div>
            <div v-on:click="context('Flavor')">Flavors</div>
            <div class="active">Images</div>
            <div v-on:click="context('Network')">Networks</div>
            <div v-on:click="context('Component')">Components</div>
          </template>
          <template v-if="view.navigation === 'Flavor'">
            <div v-on:click="context('Tenant')">General</div>
            <div class="active">Flavors</div>
            <div v-on:click="context('Image')">Images</div>
            <div v-on:click="context('Network')">Networks</div>
            <div v-on:click="context('Component')">Components</div>
          </template>
          <template v-if="view.navigation === 'Network'">
            <div v-on:click="context('Tenant')">General</div>
            <div v-on:click="context('Flavor')">Flavors</div>
            <div v-on:click="context('Image')">Images</div>
            <div class="active">Networks</div>
            <div v-on:click="context('Component')">Components</div>
          </template>
          <template v-if="view.navigation === 'Component'">
            <div v-on:click="context('Tenant')">General</div>
            <div v-on:click="context('Flavor')">Flavors</div>
            <div v-on:click="context('Image')">Images</div>
            <div v-on:click="context('Network')">Networks</div>
            <div class="active">Components</div>
          </template>
          <div class="button" v-if="view.navigation!='Tenant' && view.navigation!='Delta' && view.navigation!='Monitoring'" v-on:click="add"><i class="fas fa-plus"/></div>
        </div>
      </div>
</template>
<script>
export default {
    props: ['model','view'],
    data() {
      return {
        locationHostname: window.location.hostname
      }
    },
    computed: {
      title: function() {
        switch(this.view.detail) {
          case "Monitoring":
            return "Monitoring: " + this.model.vnf + " (" + this.model.version + ")"
          case "Delta":
            return "Comparison: " + current.vnf + " (" + current.version + ")" +
                   " versus "     + target.vnf  + " (" + target.version  + ")"
        }

        return (this.view.mode === 'current' ? "Current state: " : "Target state: ") +
               this.model.vnf + " (" + this.model.version + ")"
      }
    },
    methods: {
      context: function(ctxt) {
        setContext(ctxt)

        // resize appdetail to default values
        var detail = document.getElementById('appdetail')
        detail.style.left = null
        var tabs = document.getElementById('apptabs')
        tabs.style.display = null

        this.view.detail       = "Tenant"

        switch(ctxt) {
          case "Monitoring":
            this.view.detail = "Monitoring"
            detail.style.left = "0px"
            tabs.style.display = "none"
            this.$emit("monitor")
            break
          case "Import":
            this.view.detail = "Import"
            break
          case "Export":
            this.view.detail = "Export"
            break
          case "Delta":
            this.view.detail = "Delta"
            detail.style.left = "0px"
            tabs.style.display = "none"
            break
          case "Docs":
            var win = window.open("/docs/doc.html", '_blank');
            win.focus();
            break;
          default:
        }
      },
      toggleState: function() {

        if (this.view.mode === 'current')
        {
          current = JSON.parse(JSON.stringify(model));
          this.view.mode='target'
          setModel(target)
        } else if (this.view.mode === 'target') {
          target = JSON.parse(JSON.stringify(model));
          this.view.mode='current'
          setModel(current)
        }
        var detail = document.getElementById('appdetail')
        detail.style.left = null
        var tabs = document.getElementById('apptabs')
        tabs.style.display = null
        setContext('Tenant')
      },
      add: function() {
        if ( this.view.navigation === "Flavor" )    { addFlavor(); }
        if ( this.view.navigation === "Image" )     { addImage(); }
        if ( this.view.navigation === "Network" )   { addNetwork(); }
        if ( this.view.navigation === "Component" ) { addComponent(); }
      },
      del: function() {
        if ( this.view.navigation === "Flavor" )    { deleteFlavor(); }
        if ( this.view.navigation === "Image" )     { deleteImage(); }
        if ( this.view.navigation === "Network" )   { deleteNetwork(); }
        if ( this.view.navigation === "Component" ) { deleteComponent(); }
      },
      validate: function() {
        var object = JSON.parse(JSON.stringify(model));

        // verify schema
        msg = validate_schema(object);
        if (msg != '') {
          this.view.modal = msg
          return
        }

        // verify xrefs
        msg = validate_xref(object);
        if (msg != '') {
          this.view.modal = msg
          return
        }

        // everything is fine
        this.view.modal = "No Validation Errors"
      },
      reset: function() {
        if (this.view.mode === 'current')
        {
          current = JSON.parse(JSON.stringify(emptyModel()));
          this.view.mode='current'
          setModel(current)
          setContext('Tenant')
          // this.$forceUpdate();
        } else if (this.view.mode === 'target') {
          target = JSON.parse(JSON.stringify(emptyModel()));
          this.view.mode='target'
          setModel(target)
          setContext('Tenant')
          this.$forceUpdate();
        }
      }
    }
}
</script>