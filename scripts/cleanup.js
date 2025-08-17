
#!/usr/bin/env node

const { execSync } = require('child_process');

console.log('Cleaning up processes on port 5000...');

try {
  // Kill any process using port 5000
  const command = process.platform === 'win32' 
    ? 'netstat -ano | findstr :5000'
    : 'lsof -ti:5000';
    
  if (process.platform !== 'win32') {
    try {
      const pids = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
      if (pids.trim()) {
        execSync(`kill -9 ${pids.trim()}`, { stdio: 'pipe' });
        console.log('Killed existing processes on port 5000');
      }
    } catch (e) {
      // No processes found on port 5000, which is fine
    }
  }
  
  console.log('Cleanup completed');
} catch (error) {
  console.log('No processes found on port 5000 or cleanup not needed');
}
