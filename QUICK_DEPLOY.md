# 빠른 Vercel 배포 가이드

## 🚀 3분 안에 배포하기

### 1단계: Vercel 가입 및 GitHub 연동
1. [vercel.com](https://vercel.com/signup) 접속
2. "Continue with GitHub" 클릭하여 GitHub 계정으로 가입
3. Vercel이 GitHub 저장소에 접근할 수 있도록 권한 부여

### 2단계: 프로젝트 가져오기
1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. GitHub 저장소 목록에서 **"DionNam/halalscan"** 찾기
   - 보이지 않으면 "Adjust GitHub App Permissions" 클릭하여 권한 추가
3. **"Import"** 버튼 클릭

### 3단계: 프로젝트 설정
- **Framework Preset**: Next.js ✅ (자동 감지됨)
- **Root Directory**: `./` (기본값)
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: `.next` (기본값)

### 4단계: 환경 변수 설정
"Environment Variables" 섹션에서:

```
Name: NEXT_PUBLIC_OPENROUTER_API_KEY
Value: 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
```

**중요**:
- Environment를 **Production**, **Preview**, **Development** 모두 선택

### 5단계: 배포 시작
1. **"Deploy"** 버튼 클릭
2. 1-2분 기다리면 배포 완료
3. 생성된 URL 확인 (예: `https://halalscan-abc123.vercel.app`)

---

## ✅ 배포 완료 후 확인

배포가 완료되면:

1. **홈페이지 접속**: `https://your-project.vercel.app`
2. **기능 테스트**:
   - ✅ "Start Scanning" 버튼 클릭
   - ✅ 테스트 이미지 업로드
   - ✅ AI 분석 실행
   - ✅ 결과 확인

---

## 🔧 배포 후 설정

### 커스텀 도메인 추가 (선택사항)
1. Vercel 대시보드에서 프로젝트 선택
2. **Settings** → **Domains**
3. 원하는 도메인 입력 (예: `halalscan.com`)
4. DNS 설정에서 제공된 레코드 추가

### 자동 배포 설정
Vercel은 자동으로 설정됩니다:
- ✅ `main` 브랜치에 push → 자동 프로덕션 배포
- ✅ PR 생성 → 자동 프리뷰 배포
- ✅ 다른 브랜치 push → 프리뷰 배포

---

## 📊 모니터링

Vercel 대시보드에서 확인 가능:
- 📈 실시간 트래픽
- 📝 배포 로그
- ⚡ 성능 분석
- 🐛 에러 추적

---

## 🆘 문제 해결

### 배포 실패 시
1. **Build 로그 확인**: Vercel 대시보드 → Deployments → 실패한 배포 클릭
2. **환경 변수 확인**: Settings → Environment Variables
3. **GitHub 연동 확인**: Settings → Git

### 일반적인 에러
- **"API key not configured"**: 환경 변수가 올바르게 설정되었는지 확인
- **"Build failed"**: package.json의 scripts 확인
- **"Image upload not working"**: CORS 설정 확인

---

## 🎉 성공!

배포 URL: `https://your-project.vercel.app`

모바일과 데스크톱에서 모두 작동하는 HalalScan 웹 앱을 즐기세요!

---

## 📚 추가 리소스

- [Vercel 문서](https://vercel.com/docs)
- [Next.js 배포 가이드](https://nextjs.org/docs/deployment)
- [OpenRouter API 문서](https://openrouter.ai/docs)
