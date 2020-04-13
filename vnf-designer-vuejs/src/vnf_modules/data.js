var data = `
---
schema:     1.0.1
vnf:        demo
version:    1.0.0
tenant:
  name:          "demo"
  prefix:        ""
  auth:
    username:    "demo"
    password:    "S3CR3T"
    proxy:       ""
    url:         ""
    cert:        ""
    region:      ""
    vol_api:     ""
    plugin:      ""
  service:
    network:     ""
    cidr:        ""
    gateway:     ""
    proxy:       ""
    port:        ""
  jumphost:      ""
  proxy:
    http:        ""
    https:       ""
flavors:
  - uuid:    "08e88f71-8916-428e-ae2e-e37b50619405"
    name:    "none"
    vcpu:    0
    ram:     0
    disk:    0
    public:  "false"
    special: []
  - uuid:    "b18f5596-e88b-4e0c-a2b3-da97fae62e85"
    name:    "standard"
    vcpu:    2
    ram:     8
    disk:    10
    public:  "false"
    special: []
images:
- { uuid: "55b1f2fc-caab-4bea-8f4b-5b7c46d7abb6", name: "none", version: "", format: "qcow2", container: "bare", disk: "0", size: "0", checksum: "", url: "", special: "" }
- { uuid: "3543f742-81b7-4dd3-86d9-ea52b134dbb1", name: "CentOS 7", version: "7.5", format: "qcow2", container: "bare", disk: "0", size: "0", checksum: "b376afdc0150601f15e53516327d9832216e01a300fecfc302066e36e2ac2b39", url: "https://cloud.centos.org/centos/7/images/CentOS-7-x86_64-GenericCloud-1905.qcow2", special: "" }
networks:
  - uuid:      "726dc281-2eb5-469e-857d-4af9336ff02a"
    name:      "pub"
    external:  "true"
    ipv4:      "0.0.0.0/0"
    ipv4gw:    ""
    ipv4start: ""
    ipv4end:   ""
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "221d325b-35a5-4eca-8a3f-ea5ade11f6fe"
    name:      "ext"
    external:  ""
    ipv4:      "10.0.1.0/0"
    ipv4gw:    "10.0.1.1"
    ipv4start: "10.0.1.100"
    ipv4end:   "10.0.1.199"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "540146df-32f7-4aae-b65b-a4523c9c328d"
    name:      "int"
    external:  ""
    ipv4:      "10.0.0.2/24"
    ipv4gw:    "10.0.0.1"
    ipv4start: "10.0.0.100"
    ipv4end:   "10.0.0.199"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "20cefffb-6ec5-4161-8562-612a4651e436"
    name:      "oam"
    external:  "false"
    ipv4:      "10.0.0.0/24"
    ipv4gw:    "10.0.0.1"
    ipv4start: "10.0.0.100"
    ipv4end:   "10.0.0.199"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
components:
  - uuid:         "f76afc3d-b19d-4f67-ab56-f7261501b5c4"
    name:         "user"
    user:         "root"
    placement:    "OTHER"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "pub", attributes: "" }
    services:     []
    dependencies:
      - { component: "firewall", service: "https", network: "pub" }
    userdata:     ""

  - uuid:         "9572cd15-0c75-43f2-ad28-7031f172132f"
    name:         "firewall"
    user:         "root"
    placement:    "EXT"
    flavor:       "standard"
    image:        "CentOS 7"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "pub", attributes: "" }
      - { network: "oam", attributes: "" }
      - { network: "ext", attributes: "" }
    services:
      - { name: "ssh", network: "pub", protocol: "tcp", range: "22" }
      - { name: "https", network: "pub", protocol: "tcp", range: "443" }
    dependencies:
      - { component: "application", service: "https", network: "ext" }
    userdata:     ""

  - uuid:         "4972819c-7c64-4e26-a0a0-41d86d798773"
    name:         "application"
    user:         "root"
    placement:    "EXT"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         3
    max:          3
    volumes:      []
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "ext", attributes: "" }
      - { network: "int", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
      - { name: "https", network: "ext", protocol: "tcp", range: "443" }
    dependencies: []
    userdata:     ""

  - uuid:         "871076e7-40d9-4a24-b35f-f14adac5a67c"
    name:         "database"
    user:         "root"
    placement:    "INT"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         3
    max:          3
    volumes:
      - { name: "data", size: 100, type: "INT", attributes: "" }
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "int", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
      - { name: "mysql", network: "int", protocol: "tcp", range: "3306" }
      - { name: "replication", network: "int", protocol: "tcp", range: "33061" }
    dependencies:
      - { component: "database", service: "replication", network: "int" }
    userdata:     ""

  - uuid:         "b2b214b6-37b5-4f4d-8706-8ca590b14a38"
    name:         "devops"
    placement:    "OTHER"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "pub", attributes: "" }
    services:     []
    dependencies:
      - { component: "firewall", service: "ssh", network: "pub" }
    userdata:     ""

`
export { data }