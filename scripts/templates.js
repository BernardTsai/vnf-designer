var templates = {}

templates['Canonical'] = `---
vnf:        {{vnf}}
version:    {{version}}
tenant:
  name:          "{{tenant.name}}"
  auth:
    username:    "{{tenant.auth.username}}"
    password:    "{{tenant.auth.password}}"
    proxy:       "{{tenant.auth.proxy}}"
    url:         "{{tenant.auth.url}}"
    cert:        "{{tenant.auth.cert}}"
    region:      "{{tenant.auth.region}}"
    vol_api:     "{{tenant.auth.vol_api}}"
    plugin:      "{{tenant.auth.plugin}}"
  service:
    network:     "{{tenant.service.network}}"
    cidr:        "{{tenant.service.cidr}}"
    gateway:     "{{tenant.service.gateway}}"
  proxy:
    address:     "{{tenant.proxy.address}}"
    port:        "{{tenant.proxy.port}}"
  jumphost:      "{{tenant.jumphost}}"
flavors:
{% for flavor in flavors %}
  - uuid:    "{{flavor.uuid}}"
    name:    "{{flavor.name}}"
    vcpu:    {{flavor.vcpu}}
    ram:     {{flavor.ram}}
    disk:    {{flavor.disk}}
    public:  "{{flavor.public}}"
{% if flavor.special|length == 0 %}
    special: []
{% endif -%}
{% if flavor.special|length >  0 %}
    special:
{% endif -%}
{% for special in flavor.special %}
      - { key: "{{special.key}}", value: "{{special.value}}" }
{% endfor %}
{% endfor %}
images:
{% for image in images -%}
  - { uuid: "{{image.uuid}}", name: "{{image.name}}", version: "{{image.version}}", format: "{{image.format}}", container: "{{image.container}}", disk: "{{image.disk}}", size: "{{image.size}}", checksum: "{{image.checksum}}", url: "{{image.url}}", special: "{{image.special}}" }
{% endfor %}
networks:
{% for network in networks%}
  - uuid:      "{{network.uuid}}"
    name:      "{{network.name}}"
    ipv4:      "{{network.ipv4}}"
    ipv4gw:    "{{network.ipv4gw}}"
    ipv4start: "{{network.ipv4start}}"
    ipv4end:   "{{network.ipv4end}}"
    ipv6:      "{{network.ipv6}}"
    ipv6gw:    "{{network.ipv6gw}}"
    ipv6start: "{{network.ipv6start}}"
    ipv6end:   "{{network.ipv6end}}"
    route:     "{{network.route}}"
    export:    "{{network.export}}"
    import:    "{{network.import}}"
    special:   "{{network.special}}"
{% endfor %}
components:
{% for component in components %}
  - uuid:         "{{component.uuid}}"
    name:         "{{component.name}}"
    placement:    "{{component.placement}}"
    flavor:       "{{component.flavor}}"
    image:        "{{component.image}}"
    min:          {{component.min}}
    size:         {{component.size}}
    max:          {{component.max}}
{% if component.volumes|length == 0 %}
    volumes:      []
{% endif -%}
{% if component.volumes|length >  0 %}
    volumes:
{% endif -%}
{% for volume in component.volumes %}
      - { name: "{{volume.name}}", size: {{volume.size}}, type: "{{volume.type}}", attributes: "{{volume.attributes}}" }
{% endfor %}
{% if component.interfaces|length == 0 %}
    interfaces:   []
{% endif -%}
{% if component.interfaces|length >  0 %}
    interfaces:
{% endif -%}
{% for interface in component.interfaces %}
      - { network: "{{interface.network}}", attributes: "{{interface.attributes}}" }
{% endfor %}
{% if component.services|length == 0 %}
    services:     []
{% endif -%}
{% if component.services|length >  0 %}
    services:
{% endif -%}
{% for service in component.services %}
      - { name: "{{service.name}}", network: "{{service.network}}", protocol: "{{service.protocol}}", range: "{{service.range}}" }
{% endfor %}
{% if component.dependencies|length == 0 %}
    dependencies: []
{% endif -%}
{% if component.dependencies|length >  0 %}
    dependencies:
{% endif -%}
{% for dependency in component.dependencies %}
      - { component: "{{dependency.component}}", service: "{{dependency.service}}", network: "{{dependency.network}}" }
{% endfor %}
{% if component.userdata|length == 0 %}
    userdata:     []
{% endif -%}
{% if component.userdata|length >  0 %}
    userdata:
{% endif -%}
{% for userdata in component.userdata %}
      - "{{ userdata | replace('\n', '\u005C\\n')  }}"
{% endfor %}

{% endfor %}
`

