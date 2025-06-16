// metro.config.js
const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add 'mjs' support if not present
if (!config.resolver.sourceExts.includes('mjs')) {
    config.resolver.sourceExts.push('mjs');
}

module.exports = config;
