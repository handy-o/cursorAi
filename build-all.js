const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building all applications...\n');

// Clean output directory
if (fs.existsSync('out')) {
  fs.rmSync('out', { recursive: true });
}
fs.mkdirSync('out');

// Clean docs directory
if (fs.existsSync('docs')) {
  fs.rmSync('docs', { recursive: true });
}
fs.mkdirSync('docs');

// Build main app first
console.log('📦 Building main app...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  
  // Copy main app build to docs root
  if (fs.existsSync('out')) {
    const mainOut = fs.readdirSync('out');
    mainOut.forEach(file => {
      if (file !== 'gpt' && file !== 'landing' && file !== 'linktree') {
        fs.cpSync(`out/${file}`, `docs/${file}`, { recursive: true });
      }
    });
    console.log('✅ Main app built and copied successfully\n');
  }
} catch (error) {
  console.error('❌ Failed to build main app:', error.message);
  process.exit(1);
}

// Build GPT app
console.log('📦 Building GPT app...');
try {
  execSync('cd apps/gpt && npm install --legacy-peer-deps --no-audit && npm run build', { stdio: 'inherit' });
  
  // Copy GPT build to docs/gpt
  if (fs.existsSync('apps/gpt/out')) {
    fs.cpSync('apps/gpt/out', 'docs/gpt', { recursive: true });
    console.log('✅ GPT app built and copied successfully\n');
  } else {
    console.error('❌ GPT app build output not found');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to build GPT app:', error.message);
  process.exit(1);
}

// Build Landing app
console.log('📦 Building Landing app...');
try {
  execSync('cd apps/landing && npm install --legacy-peer-deps --no-audit && npm run build', { stdio: 'inherit' });
  
  // Copy Landing build to docs/landing
  if (fs.existsSync('apps/landing/out')) {
    fs.cpSync('apps/landing/out', 'docs/landing', { recursive: true });
    console.log('✅ Landing app built and copied successfully\n');
  } else {
    console.error('❌ Landing app build output not found');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to build Landing app:', error.message);
  process.exit(1);
}

// Build Linktree app
console.log('📦 Building Linktree app...');
try {
  execSync('cd apps/linktree && npm install --legacy-peer-deps --no-audit && npm run build', { stdio: 'inherit' });
  
  // Copy Linktree build to docs/linktree
  if (fs.existsSync('apps/linktree/out')) {
    fs.cpSync('apps/linktree/out', 'docs/linktree', { recursive: true });
    console.log('✅ Linktree app built and copied successfully\n');
  } else {
    console.error('❌ Linktree app build output not found');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to build Linktree app:', error.message);
  process.exit(1);
}

console.log('🎉 All applications built successfully!');
console.log('📁 Output directory: ./docs');
console.log('\n📋 Available routes:');
console.log('  - /gpt');
console.log('  - /landing');
console.log('  - /linktree');
console.log('\n🌐 Deploy to GitHub Pages:');
console.log('  1. Push to main branch');
console.log('  2. GitHub Actions will automatically deploy');
console.log('  3. Check Actions tab for deployment status');
