Usage
=====

It is assumed that a DevOps team (possibly with the support of a VNF supplier) is knowledgeable of the architecture of the VNF and its network design but may have to consult experts from the partner systems which interact with the VNF.

The following process allows such a DevOps team to design virtualised network functions in a simple way:

1. **[Architecture](architecture.md)**: Identify all systems and users (components) which are either part of the VNF or which will interact with it. In addition identify all separate communication channels (networks) via which these components will interact.
3. **[Flavors](flavors.md)**: Define the dimensions of the virtual machines.
3. **[Images](images.md)**: Define the required operating systems possibly including application specific packages and configurations.
4. **[Networks](networks.md)**: Define the details of each network.
5. **[Components](components.md)**: Define the details of each component.
6. **[Tenant](tenant.md)**: Define the credentials to access the OpenStack API.
7. **[Validation](validation.md)**: Validate the design.
8. **[Artefacts](artefacts.md)**: Generate and download the automation artefacts.

The VNF Designer provides following additional functionality:

* **[Import](import.md)** model,
* **[Export](export.md)** model,
* **[Compare](compare.md)** models and
* **[Monitoring](monitoring.md)** a deployment.

-----

<div style="z-index:100; position: fixed; top: 16px; right: 16px;"><a style="text-decoration: none;" href="index.html">overview</a></div>
