
// Cleanup script to kill processes on port 5000
import { execSync } from 'child_process';

console.log('🧹 Starting cleanup...');

// Kill any processes using port 5000 with multiple approaches
try {
  execSync('pkill -f "tsx server/index.ts"', { stdio: 'ignore' });
} catch (e) { /* ignore */ }

try {
  execSync('pkill -f "node.*5000"', { stdio: 'ignore' });
} catch (e) { /* ignore */ }

try {
  execSync('fuser -k 5000/tcp', { stdio: 'ignore' });
} catch (e) { /* ignore */ }

// Additional cleanup for any tsx processes
try {
  execSync('pkill -f "tsx"', { stdio: 'ignore' });
} catch (e) { /* ignore */ }

console.log('✅ Cleanup completed successfully');
