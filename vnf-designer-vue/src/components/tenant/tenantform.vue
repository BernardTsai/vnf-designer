<template>
  <div id="tenantform">
    <div class="header">Tenant: {{ model.current.name }}</div>

    <div class="line">
      <label for="name">Network Service:</label>
      <input v-model="model.current.vnf" id="vnf" name="vnf" required />
    </div>
    <div class="line">
      <label for="version">Version:</label>
      <input
        v-model="model.current.version"
        id="version"
        name="version"
        required
      />
    </div>
    <hr />
    <div class="line">
      <label for="tenant">Tenant:</label>
      <input
        v-model="model.current.tenant.name"
        id="tenant_name"
        name="tenant_name"
        required
      />
    </div>
    <div class="line">
      <label for="tenant_auth_username">Username:</label>
      <input
        v-model="model.current.tenant.auth.username"
        id="tenant_auth_username"
        name="tenant_auth_username"
        required
      />
    </div>
    <div class="line">
      <label for="tenant_auth_password">Password:</label>
      <input
        v-model="model.current.tenant.auth.password"
        id="tenant_auth_password"
        name="tenant_auth_password"
        required
      />
    </div>
    <div class="line">
      <label for="tenant_auth_url">URL:</label>
      <input
        v-model="model.current.tenant.auth.url"
        id="tenant_auth_url"
        name="tenant_auth_url"
        required
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "tenantform",
  props: ["model", "view"]
};
</script>
