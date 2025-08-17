
#!/usr/bin/env node

// Cleanup script to kill processes on port 5000
import { execSync } from 'child_process';

console.log('🧹 Starting cleanup...');

const cleanupCommands = [
  'pkill -f "tsx server/index.ts"',
  'pkill -f "node.*5000"', 
  'fuser -k 5000/tcp',
  'pkill -f "tsx"'
];

let hasError = false;

for (const command of cleanupCommands) {
  try {
    execSync(command, { stdio: 'ignore', timeout: 3000 });
  } catch (error) {
    hasError = true;
  }
}

if (hasError) {
  console.log('⚠️ Cleanup completed with warnings');
} else {
  console.log('✅ Cleanup completed successfully');
}

// Force exit to ensure script doesn't hang
process.exit(0);
