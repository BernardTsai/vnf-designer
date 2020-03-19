Vue.component( 'appheader',
  {
    props:    ['model','view'],
    computed: {
      title: function() {
        switch(view.detail) {
          case "Monitoring":
            return "Monitoring: " + this.model.vnf + " (" + this.model.version + ")"
          case "Delta":
            return "Comparison: " + current.vnf + " (" + current.version + ")" +
                   " versus "     + target.vnf  + " (" + target.version  + ")"
        }

        return (view.mode === 'current' ? "Current state: " : "Target state: ") +
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

        view.detail       = "Tenant"

        switch(ctxt) {
          case "Monitoring":
            view.detail = "Monitoring"
            detail.style.left = "0px"
            tabs.style.display = "none"
            this.$emit("monitor")
            break
          case "Import":
            view.detail = "Import"
            break
          case "Export":
            view.detail = "Export"
            break
          case "Delta":
            view.detail = "Delta"
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

        if (view.mode === 'current')
        {
          current = JSON.parse(JSON.stringify(model));
          view.mode='target'
          setModel(target)
        } else if (view.mode === 'target') {
          target = JSON.parse(JSON.stringify(model));
          view.mode='current'
          setModel(current)
        }
        var detail = document.getElementById('appdetail')
        detail.style.left = null
        var tabs = document.getElementById('apptabs')
        tabs.style.display = null
        setContext('Tenant')
      },
      add: function() {
        if ( view.navigation === "Flavor" )    { addFlavor(); }
        if ( view.navigation === "Image" )     { addImage(); }
        if ( view.navigation === "Network" )   { addNetwork(); }
        if ( view.navigation === "Component" ) { addComponent(); }
      },
      del: function() {
        if ( view.navigation === "Flavor" )    { deleteFlavor(); }
        if ( view.navigation === "Image" )     { deleteImage(); }
        if ( view.navigation === "Network" )   { deleteNetwork(); }
        if ( view.navigation === "Component" ) { deleteComponent(); }
      },
      validate: function() {
        var object = JSON.parse(JSON.stringify(model));

        // verify schema
        msg = validate_schema(object);
        if (msg != '') {
          view.modal = msg
          return
        }

        // verify xrefs
        msg = validate_xref(object);
        if (msg != '') {
          view.modal = msg
          return
        }

        // everything is fine
        view.modal = "No Validation Errors"
      },
      reset: function() {
        if (view.mode === 'current')
        {
          current = JSON.parse(JSON.stringify(emptyModel()));
          view.mode='current'
          setModel(current)
          setContext('Tenant')
          // this.$forceUpdate();
        } else if (view.mode === 'target') {
          target = JSON.parse(JSON.stringify(emptyModel()));
          view.mode='target'
          setModel(target)
          setContext('Tenant')
          this.$forceUpdate();
        }
      }
    },
    template: `
      <div id="appheader" v-bind:class="view.mode">
        <div class="logo"><i class="fas fa-cloud"/>&nbsp;VNF Designer</div>
        <div id="apptitle" class="label">{{title}}</div>
        <div id="appbuttons" class="buttons">
          <div v-on:click="context('Tenant')" title="Tenant overview">
            <i class="fas fa-map"/>&nbsp;Overview
          </div>
          <div v-on:click="context('Monitoring')" title="Monitoring overview" v-if="window.location.hostname!=''">
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
          <div v-on:click="context('Docs')" title="Documentation" v-if="window.location.hostname!=''">
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
      </div>`
  }
);

//------------------------------------------------------------------------------

Vue.component( 'appnavigation',
  {
    props:    ['model','view'],
    template: `
      <div id="appnavigation">
        <tenantform
          v-if="view.navigation === 'Tenant'"
          v-bind:model="model"
          v-bind:view="view">
        </tenantform>
        <flavors
          v-if="view.navigation === 'Flavor'"
          v-bind:model="model"
          v-bind:view="view">
        </flavors>
        <images
          v-if="view.navigation === 'Image'"
          v-bind:model="model"
          v-bind:view="view">
        </images>
        <networks
          v-if="view.navigation === 'Network'"
          v-bind:model="model"
          v-bind:view="view">
        </networks>
        <components
          v-if="view.navigation === 'Component'"
          v-bind:model="model"
          v-bind:view="view">
        </components>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'appdetail',
  {
    props:    ['model','current','target','view','templates'],
    template: `
      <div id="appdetail">
        <flavorform
          v-if="view.detail === 'Flavor'"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:flavor="view.entity">
        </flavorform>
        <imageform
          v-if="view.detail === 'Image'"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:image="view.entity">
        </imageform>
        <networkform
          v-if="view.detail === 'Network'"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:network="view.entity">
        </networkform>
        <componentform
          v-if="view.detail === 'Component'"
          v-bind:model="model"
          v-bind:component="view.entity">
        </componentform>
        <exportform
          v-if="view.detail === 'Export'"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:templates="templates">
        </exportform>
        <importform
          v-if="view.detail === 'Import'"
          v-bind:model="model"
          v-bind:view="view">
        </importform>
        <deltaform
          v-if="view.detail === 'Delta'"
          v-bind:model="model"
          v-bind:current="current"
          v-bind:target="target"
          v-bind:view="view">
        </deltaform>
        <tenant
          v-if="view.detail === 'Tenant'"
          v-bind:model="model"
          v-bind:view="view">
        </tenant>
        <monitoring
          v-if="view.detail === 'Monitoring'"
          v-bind:model="model"
          v-bind:view="view">
        </monitoring>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'app',
  {
    props:    ['model','current','target','view','templates'],
    template: `
      <div>
        <appheader     v-bind:model="model" v-bind:view="view"></appheader>
        <appnavigation v-bind:model="model" v-bind:view="view"></appnavigation>
        <appdetail
          v-bind:model="model"
          v-bind:current="current"
          v-bind:target="target"
          v-bind:view="view"
          v-bind:templates="templates">
        </appdetail>
        <modal v-if="view.modal !== ''" v-bind:view="view"></modal>
      </div>`
  }
)
