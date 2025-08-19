
// Cleanup script to kill processes on port 5000
import { execSync } from 'child_process';

console.log('🧹 Starting cleanup...');

const cleanupCommands = [
  'fuser -k 5000/tcp 2>/dev/null',
  'pkill -f "tsx server/index.ts" 2>/dev/null',
  'pkill -f "node.*5000" 2>/dev/null'
];

for (const command of cleanupCommands) {
  try {
    execSync(command, { stdio: 'ignore', timeout: 2000 });
  } catch (error) {
    // Ignore errors as processes might not exist
  }
}

console.log('✅ Cleanup complete');
