### 1️⃣ React 감각을 되살리는 5가지 리마인드 체크
- JSX는 문법이 아니라 함수 호출의 결과이다.
- 컴포넌트는 props로 데이터를 받고, state로 내부 상태를 가진다.
- useEffect는 렌더링 이후의 보정 로직이다.
- useMemo/useCallback은 불필요한 재렌더링 제어 장치다.
- React의 본질은 **“UI를 상태의 함수로 정의하는 것”**이다.


### 2️⃣ 리마인드 리액트
- 컴포넌트 & Props : Next 페이지/레이아웃 이해에 필수
- useState / useEffect : CSR 컴포넌트와 Server Component 구분의 기초
- 컴포넌트 트리 / Context : Layout, Provider 구조와 직결
- useRef / DOM 접근 : Client 컴포넌트에서만 가능, 서버에서는 DOM이 없다
- Hooks 규칙 : Next + React Query + Custom Hooks 설계 시 필수 => 조건문 안에서 Hook 금지
- JSX 구조 : SSR 시 렌더링 결과를 직관적으로 예측 가능 => JSX는 단순 문법이 아니라 함수 호출 결과

### 3️⃣ Next.js 안에서 React 개념 찾기 ( Next.js는 React의 진화된 교과서다 )
- use client / Server Components : 렌더링 시점 구분 (CSR vs SSR)
- Layout.js / Template.js : 컴포넌트 트리 구조 & 상태 공유 => 상태의 범위를 설계
- Page Router → App Router : SPA vs MPA 개념, props 흐름 => React Router의 진화형 
- Fetching (Server Actions) : useEffect, useState 대체 패턴 => 데이터 패칭 위치는 언제나 의도적이어야 한다
- Streaming / Suspense : 비동기 렌더링, React 18 핵심 => React는 이제 ‘시간 기반 렌더링’을 한다