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
        var text     = document.getElementById("export").value;
        var element  = document.createElement('a');
        var filename = "vnf-descriptor.txt";

        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
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
        <div class="button" v-on:click="download"><i class="fas fa-download"/>&nbsp;Download</div>
        <div class="button" v-on:click="copyToClipboard"><i class="fas fa-copy"/>&nbsp;Copy</div>
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
