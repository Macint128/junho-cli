#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const menuFile = path.join(__dirname, 'menu.json');

// 초기 메뉴 데이터
let menu = {
  main: [
    { name: "Java 라떼쉐이크", price: 7900, desc: "컴파일된 향긋한 원두 위에 예외 한 스푼 첨가" },
    { name: "Swift 제비 치킨", price: 8900, desc: "반마리 기준, 한 입 먹으면 빨라지는 반응속도" },
    { name: "HTML 라구파스타", price: 11500, desc: "마크업된 토마토 소스, DOM 치즈 토핑" },
    { name: "C++ 블루치즈 킬바사", price: 13200, desc: "포인터 향 가득, 스택/힙 사이 절묘한 풍미" },
    { name: "JSON옐로우 집게발 구이", price: 14800, desc: "키-값 구조화된 바삭함" },
    { name: "Kotlin 삼각 치즈 버거", price: 12800, desc: "삼각 패티, 람다 치즈, null-safe 소스" },
    { name: "만약C였더라면", price: 9500, desc: "매운맛/순한맛/마라맛/짜장맛 선택 가능" }
  ],
  drinks: [
    { name: "JavaScript 네모네모 레모네이드", price: 6900 },
    { name: "TypeScript 네모네모 블루레모네이드", price: 7200 }
  ],
  dessert: [
    { name: "Lua 블루베리 쿠쿸키", price: 5900 },
    { name: "진격의 Ruby 딸기 생일케이크", price: 16500 },
    { name: "빠방 C#크로플!", price: 7700 }
  ],
  goods: [
    { name: "으엄ㅁ…… 모자 (.umm)", price: 25000 },
    { name: "brainfuck's hello pencil", price: 5500 }
  ],
  seasonal: [
    { name: "Spring: Firebase 마라탕", price: 11500 },
    { name: "Summer: GitHub 문어숙회", price: 13200 },
    { name: "Autumn: Docker 단호박 스튜", price: 12000 },
    { name: "Winter: VSCode 초코 마카롱", price: 8500 }
  ]
};

// menu.json 있으면 불러오기
if (fs.existsSync(menuFile)) {
  menu = JSON.parse(fs.readFileSync(menuFile, 'utf-8'));
}

const args = process.argv.slice(2);

// 메뉴 출력 함수
function printMenu() {
  console.log(chalk.bgBlue.white.bold(" 준호의 파이참치 식당 v17.0 "));
  console.log(chalk.green("─────────────────────────────"));

  const printSection = (title, items) => {
    console.log(chalk.yellow.bold(title));
    items.forEach(item => {
      console.log(chalk.cyan(item.name) + '   ' + chalk.magenta(`₩${item.price}`));
      if(item.desc) console.log('   → ' + item.desc);
    });
    console.log('');
  };

  printSection('🥘 시그니처 메인 메뉴', menu.main);
  printSection('🍹 음료', menu.drinks);
  printSection('🍰 디저트', menu.dessert);
  printSection('🎁 굿즈', menu.goods);
  printSection('🍂 계절 한정 메뉴', menu.seasonal);

  console.log(chalk.yellow.bold("🍽️ 세트 추천"));
  console.log("🧠 IDE 콤보: 라떼쉐이크 + 제비치킨 반마리  ₩15,500");
  console.log(chalk.gray("*모든 메뉴와 굿즈, 계절 한정 메뉴는 실시간으로 빌드됩니다.*"));
}

// 메뉴 추가 함수
function addMenu(section, name, price, desc = "") {
  if(!menu[section]) {
    console.log(chalk.red('❌ 섹션 이름이 올바르지 않습니다.'));
    return;
  }
  menu[section].push({ name, price: parseInt(price), desc });
  fs.writeFileSync(menuFile, JSON.stringify(menu, null, 2), 'utf-8');
  console.log(chalk.green(`✅ 메뉴 추가 완료: [${section}] ${name} ₩${price}`));
}

if(args[0] === '-menu') {
  printMenu();
} else if(args[0] === '-add') {
  const [ , section, name, price, ...descArr] = args;
  const desc = descArr.join(' ');
  addMenu(section, name, price, desc);
} else {
  console.log("사용법:");
  console.log("  junho -menu");
  console.log("  junho -add [섹션] [이름] [가격] [설명]");
  console.log("섹션: main, drinks, dessert, goods, seasonal");
}
