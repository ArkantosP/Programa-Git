const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Soporte para archivos .cjs exportados internamente por Firebase v10/v11
config.resolver.sourceExts.push('cjs');

module.exports = config;
