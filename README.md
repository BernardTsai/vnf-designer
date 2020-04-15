# vnf-designer

A simple webpage capable of:
- modelling the networks, components (incl. images and flavors) and ports of VNFs,
- validating the model design,
- comparing differences between two models (current state and target state),
- importing and exporting models,
- generating automation artefacts for deploying VNFs onto OpenStack clouds and
- generating the communication matrix for a VNF.

It makes use of an internal canonical model.
This model can be rendered with the help of jinja alike templates into any kind of desired output.
The rendering capabilities can be extended by simply adding new templates into templates.js.

A model of a demo solution is provided as an example.

For a quick evaluation simply use the service on github pages: https://bernardtsai.github.io/vnf-designer/

For further questions please contact: bernard@tsai.eu

# Quick start

Prerequisites
-------------
- node.js and npm have been installed
- nodeenv has been installed (optional - if a virtual node environment is needed)
- access to OpenStack APIs (directly or via http/s_proxy settings)

Steps
-----
- Clone the repository from github (https://github.com/BernardTsai/vnf-designer)
- Change into the root directory
- Create virtual node environment via "nodeenv --force ." (optional)
- Start virtual node environment via "source bin/activate" (optional)
- Install missing dependencies via "npm install"
- Start server via "node index.js"
- Open following url in a  browser: "http://localhost:3000"

# Documentation

Further documentation can be found here: [...](docs/readme.md)
