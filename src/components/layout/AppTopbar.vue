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
import { setContext } from '../../vnf_modules/view'
import { setModel, current, target, addFlavor, addImage, addNetwork, addComponent } from '../../vnf_modules/model'
import { emptyModel } from '../../vnf_modules/misc'
import { validate_schema, validate_xref } from '../../vnf_modules/validator'
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
            var win = window.open(window.location.href+"docs", "_blank");
            win.focus();
            break;
          default:
        }
      },
      toggleState: function() {

        if (this.view.mode === 'current')
        {
          let current = JSON.parse(JSON.stringify(this.model));
          this.view.mode='target'
          setModel(target)
        } else if (this.view.mode === 'target') {
          let target = JSON.parse(JSON.stringify(this.model));
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
        var object = JSON.parse(JSON.stringify(this.model));

        // verify schema
        var msg = validate_schema(object);
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
          let current = JSON.parse(JSON.stringify(emptyModel()));
          this.view.mode='current'
          setModel(current)
          setContext('Tenant')
          // this.$forceUpdate();
        } else if (this.view.mode === 'target') {
          let target = JSON.parse(JSON.stringify(emptyModel()));
          this.view.mode='target'
          setModel(target)
          setContext('Tenant')
          this.$forceUpdate();
        }
      }
    }
}
</script>
<style scoped>
#appheader {
  position:         absolute;
  left:             0px;
  right:            0px;
  top:              0px;
  height:           56px;
  line-height:      32px;
  vertical-align:   middle;
  background-color: #2A3F54;
  border-bottom:    1px solid grey;
  min-width:        1024px;
}
#appheader .tabs {
  position:      absolute;
  left:          0px;
  width:         320px;
  top:           34px;
  height:        24px;
}

#appheader .tabs div {
  float:                    left;
  line-height:              20px;
  padding-left:             4px;
  padding-right:            4px;
  border-top-left-radius:   8px;
  border-top-right-radius:  8px;
  cursor:                   pointer;
  background-color:         grey;
  color:                    black;
  margin-top:               2px;
  margin-right:             1px;
  font-size:                11px;
}

#apptitle {
  color: white;
}

#appheader .tabs div.active {
  background-color:         lightgrey;
}

#appheader .tabs div.button {
  float:            right;
  margin:           4px;
  height:           16px;
  font-size:        8px;
  line-height:      16px;
  background-color: darkgrey;
  padding-right:    4px;
  border:           none;
  border-radius:    8px;
  vertical-align:   middle;
  text-align:       center;
}

#appheader .tabs div.button:hover {
  background-color: darkgrey;
  color:            white;
}
#appheader .logo {
  position:       absolute;
  top:            4px;
  left:           4px;
  height:         28px;
  line-height:    28px;
  padding-left:   4px;
  padding-right:  4px;
  vertical-align: middle;
  overflow:       hidden;
  text-overflow:  ellipsis;
  font-size:      20px;
  color:          #aaa;
}

#appheader .label {
  position:       absolute;
  top:            32px;
  left:           320px;
  height:         20px;
  line-height:    20px;
  padding-left:   4px;
  padding-right:  4px;
  vertical-align: middle;
  overflow:       hidden;
  text-overflow:  ellipsis;
  font-size:      16px;
}
#appheader .buttons {
  position:       absolute;
  right:          0px;
  top:            4px;
  height:         20px;
  padding-right:  32px;
}

#appheader .buttons div {
  float:          left;
  line-height:    20px;
  padding-left:   4px;
  padding-right:  4px;
  margin-left:    2px;
  margin-right:   2px;
  border-radius:  4px;
  cursor:         pointer;
  color:          darkgrey;
}

#appheader .buttons div:hover {
  color: black;
}

#appheader .buttons div:last-child {
  padding-right:   4px;
  width:           128px;
}

#appheader .buttons div.active {
  background-color: blue;
  color:            white;
}
</style>