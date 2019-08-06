const DX         = 8;
const DY         = 8;
const NET_WIDTH  = 32;
const NET_HEIGHT = 64;
const CMP_WIDTH  = 200;
const CMP_HEIGHT = 32;
const TXT_HEIGHT = 16;
const XOFFSET    = DX+CMP_WIDTH;
const YOFFSET    = DY+NET_HEIGHT;
const XSLOT      = DX+NET_WIDTH;
const YSLOT      = DY+CMP_HEIGHT;
const PXOFFSET   = 320;
const PYOFFSET   = 56;

//------------------------------------------------------------------------------

Vue.component( 'tenant_network',
  {
    props:   ['model','view','network','index'],
    methods: {
      handleChange: function(e) {
        if (e.target.value==="") {deleteNetwork(this.network)}
      },
      viewNetwork: function(e) {
        this.view.navigation = "Network"
        this.view.detail='Network';
        this.view.entity=this.network;
        return false;
      }
    },
    computed: {
      t: function(index) {
        return DY + TXT_HEIGHT;
      },
      l: function(index) {
        return CMP_WIDTH + (this.index+1) * (DX+NET_WIDTH) - 1;
      },
      w: function(index) {
        return NET_WIDTH;
      },
      h: function(index) {
        return DY+NET_HEIGHT + this.model.components.length * (DY+CMP_HEIGHT) - TXT_HEIGHT;
      }
    },
    template: `
      <div
        v-bind:class="'network network' + index"
        v-bind:style="{
          top:         t + 'px',
          left:        l + 'px',
          width:       w + 'px',
          height:      h + 'px'
        }"
        v-on:click.alt="viewNetwork"
        v-bind:title="'ipv4: ' + network.ipv4 + '\\nipv6: ' + network.ipv6">
        <input v-model="network.name" v-on:change="handleChange">
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'tenant_network2',
  {
    props:   ['model','view'],
    methods: {
      handleClick: function() {addNetwork()}
    },
    computed: {
      t: function(index) {
        return DY + TXT_HEIGHT;
      },
      l: function(index) {
        return CMP_WIDTH + (this.model.networks.length+1) * (DX+NET_WIDTH) - 1;
      },
      w: function(index) {
        return NET_WIDTH;
      },
      h: function(index) {
        return DY+NET_HEIGHT + this.model.components.length * (DY+CMP_HEIGHT) - TXT_HEIGHT;
      }
    },
    template: `
      <div
        class="network dummy"
        v-on:click="handleClick"
        v-bind:style="{
          top:         t + 'px',
          left:        l + 'px',
          width:       w + 'px',
          height:      h + 'px'
        }"><input class='label' value='new' readonly></div>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'tenant_interface',
  {
    props:   ['model','view','component','interface','index','subindex'],
    computed: {
      t: function() {
        return (this.subindex+1) * CMP_HEIGHT/(this.component.interfaces.length + 1)
      },
      l: function() {
        return CMP_WIDTH;
      },
      w: function() {
        for ( var i = 0; i < this.model.networks.length; i++ )
        {
          if (this.interface.network === this.model.networks[i].name) {
            return i * (DX+NET_WIDTH) + NET_WIDTH
          }
        }

        return 0
      },
      h: function() {
        return 1
      },
      n: function() {
        for ( var i = 0; i < this.model.networks.length; i++ )
        {
          if (this.interface.network === this.model.networks[i].name) {
            return i
          }
        }

        return 0
      },
      a: function() {
        return this.interface.network + (this.interface.attributes != "" ? ": " + this.interface.attributes : "")
      }
    },
    template: `
      <div
        v-bind:class="'interface network' + n + ' component' + index"
        v-bind:style="{
          top:    t + 'px',
          left:   l + 'px',
          width:  w + 'px',
          height: h + 'px',
        }"
        v-bind:title="a">
        <div class="serverport"></div>
        <div class="switchport"></div>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'tenant_component',
  {
    props:   ['model','view','component','index'],
    methods: {
      handleChange: function(e) {
        if (e.target.value==="") {
          deleteComponent(this.component)
        }
      },
      viewComponent: function(e) {
        this.view.navigation = "Component"
        this.view.detail='Component';
        this.view.entity=this.component;
      }
    },
    computed: {
      t: function() {
        return DY+NET_HEIGHT + this.index * (DY+CMP_HEIGHT);
      },
      l: function() {
        return DX
      },
      w: function() {
        return CMP_WIDTH
      },
      h: function() {
        return CMP_HEIGHT
      },
      z: function() {
        return this.component.placement.substr(0,1).toUpperCase();
      },
      zones: function() {
        return [{name: "OTHER", tag: 'O'}, {name: "EXT", tag: 'E'}, {name: "INT", tag: 'I'}, {name: "MGMT", tag: 'M'}, {name: "ROUTER", tag: 'R'}]
      }
    },
    template: `
      <div
        v-bind:class="'component index' + index"
        v-bind:style="{
          top:    t + 'px',
          left:   l + 'px',
          width:  w + 'px',
          height: h + 'px'
        }"
        v-on:click.alt="viewComponent">
        <div v-bind:class="'zone zone-' + z">
          <select v-model="component.placement">
            <option disabled value="">Please select one</option>
            <option v-for="zone in zones" v-bind:value="zone.name">
              {{ zone.tag }}
            </option>
          </select>
        </div>
        <div class="name"><input v-model="component.name" v-on:change="handleChange"></div>
        <div class="sizing" v-if="component.placement != 'OTHER' && component.placement != 'ROUTER'">({{component.min}}/{{component.size}}/{{component.max}})</div>
        <tenant_interface
          v-for="(interface, subindex) in component.interfaces"
          :key="subindex"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:component="component"
          v-bind:interface="interface"
          v-bind:index="index"
          v-bind:subindex="subindex"></tenant_interface>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'tenant_component2',
  {
    props:   ['model','view'],
    methods: {
      handleClick: function() {addComponent()}
    },
    computed: {
      t: function() {
        return DY+NET_HEIGHT + this.model.components.length * (DY+CMP_HEIGHT);
      },
      l: function() {
        return DX
      },
      w: function() {
        return CMP_WIDTH
      },
      h: function() {
        return CMP_HEIGHT
      }
    },
    template: `
      <div
        class="component dummy"
        v-on:click="handleClick"
        v-bind:style="{
          top:    t + 'px',
          left:   l + 'px',
          width:  w + 'px',
          height: h + 'px'
        }">
        <div class="'zone zone-O'"></div>
        <div class="name">new component</div>
        <div class="sizing"></div>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'tenant',
  {
    props:    ['model','view'],
    methods: {
      handleClick: function(e) {
        var x = e.pageX - PXOFFSET - XOFFSET;
        var y = e.pageY - PYOFFSET - YOFFSET;

        var net_index = Math.floor(x/XSLOT);
        var cmp_index = Math.floor(y/YSLOT);

        // check if click was in the cross-section of a network and a component
        if ( 0 <= net_index && net_index < this.model.networks.length &&
             0 <= cmp_index && cmp_index < this.model.components.length ) {

          // determine network and component
          var net = this.model.networks[net_index];
          var cmp = this.model.components[cmp_index];

          // delete interface if component has an interface to that network
          var iface = hasComponentInterface(cmp,net.name)
          if (iface) {
            delComponentInterface(cmp,iface)
          } else {
            addComponentInterface(cmp,net.name)
          }
        }
      }
    },
    template: `
    <div id="tenant_layout" v-on:click="handleClick">
      <div class="vnf">VNF: {{model.vnf}}</div>
      <div class="tenant">Tenant: {{model.tenant.name}}</div>
      <div class="version">Version: {{model.version}}</div>
      <div class="date">Timestamp: {{view.now}}</div>
      <tenant_network
        v-for="(network, index) in model.networks"
        :key="'network-' + index"
        v-bind:model="model"
        v-bind:view="view"
        v-bind:network="network"
        v-bind:index="index"></tenant_network>
      <tenant_network2
        :key="'network-dummy'"
        v-bind:model="model"
        v-bind:view="view"></tenant_network2>
      <tenant_component
        v-for="(component, index) in model.components"
        :key="'component-' + index"
        v-bind:model="model"
        v-bind:view="view"
        v-bind:component="component"
        v-bind:index="index"></tenant_component>
      <tenant_component2
        :key="'component-dummy'"
        v-bind:model="model"
        v-bind:view="view"></tenant_component2>
    </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component( 'tenantform',
  {
    props:    ['model','view'],
    methods: {
      download: function(){
        var zip = new JSZip();

        // export model
        var txt = jsyaml.safeDump(model)
        zip.file("model.yml", txt);

        // export communication matrix
        var txt = render(model, "Communication Matrix")
        zip.file("communication_matrix.txt", txt)

        // export environment file
        var txt = render(model, "Environment")
        zip.file("environment.yml", txt)

        // construct folders
        var tenant    = zip.folder("tenant");
        var networks  = zip.folder("networks");
        var servers   = zip.folder("servers");
        var routers   = zip.folder("router");
        var templates = zip.folder("templates");
        var output    = zip.folder("output");

        // construct a folder for each internal component
        var server_folders = {}
        var router_folders = {}
        for (var c of model.components) {
          if (c.placement != "OTHER" && c.placement != "ROUTER" ) {
            server_folders[c.name] = servers.folder(c.name);
          }
          if (c.placement == "ROUTER" ) {
            router_folders[c.name] = routers.folder(c.name);
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

        // export servers undefine security all file
        var txt = render(model, "Servers (define security all)")
        servers.file("undefine_security.yml", txt, {unixPermissions: "755"})

        // export servers create all file
        var txt = render(model, "Servers (create all)")
        servers.file("create.yml", txt, {unixPermissions: "755"})

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

        // export networks and servers template file
        // export ansible cfg file
        servers.file(   "ssh.yml",        files['ssh.yml'], {unixPermissions: "755"})
        zip.file(       "ansible.cfg",    files['ansible.cfg'])
        templates.file( "networks.tmpl",  files['networks.tmpl'])
        templates.file( "servers.tmpl",   files['servers.tmpl'])
        templates.file( "config",         files['config'])
        templates.file( "inventory",      files['inventory'])
        output.file(    "inventory",      files['default_inventory'])

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
          var text     = document.getElementById("download").value;
          var element  = document.createElement('a');

          element.setAttribute('href', URL.createObjectURL(content) )
          element.setAttribute('download', "model.zip");

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
        });
      }
    },
    template: `
    <div id="tenantform">
      <div class="header">Tenant: {{model.name}}</div>

      <div class="line">
        <label for="name">VNF:</label>
        <input v-model="model.vnf" id="vnf" name="vnf" required>
      </div>
      <div class="line">
        <label for="version">Version:</label>
        <input v-model="model.version" id="version" name="version" required>
      </div>
      <hr/>
      <div class="line">
        <label for="tenant">Tenant:</label>
        <input v-model="model.tenant.name" id="tenant_name" name="tenant_name" required>
      </div>
      <div class="line">
        <label for="tenant_auth_username">Username:</label>
        <input v-model="model.tenant.auth.username" id="tenant_auth_username" name="tenant_auth_username" required>
      </div>
      <div class="line">
        <label for="tenant_auth_password">Password:</label>
        <input v-model="model.tenant.auth.password" id="tenant_auth_password" name="tenant_auth_password" required>
      </div>
      <div class="line">
        <label for="tenant_auth_proxy">API Proxy:</label>
        <input v-model="model.tenant.auth.proxy" id="tenant_auth_proxy" name="tenant_auth_proxy" required>
      </div>
      <div class="line">
        <label for="tenant_auth_url">URL:</label>
        <input v-model="model.tenant.auth.url" id="tenant_auth_url" name="tenant_auth_url" required>
      </div>
      <div class="line">
        <label for="tenant_auth_cert">CERT:</label>
        <input v-model="model.tenant.auth.cert" id="tenant_auth_cert" name="tenant_auth_cert" required>
      </div>
      <div class="line">
        <label for="tenant_auth_region">Region:</label>
        <input v-model="model.tenant.auth.region" id="tenant_auth_region" name="tenant_auth_region" required>
      </div>
      <div class="line">
        <label for="tenant_auth_vol_api">Vol. API:</label>
        <input v-model="model.tenant.auth.vol_api" id="tenant_auth_vol_api" name="tenant_auth_vol_api" required>
      </div>
      <div class="line">
        <label for="tenant_auth_plugin">Plug-In:</label>
        <input v-model="model.tenant.auth.plugin" id="tenant_auth_plugin" name="tenant_auth_plugin" required>
      </div>
      <hr/>
      <div class="line">
        <label for="tenant_service_network">SVC-Network:</label>
        <input v-model="model.tenant.service.network" id="tenant_service_network" name="tenant_service_network" required>
      </div>
      <div class="line">
        <label for="tenant_service_cidr">CIDR:</label>
        <input v-model="model.tenant.service.cidr" id="tenant_service_cidr" name="tenant_service_cidr" required>
      </div>
      <div class="line">
        <label for="tenant_service_gateway">Gateway:</label>
        <input v-model="model.tenant.service.gateway" id="tenant_service_gateway" name="tenant_service_gateway" required>
      </div>
      <div class="line">
        <label for="tenant_service_proxy">Proxy:</label>
        <input v-model="model.tenant.service.proxy" id="tenant_service_proxy" name="tenant_service_proxy" required>
      </div>
      <div class="line">
        <label for="tenant_service_port">Proxy Port:</label>
        <input v-model="model.tenant.service.port" id="tenant_service_port" name="tenant_service_port" required>
      </div>
      <hr/>
      <div class="line">
        <label for="tenant_jumphost">Jumphost:</label>
        <input v-model="model.tenant.jumphost" id="tenant_jumphost" name="tenant_jumphost" required>
      </div>
      <hr/>
      <div class="line">
        <label for="tenant_proxy_http">http proxy:</label>
        <input v-model="model.tenant.proxy.http" id="tenant_proxy_http" name="tenant_proxy_http">
      </div>
      <div class="line">
        <label for="tenant_proxy_https">https proxy:</label>
        <input v-model="model.tenant.proxy.https" id="tenant_proxy_https" name="tenant_proxy_https">
      </div>
      <hr/>
        <br/>
        <div class="button" id="download" name="download" v-on:click="download">Download model: &nbsp;<i class="fas fa-download"/></div>

    </div>`
  }
)
