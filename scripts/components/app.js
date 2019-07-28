Vue.component( 'appheader',
  {
    props:    ['model','view'],
    methods: {
      context: function(ctxt) {
        setContext(ctxt)
      },
      toggleState: function() {
        if (view.mode === 'current')
        {
          current = JSON.parse(JSON.stringify(model));
          view.mode='target'
          setModel(target)
          setContext('Tenant')
        } else if (view.mode === 'target') {
          target = JSON.parse(JSON.stringify(model));
          view.mode='current'
          setModel(current)
          setContext('Tenant')
        }
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
        <div v-if="view.detail !== 'Delta' && view.mode === 'current'" class="label">Current state: {{model.vnf}}/{{model.tenant.name}} ({{model.version}})</div>
        <div v-if="view.detail !== 'Delta' && view.mode === 'target'"  class="label">Target state: {{model.vnf}}/{{model.tenant.name}} ({{model.version}})</div>
        <div v-if="view.detail === 'Delta'" class="label">Current state: {{model.vnf}}/{{model.tenant.name}} ({{model.version}}) &rarr; Target state: {{model.vnf}}/{{model.tenant.name}} ({{model.version}})</div>
        <div class="buttons">
          <div v-on:click="reset">
            <i class="fas fa-certificate"/>&nbsp;Reset
          </div>
          <div v-on:click="validate">
            <i class="fas fa-check-circle"/>&nbsp;Validate
          </div>
          <div v-on:click="context('Import')">
            <i class="fas fa-arrow-alt-circle-down"/>&nbsp;Import
          </div>
          <div v-on:click="context('Export')">
            <i class="fas fa-arrow-alt-circle-up"/>&nbsp;Export
          </div>
          <div v-on:click="context('Delta')">
            <i class="fas fa-arrow-circle-right "/>&nbsp;Compare
          </div>
          <div class="state" v-on:click="toggleState">
            &nbsp;<i class="fas fa-adjust"/>&nbsp; State: {{view.mode}}
          </div>
        </div>
        <div class="tabs">
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
          <div class="button" v-if="view.navigation!='Tenant' && view.navigation!='Delta'" v-on:click="add"><i class="fas fa-plus"/></div>
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
