import canonical                 from './templates/canonical.j2'
import communication_matrix      from './templates/communication_matrix.j2'
import environment               from './templates/environment.j2'
import networks_create           from './templates/networks_create.j2'
import networks_delete           from './templates/networks_delete.j2'
import networks_status           from './templates/networks_status.j2'
import servers_create            from './templates/servers_create.j2'
import servers_delete            from './templates/servers_delete.j2'
import servers_status            from './templates/servers_status.j2'
import servers_define_security   from './templates/servers_define_security.j2'
import servers_undefine_security from './templates/servers_undefine_security.j2'
import servers_ssh               from './templates/servers_ssh.j2'
import router_create             from './templates/router_create.j2'
import router_delete             from './templates/router_delete.j2'
import openrc                    from './templates/openrc.j2'
import openstack_crt             from './templates/openstack_crt.j2'
import ssh                       from './templates/ssh.j2'
import prerequisites             from './templates/prerequisites.j2'
import readme                    from './templates/readme.j2'
import config                    from './templates/config.j2'
import heat_networks             from './templates/heat_networks.j2'
import heat_security             from './templates/heat_security.j2'
import heat_servers              from './templates/heat_servers.j2'

var templates = {}

templates['Canonical']                   = canonical
templates['Communication Matrix']        = communication_matrix
templates['Environment']                 = environment
templates['Networks (create)']           = networks_create
templates['Networks (delete)']           = networks_delete
templates['Networks (status)']           = networks_status
templates['Servers (create)']            = servers_create
templates['Servers (delete)']            = servers_delete
templates['Servers (status)']            = servers_status
templates['Servers (define security)']   = servers_define_security
templates['Servers (undefine security)'] = servers_undefine_security
templates['Servers (ssh)']               = servers_undefine_security
templates['Router (create)']             = router_create
templates['Router (delete)']             = router_delete
templates['openrc']                      = openrc
templates['openstack.crt']               = openstack_crt
templates['ssh']                         = ssh
templates['Prequisites']                 = prerequisites
templates['readme']                      = readme
templates['config']                      = config
templates['HEAT Networks']               = heat_networks
templates['HEAT Security']               = heat_security
templates['HEAT Servers']                = heat_servers

export  { templates }