templates['TOSCA Simple Profile'] = `---
tosca_definitions_version: tosca_simple_yaml_1_1

description: >
  VNF: '{{vnf}}' in tenant '{{tenant.name}}' version {{version}}
metadata:
  vnfd_id: {{vnf}}_{{version | replace(".", "_")}}
  vnf_provider: name_of_organization
  vnf_product_name: {{vnf}}
  vnf_software_version: {{version}}
  vnfd_version: {{version}}
  template_name: MainServiceTemplate
  template_author: author_name
  template_version: {{version}}
  vnf_product_info_name: {{vnf}}
  vnf_product_info_description: some description
  vnf_product_info_features: {{vnf}} V{{version}}
  localization_language: En
  default_localization_language: En

imports:
  - netcracker-types: definitions/nc-nfv-tosca-types.yaml

group_types:
{% for component in components -%}
{% if component.placement != "other" %}
  {{component.name}}.vnfGroup:
    derived_from: netcracker.groups.nfv.VnfGroup
    capabilities:
      availability:
        type: {{component.name}}.capabilities.availability
      monitoring:
        type: {{component.name}}.capabilities.sizing

{% endif -%}
{% endfor %}

capability_types:
{% for component in components -%}
{% if component.placement != "other" %}
  {{component.name}}.capabilities.availability:
    description: Availabity Status
    derived_from: tosca.capabilities.nfv.Metric
    attributes:
      availability:
        type: string
        description: 'true / false'
        default: false

  {{component.name}}.capabilities.sizing:
    description: Sizing Status
    derived_from: tosca.capabilities.nfv.Metric
    attributes:
      sizing:
        type: string
        description: '-n / 0 / +n or n'
        default: 0

  {{component.name}}.capabilities.VirtualCompute:
    description: Server flavor
    derived_from: tosca.capabilities.nfv.VirtualCompute
{% for flavor in flavors -%}
{% if component.flavor == flavor.name %}
    properties:
      flavour_id:
        type: string
        default: {{flavor.name}}
      virtual_cpu:
        type: string
        default: {{flavor.vcpu}}
      virtual_memory:
        type: string
        default: {{flavor.ram}}
      local_drive_size:
        type: string
        default: {{flavor.disk}}
      special:
        type: string
        default: {{flavor.special}}

{% endif -%}
{% endfor -%}

{% endif -%}
{% endfor %}

node_types:
  .nodes.nfv.VNF.vnf:
    derived_from: tosca.nodes.nfv.vnfd
    properties:
      vnfd_id:
        type: string
      vnf_provider:
        type: string
      vnf_product_name:
        type: string
      vnf_software_version:
        type: string
      vnfd_version:
        type: string
      vnf_product_info_name:
        type: string
      deployment_flavour:
        type: string
      instantiation_level:
        type: string
      keypair_name:
        type: string
      zone_name:
        type: string
        required: false
      zone_secret:
        type: string
        required: false

{% for component in components %}
{% if component.placement != "other" %}
  {{component.name}}.compute:
    derived_from: tosca.nodes.nfv.VDU.Compute
    capabilities:
      virtual_compute:
        type: {{component.name}}.capabilities.VirtualCompute
      availability:
        type: {{component.name}}.capabilities.availability
      monitoring:
        type: {{component.name}}.capabilities.monitoring

{% endif -%}
{% endfor %}

topology_template:
  inputs:
    instantiation_level:
      type: string
      required: false
      default: defaultLevel
    os_user:
      type: string
      required: true
      default: ubuntu
    os_password:
      type: string
      required: true
      description: Ubuntu pasword
      default: ubuntu
    zone_name:
      type: string
      description: Name of Zone on DNS Server
      required: true
     # default: dev-vims.com
    zone_secret:
      type: string
      description: Zone secret on DNS Server
      required: true
     # default: M6wx7acatsdEsaTFpLrpjA==

  # Interface for NSD integration as VNF
  substitution_mappings:
    node_type: .nodes.nfv.VNF.vnf
    properties:
      vnfd_id: {{vnf}}_{{version | replace(".", "_")}}
      vnf_provider: name_of_organization
      vnf_product_name:  {{vnf}}
      vnf_software_version: {{version}}
      vnfd_version: {{version}}
      template_name: MainServiceTemplate
      template_author: author_name
      template_version: {{version}}
      vnf_product_info_name:  {{vnf}} V{{version}}
      zone_name: [zone_name]
      zone_secret: [zone_secret]

  # VNF Components and Networks:
  node_templates:

    # Virtual Links:
{% for network in networks %}
    {{network.name}}_VL:
      type: tosca.nodes.nfv.VnfVirtualLinkDesc
      properties:
        connectivity_type:
            layer_protocol: ipv4
            flow_pattern: Mesh

{% endfor %}

    # Virtual Storage:
{% for component in components %}
{% if component.placement != "other" %}
{% for volume in component.volumes %}
    {{component.name}}_{{volume.name}}_VS:
      type: tosca.nodes.nfv.VDU.VirtualStorage
        properties:
          type_of_storage: {{volume.type}}
          size_of_storage: {{volume.size}}
          rdma_enabled: false

{% endfor %}
{% endif %}
{% endfor %}

    # Virtual Compute:
{% for component in components %}
{% if component.placement != "other" %}
    {{component.name}}:
      type: {{component.name}}.compute
      requirements:
        - dependency: haproxy
      properties:
        name: {{component.name}}
        description: {{component.name}} of VNF {{vnf}} in tenant {{tenant.name}}
        configurable_properties:
      capabilities:
        scalable:
          properties:
            min_instances: {{component.min}}
            max_instances: {{component.max}}
{% if component.volumes|length >  0 %}
      requirements:
{% for volume in component.volumes %}
        - virtual_storage:  {{component.name}}_{{volume.name}}_VS
{% endfor %}
{% endif %}
      artifacts:
        {{component.name}}_install:
          type: tosca.artifacts.Implementation.Ansible
          file: implementation/configuration/Ansible/tasks/{{component.name}}_install.yml
          deploy_path: tasks/{{component.name}}_install.yml
          properties:
            ansible_version: 2.3.2.0
        {{component.name}}_configure:
          type: tosca.artifacts.Implementation.Ansible
          file: implementation/configuration/Ansible/{{component.name}}_configure.yml
          deploy_path: tasks/{{component.name}}_configure.yml
          properties:
            ansible_version: 2.3.2.0
        {{component.name}}_terminate:
          type: tosca.artifacts.Implementation.Ansible
          file: implementation/configuration/Ansible/{{component.name}}_terminate.yml
          deploy_path: tasks/{{component.name}}_terminate.yml
          properties:
            ansible_version: 2.3.2.0
        {{component.name}}_register:
          type: tosca.artifacts.Implementation.Ansible
          file: implementation/configuration/Ansible/tasks/{{component.name}}_register.yml
          deploy_path: tasks/{{component.name}}_register.yml
          properties:
            ansible_version: 2.3.2.0
        {{component.name}}_unregister:
          type: tosca.artifacts.Implementation.Ansible
          file: implementation/configuration/Ansible/tasks/{{component.name}}_unregister.yml
          deploy_path: tasks/{{component.name}}_unregister.yml
          properties:
            ansible_version: 2.3.2.0
        {{component.name}}_prometheus_rules:
          type: tosca.artifacts.prometheus.rules
          file: implementation/monitoring/{{component.name}}_prometheus.rules
          properties:
            ansible_version: 2.3.2.0
        check_hosts:
          type: tosca.artifacts.Implementation.Ansible
          file: implementation/configuration/Ansible/check_hosts.yml
          properties:
            ansible_version: 2.3.2.0
        ansible-nic_config:
          type: tosca.artifacts.Implementation.Ansible
          file: implementation/configuration/Ansible/tasks/nic_config.yml
          deploy_path: tasks/nic_config.yml
          properties:
            ansible_version: 2.3.2.0
        handlers:
          type: tosca.artifacts.Implementation.Ansible
          file: implementation/configuration/Ansible/handlers/handlers.yml
          properties:
            ansible_version: 2.3.2.0
        ansible-bootstrap_proxy:
          type: tosca.artifacts.Implementation.Ansible
          file: implementation/configuration/Ansible/tasks/bootstrap_proxy.yml
          deploy_path: tasks/bootstrap_proxy.yml
          properties:
            ansible_version: 2.3.2.0
        monitoring_blackbox_exporter:
          type: tosca.artifacts.prometheus.blackbox_exporter
          file: implementation/monitoring/blackbox-exporter.yml
          properties:
            scrape_interval: 20s
            ansible_version: 2.3.2.0
        sw_image:
{% for image in images -%}
{% if component.image == image.name %}
          type: tosca.artifacts.nfv.SwImage
          file: {{image.url}}
          properties:
            name: {{image.name}}
            version: {{image.version}}
            checksum: {{image.checksum}}
            container_format: {{image.container}}
            disk_format: {{image.format}}
            min_disk: {{image.disk}} GB
            size: {{image.size}} MB
            supported_virtualisation_environments:
              - KVM
{% endif -%}
{% endfor %}
      interfaces:
        Standard:
          create: sw_image
          configure:
            inputs:
              ansible_playbook:
                target: { get_attribute: [ SELF, tosca_id ] }
              ansible_inventory:
                ansible_user: { get_input: os_user }
                os_pass: { get_input: os_password }
                ansible_ssh_private_key_file: ~/.ssh/id_rsa
                ansible_python_interpreter: /usr/bin/python3
                role: { get_attribute: [ SELF, name ] }
                m2m_cidr: { get_attribute: [ m2m_VL, subnet, cidr ] }
                host_prefix: { get_attribute: [ squid, name ] }
                host_index: { get_attribute: [ squid, vmIndex ] }
                m2m_ip: { get_operation_output: [ squid_m2m_cp, Standard, create, ip_address ] }
                zone_name: { get_input: zone_name }
                zone_secret: { get_input: zone_secret }
            implementation:
              primary: configuration
              dependencies:
                 - handlers
                 - ansible-bootstrap_http-proxy
                 - {{component.name}}_install
                 - ansible-nic_config
                 - {{component.name}}_register
          stop:
            inputs:
              ansible_playbook:
                target: { get_attribute: [ SELF, tosca_id ] }
            implementation:
              primary: terminate
              dependencies:
                - handlers
                - ansible-nic_config

{% endif %}
{% endfor %}

{% for component in components %}
{% if component.placement != "other" %}
{% for interface in component.interfaces %}
    {{component.name}}_{{interface.network}}_CP:
      type: tosca.nodes.nfv.VduCpd
      properties:
{% if interface.network == "oam" %}
        role: management
{% endif %}
        layer_protocol: ipv4
        address_data:
          -
            address_type: ip_address
            l3_address_data:
              ip_address_assignment: true
              floating_ip_activated: false
              ip_address_type:       ipv4
              number_of_ip_address:  1
      requirements:
        - virtual_binding: {{component.name}}
        - virtual_link: {{interface.network}}_VL
{% if interface.network != "oam" %}
        - dependency: {{component.name}}_oam_cp
{% endif %}

    {{component.name}}_{{interface.network}}_EXT_CP:
      type: tosca.nodes.nfv.VnfExtCpd
      properties:
        layer_protocol: ipv4
        role: management
        address_data:
          - address_type: ip_address
            l3_address_data:
              ip_address_assignment: false
              floating_ip_activated: false
              ip_address_type:       ipv4
              number_of_ip_address:  1
      requirements:
        - VduCpd_binding: {{component.name}}_{{interface.network}}_CP

{% endfor %}
{% endif %}
{% endfor %}

  groups:
    # Scaling associatedGroups:
{% for component in components %}
{% if component.placement != "other" %}
    {{component.name}}_SG:
      type: tosca.groups.nfv.VnfdElementGroup
      description:
      members: [ {{component.name}} ]
{% endif %}
{% endfor %}

  policies:
    # Instantiation Levels:
    - defaultLevel:
        type: tosca.policies.nfv.instantiationlevel
        properties:
          description:
          isDefault: true
          vduLevels:
{% for component in components %}
{% if component.placement != "other" %}
            {{component.name}}:
              numberOfInstances: {{component.size}}
{% endif %}
{% endfor %}
          scaleInfo:
{% for component in components %}
{% if component.placement != "other" %}
            {{component.name}}_SA:
              scaleLevel: {{component.size}}
{% endif %}
{% endfor %}

    # Scaling Aspects:
{% for component in components %}
{% if component.placement != "other" %}
    - {{component.name}}_SA:
        type: tosca.policies.nfv.scalingAspect
        properties:
          name: {{component.name}}
          description:
          maxScaleLevel: {{component.max}}
        targets: [ {{component.name}}_SG ]
{% endif %}
{% endfor %}`

