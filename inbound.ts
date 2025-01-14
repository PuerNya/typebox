import type { duration, item_with_tag, listable, network, shadowsocks_method } from './types.ts'
import type { server_tls as tls } from './tls.ts'
import type { dialer, server } from './outbound.ts'
import type { transport } from './transport.ts'

export type inbound =
    | direct
    | mixed
    | socks
    | http
    | shadowsocks
    | vmess
    | trojan
    | naive
    | hysteria
    | shadowtls
    | vless
    | tuic
    | hysteria2
    | tun
    | redirect
    | tproxy

export declare namespace inbound {
    export { direct, http, hysteria, hysteria2, mixed, naive, redirect, shadowsocks, shadowtls, socks, tls, tproxy, trojan, tuic, tun, vless, vmess }
}

interface direct extends listen {
    type: 'direct'
    network?: network
    override_address?: string
    override_port?: number
}
interface mixed extends listen {
    type: 'mixed'
    users?: auth[]
    set_system_proxy?: boolean
}
interface socks extends listen {
    type: 'socks'
    users?: auth[]
}
interface http extends listen {
    type: 'http'
    users?: auth[]
    set_system_proxy?: boolean
    tls?: tls
}
interface shadowsocks extends listen {
    type: 'shadowsocks'
    network?: network
    method: shadowsocks_method
    password: string
    users?: user[]
    destinations?: [user & server]
    multiplex?: multiplex
}
interface vmess extends listen {
    type: 'vmess'
    users: vmess_user[]
    tls?: tls
    multiplex?: multiplex
    transport?: transport
}
interface trojan extends listen {
    type: 'trojan'
    users: user[]
    tls?: tls
    fallback?: server
    fallback_for_alpn?: {
        [alpn: string]: server
    }
    multiplex?: multiplex
    transport?: transport
}
interface naive extends listen {
    type: 'naive'
    users: auth[]
    network?: network
    tls?: tls
}
interface hysteria extends listen {
    type: 'hysteria'
    up: string
    up_mbps: number
    down: string
    down_mbps: number
    obfs?: string
    users: hysteria_user[]
    recv_window_conn?: number
    recv_window_client?: number
    max_conn_client?: number
    disable_mtu_discovery?: boolean
    tls: tls
}
interface shadowtls extends listen {
    type: 'shadowtls'
    version?: 1 | 2 | 3
    password?: string
    users?: user[]
    handshake: server & dialer
    handshake_for_server_name?: {
        [server_name: string]: server & dialer
    }
    strict_mode?: boolean
}
interface vless extends listen {
    type: 'vless'
    users: vless_user[]
    tls?: tls
    multiplex?: multiplex
    transport?: transport
}
interface tuic extends listen {
    type: 'tuic'
    users: tuic_user[]
    congestion_control?: 'cubic' | 'new_reno' | 'bbr'
    auth_timeout?: duration
    zero_rtt_handshake?: boolean
    heartbeat?: duration
    tls: tls
}
interface hysteria2 extends listen {
    type: 'hysteria2'
    up_mbps?: number
    down_mbps?: number
    obfs?: {
        type: 'salamander'
        password: string
    }
    users: user[]
    ignore_client_bandwidth?: boolean
    tls: tls
    masquerade?: string
    brutal_debug?: boolean
}
interface tun extends item_with_tag {
    type: 'tun'
    interface_name?: string
    mtu?: number
    gso?: boolean
    address: listable<string>
    auto_route?: boolean
    iproute2_table_index?: number
    iproute2_rule_index?: number
    auto_redirect?: boolean
    auto_redirect_input_mark?: string
    auto_redirect_output_mark?: string
    strict_route?: boolean
    route_address?: listable<string>
    route_address_set?: listable<string>
    route_exclude_address?: listable<string>
    route_exclude_address_set?: listable<string>
    include_interface?: listable<string>
    exclude_interface?: listable<string>
    include_uid?: listable<number>
    include_uid_range?: listable<string>
    exclude_uid?: listable<number>
    exclude_uid_range?: listable<string>
    include_android_user?: listable<number>
    include_package?: listable<string>
    exclude_package?: listable<string>
    endpoint_independent_nat?: boolean
    udp_timeout?: string
    stack?: 'system' | 'gVisor' | 'mixed'
    platform?: {
        http_proxy: tun_platform
    }
}
interface tun_platform extends server {
    enabled: true
    bypass_domain?: listable<string>
    match_domain?: listable<string>
}
interface redirect extends listen {
    type: 'redirect'
}
interface tproxy extends listen {
    type: 'tproxy'
    network?: network
}

interface multiplex {
    enabled: true
    padding?: number
    brutal?: {
        enabled: true
        up_mbps: number
        down_mbps: number
    }
}

interface listen extends item_with_tag {
    listen: string
    listen_port: number
    tcp_fast_open?: boolean
    tcp_multi_path?: boolean
    udp_fragment?: boolean
    udp_timeout?: duration
    detour?: string
}

interface auth {
    username: string
    password: string
}
interface user {
    name: string
    password: string
}
interface vmess_user {
    name: string
    uuid: string
}
interface hysteria_user {
    name: string
    auth?: string
    auth_str: string
}
interface vless_user {
    name: string
    uuid: string
    flow?: 'xtls-rprx-vision'
}
interface tuic_user {
    name?: string
    uuid: string
    password?: string
}
