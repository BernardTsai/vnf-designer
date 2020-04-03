<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Flavors_0"></a>Flavors
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      Flavors define the dimensions of a virtual server.
    </p>
    <h2 class="code-line" data-line-start="5" data-line-end="7">
      <a id="Creating_a_New_Flavor_5"></a>Creating a New Flavor
    </h2>
    <p class="has-line-data" data-line-start="8" data-line-end="9">
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p class="has-line-data" data-line-start="10" data-line-end="11">
      <img
        :src="require('@/docs/images/overview.png')"
        alt="Overview"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="12" data-line-end="13">
      Then press on the “Flavors” tab of the selector region.
    </p>
    <p class="has-line-data" data-line-start="14" data-line-end="15">
      <img
        :src="require('@/docs/images/flavors.png')"
        alt="Flavors"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="16" data-line-end="17">
      A “+” sign will appear on the top of the selector region which when
      pressed will create a new flavor.
    </p>
    <h2 class="code-line" data-line-start="18" data-line-end="20">
      <a id="Editing_a_Flavor_18"></a>Editing a Flavor
    </h2>
    <p class="has-line-data" data-line-start="21" data-line-end="22">
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p class="has-line-data" data-line-start="23" data-line-end="24">
      Then press on the “Flavors” tab of the selector region.
    </p>
    <p class="has-line-data" data-line-start="25" data-line-end="26">
      Select the flavor by clicking on its name in the list display in the
      selector region.
    </p>
    <p class="has-line-data" data-line-start="27" data-line-end="28">
      <img
        :src="require('@/docs/images/flavors.png')"
        alt="Flavors"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="29" data-line-end="30">
      The web-form for the flavor will be presented in the details region and
      will allow to:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="31" data-line-end="32">
        modify the name,
      </li>
      <li class="has-line-data" data-line-start="32" data-line-end="33">
        specify the number of desired virtual central processing units,
      </li>
      <li class="has-line-data" data-line-start="33" data-line-end="34">
        specify the size of the random access memory in gigabytes,
      </li>
      <li class="has-line-data" data-line-start="34" data-line-end="35">
        specify the size of the ephemeral disk in gigabytes,
      </li>
      <li class="has-line-data" data-line-start="35" data-line-end="36">
        specify wether the flavor should be public or private and to
      </li>
      <li class="has-line-data" data-line-start="36" data-line-end="38">
        specify additional attributes as a set of key/value pairs.
      </li>
    </ul>
    <h2 class="code-line" data-line-start="38" data-line-end="40">
      <a id="Deleting_an_Existing_Flavor_38"></a>Deleting an Existing Flavor
    </h2>
    <p class="has-line-data" data-line-start="41" data-line-end="42">
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p class="has-line-data" data-line-start="43" data-line-end="44">
      Then press on the “Flavors” tab of the selector region.
    </p>
    <p class="has-line-data" data-line-start="45" data-line-end="46">
      Remove the flavor by pressing the “-” sign located to the right of the
      name of the specific flavor.
    </p>
    <p class="has-line-data" data-line-start="47" data-line-end="48">
      (Be aware that this might lead to inconsistencies in the model if any
      components have previously referred to this flavor.)
    </p>
    <hr />
    <div style="z-index:100; position: fixed; top: 16px; right:16px;">
      <a style="text-decoration: none;" href @click.prevent="swapDoc('usage')"
        >usage</a
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
