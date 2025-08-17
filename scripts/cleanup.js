#!/usr/bin/env node

// Cleanup script to kill processes on port 5000
const { execSync } = require('child_process');

try {
  // Kill any processes using port 5000
  execSync('pkill -f "tsx server/index.ts" || true', { stdio: 'ignore' });
  execSync('pkill -f "node.*5000" || true', { stdio: 'ignore' });
  console.log('Cleanup completed');
} catch (error) {
  // Ignore errors - cleanup is best effort
  console.log('Cleanup completed with warnings');
}