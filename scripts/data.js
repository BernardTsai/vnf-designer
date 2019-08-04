var data = `
---
vnf:        5G-Core
version:    1.0.0
tenant:
  name:     5g
  auth:
    username:    ""
    password:    ""
    proxy:       ""
    url:         ""
    cert:        ""
    region:      RegionOne
    vol_api:     "2"
    plugin:      password
  service:
    network:     ""
    cidr:        ""
    gateway:     ""
    proxy:       ""
    port:        ""
  jumphost:      ""
  proxy:
    http:        "http://localhost:3128"
    https:       "http://localhost:3128"
flavors:
  - uuid:    "29539307-5dd5-49ab-a562-f2e6073798b0"
    name:    "none"
    vcpu:    0
    ram:     0
    disk:    0
    public:  "true"
    special: []
  - uuid:    "29539307-5dd5-49ab-a562-f2e6073798b1"
    name:    "m1.tiny"
    vcpu:    1
    ram:     512
    disk:    0
    public:  "true"
    special: []
  - uuid:    "29539307-5dd5-49ab-a562-f2e6073798b2"
    name:    "m1.small"
    vcpu:    1
    ram:     2048
    disk:    20
    public:  "true"
    special: []
  - uuid:    "29539307-5dd5-49ab-a562-f2e6073798b3"
    name:    "m1.medium"
    vcpu:    2
    ram:     4096
    disk:    40
    public:  "true"
    special: []
  - uuid:    "29539307-5dd5-49ab-a562-f2e6073798b4"
    name:    "m1.large"
    vcpu:    4
    ram:     8192
    disk:    80
    public:  "true"
    special: []
  - uuid:    "29539307-5dd5-49ab-a562-f2e6073798b5"
    name:    "m1.xlarge"
    vcpu:    8
    ram:     16384
    disk:    160
    public:  "true"
    special: []
  - uuid:    "3ad0cc6b-e21e-4c2d-9c2d-1059eb65ccc7"
    name:    "5g_trial.4_8_40"
    vcpu:    4
    ram:     8192
    disk:    40
    public:  "false"
    special: []
  - uuid:    "a3b9b121-5d67-4896-b426-0051ddb3d235"
    name:    "5g_trial.4_16_60"
    vcpu:    4
    ram:     16384
    disk:    60
    public:  "false"
    special: []
  - uuid:    "c9e01b2c-98bb-4110-b7e7-3f8c8f5a6774"
    name:    "5g_trial.8_32_50"
    vcpu:    4
    ram:     32758
    disk:    50
    public:  "false"
    special: []
  - uuid:    "fd299723-d1c8-46e7-9af3-be1b76475838"
    name:    "5g_trial.4_4_60"
    vcpu:    4
    ram:     4096
    disk:    60
    public:  "false"
    special: []
  - uuid:    "fd299723-d1c8-46e7-9af3-be1b76475839"
    name:    "5g_trial.32_64_50"
    vcpu:    32
    ram:     65536
    disk:    50
    public:  "false"
    special: []
images:
- { uuid: "5b16f37c-eeae-4f3a-8a4e-f442cbc381e0", name: "none", version: "0", format: "qcow2", container: "bare", disk: "", size: "0", checksum: "-", url: "-", special: "" }
- { uuid: "5b16f37c-eeae-4f3a-8a4e-f442cbc381e1", name: "Cirros-0.4.0-x86_64", version: "0.4.0", format: "qcow2", container: "bare", disk: "", size: "12", checksum: "443b7623e27ecf03dc9e01ee93f67afe", url: "http://download.cirros-cloud.net/0.4.0/cirros-0.4.0-x86_64-disk.img", special: "" }
- { uuid: "5b16f37c-eeae-4f3a-8a4e-f442cbc381e2", name: "CentOS-6-x86_64", version: "6", format: "qcow2", container: "bare", disk: "", size: "271", checksum: "88dca6fef7081f789de94b26d91b189def9af379f7c9a07409274022b6d35af3", url: "http://cloud.centos.org/centos/6/images/CentOS-6-x86_64-GenericCloud.qcow2c", special: "" }
- { uuid: "5b16f37c-eeae-4f3a-8a4e-f442cbc381e3", name: "CentOS-7-x86_64", version: "7", format: "qcow2", container: "bare", disk: "", size: "377", checksum: "93613cd4fce8a4e5de793e49357853d96ee695f6842eca379d333ed3bc593cbb", url: "http://cloud.centos.org/centos/7/images/CentOS-7-x86_64-GenericCloud.qcow2c", special: "" }
- { uuid: "5b16f37c-eeae-4f3a-8a4e-f442cbc381e4", name: "Ubuntu-14.04", version: "14.04", format: "qcow2", container: "bare", disk: "", size: "251", checksum: "067f9715fc977494ff653dbac2c2acbc398739f335cb1d6c196d4c13bc45f1ab", url: "http://cloud-images.ubuntu.com/trusty/20180419/trusty-server-cloudimg-amd64-disk1.img", special: "" }
- { uuid: "5b16f37c-eeae-4f3a-8a4e-f442cbc381e5", name: "Ubuntu-16.04", version: "16.04", format: "qcow2", container: "bare", disk: "", size: "278", checksum: "43a40f2beb4a1912c20903dca6820c28092728987f03160424feac98682cb967", url: "http://cloud-images.ubuntu.com/xenial/20180420/xenial-server-cloudimg-amd64-disk1.img", special: "" }
- { uuid: "70235900-0e12-4226-8293-691033c57902", name: "vcm-saf-image-20181029-jainra-8.0-5gc", version: "8.0.5", format: "qcow2", container: "bare", disk: "", size: "3011772416", checksum: "56b6f4a4c4d37850665bd26bc3c373eb", url: "vcm-saf-image-20181029-jainra-8.0-5gc", special: "" }
- { uuid: "7bf08178-0900-4ec5-919a-922cc98865b5", name: "mav-nrf-20181029-jainra-8.0-5gc", version: "8.0.5", format: "qcow2", container: "bare", disk: "", size: "1568604160", checksum: "0b8de9de7e835617da5176711938dc59", url: "mav-nrf-20181029-jainra-8.0-5gc", special: "" }
- { uuid: "de0de7af-6018-4590-84a0-951401318834", name: "lsGenVm_1404_TAS_TS_17.8.0", version: "17.8.5", format: "qcow2", container: "bare", disk: "", size: "2768812544", checksum: "622d62e9df6756080a53dcb5c8476a9b", url: "lsGenVm_1404_TAS_TS_17.8.0", special: "" }
- { uuid: "42e5f386-312e-4f34-9b0d-b32ccb749241", name: "EAST", version: "0", format: "qcow2", container: "bare", disk: "", size: "3678011392", checksum: "5e1031edd0ad32d42b0468fc0e94278d", url: "EAST", special: "" }
- { uuid: "26fd061a-9de0-471d-be09-71915c4d4abb", name: "Centos7.0_060719", version: "7.0", format: "qcow2", container: "bare", disk: "", size: "1145831424", checksum: "7b232022649afeb1fc41f31511573a13", url: "Centos7.0_060719", special: "" }
networks:
  - uuid:      "1 38e7669-4af5-4c6a-b8ae-7b17465810a0"
    name:      "test"
    external:  false
    ipv4:      "172.31.10.0/24"
    ipv4gw:    "172.31.10.1"
    ipv4start: "172.31.10.100"
    ipv4end:   "172.31.10.149"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "138e7669-4af5-4c6a-b8ae-7b17465810a1"
    name:      "n1_n2"
    external:  false
    ipv4:      "172.31.3.0/24"
    ipv4gw:    "172.31.3.1"
    ipv4start: "172.31.3.100"
    ipv4end:   "172.31.3.149"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "138e7669-4af5-4c6a-b8ae-7b17465810a2"
    name:      "n3"
    external:  false
    ipv4:      "172.31.5.0/24"
    ipv4gw:    "172.31.5.1"
    ipv4start: "172.31.5.100"
    ipv4end:   "172.31.5.149"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "138e7669-4af5-4c6a-b8ae-7b17465810a4"
    name:      "n6"
    external:  false
    ipv4:      "172.31.6.0/24"
    ipv4gw:    "172.31.6.1"
    ipv4start: "172.31.6.100"
    ipv4end:   "172.31.6.149"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "138e7669-4af5-4c6a-b8ae-7b17465810a3"
    name:      "n4"
    external:  false
    ipv4:      "172.31.4.0/24"
    ipv4gw:    "172.31.4.1"
    ipv4start: "172.31.4.100"
    ipv4end:   "172.31.4.149"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "138e7669-4af5-4c6a-b8ae-7b17465810a5"
    name:      "int"
    external:  false
    ipv4:      "172.31.2.0/24"
    ipv4gw:    "172.31.2.1"
    ipv4start: "172.31.2.100"
    ipv4end:   "172.31.2.149"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "138e7669-4af5-4c6a-b8ae-7b17465810a6"
    name:      "data"
    external:  false
    ipv4:      "172.31.20.0/24"
    ipv4gw:    "172.31.20.1"
    ipv4start: "172.31.20.100"
    ipv4end:   "172.31.20.149"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "5fcd11b0-1772-46b8-a97c-6e532fa2666d"
    name:      "k8s"
    external:  false
    ipv4:      "172.31.30.0/24"
    ipv4gw:    "172.31.30.1"
    ipv4start: "172.31.30.100"
    ipv4end:   "172.31.30.149"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "138e7669-4af5-4c6a-b8ae-7b17465810a7"
    name:      "oam"
    external:  false
    ipv4:      "172.31.1.0/24"
    ipv4gw:    "172.31.1.1"
    ipv4start: "172.31.1.100"
    ipv4end:   "172.31.1.149"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "138e7669-4af5-4c6a-b8ae-7b17465810a8"
    name:      "svc"
    external:  true
    ipv4:      "10.235.140.64/29"
    ipv4gw:    "10.235.140.65"
    ipv4start: "10.235.140.66"
    ipv4end:   "10.235.140.71"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
  - uuid:      "138e7669-4af5-4c6a-b8ae-7b17465810a9"
    name:      "pub"
    external:  true
    ipv4:      "62.152.142.0/24"
    ipv4gw:    "62.152.142.1"
    ipv4start: "62.152.142.16"
    ipv4end:   "62.152.142.17"
    ipv6:      ""
    ipv6gw:    ""
    ipv6start: ""
    ipv6end:   ""
    route:     ""
    export:    ""
    import:    ""
    special:   ""
components:
  - uuid:         "4e30a398-c2bd-469e-b044-c6fe707830be"
    name:         "test_admin_server"
    placement:    "OTHER"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "test", attributes: "" }
    services:     []
    dependencies: []
    userdata:     []

  - uuid:         "ccea7cfa-d024-456f-955e-4c4bdf9c8bb6"
    name:         "test"
    placement:    "EXT"
    flavor:       "5g_trial.4_4_60"
    image:        "lsGenVm_1404_TAS_TS_17.8.0"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "test", attributes: "" }
      - { network: "n1_n2", attributes: "" }
      - { network: "n3", attributes: "" }
      - { network: "n6", attributes: "" }
      - { network: "oam", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
    dependencies: []
    userdata:     []

  - uuid:         "335af834-2d44-4c65-bd82-02f502de0cb1"
    name:         "east"
    placement:    "EXT"
    flavor:       "5g_trial.4_8_40"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "n1_n2", attributes: "" }
      - { network: "n3", attributes: "" }
      - { network: "n6", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
    dependencies: []
    userdata:     []

  - uuid:         "755db867-8ebb-43f4-b993-0bcf59a9c8c9"
    name:         "upf"
    placement:    "EXT"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "n3", attributes: "" }
      - { network: "n6", attributes: "" }
      - { network: "n4", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
    dependencies: []
    userdata:     []

  - uuid:         "306e3595-9fc0-4712-af0e-63b87cd1b9dc"
    name:         "k8smaster"
    placement:    "INT"
    flavor:       "5g_trial.32_64_50"
    image:        "CentOS-7-x86_64"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "k8s", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
    dependencies: []
    userdata:     []

  - uuid:         "d3dc6063-2195-42ac-bb66-9a925489d1a8"
    name:         "k8sworker"
    placement:    "INT"
    flavor:       "5g_trial.32_64_50"
    image:        "CentOS-7-x86_64"
    min:          3
    size:         3
    max:          3
    volumes:      []
    interfaces:
      - { network: "oam",   attributes: "" }
      - { network: "k8s",   attributes: "" }
      - { network: "int",   attributes: "allowed:172.31.2.151-180;" }
      - { network: "data",  attributes: "" }
      - { network: "n1_n2", attributes: "allowed:172.31.3.151-160;" }
      - { network: "n4",    attributes: "allowed:172.31.4.161-170;" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
    dependencies: []
    userdata:     []

  - uuid:         "957a7130-d524-409b-8ab0-f4ad64fa20b6"
    name:         "nrf"
    placement:    "INT"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "int", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
    dependencies: []
    userdata:     []

  - uuid:         "39bbd188-997d-4b79-8373-a4ed081c92a6"
    name:         "udm"
    placement:    "INT"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "int", attributes: "" }
      - { network: "data", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
      - { name: "p3000", network: "int", protocol: "tcp", range: "3000" }
      - { name: "p8080", network: "int", protocol: "tcp", range: "8080" }
    dependencies: []
    userdata:     []

  - uuid:         "d6eb5b73-25c8-4a7a-bca8-fb899ee1cf41"
    name:         "udr"
    placement:    "INT"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "data", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
      - { name: "p3000", network: "data", protocol: "tcp", range: "3000" }
      - { name: "p8080", network: "data", protocol: "tcp", range: "8080" }
    dependencies: []
    userdata:     []

  - uuid:         "4df99d2b-cb2f-40f9-b8cf-e80596abea3c"
    name:         "udsf"
    placement:    "INT"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "data", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
      - { name: "p8091", network: "data", protocol: "tcp", range: "8091" }
      - { name: "p8092", network: "data", protocol: "tcp", range: "8092" }
      - { name: "p11210", network: "data", protocol: "tcp", range: "11210" }
      - { name: "p3000", network: "data", protocol: "tcp", range: "3000" }
      - { name: "p8080", network: "data", protocol: "tcp", range: "8080" }
    dependencies: []
    userdata:     []

  - uuid:         "bacfc8e7-d9b2-4c1d-be8c-b6ea1df6283f"
    name:         "jumphost"
    placement:    "MGMT"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "oam", attributes: "" }
      - { network: "svc", attributes: "" }
      - { network: "pub", attributes: "" }
    services:
      - { name: "ssh", network: "oam", protocol: "tcp", range: "22" }
      - { name: "proxy", network: "oam", protocol: "tcp", range: "3128" }
    dependencies:
      - { component: "proxy", service: "proxy", network: "svc" }
      - { component: "openstack", service: "horizon", network: "svc" }
      - { component: "test", service: "ssh", network: "oam" }
      - { component: "east", service: "ssh", network: "oam" }
      - { component: "upf", service: "ssh", network: "oam" }
      - { component: "k8smaster", service: "ssh", network: "oam" }
      - { component: "k8sworker", service: "ssh", network: "oam" }
      - { component: "nrf", service: "ssh", network: "oam" }
      - { component: "udm", service: "ssh", network: "oam" }
      - { component: "udr", service: "ssh", network: "oam" }
      - { component: "udsf", service: "ssh", network: "oam" }
    userdata:     []

  - uuid:         "8e0d2958-bad9-4775-851e-53d9a29082f6"
    name:         "proxy"
    placement:    "OTHER"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "svc", attributes: "" }
      - { network: "pub", attributes: "" }
    services:
      - { name: "proxy", network: "svc", protocol: "tcp", range: "3128" }
    dependencies: []
    userdata:     []

  - uuid:         "5833bda9-834b-4d17-ba9f-a76028dc8537"
    name:         "openstack"
    placement:    "OTHER"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "svc", attributes: "" }
    services:
      - { name: "horizon", network: "svc", protocol: "tcp", range: "443" }
    dependencies: []
    userdata:     []

  - uuid:         "c28bbc79-e653-4a6f-a3ab-34421a89eadd"
    name:         "devops"
    placement:    "OTHER"
    flavor:       "none"
    image:        "none"
    min:          1
    size:         1
    max:          1
    volumes:      []
    interfaces:
      - { network: "svc", attributes: "" }
      - { network: "pub", attributes: "" }
    services:     []
    dependencies:
      - { component: "jumphost", service: "ssh", network: "svc" }
      - { component: "jumphost", service: "ssh", network: "pub" }
    userdata:     []`
