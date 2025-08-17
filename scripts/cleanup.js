
// Cleanup script to kill processes on port 5000
import { execSync } from 'child_process';

(async function cleanup() {
  try {
    console.log('🧹 Starting cleanup...');
    
    // Kill any processes using port 5000 with multiple approaches
    try {
      execSync('pkill -f "tsx server/index.ts"', { stdio: 'ignore' });
    } catch (e) { /* ignore */ }
    
    try {
      execSync('pkill -f "node.*5000"', { stdio: 'ignore' });
    } catch (e) { /* ignore */ }
    
    try {
      execSync('lsof -ti:5000 | xargs kill -9', { stdio: 'ignore' });
    } catch (e) { /* ignore */ }
    
    // Additional cleanup for any node processes
    try {
      execSync('pkill -f "tsx"', { stdio: 'ignore' });
    } catch (e) { /* ignore */ }
    
    // Wait for processes to terminate
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('✅ Cleanup completed successfully');
  } catch (error) {
    console.log('⚠️ Cleanup completed with warnings');
  }
})();