//------------------------------------------------------------------------------

templates['Communication Matrix'] = `From                |Network |To                  |Service   |Protocol|Port (range)    |Network
{% for component1 in components %}{% for dependency in component1.dependencies %}
{% for component2 in components %}{% if component2.name == dependency.component %}
{% for service in component2.services %}{% if service.name == dependency.service %}
{{(component1.name    + '                    ') | truncate(20,false,'') }}|{{(dependency.network + '        ') | truncate(8,false,'') }}|{{(component2.name + '                    ') | truncate(20,false,'') }}|{{(service.name + '          ') | truncate(10,false,'') }}|{{(service.protocol + '        ') | truncate(8,false,'')  }}|{{(service.range      + '                ') | truncate(16,false,'') }}|{{(service.network    + '      ') | truncate(6,false,'')  }}
{% endif %}{% endfor %}
{% endif %}{% endfor %}
{% endfor %}{% endfor %}`

//------------------------------------------------------------------------------

templates['Environment'] = `---
# file: environment.yml

# ----- environment variables -----
env_vars:
  OS_TENANT_NAME:             "{{tenant.name}}"
  OS_PROJECT_NAME:            "{{tenant.auth.name}}"
  OS_USERNAME:                "{{tenant.auth.username}}"
  OS_PASSWORD:                "{{tenant.auth.password}}"
  OS_API_PROXY:               "{{tenant.auth.proxy}}"
  OS_AUTH_URL:                "{{tenant.auth.url}}"
  OS_CACERT:                  "{{tenant.auth.cert}}"
  OS_REGION_NAME:             "{{tenant.auth.region}}"
  OS_VOLUME_API_VERSION:      "{{tenant.auth.vol_api}}"
  OS_AUTH_PLUGIN:             "{{tenant.auth.plugin}}"

  SERVICE_NETWORK:            "{{tenant.service.network}}"
  SERVICE_CIDR:               "{{tenant.service.cidr}}"
  SERVICE_GATEWAY:            "{{tenant.service.gateway}}"
  PROXY_ADDRESS:              "{{tenant.proxy.address}}"
  PROXY_PORT:                 "{{tenant.proxy.port}}"
  JUMPHOST:                   "{{tenant.jumphost}}"`

