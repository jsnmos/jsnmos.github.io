# OKTA RnD website

옥타알앤디 제품과 기술을 소개하는 GitHub Pages 기반 정적 웹사이트입니다.

## 로컬 실행

별도 빌드 과정은 없습니다. 저장소 루트에서 정적 파일 서버를 실행하세요.

```powershell
npx serve .
```

운영 주소는 <https://oktarnd.kr>이며 `CNAME`으로 연결됩니다.

## 주요 페이지

- `index.html`: 제품 목록과 공지 팝업
- `drones.html`: 육해공 드론
- `mobility.html`: Physical AI Mobility 4족 로봇
- `firehunter.html`: K-Fire Hunters
- `wildfires.html`: 산불 및 국가유산 보호 시스템
- `fabric.html`: OK 소화포
- `liquid.html`: OK 방염액
- `okta-bot.html`: 원격제어 잔디깎이 로봇 OKTA-BOT
- `popup.html`: 견적 문의 폼

이미지와 영상은 `img/`, 스타일은 `assets/css/`, 스크립트는 `assets/js/`에서 관리합니다.

## 디렉터리 구조

```text
.
├── assets/
│   ├── css/       # 공통 제품 스타일, 제품별 테마와 팝업 스타일
│   └── js/        # 공통 동작과 문의 폼 스크립트
├── img/            # 제품별 이미지와 영상 (`firehunter/`, `robot/` 등)
├── *.html          # URL을 유지해야 하는 공개 페이지
├── CNAME           # GitHub Pages 사용자 도메인
├── robots.txt
└── sitemap.xml
```

공개 HTML 파일은 기존 URL을 유지하기 위해 루트에 둡니다. 새 정적 리소스는 역할에 따라 `assets/css` 또는 `assets/js`에 추가합니다.

제품 페이지는 공통 `assets/css/product.css`와 `assets/css/products/` 아래의 제품별 테마를 함께 사용합니다. Fabric과 Liquid는 의도적으로 같은 `products/fabric.css`를 공유합니다.
