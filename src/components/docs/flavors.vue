<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href @click.prevent="swapDoc('usage')">usage</a>
      </h4>
    </nav>
    <h1>Flavors</h1>
    <p >
      Flavors define the dimensions of a virtual server.
    </p>
    <h2>Creating a New Flavor</h2>
    <p >
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p >
      <img
        :src="require('./images/overview.png')"
        alt="Overview"
      />
    </p>
    <p >
      Then press on the “Flavors” tab of the selector region.
    </p>
    <p >
      <img
        :src="require('./images/flavors.png')"
        alt="Flavors"
      />
    </p>
    <p >
      A “+” sign will appear on the top of the selector region which when
      pressed will create a new flavor.
    </p>
    <h2>Editing a Flavor</h2>
    <p >
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p >
      Then press on the “Flavors” tab of the selector region.
    </p>
    <p >
      Select the flavor by clicking on its name in the list display in the
      selector region.
    </p>
    <p >
      <img
        :src="require('./images/flavors.png')"
        alt="Flavors"
      />
    </p>
    <p >
      The web-form for the flavor will be presented in the details region and
      will allow to:
    </p>
    <ul>
      <li>
        modify the name,
      </li>
      <li>
        specify the number of desired virtual central processing units,
      </li>
      <li>
        specify the size of the random access memory in gigabytes,
      </li>
      <li>
        specify the size of the ephemeral disk in gigabytes,
      </li>
      <li>
        specify wether the flavor should be public or private and to
      </li>
      <li>
        specify additional attributes as a set of key/value pairs.
      </li>
    </ul>
    <h2>Deleting an Existing Flavor</h2>
    <p>
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p >
      Then press on the “Flavors” tab of the selector region.
    </p>
    <p >
      Remove the flavor by pressing the “-” sign located to the right of the
      name of the specific flavor.
    </p>
    <p >
      (Be aware that this might lead to inconsistencies in the model if any
      components have previously referred to this flavor.)
    </p>
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
