
import { execSync } from 'child_process';

console.log('🧹 Starting cleanup...');

const cleanupCommands = [
  // Kill any existing tsx processes
  'pkill -f "tsx server/index.ts" || true',
  // Kill any node processes on port 5000
  'pkill -f "node.*server/index.ts" || true',
  // Alternative approach to kill processes using lsof if available
  'lsof -ti:5000 | xargs -r kill -9 || true',
  // Kill any remaining node processes (be more specific to avoid killing important processes)
  'ps aux | grep -E "(tsx.*server|node.*server)" | grep -v grep | awk \'{print $2}\' | xargs -r kill -9 || true'
];

for (const command of cleanupCommands) {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { 
      stdio: 'pipe', 
      timeout: 3000,
      encoding: 'utf8'
    });
  } catch (error) {
    // Ignore errors as processes might not exist - this is expected
    console.log(`Command completed (may have had no effect): ${command}`);
  }
}

console.log('✅ Cleanup completed');
