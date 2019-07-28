Vue.component(
  'networkitem',
  {
    props:    ['model','view','network'],
    methods:  {
      pick: function(entity) {
        this.view.detail='Network';
        this.view.entity=entity;
      },
      del: function(entity) {
        deleteNetwork(entity)
        if ( this.view.detail === 'Network' ) {
          this.view.detail='';
          this.view.entity=null;
        }
      }
    },
    template: `
      <div class="item">
        <div class="name"   v-on:click="pick(network)"><i class="fas fa-cloud"/>&nbsp;{{network.name}}</div>
        <div class="button" v-on:click="del(network)"><i class="fas fa-minus"/></div>
      </div>`
  }
)

//------------------------------------------------------------------------------

Vue.component(
  'networks',
  {
    props:    ['model','view'],
    template: `
      <div class="list">
        <networkitem
          :key="network.uuid"
          v-for="network in model.networks"
          v-bind:model="model"
          v-bind:view="view"
          v-bind:network="network"></networkitem>
      </div>`
  }
)

//------------------------------------------------------------------------------

// network form
Vue.component(
  'networkform',
  {
    props:    ['model','view','network'],
    template: `
    <div id="networkform">
      <div class="header">Network: {{network.name}}</div>

      <div class="line">
        <label for="name">Name:</label>
        <input v-model="network.name" id="name" name="name"  title="Name of the network" required>
      </div>
      <div class="line">
        <label for="special">Attributes:</label>
        <input v-model="network.special" id="special" name="special" title="Special attributes">
      </div>
      <div class="line">
        <label for="special">External:</label>
        <select id="external" name="external" v-model="network.external">
          <option>true</option>
          <option>false</option>
        </select>
      </div>

      <div class="subheader">IPv4:</div>

      <div class="line">
        <label for="ipv4">CIDR:</label>
        <input v-model="network.ipv4" id="ipv4" name="ipv4" title="IPv4 CIDR">
      </div>
      <div class="line">
        <label for="ipv4">Gateway:</label>
        <input v-model="network.ipv4gw" id="ipv4gw" name="ipv4gw" title="IPv4 gateway">
      </div>
      <div class="line">
        <label for="ipv4">Start:</label>
        <input v-model="network.ipv4start" id="ipv4start" name="ipv4start" title="Start of IPv4 address pool">
      </div>
      <div class="line">
        <label for="ipv4">End:</label>
        <input v-model="network.ipv4end" id="ipv4end" name="ipv4end" title="End of IPv4 address pool">
      </div>

      <div class="subheader">IPv6:</div>

      <div class="line">
        <label for="ipv6">CIDR:</label>
        <input v-model="network.ipv6" id="ipv6" name="ipv6" title="IPv6 CIDR">
      </div>
      <div class="line">
        <label for="ipv6">Gateway:</label>
        <input v-model="network.ipv6gw" id="ipv6gw" name="ipv6gw" title="IPv6 gateway">
      </div>
      <div class="line">
        <label for="ipv4">Start:</label>
        <input v-model="network.ipv6start" id="ipv6start" name="ipv6start" title="Start of IPv6 address pool">
      </div>
      <div class="line">
        <label for="ipv4">End:</label>
        <input v-model="network.ipv6end" id="ipv6end" name="ipv6end" title="End of IPv6 address pool">
      </div>

      <div class="subheader">Routes:</div>

      <div class="line">
        <label for="route">Route:</label>
        <input v-model="network.route" id="route" name="route" title="Comma seperated list of route targets">
      </div>
      <div class="line">
        <label for="route">Export:</label>
        <input v-model="network.export" id="export" name="export" title="Comma seperated list of exported route targets">
      </div>
      <div class="line">
        <label for="route">Import:</label>
        <input v-model="network.import" id="import" name="import" title="Comma seperated list of imported route targets">
      </div>
    </div>`
  }
)
