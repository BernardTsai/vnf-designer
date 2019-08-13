var current = jsyaml.safeLoad(data);
var target  = jsyaml.safeLoad(data);
var model   = current;

//------------------------------------------------------------------------------

function setModel(object) {
  model.schema     = "1.0.0"
  model.vnf        = object.vnf
  model.version    = object.version
  model.tenant     = object.tenant
  model.flavors    = object.flavors
  model.images     = object.images
  model.networks   = object.networks
  model.components = object.components
}

//------------------------------------------------------------------------------

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//------------------------------------------------------------------------------

function addFlavor() {
  var uuid = uuidv4();
  var nr   = model.flavors.length + 1;

  model.flavors.push( { uuid: uuid, name: "flavor-" + nr, public: "false", special: [] } );
}

//------------------------------------------------------------------------------

function deleteFlavor(flavor) {
  var index = model.flavors.indexOf(flavor);

  if (index > -1) { model.flavors.splice(index,1) }
}

//------------------------------------------------------------------------------

function addFlavorAttribute(flavor) {
  var nr = flavor.special.length + 1;

  flavor.special.push({"key": "attr" + nr, "value": ""});
}

//------------------------------------------------------------------------------

function delFlavorAttribute(flavor,attribute) {
  var index = flavor.special.indexOf(attribute);

  if (index > -1) { flavor.special.splice(index,1) }
}

//------------------------------------------------------------------------------

function addImage() {
  var uuid = uuidv4();
  var nr   = model.images.length + 1;

  model.images.push( { uuid: uuid, name: "image-" + nr, version: "", format: "qcow2", container: "bare", disk: "0", size: "0", special: "", url: "" } );
}

//------------------------------------------------------------------------------

function deleteImage(image) {
  var index = model.images.indexOf(image);

  if (index > -1) { model.images.splice(index,1) }
}

//------------------------------------------------------------------------------

function addNetwork() {
  var uuid = uuidv4();
  var nr   = model.networks.length + 1;

  model.networks.push( { uuid: uuid, name: "net-" + nr, ipv4: "", ipv4gw: "", ipv4start: "", ipv4end: "", ipv6: "", ipv6gw: "", ipv6start: "", ipv6end: "", route: "", import: "", export: "", special: "" } );
}

//------------------------------------------------------------------------------

function deleteNetwork(network) {
  var index = model.networks.indexOf(network);

  if (index > -1) { model.networks.splice(index,1) }
}

//------------------------------------------------------------------------------

function hasComponent(name) {
  for (var comp of model.components) {
    if (comp.name === name) { return comp }
  }
  return null;
}

//------------------------------------------------------------------------------

function addComponent() {
  var uuid = uuidv4();
  var nr   = model.components.length + 1;

  model.components.push({
    uuid: uuid, name: "comp-" + nr,
    placement: "MGMT", flavor: "none", image: "none", min: 1, max: 1, size: 1,
    volumes: [], interfaces: [], services: [], dependencies: [], userdata: [] } );
}

//------------------------------------------------------------------------------

function deleteComponent(component) {
  var index = model.components.indexOf(component);

  if (index > -1) { model.components.splice(index,1) }
}

//------------------------------------------------------------------------------

function addComponentVolume(component) {
  var nr = component.volumes.length + 1;

  component.volumes.push({
    name: "volume-" + nr, size: 100,
    type: component.placement.toUpperCase(), attributes:  ""});
}

//------------------------------------------------------------------------------

function delComponentVolume(component,volume) {
  var index = component.volumes.indexOf(volume);

  if (index > -1) { component.volumes.splice(index,1) }
}

//------------------------------------------------------------------------------

function addComponentInterface(component,network="") {
  var name = (network !== "" ? network : "net-" + (component.interfaces.length + 1));

  component.interfaces.push({network: network, ipv4: "", ipv6: "", attributes:  ""});
}

//------------------------------------------------------------------------------

function delComponentInterface(component,interface) {
  var index = component.interfaces.indexOf(interface);

  if (index > -1) { component.interfaces.splice(index,1) }
}

//------------------------------------------------------------------------------

function hasComponentInterface(component,network) {
  for (var interface of component.interfaces) {
    if (interface.network === network) {return interface;}
  }
  return null;
}

//------------------------------------------------------------------------------

function addComponentService(component) {
  var nr = component.services.length + 1;

  component.services.push({
    name: "svc-" + nr, network: "", protocol: "tcp", range:  "0-65535"});
}

//------------------------------------------------------------------------------

function delComponentService(component,service) {
  var index = component.services.indexOf(service);

  if (index > -1) { component.services.splice(index,1) }
}

//------------------------------------------------------------------------------

function addComponentDependency(component) {
  var nr = component.dependencies.length + 1;

  component.dependencies.push({
    component: "dep-" + nr, service: "",network: ""});
}

//------------------------------------------------------------------------------

function delComponentDependency(component,dependency) {
  var index = component.dependencies.indexOf(dependency);

  if (index > -1) { component.dependencies.splice(index,1) }
}

//------------------------------------------------------------------------------

function addUserdata(component) {
  var nr = component.userdata.length + 1;

  component.userdata.push("");
}

//------------------------------------------------------------------------------

function delUserdata(component,userdata) {
  var index = component.userdata.indexOf(userdata);

  if (index > -1) { component.userdata.splice(index,1) }
}

//------------------------------------------------------------------------------
