import type { duration, listable } from './types.ts'
import type { dialer, server } from './outbound.ts'

export interface server_tls extends base_tls {
    key?: listable<string>
    key_path?: string
    acme?: acme
    ech?: server_ech
    reality?: server_reality
}

export interface client_tls extends base_tls {
    disable_sni?: boolean
    insecure?: boolean
    ech?: client_ech
    utls?: utls
    reality?: client_reality
}

interface base_tls {
    enabled: true
    server_name?: string
    alpn?: listable<string>
    min_version?: tls_version
    max_version?: tls_version
    cipher_suites?: listable<cipher_suites>
    certificate?: listable<string>
    certificate_path?: string
}

interface base_ech {
    enabled: true
    pq_signature_schemes_enabled?: boolean
    dynamic_record_sizing_disabled?: boolean
}

interface server_ech extends base_ech {
    key: listable<string>
    key_path: string
}

interface client_ech extends base_ech {
    config?: listable<string>
    config_path?: string
}

interface base_reality {
    enabled: true
    short_id: string
}

interface server_reality extends base_reality {
    handshake: dialer & server
    private_key: string
    max_time_difference?: duration
}

interface client_reality extends base_reality {
    public_key: string
}

type dns01 = dns01_ali | dns01_cf

interface dns01_ali {
    provider: 'alidns'
    access_key_id: string
    access_key_secret: string
    region_id: string
}

interface dns01_cf {
    provider: 'cloudflare'
    api_token: string
}

interface acme {
    domain?: listable<string>
    data_directory?: string
    default_server_name?: string
    email?: string
    provider?: string
    disable_http_challenge?: boolean
    disable_tls_alpn_challenge?: boolean
    alternative_http_port?: number
    alternative_tls_port?: number
    external_account?: {
        key_id: string
        mac_key: string
    }
    dns01_challenge?: dns01
}

interface utls {
    enabled: true
    fingerprint?: fingerprint
}

type fingerprint = 'chrome' | 'firefox' | 'edge' | 'safari' | '360' | 'qq' | 'ios' | 'android' | 'random' | 'randomized'
type tls_version = '1.0' | '1.1' | '1.2' | '1.3'
type cipher_suites =
    | 'TLS_RSA_WITH_AES_128_CBC_SHA'
    | 'TLS_RSA_WITH_AES_256_CBC_SHA'
    | 'TLS_RSA_WITH_AES_128_GCM_SHA256'
    | 'TLS_RSA_WITH_AES_256_GCM_SHA384'
    | 'TLS_AES_128_GCM_SHA256'
    | 'TLS_AES_256_GCM_SHA384'
    | 'TLS_CHACHA20_POLY1305_SHA256'
    | 'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA'
    | 'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA'
    | 'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA'
    | 'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA'
    | 'TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256'
    | 'TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384'
    | 'TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256'
    | 'TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384'
    | 'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256'
    | 'TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256'
