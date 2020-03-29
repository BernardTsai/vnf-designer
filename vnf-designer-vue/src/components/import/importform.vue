<template>
  <div id="importform">
    <div class="header">
      Import:
      <div class="button" @click="import_model">
        <i class="fas fa-redo-alt" />&nbsp;Impoort
      </div>
      <div class="button" @click="load_model">
        <input @change="load_model2" type="file" id="files" name="files" /><i
          class="fas fa-upload"
        />&nbsp;Load
      </div>
    </div>

    <div class="line">
      <textarea id="import" name="import"></textarea>
    </div>
  </div>
</template>
<script>
import jsyaml from "js-yaml"
import validate from "@/vnf.modules/validator"
export default {
  name: "importform",
  props: ["model", "view", "templates"],
  methods: {
    load_model: function() {
      document.getElementById("files").click();
    },
    load_model2: function(evt) {
      // determine file
      var files = evt.target.files; // FileList object

      // loop through the FileList and load files
      for (var i = 0, f; (f = files[i]); i++) {
        var reader = new FileReader();

        // closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            document.getElementById("import").value = e.target.result;
          };
        })(f);

        // read in the image file as a data URL.
        reader.readAsText(f);

        // leave after first occurence
        break;
      }
    },
    import_model: function() {
      var data = document.getElementById("import").value;
      var object = null;
      var msg = "";

      // convert data to object
      try {
        object = jsyaml.safeLoad(data);
      } catch (err) {
        this.view.modal = "Yaml Error:\n" + err.message;
        return;
      }

      // verify schema
      msg = validate.validate_schema(object);
      if (msg != "") {
        this.view.modal = msg;
        this.view.setContext("Import");
        return;
      }

      // verify xrefs
      msg = validate.validate_xref(object);
      if (msg != "") {
        this.view.modal = msg;
        this.view.setContext("Import");
        return;
      }

      // copy data to model
      if (this.view.mode == "current") {
        current = object;
      } else {
        target = object;
      }
      this.model.setModel(object);

      // set focus to tenant
      this.view.setContext("Tenant");
    }
  }
};
</script>
