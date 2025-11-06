# LOG-라우팅이 곧 렌더링이 되는 Next.js 프레임워크

### Next.js는 왜 자체 라우팅 시스템을 만들었을까?
React에서 react-router-dom을 사용하면 충분히 라우팅이 가능하다.
그런데 Next.js는 왜 굳이 내부적으로 라우팅 시스템을 만들었을까?
단순히 외부 라이브러리의 한계를 보완하기 위한 걸까?

이 질문이 내 이번 학습의 출발점이었다.

-----
### 1. React의 라우팅, 그리고 한계

React에서는 react-router-dom이 라우팅을 담당한다.
우리는 <Route>와 <BrowserRouter> 같은 컴포넌트를 직접 작성해서
URL과 컴포넌트를 수동으로 연결한다.
이 방식의 핵심은 **“라우팅과 렌더링이 분리되어 있다”**는 점이다.

```typescript 
// index.tsx
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </BrowserRouter>
);
```
- react-router-dom은 URL ↔ 컴포넌트 연결 정보만 관리한다.
- ReactDOM은 그 정보를 이용해 브라우저에서 렌더링만 담당한다.
- 서버는 항상 같은 index.html 한 장만 내려준다. 이후의 화면 전환은 모두 브라우저에서 JS로 처리된다.
> 결국 React의 라우팅은 클라이언트 전용(Client Side Rendering) 이다.
SEO에 취약하고, 초기 로딩도 JS 실행 이후에야 완성된다.

-----
### 2. Next.js의 라우팅, 그건 조금 다르다
Next.js는 외부 라이브러리를 사용하는 대신 pages/ 폴더 내부의 파일명과 경로가 
곧 URL이 되는 파일 기반 라우팅 시스템을 내장하여 라우팅을 처리하도록 만들어졌다. 
Next.js는 위와 같은 파일 기반 라우팅 규칙을 활용해 개발 프로세스를 단순화하고 
외부 라이브러리의 의존성을 낮추는 결과를 가져왔다.

``` bash
pages/
 ├─ index.tsx      → /
 ├─ about.tsx      → /about
 └─ posts/[id].tsx → /posts/1
```
겉보기엔 단순하다. 하지만 Next.js는 빌드 시점에 이 폴더 구조를 스캔하면서
라우팅 정의(route map) 을 만들고, 그 안의 코드 내용을 분석해 
각 페이지의 렌더링 전략까지 함께 결정한다.

-----
### 3. “Next는 폴더 구조를 읽는다” — 그건 라우팅뿐만 아니라 렌더링 설계다
처음 나는 이렇게 생각했다.
“Next는 폴더 구조를 보고 라우트를 만든다.”
그런데 학습을 거듭하면서, 이게 단순히 URL을 만드는 게 아니라는 걸 느꼈다.

Next.js의 페이지 라우터를 사용해 폴더 구조로 라우터 구조를 만들어두면 
렌더링 시 Next.js가 폴더 구조를 읽으면서 그 구조에 맞게 렌더링을 하니까. 
Next.js의 라우터 설계는 곧 렌더링과 연관 되는 것이 아닌가 하는 추측을 하게 되었다. 
Next는 빌드할 때 이미 렌더링 전략(SSR, SSG, CSR) 까지 설계한다는 결론을 얻게 되었다.

이런 내 생각이 맞는지 
GPT에게 물어보았다. 그리고 이런 답변이 돌아왔다.

“react-router-dom은 CSR 환경에만 초점을 둔 라우팅 라이브러리이고,
Next.js는 렌더링까지 아우르는 프레임워크 수준의 라우팅 시스템이에요.
React Router는 브라우저 렌더링 전용이라 SSR·SEO·데이터 패칭을 통합할 수 없어요.
그래서 Next.js는 자체 시스템을 만든 거예요.”

이 말이 내 머릿속의 퍼즐을 완성시켰다.
Next의 라우팅은 “경로 매핑”을 넘어서, 렌더링 시점과 방법을 제어하는 설계 구조였던 것이다.

-----
### 4. 라우팅과 렌더링이 연결되는 과정
Next는 프로젝트를 빌드할 때 다음 순서로 동작한다.
1. pages/ 폴더를 스캔하여 라우트 맵을 생성한다.
2. 각 파일의 export를 분석한다.
  - getStaticProps, getStaticPaths → 정적 페이지 생성(SSG)
  - getServerSideProps → 요청 시 렌더링(SSR)
3. 이 정보에 따라 빌드 타임 또는 런타임에 HTML을 생성한다.
즉, **Next.js는 라우팅 정보와 렌더링 전략이 하나의 파이프라인으로 연결되어 있다.**

``` bash
[pages 폴더]
   ↓
[라우트 맵 생성]
   ↓
(빌드 시점) getStaticProps → HTML 생성 (SSG)
(요청 시점) getServerSideProps → HTML 생성 (SSR)
   ↓
[완성된 SSR/SSG 페이지 렌더링]
```
라우팅을 설계하는 순간, 렌더링 계획까지 이미 세워진다.
이건 React와는 완전히 다른 발상이다.

-----
### 결론 - 라우팅이 곧 렌더링이 되는 프레임워크 Next.js
React에서는 라우팅이 단순히 컴포넌트를 매핑하는 규칙이라면, 
Next.js에서는 라우팅을 만들면서 렌더링까지 설계하는 하나의 시스템이라고 정리했다. 
 


### 참고링크
- [ Next.js는 외부 라우터 라이브러리 의존성을 벗어남 ](https://www.syncfusion.com/blogs/post/next-js-routing-guide?utm_source=chatgpt.com) 
-