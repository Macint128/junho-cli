# 🍜 Junho CLI 식당 v17.0

> 개발자들을 위한, 맛있는 코드 메뉴판!  
> 직접 CLI에서 메뉴를 보고, 추가하고, 지우고, 업데이트할 수 있습니다.

---

## ⚙️ 설치

```bash
git clone https://github.com/Macint128/junho-cli.git
cd junho-cli
chmod +x junho.js
npm install chalk
ln -sf ~/junho-cli/junho.js /usr/local/bin/junho
이제 전역에서 아래 명령어로 실행할 수 있습니다:

junho -menu
🍱 주요 명령어
명령어	설명
junho -menu	전체 메뉴를 보기
junho -add	새로운 메뉴 추가
junho -delete	메뉴 삭제
junho -update	CLI 최신 버전으로 업데이트
junho -help	도움말 보기

📋 메뉴 구조 (menu.json)
menu.json 파일은 다음과 같은 구조로 되어 있습니다:

{
  "main": [ { "name": "메뉴명", "price": 10000, "desc": "설명" } ],
  "drinks": [],
  "dessert": [],
  "goods": [],
  "seasonal": []
}
🧁 메뉴 추가 방법
새로운 메뉴를 추가하려면 아래 명령을 실행하세요:

junho -add
CLI가 안내하는 대로 카테고리, 메뉴 이름, 가격, 설명을 입력하면 자동으로 menu.json에 반영됩니다.

🧹 메뉴 삭제 방법
junho -delete
삭제하고 싶은 메뉴 이름을 입력하면 자동으로 찾아서 제거됩니다.

🔄 CLI 업데이트 (junho -update)
junho-cli를 최신 버전으로 갱신하려면 아래 명령어를 입력하세요:

junho -update
이 명령은 내부적으로 다음 명령을 실행합니다:

git pull origin main
⚠️ 주의:

junho-cli 폴더가 Git 리포지토리여야 합니다.

로컬 변경사항이 있으면 커밋하거나 스태시 후 실행하세요.

🛠️ 권한 문제 해결
만약 다음과 같은 에러가 발생한다면:

zsh: permission denied: junho
해결 방법:

chmod +x junho.js
sudo ln -sf ~/junho-cli/junho.js /usr/local/bin/junho
🍰 Jeckell 메뉴
신규 디저트 “Jeckell 다크초코 푸딩”이 추가되었습니다!
정적 사이트처럼 묵직하고 진한 맛을 느껴보세요 🍫

🧠 개발자 메모
menu.json을 수동으로 수정할 수 있습니다.

JSON 포맷이 깨지지 않도록 콤마(,) 위치에 유의하세요.

CLI는 Node.js 18 이상에서 작동합니다.
