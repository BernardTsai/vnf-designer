<template>
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
        <label for="prefix">Prefix:</label>
        <input v-model="model.tenant.prefix" id="tenant_prefix" name="tenant_prefix" required>
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
        <input v-model="model.tenant.jumphost" id="tenant_jumphost" name="tenant_jumphost">
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
    </div>
</template>
<script>
export default {
    props: ['model','view']
}
</script>
<style scoped>
#tenantform {
  position: absolute;
  left:     0px;
  right:    0px;
  top:      0px;
  bottom:   0px;
  padding:  8px;
}

#tenantform .header {
  font-size:   20px;
  font-weight: bold;
}

#tenantform .subheader {
  font-size:   14px;
  font-weight: bolder;
  padding-top: 24px;
  padding-left: 8px;
}

#tenantform hr {
  border: 0;
  border-top: 1px dashed #c0c0c0;
  margin-top:    4px;
  margin-bottom: 0px;
}

#tenantform .line {
  padding-top: 8px;
  padding-left: 4px;
}

#tenantform .line label {
  display:     inline-block;
  width:       80px;
  font-weight: bold;
}

#tenantform .line label.top {
  width:       200px;
}

#tenantform .line input {
  display:     inline-block;
  width:       200px;
}

#tenantform .line select {
  display:          inline-block;
  width:            200px;
  background-color: white;
}
</style>