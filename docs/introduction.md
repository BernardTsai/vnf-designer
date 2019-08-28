VNF Designer
============

Designing virtualised network functions (VNFs) can turn out to be a rather complex task binding a huge amount of resources and slowing down the roll-out and change process considerably.

Simplification is key to streamlining this process.

The VNF Designer supports an opinionated view of how to consistently and efficiently describe the target state of a VNF based on a set of concepts:

* **Standardised Virtual Resources**: VNFs are represented by a set of virtual compute, network and storage resources distributed over one or more tenants which resemble independently manageable elastic pools of virtual resources.
* **Service Interfaces**: All internal and external elements communicate via a set of exposed services.
* **IP-Based Communication**: The communication between all internal and external elements is based on the layer 3 internet protocol.
* **Dependency Management**: The dependencies between internal and external elements to the exposed services allows to derive the required communication matrix.

The VNF Designer itself is a simple web-application which can either be used as offline webpage (offline.html) or as web-server allowing for additional capabilities e.g. monitoring.

It is capable of:
- **modelling** the networks, components (incl. images and flavors), volumes and ports of VNFs,
- **validating** the model design,
- **comparing** differences between two models (current state and target state),
- **importing** and exporting models,
- **generating** automation artefacts for deploying VNFs onto OpenStack clouds,
- **monitoring** the status of a deployment and
- **documenting** required information such as the communication matrix of a VNF.

It makes use of an internal canonical model which can be rendered with the help of jinja like templates into any kind of desired output. These rendering capabilities can be extended by adding new templates.

A model of a demo solution is provided as an example.

License
-------

VNF Designer is based on the work of many great [projects](credits.md) and the support of my dear family.

Copyright (c) 2018, Bernard Tsai. (Apache Version 2.0 License)

-----

<div style="z-index:100; position: fixed; top: 16px; right: 16px;"><a style="text-decoration: none;" href="index.html">overview</a></div>
