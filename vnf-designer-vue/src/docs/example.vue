<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Example_0"></a>Example
    </h1>
    <p class="has-line-data" data-line-start="5" data-line-end="6">
      An example will help to demonstrate the capabilities of the VNF Designer.
    </p>
    <p class="has-line-data" data-line-start="7" data-line-end="8">
      In this example a simple application server hosted together with a
      database backend in a tenant is providing it’s service via a firewall to
      users as shown in the diagram below.
    </p>
    <p class="has-line-data" data-line-start="9" data-line-end="10">
      <img
        :src="require('@/docs/images/example.png')"
        alt="Demo Application"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="11" data-line-end="12">
      The solution makes use of four networks for establishing communication
      amongst the applications, the users and administrators according to
      following considerations:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="13" data-line-end="14">
        users can access the application services from the internet (pub) via
        the firewall,
      </li>
      <li class="has-line-data" data-line-start="14" data-line-end="15">
        administrators can manage the firewall, the application server and the
        database from the internet (pub) via the firewall,
      </li>
      <li class="has-line-data" data-line-start="15" data-line-end="16">
        the firewall forwards external user requests via the machine-to-machine
        network (ext),
      </li>
      <li class="has-line-data" data-line-start="16" data-line-end="17">
        the firewall forwards external administrative requests via the
        operation, administration and maintenance network (oam) and
      </li>
      <li class="has-line-data" data-line-start="17" data-line-end="18">
        the application server persists its information to the database via the
        machine-to-machine network (int).
      </li>
    </ul>
    <hr />
    <div style="z-index:100; position: fixed; top: 16px; right:16px;">
      <a style="text-decoration: none;" href @click.prevent="swapDoc('readme')"
        >Overview</a
      >
    </div>
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
