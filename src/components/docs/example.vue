<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href  @click.prevent="swapDoc('readme')">overview</a>
      </h4>
    </nav>
    <h1>Example</h1>
    <p >
      An example will help to demonstrate the capabilities of the VNF Designer.
    </p>
    <p >
      In this example a simple application server hosted together with a
      database backend in a tenant is providing it’s service via a firewall to
      users as shown in the diagram below.
    </p>
    <p >
      <img
        :src="require('./images/example.png')"
        alt="Demo Application"
      />
    </p>
    <p >
      The solution makes use of four networks for establishing communication
      amongst the applications, the users and administrators according to
      following considerations:
    </p>
    <ul>
      <li>
        users can access the application services from the internet (pub) via
        the firewall,
      </li>
      <li>
        administrators can manage the firewall, the application server and the
        database from the internet (pub) via the firewall,
      </li>
      <li>
        the firewall forwards external user requests via the machine-to-machine
        network (ext),
      </li>
      <li>
        the firewall forwards external administrative requests via the
        operation, administration and maintenance network (oam) and
      </li>
      <li>
        the application server persists its information to the database via the
        machine-to-machine network (int).
      </li>
    </ul>
    <hr />
  </div>
</template>
<script>
export default {
  methods: {
    swapDoc(docname) {
      this.$emit("swapDoc", docname);
    }
  }
};
</script>
