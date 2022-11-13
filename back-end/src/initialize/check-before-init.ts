import { IConfig } from 'config';

import { parseSemVersion } from "../utils";


const config: IConfig = require('config');


function checkMissedConfig() {
  const required = [
    'listen.port',

    'secrets.jwt_key',

    'rates_limit.login.window', 'rates_limit.login.max', 'rates_limit.ask_send_email.window', 'rates_limit.ask_send_email.max',

    'trust_proxy',

    'mongo.url', 'mongo.pool.max',

    'storage.avatars', 'storage.videos', 'storage.logs', 'storage.previews', 'storage.thumbnails', 'storage.torrents', 'storage.cache',
    'storage.redundancy', 'storage.tmp', 'storage.streaming_playlists', 'storage.plugins', 'storage.well_known',

    'log.level',

    'csp.enabled', 'csp.report_only', 
    // 'csp.report_uri',

    'security.frameguard.enabled',

    'admin.email',
    
    'signup.enabled', 'signup.limit', 'signup.requires_email_verification', 'signup.minimum_age',
    'signup.filters.cidr.whitelist', 'signup.filters.cidr.blacklist',
  ];

  const miss: string[] = [];

  for (const key of required) {
    if (!config.has(key) || config.get<any>(key) === null) {
      miss.push(key);
    }
  }

  return miss;
}


function checkNodeVersion() {
  const v = process.version;
  const { major } = parseSemVersion(v);

  console.log('Checking NodeJS version %s.', v);

  if (major < 16) {
    throw new Error('Your NodeJS version ' + v + ' is not supported. Please upgrade.');
  }
}

// -----------------------------------------------------------------

function checkBeforeInit() {
  const missed = checkMissedConfig()
  if (missed.length !== 0) {
    console.error('Your configuration files miss keys: ' + missed)
    process.exit(-1)
  }

  try {
    checkNodeVersion()
  } catch (err) {
    console.error('Error in NodeJS check.', { err })
    process.exit(-1)
  }
}

//------------------------------------------------------------------

export {
  checkMissedConfig,
  checkNodeVersion,
  checkBeforeInit,
}
