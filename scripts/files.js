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
      {{ port_name | replace(prefix + server_name + "_","") }}:
{% for port in ports.ansible_facts.openstack_ports %}{% if port.name == port_name %}{% set n.port_found = true %}
        status:    "defined"
        fixed:     "{{ port.fixed_ips | map(attribute='ip_address') | join(', ') }}"
        allowed:   "{{ port.allowed_address_pairs | map(attribute='ip_address') | join(', ') }}"
{% endif %}{% endfor %}
{% if n.port_found == false %}
        status:  "unknown"
        fixed:   ""
        allowed: ""
{% endif %}
{% endif %}{% endfor %}
{% endfor %}
`

//------------------------------------------------------------------------------

files['ansible.cfg'] = `
[defaults]
inventory       = ./output/inventory
stdout_callback = yaml

[ssh_connection]
ssh_args     = -F ./output/config
control_path = ./mux-%r@%h:%p`

//------------------------------------------------------------------------------

files['inventory'] = `localhost ansible_connection=local

[servers]
{% for server_name in server_names %}
{{server_name}}
{% endfor %}

[ssh_servers]
{% for server_name in ssh_server_names %}
{{server_name}}
{% endfor %}`

//------------------------------------------------------------------------------

files['default_inventory'] = `localhost ansible_connection=local `

//------------------------------------------------------------------------------

files['setup'] = `#!/usr/bin/env bash

ROOT="."

if [ -f "$ROOT/setup.sh" ]; then
  chmod a+x $ROOT/networks/*.yml
  chmod a+x $ROOT/servers/*.sh
  chmod a+x $ROOT/servers/*.yml
  find  $ROOT/servers -name '*.yml' -type f | xargs chmod a+x
  find  $ROOT/router  -name '*.yml' -type f | xargs chmod a+x
else
  echo "Script should be sourced within the same directory"
fi`

//------------------------------------------------------------------------------

files['setup'] = `#!/usr/bin/env bash

# This script has to be sourced in order to adjust the path
if [[ $_ == $0 ]]
then
  echo ""
  echo "This script has to be sourced!"
  echo ""
  return
fi

# Check availability of required software
which ansible 2>&1 > /dev/null
if [[ "$?" == "1" ]]; then
  echo ""
  echo "Ansible has not been installed!"
  echo ""
  return
fi

which openstack 2>&1 > /dev/null
if [[ "$?" == "1" ]]; then
  echo ""
  echo "openstack client has not been installed!"
  echo ""
  return
fi

# Determine root directory of the setup.sh script
ROOT="/"$(pwd)"/$BASH_SOURCE"
ROOT=$(echo $ROOT | sed 's/.........$//' )

# Determine the bin directory
BIN="$ROOT/bin"

# Add bin subdirectory bin to path
if [ -d "$BIN" ] && [[ ":$PATH:" != *":$BIN:"* ]]; then
    export PATH="$PATH:$BIN"
fi

# Make all scripts executable
find  $BIN                    -name '*.sh'  -type f | xargs chmod a+x 2>&1 > /dev/null
find  $ROOT/elements/networks -name '*.yml' -type f | xargs chmod a+x 2>&1 > /dev/null
find  $ROOT/elements/networks -name '*.sh'  -type f | xargs chmod a+x 2>&1 > /dev/null
find  $ROOT/elements/servers  -name '*.yml' -type f | xargs chmod a+x 2>&1 > /dev/null
find  $ROOT/elements/servers  -name '*.sh'  -type f | xargs chmod a+x 2>&1 > /dev/null
find  $ROOT/elements/router   -name '*.yml' -type f | xargs chmod a+x 2>&1 > /dev/null
find  $ROOT/elements/router   -name '*.sh'  -type f | xargs chmod a+x 2>&1 > /dev/null

# Create ansible.cfg file in ROOT
echo "[defaults]"                               >  $ROOT/ansible.cfg
echo "inventory       = $ROOT/output/inventory" >> $ROOT/ansible.cfg
echo "stdout_callback = yaml"                   >> $ROOT/ansible.cfg
echo ""                                         >> $ROOT/ansible.cfg
echo "[ssh_connection]"                         >> $ROOT/ansible.cfg
echo "ssh_args     = -F $ROOT/output/config"    >> $ROOT/ansible.cfg
echo "control_path = ./mux-%r@%h:%p"            >> $ROOT/ansible.cfg

# Define basic ansible configuration file
export ANSIBLE_CONFIG=$ROOT/ansible.cfg

# Change to root directory
cd $ROOT

# Source openrc
if [ ! -f "input/openrc" ];
then
  echo ""
  echo "OpenStack openrc file can not be found in the input directory"
  echo ""
  return
fi

source $ROOT/input/openrc

# Completed
echo ""
echo "Infrastructure context has been initialised."
echo ""
echo "The available comands are:"
echo "- openstack ..."
cd bin;
for SCRIPT in *.sh;
do
    echo "- $SCRIPT"
done
cd ..
echo ""`

//------------------------------------------------------------------------------

files['infrastructure_authorize.sh'] = `#!/usr/bin/env bash

set -e

# determine script path
SCRIPTPATH="$( cd "$(dirname "$0")/../elements" ; pwd -P )"

# change to root directory
ROOT="$( cd "$(dirname "$0")/.." ; pwd -P )"
cd $ROOT

# check if the file authorized keys exists
if [ ! -f input/authorized_keys ]; then
  echo ""
  echo "Can not find 'authorized_keys' in input directory!"
  echo ""
  exit 1
fi

# Deploy keys
echo "================================================================================"
echo "= Deploy keys on each server                                                   ="
echo "================================================================================"

for DIR in $SCRIPTPATH/servers/*/;
do
    echo "- $DIR/ssh.yml"
    $DIR/ssh.yml -i $ROOT/output/inventory > /dev/null &
