var files = {}

files['networks.tmpl'] = `---
networks:
{% for name in network_names %}
{% set n = namespace(network='unknown',subnet='unknown',cidr='',gateway='',start='',end='') %}
{% for network in networks.ansible_facts.openstack_networks %}{% if network.name == name %}
{% set n.network = 'defined' %}
{% for subnet in subnets.ansible_facts.openstack_subnets %}{% if subnet.network_id == network.id %}
{% set n.subnet  = 'defined' %}
{% set n.cidr    = subnet.cidr %}
{% set n.gateway = subnet.gateway_ip %}
{% set n.start   = subnet.allocation_pools[0].start %}
{% set n.end     = subnet.allocation_pools[0].end %}
{% endif %}{% endfor %}
{% endif %}{% endfor %}
  {{name}}:
    network: {{ n.network }}
    subnet:  {{ n.subnet }}
    cidr:    {{ n.cidr }}
    gateway: {{ n.gateway }}
    start:   {{ n.start }}
    end:     {{ n.end }}
{% endfor %}`

//------------------------------------------------------------------------------

files['servers.tmpl'] = `---
{% set n = namespace(server_found=false,port_found=false) %}
servers:
{% for server_name in server_names %}
{% set n.server_found = false %}
  {{server_name}}:
{% for server in servers.ansible_facts.openstack_servers %}{% if server.name == server_name %}{% set n.server_found = true %}
    status:  "defined"
{% endif %}{% endfor %}
{% if n.server_found == false %}
    status:  "unknown"
{% endif %}
    interfaces:
{% for port_name in port_names %}{% if port_name.startswith(server_name + '_') %}
{% set n.port_found = false %}
      {{ port_name | replace(server_name + "_","") }}:
{% for port in ports.ansible_facts.openstack_ports %}{% if port.name == port_name %}{% set n.port_found = true %}
        - status:    "defined"
        - fixed:     "{{ port.fixed_ips | map(attribute='ip_address') | join(', ') }}"
        - allowed:   "{{ port.allowed_address_pairs | map(attribute='ip_address') | join(', ') }}"
{% endif %}{% endfor %}
{% if n.port_found == false %}
        - status:  "unknown"
        - fixed:   ""
        - allowed: ""
{% endif %}
{% endif %}{% endfor %}
{% endfor %}
`

//------------------------------------------------------------------------------

files['ansible.cfg'] = `
[defaults]
inventory       = inventory
stdout_callback = yaml`

//------------------------------------------------------------------------------

files['inventory'] = `
[kubernetes]
k8smaster
k8sworker1
k8sworker2
k8sworker3

[workers]
k8sworker1
k8sworker2
k8sworker3`
