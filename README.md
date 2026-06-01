# 📝 PilJu's Blog & Portfolio Showcase

이 저장소는 **안드로이드 소프트웨어 엔지니어 필주(PilJu)**의 개인 기술 블로그 및 발표 자료 쇼케이스 웹사이트입니다.  
외부 기성 테마나 무거운 프레임워크 의존성 없이, **순수 HTML + 모던 CSS (Sass) + 바닐라 JS**로 독자 설계된 100% 커스텀 초경량 Jekyll 블로그입니다.

🔗 **라이브 사이트**: [https://veronikapj.github.io](https://veronikapj.github.io)

---

## ✨ 핵심 주요 기능 (Key Features)

* **깜빡임 없는 고성능 다크/라이트 모드 (FOUC-Free Theme Toggle)**
  * 사용자의 OS 시스템 테마를 완벽 감지 및 연동합니다.
  * 헤더 우측의 SVG 애니메이션 토글 버튼으로 편리하게 모드를 변경하며, 선택 정보는 `localStorage`에 캐싱됩니다.
  * 로딩 시 순간적으로 하얀 화면이 스치는 현상(FOUC)을 완전 차단하는 인라인 로더 스크립트가 적용되었습니다.
* **미니멀 & 고대비 가독성 타이포그래피**
  * 현대적인 타이틀용 폰트 `Outfit`과 가독성 높은 본문용 폰트 `Inter`를 조합하여 오직 콘텐츠 읽기에만 집중할 수 있도록 디자인했습니다.
  * `JetBrains Mono` 기반의 코드 하이라이팅 커스텀 뷰를 지원합니다.
* **프로젝트 & 발표자료 아카이빙 그리드**
  * 메인 화면 하단에 GDG DevFest, 기술 세미나에서 진행했던 5개의 대표 발표자료 및 코드랩을 카드 형태로 전시합니다.
  * 각각의 실 배포 웹 URL(Subpath)과 GitHub 오픈소스 소스코드로 즉시 진입할 수 있습니다.
* **한글 맞춤형 읽기 시간 예측**
  * 포스트 본문의 한글 글자 수(Character Count)를 Liquid 엔진으로 실시간 분석하여 한 글당 평균 독해 시간(분 분량)을 영문 단어 수 계산 방식보다 정확하게 계산해 줍니다.

---

## 📂 프로젝트 구조 (Directory Map)

저장소 구조는 오버헤드와 보일러플레이트가 전혀 없도록 극도로 단순화되어 있습니다.

```text
veronikapj.github.io/
├── _config.yml           # 블로그 및 5개 쇼케이스 프로젝트 메타데이터 설정
├── _includes/            # 공통 모듈화 영역
│   ├── head.html         # SEO 태그, 구글 폰트, 초경량 다크모드 로더
│   ├── header.html       # 미니멀 로고, 내비게이션, SVG 테마 토글 버튼
│   └── footer.html       # 저작권 표기 및 소셜(GitHub) 연동
├── _layouts/             # 커스텀 뼈대 레이아웃
│   ├── default.html      # 기본 전체 레이아웃 래퍼
│   ├── home.html         # 소개 히어로, 포스트 리스트, 발표자료 그리드가 결합된 메인
│   ├── post.html         # 고가독성 타이포그래피를 위한 단독 포스트 본문 뷰
│   └── page.html         # 소개(About) 등 정적 페이지 전용 뷰
├── _posts/               # 마크다운(.md) 기반 실제 블로그 포스트 저장소
├── assets/               # 스타일시트 및 스크립트
│   ├── css/main.scss     # CSS 변수, 테마 토큰, 그리드 시스템, 코드 하이라이트 스타일
│   ├── js/main.js        # 다크모드 토글 스위치 및 캐싱 동작 바닐라 스크립트
│   └── img/              # 프로필 아바타 및 본문 첨부용 이미지 폴더
├── pages/                # 정적 메뉴 페이지
│   ├── about.md          # 나만의 프로필 및 관심사 소개 (About Me)
│   └── 404.md            # 페이지를 찾을 수 없을 때의 404 에러 화면
└── index.html            # 메인 홈 레이아웃 호출 파일
```

---

## ✍️ 블로그 글 작성 가이드 (How to Post)

새로운 글을 작성하여 발행하는 것은 매우 간단합니다.  
`_posts/` 폴더 내에 `YYYY-MM-DD-포스트제목.md` 포맷으로 마크다운 파일을 생성한 후 아래 양식의 머리말(Front-matter)을 채워주면 됩니다.

```markdown
---
layout: post
title: "안드로이드 컴포즈 완벽 가이드"
date: 2026-06-02 12:00:00 +0900
tags: [Android, Jetpack Compose, Kotlin]
---

본문 내용을 마크다운으로 자유롭게 작성합니다. 
GitHub에 `git push` 하면 빌드 엔진이 수십 초 이내에 자동으로 스타일을 입혀 사이트에 발행합니다!
```

---

## 💻 로컬 미리보기 (Local Preview)

로컬 개발 환경에서 미리보기가 필요한 경우 아래 명령어를 사용하여 로컬 Jekyll 서버를 구동할 수 있습니다.

```bash
# 의존성 패키지 설치
bundle install

# 로컬 개발 서버 구동 (http://localhost:4000 에서 실시간 반영 확인 가능)
bundle exec jekyll serve
```