done
wait
echo ""

echo "Completed"
echo ""`

//------------------------------------------------------------------------------

files['infrastructure_connect.sh'] = `#!/usr/bin/env bash

set -e

# determine script path
SCRIPTPATH="$( cd "$(dirname "$0")/../elements" ; pwd -P )"

# change to root directory
ROOT="$( cd "$(dirname "$0")/.." ; pwd -P )"
cd $ROOT

# check if the private file exists
if [ ! -f input/id_rsa ]; then
  echo ""
  echo "Can not find 'id_rsa' in input directory!"
  echo ""
  exit 1
fi

# Check if the config file exists
if [ ! -f output/config ]; then
  echo ""
  echo "Can not find 'config' in output directory!"
  echo ""
  exit 1
fi

# Check if a server name has been provided
if [ "$#" -ne 1 ]; then
    echo ""
    echo "Usage: infrastructure_connect.sh <server>"
    echo ""
    exit
fi

# Connect
ssh -F output/config $1`

//------------------------------------------------------------------------------

files['infrastructure_create.sh'] = `#!/usr/bin/env bash

# determine script path
SCRIPTPATH="$( cd "$(dirname "$0")/../elements" ; pwd -P )"

# change to root directory
cd $SCRIPTPATH/..

# Setup networks
echo "================================================================================"
echo "= Setting up the networks                                                      ="
echo "================================================================================"
echo "- /networks/create.yml"
$SCRIPTPATH/networks/create.yml > /dev/null
echo ""

# Setup security policies
echo "================================================================================"
echo "= Setting up security policies                                                 ="
echo "================================================================================"

for DIR in $SCRIPTPATH/servers/*/;
do
    echo "- SDIR/define_security.yml"
    $DIR/define_security.yml > /dev/null &
done
wait
echo ""

# Setup servers
echo "================================================================================"
echo "= Setting up servers                                                           ="
echo "================================================================================"

for DIR in $SCRIPTPATH/servers/*/;
do
    echo "- $DIR/create.yml"
    $DIR/create.yml > /dev/null &
done
wait
echo ""

echo "Completed"
echo ""`

//------------------------------------------------------------------------------

files['infrastructure_delete.sh'] = `#!/usr/bin/env bash

# determine script path
SCRIPTPATH="$( cd "$(dirname "$0")/../elements" ; pwd -P )"

# change to root directory
cd $SCRIPTPATH/..

# Tear down servers
echo "================================================================================"
echo "= Tear down servers                                                            ="
echo "================================================================================"

for DIR in $SCRIPTPATH/servers/*/;
do
    echo "- $DIR/delete.yml"
    $DIR/delete.yml > /dev/null &
done
wait
echo ""

# Remove security policies
echo "================================================================================"
echo "= Remove security policies                                                     ="
echo "================================================================================"

for DIR in $SCRIPTPATH/servers/*/;
do
    echo "- $DIR/undefine_security.yml"
    $DIR/undefine_security.yml > /dev/null &
done
wait
echo ""

# Tear down networks
echo "================================================================================"
echo "= Tear down networks                                                           ="
echo "================================================================================"
echo "- /networks/delete.yml"
$SCRIPTPATH/networks/delete.yml > /dev/null
echo ""

echo "Completed"
echo ""`

//------------------------------------------------------------------------------

files['infrastructure_status.sh'] = `#!/usr/bin/env bash

# determine script path
SCRIPTPATH="$( cd "$(dirname "$0")/../elements" ; pwd -P )"

# change to root directory
cd $SCRIPTPATH/..

echo "================================================================================"
echo "= Status of networks                                                           ="
echo "================================================================================"
echo ""

$SCRIPTPATH/networks/status.yml > /dev/null

echo "================================================================================"
echo "= Status of servers                                                            ="
echo "================================================================================"
echo ""

$SCRIPTPATH/servers/status.yml > /dev/null

echo "Completed"
echo ""`

//------------------------------------------------------------------------------
