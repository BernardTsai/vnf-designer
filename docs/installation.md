Installation
============

There are two installation options available:

1. **Offline Webpage**: VNF Designer can be started as offline webpage allowing to directly start working without having to install anything apart from a modern web browser
2. **Web-Server**: installing the VNF Designer as a web service allows to make use of additional features (e.g. monitoring and online documentation)

-----

VNF Designer as Offline Webpage
-------------------------------

- Clone and unpack the repository from github (https://github.com/BernardTsai/vnf-designer) into a local directory and change into it's root directory
- Open the webpage "offline.html" in a browser


-----

VNF Designer as Web Service
---------------------------

Installing the VNF Designer requires fulfilling a set of prerequisites and ideally making use of a nodeenv virtual environment:

- **node.js and npm** need to be installed (https://nodejs.org/en/download/)
- **nodeenv** has been installed (optional - if a virtual node environment is needed: https://github.com/ekalinin/nodeenv)
- **OpenStack API**: access to OpenStack APIs (directly or via http/s_proxy settings)

__Steps:__

**A. Repository**: Clone and unpack the repository from github (https://github.com/BernardTsai/vnf-designer) into a local directory and change into it's root directory:

```
git clone https://github.com/BernardTsai/vnf-designer    
cd vnf-designer
```

**B. Virtual Environment (opt.)**: Create a virtual node environment and activate it:

```
nodeenv --force .
source bin/activate
```

**C. Dependencies**: Install missing dependencies:

```
npm install
```

**D. Server**: Start the server:

```
node index.js
```

**E. VNF-Designer**: Access the VNF Designer by opening the url http://localhost:3000 in a  browser

-----

Usage
-----
In order to understand how to design a virtualised network function with the help of this tool please refer to following [documentation](usage.md).

<div style="z-index:100; position: fixed; top: 16px; right: 16px;"><a style="text-decoration: none;" href="index.html">overview</a></div>
