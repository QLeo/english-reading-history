# English Reading Content Generation Prompt

이 프롬프트를 AI에게 제공하여 CEFR B1 레벨의 영어 독해 지문을 생성할 수 있습니다.

## 프롬프트

```
CEFR 기준 B1 레벨로 200단어 내외의 독해용 지문을 작성해주세요.

**주제**: [여기에 원하는 주제를 입력]

**요구사항**:
1. 문장 단위로 줄바꿈
2. 자연스럽고 흥미로운 스토리 형식
3. B1 레벨에 적합한 어휘와 문법 사용
4. 총 5-6개의 문단으로 구성

**포함해야 할 섹션**:
1. 본문 (200단어 내외)
2. Comprehension Questions (3개의 이해도 확인 질문)
3. Korean Translation (전체 본문의 한국어 번역)
4. Useful Expressions & Vocabulary (유용한 표현 및 단어, 영어-한국어)

아래 형식을 정확히 따라 출력해주세요:
```

## 출력 형식

```markdown
---
title: "[지문 제목]"
date: "YYYY-MM-DD"
category: "[카테고리]"
tags: ["tag1", "tag2", "tag3", "tag4"]
level: "CEFR-B1"
readingTime: "5 min"
---

[첫 번째 문장].
[두 번째 문장].
[세 번째 문장].

[새 문단 첫 문장].
[다음 문장].
[다음 문장].

[계속해서 5-6개 문단으로 구성]

---

# Comprehension Questions

1. **[첫 번째 질문]**

2. **[두 번째 질문]**

3. **[세 번째 질문]**

---

# Korean Translation

[첫 번째 한국어 문장].
[두 번째 한국어 문장].
[세 번째 한국어 문장].

[새 문단 첫 문장].
[다음 문장].
[다음 문장].

[영어 본문과 동일한 구조로 번역]

---

# Useful Expressions & Vocabulary

**Phrases:**
- [expression 1] - [한국어 의미]
- [expression 2] - [한국어 의미]
- [expression 3] - [한국어 의미]
- [expression 4] - [한국어 의미]
- [expression 5] - [한국어 의미]

**Nouns:**
- [noun 1] - [한국어]
- [noun 2] - [한국어]
- [noun 3] - [한국어]
- [noun 4] - [한국어]
- [noun 5] - [한국어]
- [noun 6] - [한국어]

**Adjectives:**
- [adjective 1] - [한국어]
- [adjective 2] - [한국어]
- [adjective 3] - [한국어]
- [adjective 4] - [한국어]

**Verbs:**
- [verb 1] - [한국어]
- [verb 2] - [한국어]
- [verb 3] - [한국어]
- [verb 4] - [한국어]
- [verb 5] - [한국어]
```

## 사용 예시

### 입력
```
CEFR 기준 B1 레벨로 200단어 내외의 독해용 지문을 작성해주세요.

**주제**: 환경 보호와 재활용

**요구사항**:
1. 문장 단위로 줄바꿈
2. 자연스럽고 흥미로운 스토리 형식
3. B1 레벨에 적합한 어휘와 문법 사용
4. 총 5-6개의 문단으로 구성

**포함해야 할 섹션**:
1. 본문 (200단어 내외)
2. Comprehension Questions (3개의 이해도 확인 질문)
3. Korean Translation (전체 본문의 한국어 번역)
4. Useful Expressions & Vocabulary (유용한 표현 및 단어, 영어-한국어)

위의 출력 형식을 정확히 따라 출력해주세요.
```

## 카테고리 가이드

다음 카테고리 중 하나를 선택하세요:
- Social Issues (사회 문제)
- Technology (기술)
- Environment (환경)
- Health & Wellness (건강과 웰빙)
- Culture & Arts (문화와 예술)
- Education (교육)
- Travel (여행)
- Daily Life (일상생활)
- Science (과학)
- Business & Work (비즈니스와 업무)

## 태그 가이드

관련성 높은 태그 3-5개를 선택하세요. 예시:
- volunteering, community, animals, personal-growth
- recycling, sustainability, environment, green-living
- technology, innovation, future, digital-transformation
- health, exercise, wellness, lifestyle

## 파일 저장 위치

생성된 콘텐츠를 다음 경로에 저장하세요:
```
web/content/CEFR-B1/YYYY-MM/번호. 제목.md
```

예시:
```
web/content/CEFR-B1/2025-11/02. Environmental Protection.md
```

## 주의사항

1. **Front Matter (---로 감싼 메타데이터)**:
   - date는 "YYYY-MM-DD" 형식으로 작성
   - level은 항상 "CEFR-B1"로 고정
   - readingTime은 보통 "5 min"

2. **본문 작성**:
   - 각 문장마다 줄바꿈 (마침표 뒤 엔터)
   - 문단 사이는 빈 줄 하나로 구분
   - 약 200단어 (180-220단어 범위)

3. **섹션 구분**:
   - 섹션 사이는 `---`로 구분
   - 섹션 제목은 `#`으로 시작 (H1 태그)

4. **질문 작성**:
   - 본문 내용을 이해했는지 확인하는 질문
   - **볼드체**로 질문 작성
   - 질문 뒤에는 빈 줄 (답변은 작성하지 않음)

5. **한국어 번역**:
   - 영어 본문과 동일한 구조 유지
   - 문장별 줄바꿈 동일하게 적용
   - 자연스러운 한국어로 번역

6. **단어 및 표현**:
   - Phrases, Nouns, Adjectives, Verbs로 분류
   - 각 항목은 `- 영어 - 한국어` 형식
   - 본문에 실제로 사용된 단어/표현만 포함
