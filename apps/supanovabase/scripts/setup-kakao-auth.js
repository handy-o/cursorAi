#!/usr/bin/env node

/**
 * 카카오 OAuth 설정 자동화 스크립트
 * 
 * 사용법:
 *   node scripts/setup-kakao-auth.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function generateNextAuthSecret() {
  return require('crypto').randomBytes(32).toString('base64');
}

async function main() {
  console.log('\n==============================================');
  console.log('   카카오 OAuth 로그인 설정 마법사');
  console.log('==============================================\n');

  console.log('이 스크립트는 .env.local 파일을 생성하고');
  console.log('카카오 OAuth 설정을 도와줍니다.\n');

  const envPath = path.join(__dirname, '..', '.env.local');
  
  if (fs.existsSync(envPath)) {
    const overwrite = await question('.env.local 파일이 이미 존재합니다. 덮어쓰시겠습니까? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('\n설정을 취소했습니다.');
      rl.close();
      return;
    }
  }

  console.log('\n--- Supabase 설정 ---\n');
  console.log('Supabase 대시보드(https://supabase.com/dashboard)에서 확인하세요.\n');
  
  const supabaseUrl = await question('Supabase URL: ');
  const supabaseAnonKey = await question('Supabase Anon Key: ');
  const supabaseServiceKey = await question('Supabase Service Role Key: ');

  console.log('\n--- Next-Auth 설정 ---\n');
  
  const nextauthUrl = await question('애플리케이션 URL (기본값: http://localhost:3010): ') || 'http://localhost:3010';
  const nextauthSecret = generateNextAuthSecret();
  console.log(`\nNEXTAUTH_SECRET이 자동 생성되었습니다: ${nextauthSecret}\n`);

  console.log('\n--- 카카오 OAuth 설정 ---\n');
  console.log('카카오 개발자 콘솔(https://developers.kakao.com/)에서 확인하세요.\n');
  
  const kakaoClientId = await question('카카오 REST API 키: ');
  const kakaoClientSecret = await question('카카오 Client Secret: ');

  const envContent = `# Supabase
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseAnonKey}
SUPABASE_SERVICE_ROLE_KEY=${supabaseServiceKey}

# Next-Auth
NEXTAUTH_SECRET=${nextauthSecret}
NEXTAUTH_URL=${nextauthUrl}

# Kakao OAuth
KAKAO_CLIENT_ID=${kakaoClientId}
KAKAO_CLIENT_SECRET=${kakaoClientSecret}
`;

  fs.writeFileSync(envPath, envContent, 'utf8');

  console.log('\n==============================================');
  console.log('   ✅ 설정이 완료되었습니다!');
  console.log('==============================================\n');
  console.log(`.env.local 파일이 생성되었습니다.\n`);
  console.log('다음 단계:\n');
  console.log('1. 카카오 개발자 콘솔에서 Redirect URI 등록:');
  console.log(`   ${nextauthUrl}/api/auth/callback/kakao\n`);
  console.log('2. 개발 서버 시작:');
  console.log('   npm run dev\n');
  console.log('3. 로그인 페이지 접속:');
  console.log(`   ${nextauthUrl}/auth/login-idpw\n`);
  console.log('자세한 설정 방법은 KAKAO_OAUTH_SETUP.md 파일을 참고하세요.\n');

  rl.close();
}

main().catch((error) => {
  console.error('오류가 발생했습니다:', error);
  rl.close();
  process.exit(1);
});


