Vue.component(
  'importform',
  {
    props:    ['model','view','templates'],
    methods: {
      load_model: function() {
        document.getElementById("files").click()
      },
      load_model2: function(evt) {

        // determine file
        var files = evt.target.files; // FileList object

        // loop through the FileList and load files
        for (var i = 0, f; f = files[i]; i++) {
          var reader = new FileReader();

          // closure to capture the file information.
          reader.onload = (function(theFile) {
            return function(e) { document.getElementById('import').value = e.target.result };
           })(f);

          // read in the image file as a data URL.
          reader.readAsText(f);

          // leave after first occurence
          break
        }
      },
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
        <div class="button" v-on:click="import_model"><i class="fas fa-redo-alt"/>&nbsp;Impoort</div>
        <div class="button" v-on:click="load_model"><input @change="load_model2" type="file" id="files" name="files"/><i class="fas fa-upload"/>&nbsp;Load</div>
      </div>

      <div class="line">
        <textarea id="import" name="import"></textarea>
      </div>
    </div>`
  }
)
