# Next.js에서 CSR과 Pre-Fetching 이해하기

## 1️⃣ Next.js에서 CSR 구현 방식
Next.js는 서버 사이드 렌더링(SSR)만 지원하는 프레임워크가 아니다.  
**렌더링 전략(SSR, SSG, CSR)을 페이지 단위로 선택할 수 있는 프레임워크**다.

다시 말해, Next.js 내부에서도 **React의 CSR 방식처럼 동작하는 페이지 전환**을 구현할 수 있다.

| 기능 | 설명 |
|------|------|
| `<a>` | 기본 HTML 링크로, 페이지 전체를 새로 요청하여 이동한다 (SSR 또는 완전한 새 요청). |
| `<Link>` | Next.js가 제공하는 컴포넌트로, **CSR처럼 클라이언트 사이드 네비게이션**을 수행한다. |
| `useRouter()` | Next.js의 내장 훅. `push()`, `back()` 등의 메서드를 이용해 **JS 기반으로 페이지 이동**을 구현할 수 있다. |

즉, `<Link>`나 `useRouter`를 사용하면, Next.js 내부에서도 **CSR 방식의 부드러운 페이지 전환**을 구현할 수 있다.


## 2️⃣ Pre-Fetching — 사전 로딩(Preloading)
Next.js는 사전 렌더링(SSR, SSG)을 통해 첫 화면을 HTML 형태로 빠르게 보여준 뒤,  
**Hydration**을 위해 필요한 **JavaScript 번들(JS bundle)** 을 다운로드한다.

이때 모든 페이지의 JS를 한 번에 받는 게 아니라,  
**현재 보고 있는 페이지의 JS만 우선 다운로드**한다.

그 후 사용자가 **이동할 가능성이 높은 링크들의 JS를 미리 다운로드**해둔다.  
이 과정을 **Pre-Fetching(사전 로딩)** 이라고 한다.

💡 **효과:**  
- 불필요한 JS 다운로드를 줄여 초기 로딩 속도를 개선하고,  
- 다음 페이지 전환 시에는 이미 JS가 로드되어 있어 CSR처럼 부드럽게 이동할 수 있다.

## 3️⃣ Pre-Fetching 확인 방법
1. `npm run build` → `npm run start` 로 프로덕션 빌드 실행  
2. 브라우저 **Network 탭**에서 리소스를 확인  
3. 현재 페이지와 연결된 링크들의 JS 파일이 **미리 로드(prefetch)** 되는 것을 볼 수 있다.

예를 들어, Home 페이지에서 다른 라우트(`/about`, `/test`)로 이동 가능한 링크가 있다면,  
이들의 JS 파일이 사전에 네트워크 요청으로 로드된다.

## 4️⃣ `<Link>`와 `useRouter`의 Pre-Fetch 동작 차이
| 구분 | 기본 동작 | 설정 |
|------|------------|------|
| `<Link>` | 자동 prefetch 활성화 | `<Link prefetch={false}>`로 끌 수 있음 |
| `useRouter` | prefetch 비활성 (수동으로 지정 필요) | `router.prefetch('/경로')` 메서드로 명시적으로 호출해야 함 |

### ✅ 예시 코드
```tsx
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Example() {
  const router = useRouter();

  useEffect(() => {
    // 페이지가 마운트된 직후에 prefetch 수행
    router.prefetch("/test");
  }, []);

  return (
    <div>
      <p>이 페이지는 /test 경로를 미리 prefetch 합니다.</p>
    </div>
  );
}
```