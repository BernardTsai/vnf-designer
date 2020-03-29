import { safeLoad } from "js-yaml";
import data from "./data";
var model = {
  current: safeLoad(data),
  //model: this.current // model:  safeLoad(data) is this necessary?
  // model: safeLoad(data),
  //------------------------------------------------------------------------------

  setModel(object) {
    model.schema = "1.0.1";
    model.vnf = object.vnf;
    model.version = object.version;
    model.tenant = object.tenant;
    model.flavors = object.flavors;
    model.images = object.images;
    model.networks = object.networks;
    model.components = object.components;
  },

  //------------------------------------------------------------------------------

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  //------------------------------------------------------------------------------

  addFlavor() {
    var uuid = this.uuidv4();
    var nr = model.flavors.length + 1;

    model.flavors.push({
      uuid: uuid,
      name: "flavor-" + nr,
      public: "false",
      special: []
    });
  },

  //------------------------------------------------------------------------------

  deleteFlavor(flavor) {
    var index = model.current.flavors.indexOf(flavor);

    if (index > -1) {
      model.current.flavors.splice(index, 1);
    }
  },

  //------------------------------------------------------------------------------

  addFlavorAttribute(flavor) {
    var nr = flavor.special.length + 1;

    flavor.special.push({ key: "attr" + nr, value: "" });
  },

  //------------------------------------------------------------------------------

  delFlavorAttribute(flavor, attribute) {
    var index = flavor.special.indexOf(attribute);

    if (index > -1) {
      flavor.special.splice(index, 1);
    }
  },

  //------------------------------------------------------------------------------

  addImage() {
    var uuid = this.uuidv4();
    var nr = model.images.length + 1;

    model.images.push({
      uuid: uuid,
      name: "image-" + nr,
      version: "",
      format: "qcow2",
      container: "bare",
      disk: "0",
      size: "0",
      special: "",
      url: ""
    });
  },

  //------------------------------------------------------------------------------

  deleteImage(image) {
    var index = model.current.images.indexOf(image);

    if (index > -1) {
      model.current.images.splice(index, 1);
    }
  },

  //------------------------------------------------------------------------------

  addNetwork() {
    var uuid = this.uuidv4();
    var nr = model.current.networks.length + 1;

    model.current.networks.push({
      uuid: uuid,
      name: "net-" + nr,
      ipv4: "",
      ipv4gw: "",
      ipv4start: "",
      ipv4end: "",
      ipv6: "",
      ipv6gw: "",
      ipv6start: "",
      ipv6end: "",
      route: "",
      import: "",
      export: "",
      special: ""
    });
  },

  //------------------------------------------------------------------------------

  deleteNetwork(network) {
    var index = model.current.networks.indexOf(network);

    if (index > -1) {
      model.current.networks.splice(index, 1);
    }
  },

  //------------------------------------------------------------------------------

  hasComponent(name) {
    for (var comp of model.components) {
      if (comp.name === name) {
        return comp;
      }
    }
    return null;
  },

  //------------------------------------------------------------------------------

  addComponent() {
    var uuid = this.uuidv4();
    var nr = model.current.components.length + 1;

    model.current.components.push({
      uuid: uuid,
      name: "comp-" + nr,
      placement: "MGMT",
      flavor: "none",
      image: "none",
      min: 1,
      max: 1,
      size: 1,
      volumes: [],
      interfaces: [],
      services: [],
      dependencies: [],
      userdata: []
    });
  },

  //------------------------------------------------------------------------------

  deleteComponent(component) {
    var index = model.current.components.indexOf(component);

    if (index > -1) {
      model.current.components.splice(index, 1);
    }
  },

  //------------------------------------------------------------------------------

  addComponentVolume(component) {
    var nr = component.volumes.length + 1;

    component.volumes.push({
      name: "volume-" + nr,
      size: 100,
      type: component.placement.toUpperCase(),
      attributes: ""
    });
  },

  //------------------------------------------------------------------------------

  delComponentVolume(component, volume) {
    var index = component.volumes.indexOf(volume);

    if (index > -1) {
      component.volumes.splice(index, 1);
    }
  },

  //------------------------------------------------------------------------------

  addComponentInterface(component, network = "") {
    // var name =
    network !== "" ? network : "net-" + (component.interfaces.length + 1);

    component.interfaces.push({
      network: network,
      ipv4: "",
      ipv6: "",
      attributes: ""
    });
  },

  //------------------------------------------------------------------------------

  delComponentInterface(component, inter) {
    var index = component.interfaces.indexOf(inter);

    if (index > -1) {
      component.interfaces.splice(index, 1);
    }
  },

  //------------------------------------------------------------------------------

  hasComponentInterface(component, network) {
    for (var inter of component.interfaces) {
      if (inter.network === network) {
        return inter;
      }
    }
    return null;
  },

  //------------------------------------------------------------------------------

  addComponentService(component) {
    var nr = component.services.length + 1;

    component.services.push({
      name: "svc-" + nr,
      network: "",
      protocol: "tcp",
      range: "0-65535"
    });
  },

  //------------------------------------------------------------------------------

  delComponentService(component, service) {
    var index = component.services.indexOf(service);

    if (index > -1) {
      component.services.splice(index, 1);
    }
  },

  //------------------------------------------------------------------------------

  addComponentDependency(component) {
    var nr = component.dependencies.length + 1;

    component.dependencies.push({
      component: "dep-" + nr,
      service: "",
      network: ""
    });
  },

  //------------------------------------------------------------------------------

  delComponentDependency(component, dependency) {
    var index = component.dependencies.indexOf(dependency);

    if (index > -1) {
      component.dependencies.splice(index, 1);
    }
  },

  //------------------------------------------------------------------------------

  addUserdata(component) {
    // var nr = component.userdata.length + 1;

    component.userdata.push("");
  },

  //------------------------------------------------------------------------------

  delUserdata(component, userdata) {
    var index = component.userdata.indexOf(userdata);

    if (index > -1) {
      component.userdata.splice(index, 1);
    }
  }

  //------------------------------------------------------------------------------
};

export default model;
