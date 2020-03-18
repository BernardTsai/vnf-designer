Vue.component(
  'exportform',
  {
    props:    ['model','view','templates'],
    methods: {
      copyToClipboard: function() {
        document.getElementById("export").focus();
        document.getElementById("export").select();
        document.execCommand("Copy");
      },
      download: function() {
        var text     = document.getElementById("export").value
        var element  = document.createElement('a')
        var filename = this.view.export == "Canonical" ? this.model.vnf + "-V" + this.model.version + ".yml" : "descriptor"

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      },
      downloadArchive: function(){
        var zip = new JSZip();

        // construct folders
        var input     = zip.folder("input")
        var output    = zip.folder("output")
        var elements  = zip.folder("elements")
        var docs      = zip.folder("docs")
        var bin       = zip.folder("bin")

        var tenant    = elements.folder("tenant")
        var networks  = elements.folder("networks")
        var servers   = elements.folder("servers")
        var routers   = elements.folder("router")
        var templates = elements.folder("templates")

        // export readme.md
        var txt = render(model, "readme")
        docs.file("README.md", txt)

        // export model
        var txt = jsyaml.safeDump(model)
        docs.file("model.yml", txt);

        // export communication matrix
        var txt = render(model, "Communication Matrix")
        docs.file("communication_matrix.txt", txt)

        // export environment file
        var txt = render(model, "Environment")
        input.file("environment.yml", txt)

        // export openrc file
        var txt = render(model, "openrc")
        input.file("openrc", txt)

        // export prequisites file
        var txt = render(model, "Prequisites")
        docs.file("prequisites.txt", txt)

        // export setup.sh
        zip.file("setup.sh", files['setup'])

        // export shell scripts into bin
        bin.file("infrastructure_create.sh",    files['infrastructure_create.sh'])
        bin.file("infrastructure_delete.sh",    files['infrastructure_delete.sh'])
        bin.file("infrastructure_status.sh",    files['infrastructure_status.sh'])
        bin.file("infrastructure_authorize.sh", files['infrastructure_authorize.sh'])
        bin.file("infrastructure_connect.sh",   files['infrastructure_connect.sh'])

        // construct a folder for each internal component
        var server_folders = {}
        var router_folders = {}
        for (var c of model.components) {
          if (c.placement != "OTHER" && c.placement != "ROUTER" ) {
            server_folders[model.tenant.prefix + c.name] = servers.folder(model.tenant.prefix + c.name);
          }
          if (c.placement == "ROUTER" ) {
            router_folders[model.tenant.prefix + c.name] = routers.folder(model.tenant.prefix + c.name);
          }
        }

        // export networks create file
        var txt = render(model, "Networks (create)")
        networks.file("create.yml", txt, {unixPermissions: "755"})

        // export networks delete file
        var txt = render(model, "Networks (delete)")
        networks.file("delete.yml", txt, {unixPermissions: "755"})

        // export networks status file
        var txt = render(model, "Networks (status)")
        networks.file("status.yml", txt, {unixPermissions: "755"})

        // export servers status file
        var txt = render(model, "Servers (status)")
        servers.file("status.yml", txt, {unixPermissions: "755"})

        // export server security definition files
        var txt  = render(model, "Servers (define security)")
        var txts = splitter(txt)

        for (var server in txts) {
          var folder  = server_folders[server]
          var content = txts[server]
          folder.file("define_security.yml", content, {unixPermissions: "755"})
        }

        // export server security undefinition files
        var txt  = render(model, "Servers (undefine security)")
        var txts = splitter(txt)

        for (var server in txts) {
          var folder  = server_folders[server]
          var content = txts[server]
          folder.file("undefine_security.yml", content, {unixPermissions: "755"})
        }

        // export server creation files
        var txt  = render(model, "Servers (create)")
        var txts = splitter(txt)

        for (var server in txts) {
          var serverType  = server.split("-")[0]
          var serverIndex = server.split("-")[1] ? "-" + server.split("-")[1] : ""
          var folder      = server_folders[serverType]
          var content     = txts[server]
          folder.file("create" + serverIndex + ".yml", content, {unixPermissions: "755"})
        }

        // export server deletion files
        var txt  = render(model, "Servers (delete)")
        var txts = splitter(txt)

        for (var server in txts) {
          var serverType  = server.split("-")[0]
          var serverIndex = server.split("-")[1] ? "-" + server.split("-")[1] : ""
          var folder      = server_folders[serverType]
          var content     = txts[server]
          folder.file("delete" + serverIndex + ".yml", content, {unixPermissions: "755"})
        }

        // export server ssh management files
        var txt  = render(model, "Servers (ssh)")
        var txts = splitter(txt)

        for (var server in txts) {
          var serverType  = server.split("-")[0]
          var serverIndex = server.split("-")[1] ? "-" + server.split("-")[1] : ""
          var folder      = server_folders[serverType]
          var content     = txts[server]
          folder.file("ssh" + serverIndex + ".yml", content, {unixPermissions: "755"})
        }

        // export networks and servers template file
        // export ansible cfg file
        input.file(     "ansible.cfg",    files['ansible.cfg'])
        templates.file( "networks.tmpl",  files['networks.tmpl'])
        templates.file( "servers.tmpl",   files['servers.tmpl'])
        templates.file( "config",         files['config'])
        templates.file( "inventory",      files['inventory'])
        output.file(    "inventory",      files['default_inventory'])

        var txt = render(model, "config")
        templates.file("config", txt, {unixPermissions: "644"})

        // export router creation files
        var txt  = render(model, "Router (create)")
        var txts = splitter(txt)

        for (var router in txts) {
          var folder  = router_folders[router]
          var content = txts[router]
          folder.file("create.yml", content, {unixPermissions: "755"})
        }

        // export router deletion files
        var txt  = render(model, "Router (delete)")
        var txts = splitter(txt)

        for (var router in txts) {
          var folder  = router_folders[router]
          var content = txts[router]
          folder.file("delete.yml", content, {unixPermissions: "755"})
        }

        // generate blob
        zip.generateAsync({type:"blob"})
        .then(function(content) {
          var element  = document.createElement('a');

          element.setAttribute('href', URL.createObjectURL(content) )
          element.setAttribute('download', this.model.vnf + "-V" + model.version + ".zip");

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        });
      }
    },
    computed: {
      formats: function() {
        return Object.keys(templates)
      },
      result: function() {
        var format = view.export
        var tmpl   = templates[format]
        var env = nunjucks.configure({trimBlocks: true})

        env.addFilter('fixed',   fixed_ips_filter )
        env.addFilter('allowed', allowed_ips_filter )
        env.addFilter('portmin', port_min_filter )
        env.addFilter('portmax', port_max_filter )

        var result = nunjucks.renderString(tmpl, model);

        return result;
      }
    },
    template: `
    <div id="exportform">
      <div class="header">
        Export: {{model.vnf}}/{{model.tenant.name}} ({{model.version}})
        <div class="button" title="download archive" v-on:click="downloadArchive"><i class="fas fa-file-archive"/>&nbsp;Archive</div>
        <div class="button" title="download file" v-on:click="download"><i class="fas fa-download"/>&nbsp;Save</div>
        <div class="button" title="copy to clipboard" v-on:click="copyToClipboard"><i class="fas fa-copy"/>&nbsp;Copy</div>
        <div class="format">
          Format: &nbsp;
          <select v-model="view.export">
            <option v-for="format in formats" v-bind:value="format">
              {{ format }}
            </option>
          </select>
        </div>
      </div>

      <div class="line">
        <textarea id="export" name="export" readonly>{{result}}</textarea>
      </div>
    </div>`
  }
)
