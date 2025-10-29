# Q2-Next의 Pre-Rendering은 CSR이 아니니까 SSR이야?

### 위 표현은 반은 맞고 반은 틀리다. 
### Pre-Rendering의 개념
Pre-Rendering은 빌드 시 혹은 브라우저가 서버에 요청시 
HTML파일을 생성하여 전달하는 렌더링 방식이다.   
이 덕분에 사용자는 빈 화면이 아닌 완성된 HTML화면을 빠르게 볼 수 있다. 
하지만 JS번들 로드 후(=하이드레이션)에 인터렉션이 가능하다.

### Pre-Rendering의 방법으로 SSR과 SSG가 있는 것이다. 
- SSR (Server Side Rendering) : 빌드시 미리 HTML생성
- SSG (Server Side Generation) : 브라우저 요청 시 서버가 HTML생성

Next.js는 SPA를 사용하는 React의 렌더링 방식을 선택할 수 있게 해 준다.