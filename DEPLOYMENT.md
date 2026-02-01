# Vercel 배포 가이드

## 자동 배포 (권장)

1. **Vercel에 가입**
   - [vercel.com](https://vercel.com)에 접속
   - GitHub 계정으로 로그인

2. **새 프로젝트 가져오기**
   - "Add New Project" 클릭
   - "Import Git Repository" 선택
   - GitHub에서 `DionNam/halalscan` 저장소 선택

3. **프로젝트 설정**
   - Framework Preset: **Next.js** (자동 감지됨)
   - Root Directory: `./` (기본값)
   - Build Command: `npm run build` (기본값)
   - Output Directory: `.next` (기본값)

4. **환경 변수 설정**
   - "Environment Variables" 섹션에서:
   ```
   NEXT_PUBLIC_OPENROUTER_API_KEY = your_api_key_here
   ```
   - OpenRouter API 키는 [openrouter.ai](https://openrouter.ai)에서 발급

5. **배포 시작**
   - "Deploy" 버튼 클릭
   - 약 1-2분 후 배포 완료
   - `https://halalscan.vercel.app` 같은 URL이 생성됨

## CLI 배포

```bash
# Vercel CLI 설치
npm install -g vercel

# 프로젝트 디렉토리에서 실행
cd /Users/2303-pc02/potenlab/halalscan-web

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### CLI로 환경 변수 설정

```bash
vercel env add NEXT_PUBLIC_OPENROUTER_API_KEY
```

## 배포 후 확인사항

1. ✅ 홈페이지가 정상적으로 로드되는지 확인
2. ✅ 이미지 업로드가 작동하는지 확인
3. ✅ AI 분석이 정상적으로 실행되는지 확인
4. ✅ 결과 페이지가 올바르게 표시되는지 확인

## 자동 배포 설정

Vercel은 GitHub와 연동되어 있어:
- `main` 브랜치에 push하면 자동으로 프로덕션 배포
- 다른 브랜치에 push하면 프리뷰 배포 생성
- Pull Request마다 자동으로 프리뷰 URL 생성

## 커스텀 도메인 설정 (선택사항)

1. Vercel 대시보드에서 프로젝트 선택
2. "Settings" → "Domains"
3. 도메인 추가 (예: halalscan.com)
4. DNS 설정에서 제공된 레코드 추가

## 문제 해결

### 배포 실패
- Build 로그 확인
- 환경 변수가 올바르게 설정되었는지 확인
- `package.json`의 scripts가 올바른지 확인

### API 에러
- OpenRouter API 키가 올바른지 확인
- API 크레딧이 남아있는지 확인
- Vercel 환경 변수에 `NEXT_PUBLIC_` 접두사가 있는지 확인

## 성능 최적화

Vercel은 자동으로:
- ✅ CDN을 통한 글로벌 배포
- ✅ 이미지 최적화
- ✅ 자동 캐싱
- ✅ 압축 및 최적화
- ✅ HTTPS 인증서 자동 발급

## 모니터링

Vercel 대시보드에서 확인 가능:
- 배포 히스토리
- 실시간 로그
- 성능 분석
- 에러 추적
- 트래픽 통계
