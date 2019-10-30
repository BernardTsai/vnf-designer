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
        var filename = this.view.export == "Canonical" ? this.model.vnf + "-V" + this.model.version + ".yml" : "descriptor.txt"

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      },
      downloadArchive: function(){
        var zip = new JSZip();

        // export readme.md
        var txt = render(model, "readme")
        zip.file("README.md", txt)

        // export model
        var txt = jsyaml.safeDump(model)
        zip.file("model.yml", txt);

        // export communication matrix
        var txt = render(model, "Communication Matrix")
        zip.file("communication_matrix.txt", txt)

        // export environment file
        var txt = render(model, "Environment")
        zip.file("environment.yml", txt)

        // export openrc file
        var txt = render(model, "openrc")
        zip.file("openrc", txt)

        // export prequisites file
        var txt = render(model, "Prequisites")
        zip.file("prequisites.txt", txt)

        // export setup.sh
        zip.file("setup.sh", files['setup'])

        // construct folders
        var tenant    = zip.folder("tenant")
        var networks  = zip.folder("networks")
        var servers   = zip.folder("servers")
        var routers   = zip.folder("router")
        var templates = zip.folder("templates")
        var output    = zip.folder("output")

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

        // export servers define security all file
        var txt = render(model, "Servers (define security all)")
        servers.file("define_security.yml", txt, {unixPermissions: "755"})

        var txt = render(model, "Servers (define security all2)")
        servers.file("define_security.sh", txt, {unixPermissions: "755"})

        // export servers undefine security all file
        var txt = render(model, "Servers (undefine security all)")
        servers.file("undefine_security.yml", txt, {unixPermissions: "755"})

        var txt = render(model, "Servers (undefine security all2)")
        servers.file("undefine_security.sh", txt, {unixPermissions: "755"})

        // export servers create all file
        var txt = render(model, "Servers (create all)")
        servers.file("create.yml", txt, {unixPermissions: "755"})

        var txt = render(model, "Servers (create all2)")
        servers.file("create.sh", txt, {unixPermissions: "755"})

        // export servers delete all file
        var txt = render(model, "Servers (delete all)")
        servers.file("delete.yml", txt, {unixPermissions: "755"})

        var txt = render(model, "Servers (delete all2)")
        servers.file("delete.sh", txt, {unixPermissions: "755"})

        // export servers ssh keys update file
        var txt = render(model, "Servers (ssh all)")
        servers.file("ssh.yml", txt, {unixPermissions: "755"})

        var txt = render(model, "Servers (ssh all2)")
        servers.file("ssh.sh", txt, {unixPermissions: "755"})

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
          var folder  = server_folders[server]
          var content = txts[server]
          folder.file("create.yml", content, {unixPermissions: "755"})
        }

        // export server deletion files
        var txt  = render(model, "Servers (delete)")
        var txts = splitter(txt)

        for (var server in txts) {
          var folder  = server_folders[server]
          var content = txts[server]
          folder.file("delete.yml", content, {unixPermissions: "755"})
        }

        // export server ssh management files
        var txt  = render(model, "Servers (ssh)")
        var txts = splitter(txt)

        for (var server in txts) {
          var folder  = server_folders[server]
          var content = txts[server]
          folder.file("ssh.yml", content, {unixPermissions: "755"})
        }

        // export networks and servers template file
        // export ansible cfg file
        zip.file(       "ansible.cfg",    files['ansible.cfg'])
        templates.file( "networks.tmpl",  files['networks.tmpl'])
        templates.file( "servers.tmpl",   files['servers.tmpl'])
        // templates.file( "config",         files['config'])
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
