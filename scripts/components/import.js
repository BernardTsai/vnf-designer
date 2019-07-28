Vue.component(
  'importform',
  {
    props:    ['model','view','templates'],
    methods: {
      import_model: function() {
        var data   = document.getElementById("import").value;
        var object = null;
        var msg    = '';

        // convert data to object
        try {
          object = jsyaml.safeLoad(data);
        }
        catch (err)  {
          view.modal = err.message
          return
        }

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

        // copy data to model
        model.vnf        = object.vnf
        model.tenant     = object.tenant
        model.version    = object.version
        model.datacenter = object.datacenter
        model.flavors    = object.flavors
        model.images     = object.images
        model.networks   = object.networks
        model.components = object.components

        // set focus to tenant
        setContext("Tenant")
      }
    },
    template: `
    <div id="importform">
      <div class="header">
        Import:
        <div class="button" v-on:click="import_model"><i class="fas fa-redo-alt"/>&nbsp;Import</div>
      </div>

      <div class="line">
        <textarea id="import" name="import"></textarea>
      </div>
    </div>`
  }
)
