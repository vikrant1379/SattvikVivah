
// Cleanup script to kill processes on port 5000
import { execSync } from 'child_process';

(async function cleanup() {
  try {
    // Kill any processes using port 5000
    execSync('pkill -f "tsx server/index.ts" || true', { stdio: 'ignore' });
    execSync('pkill -f "node.*5000" || true', { stdio: 'ignore' });
    execSync('lsof -ti:5000 | xargs kill -9 || true', { stdio: 'ignore' });
    
    // Wait a moment for processes to terminate
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ Cleanup completed successfully');
  } catch (error) {
    // Ignore errors - cleanup is best effort
    console.log('⚠️ Cleanup completed with warnings');
  }
  
  // Explicitly exit the process
  process.exit(0);
})();
