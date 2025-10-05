# 🍽️ Junho CLI Restaurant

> "코드와 맛이 공존하는 그곳, Junho CLI 식당에 오신 걸 환영합니다."

---

## 🚀 설치 방법

### 1️⃣ 리포 클론
```bash
git clone https://github.com/yourname/junho-cli.git
cd junho-cli
2️⃣ 의존성 설치
bash
코드 복사
npm install
3️⃣ 실행 권한 부여
bash
코드 복사
chmod +x junho.js
4️⃣ CLI 링크 연결
bash
코드 복사
npm link
👉 이후엔 전역 어디서든

bash
코드 복사
junho -menu
로 메뉴판 확인 가능!

🍔 메뉴판 보기
bash
코드 복사
junho -menu
현재 등록된 모든 메뉴를 카테고리별로 출력합니다.
카테고리는 main, dessert, drink, goods, season 이 있습니다.

🧁 메뉴 추가
bash
코드 복사
junho -add <카테고리> "<이름>" <가격> "<설명>"
예시:

bash
코드 복사
junho -add dessert "Rosetta 변환 파이" 6900 "이 파이를 먹으면 모든 언어가 통한다!"
❌ 메뉴 삭제
bash
코드 복사
junho -delete "<이름>"
예시:

bash
코드 복사
junho -delete "Java 라떼쉐이크"
♻️ 메뉴 업데이트
bash
코드 복사
junho -update
최신 메뉴판(JSON 버전)을 자동으로 불러옵니다.
깃허브의 menu.json 최신판이 로컬로 반영됩니다.

🧰 권한 문제 해결
macOS에서 npm link나 permission denied가 뜨면 아래를 실행하세요:

bash
코드 복사
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
npm link
이제 sudo 없이도 CLI를 전역 명령처럼 실행할 수 있습니다 🙌

🎉 현재 메뉴 (v18.0 기준)
🍛 Main
Java 라떼쉐이크 — 7900₩ ☕

Swift 제비 치킨 (반/1/2마리) — 8900₩부터 🍗

C++ 블루치즈 킬바사 — 9500₩ 🌭

JSON 옐로우 집게발 구이 — 9900₩ 🦀

“만약C였더라면”(매운맛/순한맛/마라/짜장) — 8700₩ 🍜

Kotlin 삼각 치즈 버거 — 9400₩ 🍔

🍰 Dessert
Lua 블루베리 쿠쿸키 — 5900₩ 🍪

Ruby 딸기 생일케이크 — 8700₩ 🎂

C# 크로플 — 6500₩ 💥

Jekyll 잭키 타르트 — 6200₩ 🧁

Rosetta 변환 파이 — 6900₩ 🌍

🍹 Drink
JavaScript 네모네모 레모네이드 — 5300₩ 🍋

TypeScript 네모네모 블루레모네이드 — 5500₩ 💙

🛍️ Goods
“으엄ㅁ...... 모자” — 11900₩ (.umm 한정 굿즈 🧢)

brainfuck’s hello pencil — 3200₩ ✏️

🌸 Season Limited
봄: Firebase 마라탕 — 9800₩ 🌶️

여름: GitHub 문어숙회 — 12500₩ 🐙

💾 파일 구조
bash
코드 복사
junho-cli/
│
├── junho.js        # 메인 실행 파일
├── menu.json       # 메뉴 데이터 저장소
├── package.json    # NPM 설정
└── README.md       # 문서 (이 파일)
💡 제작자 노트
“이 프로젝트는 배고픈 개발자의 정신적 허기를 달래기 위해 만들어졌습니다.”
— Junho CLI Founder 🍴
