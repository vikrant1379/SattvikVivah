import fs from 'fs';
import path from 'path';

console.log('🧹 Starting cleanup...');

const cleanupPaths = [
  'dist',
  'build',
  '.cache',
  'node_modules/.cache'
];

function cleanupDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Cleaned: ${dirPath}`);
    } catch (error) {
      console.warn(`⚠️  Failed to clean ${dirPath}:`, error.message);
    }
  }
}

// Clean up directories
cleanupPaths.forEach(cleanupDirectory);

console.log('✅ Cleanup completed!');

// Ensure the script exits properly
process.exit(0);