//------------------------------------------------------------------------------

templates['Networks (create)'] = `#!/usr/bin/env ansible-playbook
---
- name: Create networks
  hosts: localhost
  connection: local
  gather_facts: false
  vars:
     ansible_connection:         local
     ansible_python_interpreter: "{{ '{{ansible_playbook_python}}' }}"
  vars_files:
    - environment.yml
  environment: "{{ '{{env_vars}}' }}"
  tasks:
  - name:    Copy CERT file for API access
    copy:    src=files/ic-pn_osapi.crt dest=ic-pn_osapi.crt
    changed_when: false

{% for network in networks %}{% if network.external == false %}
  - name: Create {{network.name}} network
    os_network:
      state:  present
      name:   {{network.name}}

  - name: Create {{network.name}} subnet
    os_subnet:
      state:                 present
      network_name:          {{network.name}}
      name:                  {{network.name}}_subnet
      cidr:                  {{network.ipv4}}
      allocation_pool_start: {{network.ipv4start}}
      allocation_pool_end:   {{network.ipv4end}}

{% endif %}{% endfor %}`

//------------------------------------------------------------------------------

templates['Networks (delete)'] = `#!/usr/bin/env ansible-playbook
---
- name: Delete networks
  hosts:        localhost
  connection:   local
  gather_facts: false
  vars_files:
    - ../environment.yml
  environment: "{{ '{{env_vars}}' }}"
  tasks:
    - name: Delete subnets
      os_subnet:
        state:        absent
        network_name: "{{ '{{item}}' }}_subnet"
      loop:
{% for network in networks %}{% if network.external == false %}
      - {{network.name}}
{% endif %}{% endfor %}

    - name: Delete networks
      os_network:
        state:        absent
        network_name: "{{ '{{item}}' }}"
      loop:
{% for network in networks %}{% if network.external == false %}
      - {{network.name}}
{% endif %}{% endfor %}`

