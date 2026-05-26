# 출판사 자료 요청 안내 (Reformed Books / Wisdom Press)

새 웹사이트에 **전체 도서**를 올리기 위해 아래 형식으로 자료를 부탁드립니다.

---

## 1. 가장 쉬운 방식 (권장)

| 구분 | 형식 | 설명 |
|------|------|------|
| **도서 목록** | `books-catalog-template.csv` (엑셀에서 열기·저장) | 제목, 저자, 가격 등 **한 줄 = 책 1권** |
| **표지 이미지** | JPG 또는 PNG, **권당 파일 1개** | 아래 「파일 이름 규칙」 참고 |
| **전자책 PDF** | PDF, **권당 파일 1개** (판매하는 경우만) | 같은 규칙으로 이름 |
| **압축 전달** | ZIP 1개 권장 | `도서목록.csv` + `covers/` + `pdfs/` 폴더 |

> **DB 백업(SQL)은 출판사가 만들 필요 없습니다.**  
> 출판사는 **엑셀(CSV) + 이미지 + PDF**만 주시면, 개발 쪽에서 데이터베이스에 넣습니다.

### ZIP 폴더 예시

```
ReformedBooks-도서자료-2026-05.zip
├── books-catalog.csv          ← 양식 채운 파일 (이름 바꿔도 됨)
├── covers/
│   ├── 001-mero-mask-khoi.jpg
│   ├── 002-another-book.jpg
│   └── ...
└── pdfs/
    ├── 001-mero-mask-khoi.pdf
    ├── 002-another-book.pdf
    └── ...
```

---

## 2. CSV / 엑셀이 DB에 넣기 쉬운 이유

- SQL은 **기술자·서버**가 만드는 백업 형식입니다.
- **CSV(엑셀)** 는 출판사가 검수·수정하기 쉽고, 오타·빠진 권을 눈으로 확인하기 좋습니다.
- 표지/PDF는 **별도 파일**이 맞습니다 (DB에는 **경로·파일명**만 저장).

---

## 3. 파일 이름 규칙 (중요)

목록 시트의 `cover_filename`, `pdf_filename` 열과 **실제 파일 이름이完全一致**해야 합니다.

- 영문 소문자, 숫자, 하이픈(`-`)만 사용 (공백·한글 파일명 X)
- 권번호로 시작 권장: `001-`, `002-`, …
- 예: `001-mero-mask-khoi.jpg` / `001-mero-mask-khoi.pdf`

---

## 4. 필수 / 선택 항목

### 필수 (웹에 책 1권 표시 최소)

| 열 이름 | 설명 |
|---------|------|
| `row_id` | 출판사 관리용 번호 (001, 002 …) |
| `title` | 도서 제목 (판매 페이지에 쓰는 공식 제목) |
| `author` | 저자 이름 |
| `price` | 판매 가격 (숫자만, 예: 375) |
| `currency` | 통화 (보통 NPR) |
| `status` | published / draft / out_of_print |
| `cover_filename` | covers 폴더 안 파일명 |
| `short_description` | 목록·카드용 짧은 소개 (1~3문장) |

### 전자책 판매 시 추가 필수

| 열 이름 | 설명 |
|---------|------|
| `format` | pdf / print / both |
| `pdf_filename` | pdfs 폴더 안 파일명 (없으면 비움) |

### 있으면 좋음

`title_english`, `category`, `tags`, `discount_percent`, `full_description`, `language`, `isbn`, `published_year`, `sort_order`, `notes`

---

## 5. 제출 전 체크리스트 (출판사)

- [ ] 목록 행 수 = 표지 파일 수 (판매 중인 권)
- [ ] PDF 판매 권은 `pdf_filename` 채움 + pdfs 폴더에 파일 있음
- [ ] `cover_filename` / `pdf_filename` 이 실제 파일명과 동일
- [ ] 가격은 숫자만 (쉼표·₨ 기호 없이)
- [ ] `status` 가 published 인 권만 먼저 올릴 예정인지 출판사와 합의

---

## 6. 아티클(글)도 옮길 경우

`articles-catalog-template.csv` 를 추가로 채워 주세요. (선택)

---

문의: [담당자 이메일을 여기에 적어 주세요]
