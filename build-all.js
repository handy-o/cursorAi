const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building all applications...\n');

// Clean output directory
if (fs.existsSync('out')) {
  fs.rmSync('out', { recursive: true });
}
fs.mkdirSync('out');

// Build main app
console.log('📦 Building main app...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Main app built successfully\n');
} catch (error) {
  console.error('❌ Failed to build main app:', error.message);
  process.exit(1);
}

// Build GPT app
console.log('📦 Building GPT app...');
try {
  execSync('cd apps/gpt && npm run build', { stdio: 'inherit' });
  
  // Copy GPT build to out/gpt
  if (fs.existsSync('apps/gpt/out')) {
    fs.cpSync('apps/gpt/out', 'out/gpt', { recursive: true });
    console.log('✅ GPT app built and copied successfully\n');
  }
} catch (error) {
  console.error('❌ Failed to build GPT app:', error.message);
  process.exit(1);
}

// Build Landing app
console.log('📦 Building Landing app...');
try {
  execSync('cd apps/landing && npm run build', { stdio: 'inherit' });
  
  // Copy Landing build to out/landing
  if (fs.existsSync('apps/landing/out')) {
    fs.cpSync('apps/landing/out', 'out/landing', { recursive: true });
    console.log('✅ Landing app built and copied successfully\n');
  }
} catch (error) {
  console.error('❌ Failed to build Landing app:', error.message);
  process.exit(1);
}

// Build Linktree app
console.log('📦 Building Linktree app...');
try {
  execSync('cd apps/linktree && npm run build', { stdio: 'inherit' });
  
  // Copy Linktree build to out/linktree
  if (fs.existsSync('apps/linktree/out')) {
    fs.cpSync('apps/linktree/out', 'out/linktree', { recursive: true });
    console.log('✅ Linktree app built and copied successfully\n');
  }
} catch (error) {
  console.error('❌ Failed to build Linktree app:', error.message);
  process.exit(1);
}

console.log('🎉 All applications built successfully!');
console.log('📁 Output directory: ./out');
console.log('\n📋 Available routes:');
console.log('  - / (main app)');
console.log('  - /gpt');
console.log('  - /landing');
console.log('  - /linktree');
