Architecture
============

The architecture of a VNF captures how the components of a VNF communicate via networks with one another as shown in the following diagram:

<img src="images/overview.png" alt="VNF Overview" width="50%"/>


Reset Model
-----------

To create an overview of a virtualised network function open the VNF Designer and reset the model by pressing the **Reset** icon located at the top of the webpage.

This will remove all previously defined entities and allow to define the architecture from scratch.

Adding Components
-----------------

In order to add components to the architecture hover with the mouse over an empty patch on the left side of the details region - an icon for a new component will appear.

Click on this icon to create a new component.

To change the name of the component simply click on the name and modify it.

The icon will display colored placement/type indictor which can be modified by clicking on it:

* **M**: stands for management component,
* **E**: stands for externally visible component,
* **I**: stands for internal component,
* **R**: stands for a router component bridging several networks and
* **O**: stands for any other component.

Adding Networks
---------------

In order to add networks to the architecture hover with the mouse over an empty patch on the tops side of the details region - an icon for a new network will appear.

Click on this icon to create a new network.

To change the name of the network simply click on the name and modify it.

Connecting/Disconnecting Components to/from Networks
----------------------------------------------------

In order to connect/disconnect components to/from networks simply click on the intersection between component and network.

The sequence in which these ports are created is of relevance since the first port will be the port allowing for administrative access for all automation procedures.

-----

<div style="z-index:100; position: fixed; top: 16px; right: 16px;"><a style="text-decoration: none;" href="doc.html?usage.md">usage</a></div>
