# 📦 설치 안내

## 필수 패키지 설치

프로젝트를 실행하기 전에 다음 명령어로 모든 의존성을 설치하세요:

```bash
cd apps/twitter
npm install
```

## 설치되는 주요 패키지

### 프로덕션 의존성

```json
{
  "react": "19.1.0",
  "react-dom": "19.1.0",
  "next": "15.5.4",
  "@supabase/ssr": "0.5.2",
  "server-only": "^0.0.1",
  "next-auth": "^5.0.0-beta.25",
  "@auth/supabase-adapter": "^1.7.2",
  "date-fns": "^4.1.0",
  "lucide-react": "^0.468.0",
  "react-hook-form": "^7.54.2",
  "zod": "^3.24.1",
  "@hookform/resolvers": "^3.9.1",
  "react-textarea-autosize": "^8.5.4",
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
}
```

### 개발 의존성

```json
{
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "tailwindcss": "^3.4.1",
  "autoprefixer": "^10.4.18",
  "postcss": "^8.4.35",
  "eslint": "^9",
  "eslint-config-next": "15.5.4",
  "@eslint/eslintrc": "^3"
}
```

## 설치 확인

설치가 완료되면 다음 명령어로 확인하세요:

```bash
npm list --depth=0
```

## 문제 해결

### npm 에러가 발생하는 경우

1. Node.js 버전 확인 (18.0 이상 필요):
   ```bash
   node --version
   ```

2. npm 캐시 정리:
   ```bash
   npm cache clean --force
   ```

3. node_modules 삭제 후 재설치:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### 특정 패키지 설치 실패

개별 패키지를 다시 설치해보세요:

```bash
npm install <package-name> --legacy-peer-deps
```

## 다음 단계

패키지 설치가 완료되면:

1. [SETUP_GUIDE.md](./SETUP_GUIDE.md) - 전체 설정 가이드
2. [ENV_SETUP.md](./ENV_SETUP.md) - 환경 변수 설정
3. [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - 데이터베이스 설정

그 다음 개발 서버를 실행하세요:

```bash
npm run dev
```


