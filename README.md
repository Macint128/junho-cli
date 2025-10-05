# Junho CLI 🍹🍰🧢

**Junho CLI 식당 v17.0** – 터미널 메뉴판 & 메뉴 관리 CLI 🎉  

프로그래머 감성 가득한 메뉴판과 굿즈, 계절 한정 메뉴까지 모두 포함!  
터미널에서 메뉴를 확인하고, 메뉴 추가/삭제가 가능하며 안전하게 글로벌 CLI처럼 사용할 수 있습니다 😎

---

## 📦 주요 기능

- 컬러풀한 메뉴판 출력 (`junho -menu`)
- 메뉴 추가 (`junho -add`)
- 메뉴 삭제 (`junho -delete`)
- 메뉴판 구분: 메인, 음료, 디저트, 굿즈, 계절 한정 메뉴
- 메뉴 정보는 `menu.json`에 자동 저장
- macOS / Linux 환경에서 안전하게 글로벌 CLI처럼 사용 가능

---

## ⚙ 설치 방법

### 1️⃣ 리포 클론

```bash
git clone https://github.com/Macint128/junho-cli.git
cd junho-cli
````

### 2️⃣ 의존성 설치

```bash
npm install
```

> 주의: `chalk` 모듈을 사용하므로 반드시 설치 필요

---

### 3️⃣ 글로벌 CLI로 사용 (권장)

**macOS 권한 문제 예방을 위해 홈 디렉토리 글로벌 경로 사용**

```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
npm link
```

* 이제 어디서든 CLI 명령어 사용 가능

```bash
junho -menu
```

> ⚠ sudo 없이 안전하게 CLI 실행 가능
> `/usr/local/lib` 경로를 건드리지 않음

---

## 🧾 사용법

### 1️⃣ 메뉴판 출력

```bash
junho -menu
```

* 전체 메뉴판 출력 (메인, 음료, 디저트, 굿즈, 계절 한정 메뉴)
* 컬러와 이모지 포함

---

### 2️⃣ 메뉴 추가

```bash
junho -add [섹션] [이름] [가격] [설명]
```

* `[섹션]`: main, drinks, dessert, goods, seasonal
* `[이름]`: 메뉴 이름
* `[가격]`: 가격 (숫자)
* `[설명]`: 메뉴 설명 (선택)

예시:

```bash
junho -add dessert "Lua 블루베리 머핀" 5900 "오타 감성 듬뿍"
junho -add drinks "JavaScript 네모네모 레모네이드" 6900
```

> 추가 후 `menu.json`에 자동 반영

---

### 3️⃣ 메뉴 삭제

```bash
junho -delete [섹션] [이름]
```

* `[섹션]`과 `[이름]`을 정확히 입력
* 예시:

```bash
junho -delete dessert "Lua 블루베리 쿠쿸키"
```

* 삭제 후 `-menu`로 확인 가능

---

## 📁 menu.json 구조

```json
{
  "main": [],
  "drinks": [],
  "dessert": [],
  "goods": [],
  "seasonal": []
}
```

* 메뉴 추가/삭제 시 자동 갱신
* 안전하게 JSON 읽기 처리됨, 비어 있어도 오류 없음

---

## 🛠 권한 문제 해결 (macOS)

* `EACCES` 또는 `EPERM` 오류 발생 시:

1. 터미널에 전체 디스크 접근 허용
2. 홈 디렉토리 글로벌 경로 사용 (권장)

```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
npm link
```

3. sudo는 최후의 수단

```bash
sudo npm link
```

> sudo 사용 시 나중에 권한 문제 주의

---

## 💡 팁

* 디렉토리 삭제:

```bash
rm -r ~/junho-cli
```

* 폴더 안 내용만 삭제:

```bash
rm -r ~/junho-cli/*
```

* 실행 권한 문제 시:

```bash
chmod +x ~/junho-cli/junho.js
```

---

## 🎨 메뉴판 구성

* 🥘 **시그니처 메인 메뉴**
* 🍹 **음료**
* 🍰 **디저트**
* 🎁 **굿즈**
* 🍂 **계절 한정 메뉴**

💡 *세트 추천: IDE 콤보 (라떼쉐이크 + 제비치킨 반마리) ₩15,500*

---

## 📝 기여 방법

1. 리포 클론
2. Node.js 설치
3. `npm install`로 의존성 설치
4. 글로벌 링크 (`npm link`)
5. 메뉴판 수정/추가/삭제 후 PR 가능

---
