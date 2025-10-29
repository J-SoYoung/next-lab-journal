# [주제] YYYY-MM-DD
## 0. Context
- 강의 번호/섹션:
- 관련 코드 링크(브랜치/커밋):

## 1. Hypothesis (가설)
- (예) SSR이면 FCP가 개선되고, hydration 전까지 인터랙션은 제한될 것이다.

## 2. Method (방법)
- 실험 환경: 브라우저/네트워크 설정/기기
- 비교군: CSR / SSR / SSG / ISR
- 측정 지표: LCP, TTI, CLS, 요청 수, 응답 시간

## 3. Result (결과)
- 표/스크린샷 첨부
| 전략 | LCP | TTI | 요청수 | 비고 |
|-----|-----|-----|-------|-----|
| CSR |     |     |       |     |
| SSR |     |     |       |     |

## 4. Insight (해석)
- (예) SSR에서 초기 FCP는 빨라졌지만 hydration 지연이 존재. 인터랙션 준비까지 400ms 증가.

## 5. Action (다음 조치)
- (예) critical CSS 추출, useEffect 제거, 이미지 최적화 적용

## 6. AI Review Log
- Prompt: (붙여넣기)
- Suggestion 요약: (3줄)
- 채택/보류: (체크)

## 7. Reference
- 강의 타임스탬프, 공식문서 링크 등
