import bytes from 'bytes';
import { IConfig } from 'config';

import {buildPath} from '../utils'


// Use a variable to reload the configuration if we need
let config: IConfig = require('config');

const configChangedHandlers: Function[] = [];


const CONFIG = {
    LISTEN: {
        PORT: config.get<number>('listen.port') || 8000,
    },
    SECRETS: {
        JWT_KEY: config.get<string>('secrets.jwt_key'),
    },
    TRUST_PROXY: config.get<string[]>('trust_proxy'),
    MONGO: {
        URI: config.get<string>('mongo.url'),
        POOL: config.get<number>('mongo.pool'),
    },
    STORAGE: {
        TMP_DIR: buildPath(config.get<string>('storage.tmp')),
        BIN_DIR: buildPath(config.get<string>('storage.bin')),
        ACTOR_IMAGES: buildPath(config.get<string>('storage.avatars')),
        LOG_DIR: buildPath(config.get<string>('storage.logs')),
        VIDEOS_DIR: buildPath(config.get<string>('storage.videos')),
        STREAMING_PLAYLISTS_DIR: buildPath(config.get<string>('storage.streaming_playlists')),
        REDUNDANCY_DIR: buildPath(config.get<string>('storage.redundancy')),
        THUMBNAILS_DIR: buildPath(config.get<string>('storage.thumbnails')),
        PREVIEWS_DIR: buildPath(config.get<string>('storage.previews')),
        CAPTIONS_DIR: buildPath(config.get<string>('storage.captions')),
        TORRENTS_DIR: buildPath(config.get<string>('storage.torrents')),
        CACHE_DIR: buildPath(config.get<string>('storage.cache')),
        PLUGINS_DIR: buildPath(config.get<string>('storage.plugins')),
        CLIENT_OVERRIDES_DIR: buildPath(config.get<string>('storage.client_overrides')),
        WELL_KNOWN_DIR: buildPath(config.get<string>('storage.well_known'))
    },
    LOG: {
        LEVEL: config.get<string>('log.level'),
        ROTATION: {
          ENABLED: config.get<boolean>('log.rotation.enabled'),
          MAX_FILE_SIZE: bytes.parse(config.get<string>('log.rotation.max_file_size')),
          MAX_FILES: config.get<number>('log.rotation.max_files')
        },
        ANONYMIZE_IP: config.get<boolean>('log.anonymize_ip'),
        LOG_PING_REQUESTS: config.get<boolean>('log.log_ping_requests'),
        LOG_TRACKER_UNKNOWN_INFOHASH: config.get<boolean>('log.log_tracker_unknown_infohash'),
        PRETTIFY_SQL: config.get<boolean>('log.prettify_sql'),
        ACCEPT_CLIENT_LOG: config.get<boolean>('log.accept_client_log')
    },
    CSP: {
        ENABLED: config.get<boolean>('csp.enabled'),
        REPORT_ONLY: config.get<boolean>('csp.report_only'),
        REPORT_URI: config.get<string>('csp.report_uri')
    },
    SECURITY: {
        FRAMEGUARD: {
          ENABLED: config.get<boolean>('security.frameguard.enabled')
        }
    },
    FEEDS: {
        VIDEOS: {
            COUNT: config.get<number>('feeds.videos.count')
        },
        COMMENTS: {
            COUNT: config.get<number>('feeds.comments.count')
        }
      },
    ADMIN: {
        get EMAIL () { return config.get<string>('admin.email') }
    },
    SIGNUP: {
        get ENABLED () { return config.get<boolean>('signup.enabled') },
        get LIMIT () { return config.get<number>('signup.limit') },
        get REQUIRES_EMAIL_VERIFICATION () { return config.get<boolean>('signup.requires_email_verification') },
        get MINIMUM_AGE () { return config.get<number>('signup.minimum_age') },
        FILTERS: {
            CIDR: {
                get WHITELIST () { return config.get<string[]>('signup.filters.cidr.whitelist') },
                get BLACKLIST () { return config.get<string[]>('signup.filters.cidr.blacklist') }
            }
        }
    },
}


export {
    CONFIG,
}