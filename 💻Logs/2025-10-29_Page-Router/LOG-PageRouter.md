# 🧭 Next.js Page Router 정리 @14버전

---

### 1️⃣ 폴더/파일명 기반으로 동작하는 라우터 구조  
`npx create-next-app@14` 명령어로 설치 후 Page Router를 실습.

Next.js의 **Page Router**는  
👉 **폴더(파일)명 기반으로 라우팅이 자동으로 동작**하는 구조다.
즉, `pages/` 폴더 내부의 파일명이 곧 URL 경로로 매핑된다.

```bash
pages/
 ├─ index.tsx        →  /
 ├─ about.tsx        →  /about
 └─ books/[id].tsx   →  /books/1
 ```

### 2️⃣ 주요 구조 파일  
- `_app.tsx`: 모든 페이지를 감싸는 전역 React 컴포넌트 (클라이언트 실행)
- `_document.tsx`: HTML 문서 구조 커스터마이징 (서버 실행)

### 3️⃣ 라우팅 설정  
- `[id].tsx`: 동적 세그먼트
- `[...id].tsx`: 다중 세그먼트 (catch-all)
- `[[...id]].tsx`: 선택적 세그먼트 (optional catch-all)
- 쿼리 스트링 `/posts?id=1` 가능

``` typescript
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  console.log(router);
  const { id } = router.query;

  return <h1>BOOK - {id}</h1>
}
```

