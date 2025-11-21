/**
 * Helper script to generate a secure JWT secret
 * Run with: node utils/generateSecret.js
 */

const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('hex');
console.log('\n=== Generated JWT Secret ===');
console.log(secret);
console.log('\nCopy this value to your .env file as JWT_SECRET\n');

