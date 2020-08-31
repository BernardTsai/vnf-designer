<template>
    <div id="importform">
      <div class="header">
        Import:
        <div class="button" v-on:click="import_model"><i class="fas fa-redo-alt"/>&nbsp;Impoort</div>
        <div class="button" v-on:click="load_model"><input @change="load_model2" type="file" id="files" name="files"/><i class="fas fa-upload"/>&nbsp;Load</div>
      </div>

      <div class="line">
        <textarea id="import" name="import"></textarea>
      </div>
    </div>
</template>
<script>
import jsyaml from 'js-yaml'
import { validate_schema, validate_xref } from '../../vnf_modules/validator'
import { setModel, setCurrentModel, setTargetModel } from '../../vnf_modules/model'
import { setContext } from '../../vnf_modules/view'
export default {
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
          this.view.modal = "Yaml Error:\n" + err.message
          return
        }

        // verify schema
        msg = validate_schema(object);
        if (msg != '') {
          this.view.modal = msg
          setContext("Import")
          return
        }

        // verify xrefs
        msg = validate_xref(object);
        if (msg != '') {
          this.view.modal = msg
          setContext("Import")
          return
        }

        // augment possibly undefined service
        if (!object.tenant.service) {
          object.tenant.service = {
            "network":  "",
            "cidr":     "",
            "gateway":  "",
            "proxy":    "",
            "port":     ""
          }
        }

        // copy data to model
        if (this.view.mode == "current")
        {
          setCurrentModel( object )
        }
        else
        {
          setTargetModel( object )
        }
        setModel(object)

        // set focus to tenant
        setContext("Tenant")
      }
    }
}
</script>
<style scoped>
#importform {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      0px;
  bottom:   0px;
  padding:  8px;

  overflow-y: scroll;
}

#importform .header {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      0px;
  height:   32px;
  padding:  8px;

  line-height: 32px;
  font-size:   20px;
  font-weight: bold;
}

#importform .header .button {
  float:            right;
  font-size:        12px;
  line-height:      32px;
  border:           none;
  vertical-align:   middle;
  text-align:       center;
  padding-right:    32px;
}

#importform .line {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      32px;
  bottom:   0px;
  padding:  8px;

  overflow:  scroll;
}

#importform .line textarea {
  width:     100%;
  height:    100%;
  font-size: 8px;
  border:    1px solid lightgrey;
}

#importform #files {
  display: none;
}

</style>
