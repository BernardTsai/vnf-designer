<template>
  <div id="exportform">
    <div class="header">
      Export: {{ model.current.vnf }}/{{ model.current.tenant.name }} ({{
        model.current.version
      }})
      <div class="button" title="download archive" @click="downloadArchive">
        <i class="fas fa-file-archive" />&nbsp;Archive
      </div>
      <div class="button" title="download file" @click="download">
        <i class="fas fa-download" />&nbsp;Save
      </div>
      <div
        class="button"
        title="copy to clipboard"
        @click="copyToClipboard"
      >
        <i class="fas fa-copy" />&nbsp;Copy
      </div>
      <div class="format">
        Format: &nbsp;
        <select v-model="view.export">
          <option v-for="format in formats" :key="format" :value="format">
            {{ format }}
          </option>
        </select>
      </div>
    </div>

    <div class="line">
      <textarea id="export" name="export" readonly v-model="result"></textarea>
    </div>
  </div>
</template>
<script>
import files from "@/vnf.modules/files";
import misc from "@/vnf.modules/misc";
export default {
  name: "exportform",
  props: ["model", "view", "templates"],
  methods: {
    copyToClipboard: function() {
      document.getElementById("export").focus();
      document.getElementById("export").select();
      document.execCommand("Copy");
    },
    download: function() {
      var text = document.getElementById("export").value;
      var element = document.createElement("a");
      var filename =
        this.view.export == "Canonical"
          ? this.model.current.vnf + "-V" + this.model.current.version + ".yml"
          : "descriptor.txt";

      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    downloadArchive: function() {
      var JSZip = require("jszip");
      var zip = new JSZip();

      // construct folders
      var input = zip.folder("input");
      var output = zip.folder("output");
      var elements = zip.folder("elements");
      var docs = zip.folder("docs");
      var bin = zip.folder("bin");

      // var tenant = elements.folder("tenant");
      var networks = elements.folder("networks");
      var servers = elements.folder("servers");
      var routers = elements.folder("router");
      var templates = elements.folder("templates");

      // export readme.md
      var txt = misc.render(this.model, "readme");
      docs.file("README.md", txt);

      // export model
      var jsyaml = require("js-yaml");
      txt = jsyaml.safeDump(this.model);
      docs.file("model.yml", txt);

      // export communication matrix
      txt = misc.render(this.model, "Communication Matrix");
      docs.file("communication_matrix.txt", txt);

      // export environment file
      txt = misc.render(this.model, "Environment");
      input.file("environment.yml", txt);

      // export openrc file
      txt = misc.render(this.model, "openrc");
      input.file("openrc", txt);

      // export prequisites file
      txt = misc.render(this.model, "Prequisites");
      docs.file("prequisites.txt", txt);

      // export setup.sh
      zip.file("setup.sh", files["setup"]);

      // export shell scripts into bin
      bin.file("infrastructure_create.sh", files["infrastructure_create.sh"]);
      bin.file("infrastructure_delete.sh", files["infrastructure_delete.sh"]);
      bin.file("infrastructure_status.sh", files["infrastructure_status.sh"]);
      bin.file(
        "infrastructure_authorize.sh",
        files["infrastructure_authorize.sh"]
      );
      bin.file("infrastructure_connect.sh", files["infrastructure_connect.sh"]);

      // construct a folder for each internal component
      var server_folders = {};
      var router_folders = {};
      for (var c of this.model.current.components) {
        if (c.placement != "OTHER" && c.placement != "ROUTER") {
          server_folders[
            this.model.current.tenant.prefix + c.name
          ] = servers.folder(this.model.current.tenant.prefix + c.name);
        }
        if (c.placement == "ROUTER") {
          router_folders[
            this.model.current.tenant.prefix + c.name
          ] = routers.folder(this.model.current.tenant.prefix + c.name);
        }
      }

      // export networks create file
      txt = misc.render(this.model, "Networks (create)");
      networks.file("create.yml", txt, { unixPermissions: "755" });

      // export networks delete file
      txt = misc.render(this.model, "Networks (delete)");
      networks.file("delete.yml", txt, { unixPermissions: "755" });

      // export networks status file
      txt = misc.render(this.model, "Networks (status)");
      networks.file("status.yml", txt, { unixPermissions: "755" });

      // export servers status file
      txt = misc.render(this.model, "Servers (status)");
      servers.file("status.yml", txt, { unixPermissions: "755" });

      // export server security definition files
      txt = misc.render(this.model, "Servers (define security)");
      var txts = misc.splitter(txt);

      for (var server in txts) {
        var folder = server_folders[server];
        var content = txts[server];
        folder.file("define_security.yml", content, { unixPermissions: "755" });
      }

      // export server security undefinition files
      txt = misc.render(this.model, "Servers (undefine security)");
      txts = misc.splitter(txt);

      for (server in txts) {
        folder = server_folders[server];
        content = txts[server];
        folder.file("undefine_security.yml", content, {
          unixPermissions: "755"
        });
      }

      // export server creation files
      txt = misc.render(this.model, "Servers (create)");
      txts = misc.splitter(txt);

      for (server in txts) {
        var serverType = server.split("-")[0];
        var serverIndex = server.split("-")[1]
          ? "-" + server.split("-")[1]
          : "";
        folder = server_folders[serverType];
        content = txts[server];
        folder.file("create" + serverIndex + ".yml", content, {
          unixPermissions: "755"
        });
      }

      // export server deletion files
      txt = misc.render(this.model, "Servers (delete)");
      txts = misc.splitter(txt);

      for (server in txts) {
        serverType = server.split("-")[0];
        serverIndex = server.split("-")[1] ? "-" + server.split("-")[1] : "";
        folder = server_folders[serverType];
        content = txts[server];
        folder.file("delete" + serverIndex + ".yml", content, {
          unixPermissions: "755"
        });
      }

      // export server ssh management files
      txt = misc.render(this.model, "Servers (ssh)");
      txts = misc.splitter(txt);

      for (server in txts) {
        serverType = server.split("-")[0];
        serverIndex = server.split("-")[1] ? "-" + server.split("-")[1] : "";
        folder = server_folders[serverType];
        content = txts[server];
        folder.file("ssh" + serverIndex + ".yml", content, {
          unixPermissions: "755"
        });
      }

      // export networks and servers template file
      // export ansible cfg file
      input.file("ansible.cfg", files["ansible.cfg"]);
      templates.file("networks.tmpl", files["networks.tmpl"]);
      templates.file("servers.tmpl", files["servers.tmpl"]);
      templates.file("config", files["config"]);
      templates.file("inventory", files["inventory"]);
      output.file("inventory", files["default_inventory"]);

      txt = misc.render(this.model, "config");
      templates.file("config", txt, { unixPermissions: "644" });

      // export router creation files
      txt = misc.render(this.model, "Router (create)");
      txts = misc.splitter(txt);

      for (var router in txts) {
        folder = router_folders[router];
        content = txts[router];
        folder.file("create.yml", content, { unixPermissions: "755" });
      }

      // export router deletion files
      txt = misc.render(this.model, "Router (delete)");
      txts = misc.splitter(txt);

      for (router in txts) {
        folder = router_folders[router];
        content = txts[router];
        folder.file("delete.yml", content, { unixPermissions: "755" });
      }

      // generate blob
      zip.generateAsync({ type: "blob" }).then(function(content) {
        var element = document.createElement("a");

        element.setAttribute("href", URL.createObjectURL(content));
        element.setAttribute(
          "download",
          this.model.current.vnf + "-V" + this.model.current.version + ".zip"
        );

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      });
    }
  },
  computed: {
    formats: function() {
      return Object.keys(this.templates);
    },
    result: function() {
      var nunjucks = require("nunjucks");
      var format = this.view.export;
      var tmpl = this.templates[format];
      var env = nunjucks.configure({ trimBlocks: true });

      env.addFilter("fixed", misc.fixed_ips_filter);
      env.addFilter("allowed", misc.allowed_ips_filter);
      env.addFilter("portmin", misc.port_min_filter);
      env.addFilter("portmax", misc.port_max_filter);

      var result = nunjucks.renderString(tmpl, this.model.current);

      return result;
    }
  }
};
</script>
