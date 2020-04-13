<template>
  <div>
    <h1>Images</h1>
    <p >
      Images define the basic operating system for a virtual server (possibly
      including a set of software packages and configurations).
    </p>
    <h2>Creating a New Image</h2>
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
      Then press on the “Images” tab of the selector region.
    </p>
    <p >
      <img
        :src="require('./images/images.png')"
        alt="Images"
      />
    </p>
    <p >
      A “+” sign will appear on the top of the selector region which when
      pressed will create a new image.
    </p>
    <h2>Editing an Image</h2>
    <p >
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p >
      Then press on the “Image” tab of the selector region.
    </p>
    <p >
      Select the image by clicking on its name in the list display in the
      selector region.
    </p>
    <p >
      <img :src="require('./images/image.png')" alt="Image"/>
    </p>
    <p>
      The web-form for the image will be presented in the details region and
      will allow to:
    </p>
    <ul>
      <li>
        modify the name,
      </li>
      <li>
        specify the version,
      </li>
      <li>
        specify the format of image (e.g. raw, qcow2, …),
      </li>
      <li>
        specify the format of the image (e.g. bare, …),
      </li>
      <li>
        specify the min. size of the ephemeral disk in gigabytes,
      </li>
      <li>
        specify the size of the image in bytes,
      </li>
      <li>
        specify the url from which to retrieve the image,
      </li>
      <li>
        specify the checksum for the image and to
      </li>
      <li>
        specify additional attributes for the image as a string.
      </li>
    </ul>
    <h2>Deleting an Existing Image</h2>
    <p >
      Select the overview by pressing the “Overview” icon in the header region.
    </p>
    <p >
      Then press on the “Images” tab of the selector region.
    </p>
    <p >
      Remove the image by pressing the “-” sign located to the right of the name
      of the specific image.
    </p>
    <p >
      (Be aware that this might lead to inconsistencies in the model if any
      components have previously referred to this image.)
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
