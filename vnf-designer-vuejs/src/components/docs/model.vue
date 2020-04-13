<template>
  <div>
    <nav class="nav-grid">
      <h4 class="nav-grid-h4">
        <a href  @click.prevent="swapDoc('readme')">overview</a>
      </h4>
    </nav>
    <h1>Model</h1>
    <p>
      The internal model is structured according to following schema (in yaml
      format):
    </p>
    <pre><code>title: VNF Descriptor
description: A simple VNF descriptor
type: object
required:
  - schema
  - vnf
  - version
  - tenant
  - flavors
  - images
  - networks
  - components
properties:
  schema:
    type: string
    enum:
      - 1.0.0
    description: The version of the schema
  vnf:
    type: string
    minLength: 1
    description: The unique identifier for a virtual network function
  version:
    type: string
    pattern: ^\\d+\\.\\d+.\\d+$
    description: Semantic version of the VNF descriptor
  tenant:
    description: The tenant information
    type: object
    required:
      - auth
      - service
    properties:
      auth:
        description: The authentication information
        type: object
        required:
          - username
          - password
          - url
        properties:
          username:
            type: string
            description: username for accessing the API
          password:
            type: string
            description: password for accessing the API
          url:
            type: string
            description: url for the API
  flavors:
    description: The sizing of virtual servers
    type: array
    items:
      title: Flavor
      type: object
      required:
        - uuid
        - name
        - vcpu
        - ram
        - disk
        - public
        - special
      properties:
        uuid:
          type: string
          description: Unique identifier of the flavor
        name:
          type: string
          description: Name of the flavor
        vcpu:
          type: number
          description: Number of virtual core processing units as string
        ram:
          type: number
          description: Size of memory in megabytes as string
        disk:
          type: number
          description: Size of local disk in gigabytes as string
        public:
          type: string
          enum:
            - 'true'
            - 'false'
          description: Image is a predefined public image
        special:
          description: Additional special attributes
          type: array
          items:
            type: object
            description: Key-value pair
            required:
              - key
              - value
            properties:
              key:
                type: string
                description: Attribute name
              value:
                type: string
                description: Attribute value
  images:
    description: The operating systems for virtual servers
    type: array
    items:
      title: Image
      type: object
      required:
        - uuid
        - name
        - disk
        - container
      properties:
        uuid:
          type: string
          description: Unique identifier of the image
        name:
          type: string
          description: Name of the image
        version:
          type: string
          description: Version of the image
        format:
          type: string
          enum:
            - aki
            - ami
            - ari
            - iso
            - qcow2
            - raw
            - vdi
            - vhd
            - vhdx
            - vmdk
          description: Disk format of the image
        container:
          type: string
          enum:
            - aki
            - ami
            - ari
            - bare
            - docker
            - ova
            - ovf
          description: Container format of the image
        disk:
          type: string
          description: Minimum disk requirements
        size:
          type: string
          description: Size of the image
        checksum:
          type: string
          description: Checksum of the image
        url:
          type: string
          description: URL for the image
        special:
          type: string
          description: Additional special attributes
  networks:
    description: The virtual networks
    type: array
    items:
      title: Network
      type: object
      required:
        - uuid
        - ipv4
        - ipv4gw
        - ipv4start
        - ipv4end
        - ipv6
        - ipv6gw
        - ipv6start
        - ipv6end
        - route
        - import
        - export
        - special
      properties:
        uuid:
          type: string
          description: Unique identifier of the virtual network
        name:
          type: string
          description: Name of the virtual network
        ipv4:
          type: string
          description: IPv4 CIDR of the virtual network
        ipv4gw:
          type: string
          description: IPv4 gateway of the virtual network
        ipv4start:
          type: string
          description: IPv4 start address of the virtual network
        ipv4end:
          type: string
          description: IPv4 end address of the virtual network
        ipv6:
          type: string
          description: IPv6 attributes of the virtual network
        ipv6gw:
          type: string
          description: IPv6 gateway of the virtual network
        ipv6start:
          type: string
          description: IPv6 start address of the virtual network
        ipv6end:
          type: string
          description: IPv6 end address of the virtual network
        route:
          type: string
          description: Comma seperated list of route targets
        export:
          type: string
          description: Comma seperated list of export targets
        import:
          type: string
          description: Comma seperated list of import targets
        special:
          type: string
          description: Additional special attributes
  components:
    description: The virtual servers
    type: array
    items:
      title: Component
      type: object
      required:
        - uuid
        - name
        - placement
        - flavor
        - image
        - min
        - size
        - max
        - interfaces
        - volumes
        - services
        - dependencies
      properties:
        uuid:
          type: string
          description: Unique identifier of the virtual server
        name:
          type: string
          description: Name of the virtual server
        placement:
          type: string
          enum:
            - OTHER
            - EXT
            - INT
            - MGMT
            - ROUTER
          description: Placement of the virtual server
        flavor:
          type: string
          description: Name of the virtual server sizing
        image:
          type: string
          description: Name of the operating system
        min:
          type: number
          description: Minimum size of the cluster
        size:
          type: number
          description: Default size of the cluster
        max:
          type: number
          description: Maximum size of the cluster
        interfaces:
          description: The interfaces to virtual networks
          type: array
          items:
            title: Component Interface
            type: object
            required:
              - network
              - attributes
            properties:
              network:
                type: string
                description: Name of the virtual network
              attributes:
                type: string
                description: Additional special attributes
        volumes:
          description: The attached virtual block storage
          type: array
          items:
            title: Component Volume
            type: object
            required:
              - name
              - size
              - type
              - attributes
            properties:
              name:
                type: string
                description: Name of the virtual network
              size:
                type: number
                description: Size of the block storage in gigabyte
              type:
                type: string
                enum:
                  - EXT
                  - INT
                description: Name of block storage pool
              attributes:
                type: string
                description: Additional special attributes
        services:
          description: The exposed services
          type: array
          items:
            title: Component Service
            type: object
            required:
              - name
              - network
              - protocol
              - range
            properties:
              name:
                type: string
                description: Name of the service
              network:
                type: string
                description: The virtual network via which the service is exposed
              protocol:
                type: string
                enum:
                  - tcp
                  - udp
                  - icmp
                  - sctp
                  - none
                description: The service protocol
              range:
                type: string
                minimum: 1
                description: Port range
        dependencies:
          description: The dependencies to services provided by other componennts
          type: array
          items:
            title: Component Network
            type: object
            required:
              - component
              - service
              - network
            properties:
              component:
                type: string
                description: Name of the other component
              service:
                type: string
                description: The name of the service provided by the other component
              network:
                type: string
                description: The virtual network via which the service is consumed
</code></pre>
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
