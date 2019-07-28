var files = {}

files['networks.tmpl'] = `---
networks:
{% for name in network_names %}
{% set n = namespace(network='undefined',subnet='undefined',cidr='',gateway='',start='',end='') %}
{% for network in networks.ansible_facts.openstack_networks %}{% if network.name == name %}
{% set n.network = 'active' %}
{% for subnet in subnets.ansible_facts.openstack_subnets %}{% if subnet.network_id == network.id %}
{% set n.subnet  = 'active' %}
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