//------------------------------------------------------------------------------

templates['Networks (status)'] = `#!/usr/bin/env ansible-playbook
---
- name: Create network inventory of the tenant
  hosts:        localhost
  connection:   local
  gather_facts: false
  vars_files:
    - ../environment.yml
  environment: "{{ '{{env_vars}}' }}"
  tasks:
    - name: Collect network information
      set_fact:
        network_names:
{% for network in networks %}
          - {{network.name}}
{% endfor %}

    - name: Collect network information
      os_networks_facts:
         validate_certs: no
      register: networks
      ignore_errors: yes

    - name: Collect subnet information
      os_subnets_facts:
         validate_certs: no
      register: subnets
      ignore_errors: yes

    - name: Create report 'networks.yml'
      template:
        src:  networks.tmpl.yml
        dest: output/networks.yml
      delegate_to:  localhost
      changed_when: false`

//------------------------------------------------------------------------------

templates['Servers (ansible)'] = `#!/usr/bin/env ansible-playbook
---
- name: Create servers
  hosts: localhost
  connection: local
  gather_facts: false
  vars:
     ansible_connection:         local
     ansible_python_interpreter: "{{ '{{ansible_playbook_python}}' }}"
  vars_files:
    - environment.yml
  tasks:
  - name:    Copy CERT file for API access
    copy:    src=files/ic-pn_osapi.crt dest=ic-pn_osapi.crt
    changed_when: false

{% for component in components %}{% if component.placement != 'OTHER' %}{% for interface in component.interfaces %}
  # ----- security group for {{component.name}} interface {{interface.network}} -----
  - name: Create {{component.name}}_{{interface.network}} security group
    os_security_group:
      state:       present
      name:        {{component.name}}_{{interface.network}}
      description: Security group for the {{component.name}} {{interface.network}} interface.

  # ----- security group rules for {{component.name}} interface {{interface.network}} -----
  - name: Create {{component.name}}_{{interface.network}} security group rules
    os_security_group_rule:
      state:            present
      security_group:   {{component.name}}_{{interface.network}}
      protocol:         "{{ '{{item.protocol}}' }}'"
      port_range_min:   "{{ '{{item.port_range_min}}' }}"
      port_range_max:   "{{ '{{item.port_range_max}}' }}"
      remote_ip_prefix: "{{ '{{item.remote_ip_prefix}}' }}"
      direction:        ingress
    loop:
    - {protcol: icmp, remote_ip_prefix: 0.0.0.0/0}
{% for service in component.services %}{% if interface.network == service.network %}
{% for network in networks %}{% if interface.network == network.name %}
    - {protocol: {{service.protocol}}, port_range_min: {{service.range}},   port_range_max: {{service.range}}, remote_ip_prefix: {{network.ipv4}}}
{% endif %}{% endfor %}
{% endif %}{% endfor %}

  # ----- {{interface.network}} port for {{component.name}} -----
  - name: Create {{interface.network}} port for {{component.name}}
    os_port:
      state:   present
      name:    "{{component.name}}_{{interface.network}}"
      network: "{{interface.network}}"
      security_groups:
      - "{{component.name}}_{{interface.network}}"
{% if interface.attributes|allowed|length > 0 %}
      allowed_address_pairs:
{% for allowed in interface.attributes|allowed %}
      - ip_address: {{allowed}}
{% endfor %}{% endif %}
{% if interface.attributes|fixed|length > 0 %}
      fixed_ips:
{% for fixed in interface.attributes|fixed %}
      - ip_address: {{fixed}}
{% endfor %}{% endif %}

{% endfor %}

# ----- {{component.name}} virtual machine -----
- name: Create virtual machine for {{component.name}} server
  os_server:
    state:        present
    name:         {{component.name}}
    flavor:       "{{component.flavor}}"
    image:        "{{component.flavor}}"
    key_name:     fiveg_key
    config_drive: yes
    auto_ip:      no
    timeout:      600
    nics:
{% for interface in component.interfaces %}
     - port-name: {{component.name}}_{{interface.network}}
{% endfor %}
    meta:
     hostname: {{component.name}}

{% endif %}{% endfor %}`
