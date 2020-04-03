<template>
  <div>
    <h1 class="code-line" data-line-start="0" data-line-end="2">
      <a id="Images_0"></a>Images
    </h1>
    <p class="has-line-data" data-line-start="3" data-line-end="4">
      Images define the basic operating system for a virtual server (possibly
      including a set of software packages and configurations).
    </p>
    <h2 class="code-line" data-line-start="5" data-line-end="7">
      <a id="Creating_a_New_Image_5"></a>Creating a New Image
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
      Then press on the “Images” tab of the selector region.
    </p>
    <p class="has-line-data" data-line-start="14" data-line-end="15">
      <img
        :src="require('@/docs/images/images.png')"
        alt="Images"
        width="50%"
      />
    </p>
    <p class="has-line-data" data-line-start="16" data-line-end="17">
      A “+” sign will appear on the top of the selector region which when
      pressed will create a new image.
    </p>
    <h2 class="code-line" data-line-start="18" data-line-end="20">
      <a id="Editing_a_Image_18"></a>Editing a Image
    </h2>
    <p class="has-line-data" data-line-start="21" data-line-end="22">
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p class="has-line-data" data-line-start="23" data-line-end="24">
      Then press on the “Image” tab of the selector region.
    </p>
    <p class="has-line-data" data-line-start="25" data-line-end="26">
      Select the image by clicking on its name in the list display in the
      selector region.
    </p>
    <p class="has-line-data" data-line-start="27" data-line-end="28">
      <img :src="require('@/docs/images/image.png')" alt="Image" width="50%" />
    </p>
    <p class="has-line-data" data-line-start="29" data-line-end="30">
      The web-form for the image will be presented in the details region and
      will allow to:
    </p>
    <ul>
      <li class="has-line-data" data-line-start="31" data-line-end="32">
        modify the name,
      </li>
      <li class="has-line-data" data-line-start="32" data-line-end="33">
        specify the version,
      </li>
      <li class="has-line-data" data-line-start="33" data-line-end="34">
        specify the format of image (e.g. raw, qcow2, …),
      </li>
      <li class="has-line-data" data-line-start="34" data-line-end="35">
        specify the format of the image (e.g. bare, …),
      </li>
      <li class="has-line-data" data-line-start="35" data-line-end="36">
        specify the min. size of the ephemeral disk in gigabytes,
      </li>
      <li class="has-line-data" data-line-start="36" data-line-end="37">
        specify the size of the image in bytes,
      </li>
      <li class="has-line-data" data-line-start="37" data-line-end="38">
        specify the url from which to retrieve the image,
      </li>
      <li class="has-line-data" data-line-start="38" data-line-end="39">
        specify the checksum for the image and to
      </li>
      <li class="has-line-data" data-line-start="39" data-line-end="41">
        specify additional attributes for the image as a string.
      </li>
    </ul>
    <h2 class="code-line" data-line-start="41" data-line-end="43">
      <a id="Deleting_an_Existing_Image_41"></a>Deleting an Existing Image
    </h2>
    <p class="has-line-data" data-line-start="44" data-line-end="45">
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p class="has-line-data" data-line-start="46" data-line-end="47">
      Then press on the “Images” tab of the selector region.
    </p>
    <p class="has-line-data" data-line-start="48" data-line-end="49">
      Remove the image by pressing the “-” sign located to the right of the name
      of the specific image.
    </p>
    <p class="has-line-data" data-line-start="50" data-line-end="51">
      (Be aware that this might lead to inconsistencies in the model if any
      components have previously referred to this image.)
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
