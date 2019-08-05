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
    proxy:       "{{tenant.service.proxy}}"
    port:        "{{tenant.service.port}}"
  jumphost:      "{{tenant.jumphost}}"
  proxy:
    http:        "{{tenant.proxy.http}}"
    https:       "{{tenant.proxy.https}}"
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
  OS_PROJECT_NAME:            "{{tenant.name}}"
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
  PROXY_ADDRESS:              "{{tenant.service.proxy}}"
  PROXY_PORT:                 "{{tenant.service.port}}"
  JUMPHOST:                   "{{tenant.jumphost}}"
{% if tenant.proxy.http %}{% if tenant.proxy.http != '' %}
  http_proxy:                 "{{tenant.proxy.http}}"
{% endif %}{% endif %}
{% if tenant.proxy.https %}{% if tenant.proxy.https != '' %}
  https_proxy:                "{{tenant.proxy.https}}"
{% endif %}{% endif %}`

//------------------------------------------------------------------------------

templates['Networks (create)'] = `#!/usr/bin/env ansible-playbook
---
- name: Create networks
  hosts: localhost
  connection: local
  gather_facts: false
  vars_files:
    - ../environment.yml
  environment: "{{ '{{env_vars}}' }}"
  tasks:
{% for network in networks %}{% if network.external == false %}
  - name: Create {{network.name}} network
    os_network:
      state:          present
      name:           {{network.name}}
      validate_certs: no

  - name: Create {{network.name}} subnet
    os_subnet:
      state:                 present
      network_name:          {{network.name}}
      name:                  {{network.name}}_subnet
      cidr:                  {{network.ipv4}}
      allocation_pool_start: {{network.ipv4start}}
      allocation_pool_end:   {{network.ipv4end}}
      validate_certs:        no

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
        state:          absent
        name:           "{{ '{{item}}' }}_subnet"
        validate_certs: no
      loop:
{% for network in networks %}{% if network.external == false %}
      - {{network.name}}
{% endif %}{% endfor %}

    - name: Delete networks
      os_network:
        state:          absent
        name:           "{{ '{{item}}' }}"
        validate_certs: no
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
    - name: Define networks
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

    - name: Create output directory
      file:
        path:  ../output
        state: directory
      delegate_to:  localhost

    - name: Create report 'networks.yml'
      template:
        src:  networks.tmpl
        dest: ../output/networks.yml
      delegate_to:  localhost
      changed_when: false`

//------------------------------------------------------------------------------

templates['Servers (status)'] = `#!/usr/bin/env ansible-playbook
---
- name: Create server inventory of the tenant
  hosts:        localhost
  connection:   local
  gather_facts: false
  vars_files:
    - ../environment.yml
  environment: "{{ '{{env_vars}}' }}"
  tasks:
    - name: Define servers
      set_fact:
        server_names:
{% for component in components %}{% if component.placement != 'OTHER' %}{% if component.placement != 'ROUTER' %}
{% if component.max == 1 %}
          - {{component.name}}
{% else %}
{% for server_index in range(1,1+component.max,1) %}
          - {{component.name}}{{server_index}}
{% endfor %}
{% endif %}
{% endif %}{% endif %}{% endfor %}

    - name: Define ports
      set_fact:
        port_names:
{% for component in components %}{% if component.placement != 'OTHER' %}{% if component.placement != 'ROUTER' %}
{% for interface in component.interfaces %}
{% if component.max == 1 %}
          - {{component.name}}_{{interface.network}}
{% else %}
{% for server_index in range(1,component.max,1) %}
          - {{component.name}}{{server_index}}_{{interface.network}}
{% endfor %}
{% endif %}
{% endfor %}
{% endif %}{% endif %}{% endfor %}

    - name: Collect server information
      os_server_facts:
         validate_certs: no
      register: servers
      ignore_errors: yes

    - name: Collect port information
      os_port_facts:
         validate_certs: no
      register: ports
      ignore_errors: yes

    - name: Create output directory
      file:
        path:  ../output
        state: directory
      delegate_to:  localhost

    - name: Create report 'servers.yml'
      template:
        src:  servers.tmpl
        dest: ../output/servers.yml
      delegate_to:  localhost
      changed_when: false`

//------------------------------------------------------------------------------

templates['Servers (define security)'] = `{% for component in components %}{% if component.placement != 'OTHER' %}{% if component.placement != 'ROUTER' %}
----- {{component.name}} -----
#!/usr/bin/env ansible-playbook
---
- name: Create security groups for ports of server {{component.name}}
  hosts: localhost
  connection: local
  gather_facts: false
  vars_files:
    - ../../environment.yml
  environment: "{{ '{{env_vars}}' }}"
  tasks:

{% for interface in component.interfaces %}
  # ----- security group for {{component.name}} interface {{interface.network}} -----
  - name: Create {{component.name}}_{{interface.network}} security group
    os_security_group:
      state:          present
      name:           {{component.name}}_{{interface.network}}
      description:    Security group for the {{component.name}} {{interface.network}} interface.
      validate_certs: no
    register: secgroup

  # ----- reset all ingress security rules for {{component.name}} interface {{interface.network}} -----
  - name: Delete all ingress {{component.name}}_{{interface.network}} security group rules
    os_security_group_rule:
      state:            absent
      security_group:   {{component.name}}_{{interface.network}}
      protocol:         "{{ '{{item.protocol}}' }}"
      port_range_min:   "{{ '{{item.port_range_min}}' }}"
      port_range_max:   "{{ '{{item.port_range_max}}' }}"
      remote_ip_prefix: "{{ '{{item.remote_ip_prefix}}' }}"
      direction:        ingress
      validate_certs:   no
    loop: "{{ '{{secgroup.secgroup.security_group_rules}}' }}"
    when: item.direction == "ingress"

  # ----- security group rules for {{component.name}} interface {{interface.network}} -----
  - name: Create {{component.name}}_{{interface.network}} security group rules
    os_security_group_rule:
      state:            present
      security_group:   {{component.name}}_{{interface.network}}
      protocol:         "{{ '{{item.protocol}}' }}"
      port_range_min:   "{{ '{{item.port_range_min}}' }}"
      port_range_max:   "{{ '{{item.port_range_max}}' }}"
      remote_ip_prefix: "{{ '{{item.remote_ip_prefix}}' }}"
      direction:        ingress
      validate_certs:   no
    loop:
    - {protocol: icmp, port_range_min: 0, port_range_max: 255, remote_ip_prefix: 0.0.0.0/0}
{% for service in component.services %}{% if interface.network == service.network %}
{% for network in networks %}{% if interface.network == network.name %}
    - {protocol: {{service.protocol}}, port_range_min: {{service.range}}, port_range_max: {{service.range}}, remote_ip_prefix: {{network.ipv4}} }
{% endif %}{% endfor %}
{% endif %}{% endfor %}

{% endfor %}
{% endif %}{% endif %}{% endfor %}`

//------------------------------------------------------------------------------

templates['Servers (undefine security)'] = `{% for component in components %}{% if component.placement != 'OTHER' %}{% if component.placement != 'ROUTER' %}
----- {{component.name}} -----
#!/usr/bin/env ansible-playbook
---
- name: Delete security groups for ports of server {{component.name}}
  hosts: localhost
  connection: local
  gather_facts: false
  vars_files:
    - ../../environment.yml
  environment: "{{ '{{env_vars}}' }}"
  tasks:

{% for interface in component.interfaces %}
  # ----- security group for {{component.name}} interface {{interface.network}} -----
  - name: Create {{component.name}}_{{interface.network}} security group
    os_security_group:
      state:          absent
      name:           {{component.name}}_{{interface.network}}
      description:    Security group for the {{component.name}} {{interface.network}} interface.
      validate_certs: no

{% endfor %}
{% endif %}{% endif %}{% endfor %}`

//------------------------------------------------------------------------------

templates['Servers (create)'] = `{% for component in components %}{% if component.placement != 'OTHER' %}{% if component.placement != 'ROUTER' %}
----- {{component.name}} -----
#!/usr/bin/env ansible-playbook
---
- name: Create server {{component.name}}
  hosts: localhost
  connection: local
  gather_facts: false
  vars_files:
    - ../../environment.yml
  environment: "{{ '{{env_vars}}' }}"
  tasks:

{% for interface in component.interfaces %}
  # ----- {{interface.network}} port for {{component.name}} -----
  - name: Create {{interface.network}} port for {{component.name}}
    os_port:
      state:          present
      name:           "{{component.name}}_{{interface.network}}"
      network:        "{{interface.network}}"
      validate_certs: no
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
      state:          present
      name:           {{component.name}}
      flavor:         "{{component.flavor}}"
      image:          "{{component.image}}"
      key_name:       fiveg_key
      config_drive:   yes
      auto_ip:        no
      timeout:        600
      validate_certs: no
      nics:
{% for interface in component.interfaces %}
        - port-name: {{component.name}}_{{interface.network}}
{% endfor %}
      meta:
       hostname: {{component.name}}

{% endif %}{% endif %}{% endfor %}`

//------------------------------------------------------------------------------

templates['Servers (delete)'] = `{% for component in components %}{% if component.placement != 'OTHER' %}{% if component.placement != 'ROUTER' %}
----- {{component.name}} -----
#!/usr/bin/env ansible-playbook
---
- name: Delete server {{component.name}}
  hosts: localhost
  connection: local
  gather_facts: false
  vars_files:
    - ../../environment.yml
  environment: "{{ '{{env_vars}}' }}"
  tasks:

{% for interface in component.interfaces %}
  # ----- {{interface.network}} port for {{component.name}} -----
  - name: Create {{interface.network}} port for {{component.name}}
    os_port:
      state:          absent
      name:           "{{component.name}}_{{interface.network}}"
      network:        "{{interface.network}}"
      validate_certs: no

{% endfor %}

  # ----- {{component.name}} virtual machine -----
  - name: Create virtual machine for {{component.name}} server
    os_server:
      state:          absent
      name:           {{component.name}}
      validate_certs: no

{% endif %}{% endif %}{% endfor %}`
