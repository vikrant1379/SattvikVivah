
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🧹 Starting cleanup...');

const cleanupCommands = [
  'pkill -f "tsx server/index.ts" 2>/dev/null || true',
  'pkill -f "node.*5000" 2>/dev/null || true',
  'lsof -ti:5000 | xargs -r kill -9 2>/dev/null || true'
];

async function runCleanup() {
  for (const command of cleanupCommands) {
    try {
      await execAsync(command, { timeout: 3000 });
    } catch (error) {
      // Silently ignore errors as processes might not exist
    }
  }
  
  // Small delay to ensure processes are fully terminated
  await new Promise(resolve => setTimeout(resolve, 500));
  
  console.log('✅ Cleanup complete');
}

// Run cleanup with overall timeout
const cleanup = runCleanup();
const timeout = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Cleanup timeout')), 5000)
);

Promise.race([cleanup, timeout])
  .then(() => process.exit(0))
  .catch(() => {
    console.log('⚠️  Cleanup timed out, proceeding anyway');
    process.exit(0);
  });
