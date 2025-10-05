#!/usr/bin/env node

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import readline from "readline";
import chalk from "chalk";
import { execSync } from "child_process";

// LowDB 초기화
const adapter = new JSONFile("menu.db.json");
const db = new Low(adapter);
await db.read();
db.data ||= {
  main: [
    { "name": "Swift 제비 치킨", "price": 8900, "desc": "반마리 기준, 한 입 먹으면 빨라지는 반응속도" },
    { "name": "HTML 라구파스타", "price": 11500, "desc": "마크업된 토마토 소스, DOM 치즈 토핑" },
    { "name": "C++ 블루치즈 킬바사", "price": 13200, "desc": "포인터 향 가득, 스택/힙 사이 절묘한 풍미" },
    { "name": "JSON옐로우 집게발 구이", "price": 14800, "desc": "키-값 구조화된 바삭함" },
    { "name": "Kotlin 삼각 치즈 버거", "price": 12800, "desc": "삼각 패티, 람다 치즈, null-safe 소스" },
    { "name": "만약C였더라면", "price": 9500, "desc": "매운맛/순한맛/마라맛/짜장맛 선택 가능" }
  ],
  drinks: [
    { "name": "Java 라떼쉐이크", "price": 7900, "desc": "컴파일된 향긋한 원두 위에 예외 한 스푼 첨가" },
    { "name": "JavaScript 네모네모 레모네이드", "price": 6900 },
    { "name": "TypeScript 네모네모 블루레모네이드", "price": 7200 }
  ],
  dessert: [
    { "name": "Lua 블루베리 쿠쿸키", "price": 5900 },
    { "name": "진격의 Ruby 딸기 생일케이크", "price": 16500 },
    { "name": "빠방 C#크로플!", "price": 7700 },
    { "name": "Jeckell 다크초코 푸딩", "price": 8800, "desc": "블로그 빌드보다 진한 다크초코의 정적사이트 감성" }
  ],
  goods: [
    { "name": "으엄ㅁ…… 모자 (.umm)", "price": 25000 },
    { "name": "brainfuck's hello pencil", "price": 5500 }
  ],
  seasonal: [
    { "name": "Spring: Firebase 마라탕", "price": 11500 },
    { "name": "Summer: GitHub 문어숙회", "price": 13200 },
    { "name": "Autumn: Docker 단호박 스튜", "price": 12000 },
    { "name": "Winter: VSCode 초코 마카롱", "price": 8500 }
  ]
};
await db.write();

// 메뉴 출력
function printMenu() {
  console.log(chalk.bgBlue.white.bold("\n🍜 Junho CLI 식당 🍜\n"));
  for (const [category, items] of Object.entries(db.data)) {
    console.log(chalk.yellow.bold(`\n📂 ${category.toUpperCase()}`));
    items.forEach((item, index) => {
      const line = chalk.cyan(`  ${index + 1}. ${item.name}`);
      const price = chalk.green(`₩${item.price.toLocaleString()}`);
      const desc = item.desc ? chalk.gray(` - ${item.desc}`) : "";
      console.log(`${line} ${price}${desc}`);
    });
  }
  console.log(chalk.magenta("\n👨‍🍳 'junho -add' 로 메뉴를 추가할 수 있습니다!\n"));
}

// 메뉴 추가
function addMenu() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("카테고리 (main, drinks, dessert, goods, seasonal): ", (cat) => {
    if (!db.data[cat]) {
      console.log(chalk.red("❌ 존재하지 않는 카테고리입니다."));
      rl.close(); return;
    }
    rl.question("메뉴 이름: ", (name) => {
      rl.question("가격: ", (price) => {
        rl.question("설명(선택): ", async (desc) => {
          db.data[cat].push({ name, price: parseInt(price), desc: desc || undefined });
          await db.write();
          console.log(chalk.green(`✅ '${name}' 추가됨!`));
          rl.close();
        });
      });
    });
  });
}

// 메뉴 삭제
function deleteMenu() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question("삭제할 메뉴 이름: ", async (name) => {
    let found = false;
    for (const [cat, items] of Object.entries(db.data)) {
      const idx = items.findIndex(i => i.name === name);
      if (idx !== -1) { items.splice(idx, 1); found = true; break; }
    }
    await db.write();
    console.log(found ? chalk.red(`🗑️ '${name}' 삭제됨!`) : chalk.yellow("❗ 해당 메뉴 없음"));
    rl.close();
  });
}

// CLI 업데이트 (Git pull)
function updateCLI() {
  console.log(chalk.cyan("\n🔄 최신 버전 업데이트...\n"));
  try {
    execSync("git add . && git stash push -m 'junho-cli auto-stash'", { stdio: "ignore" });
    execSync("git pull origin main", { stdio: "inherit" });
    try { execSync("git stash pop", { stdio: "inherit" }); } catch { console.log(chalk.yellow("⚠️ 충돌 발생!")); }
    console.log(chalk.green("\n✅ 업데이트 완료!"));
  } catch { console.log(chalk.red("\n❌ 업데이트 실패!")); }
}

// 도움말
function printHelp() {
  console.log(chalk.yellow(`
🧾 Junho CLI 명령어

  junho -menu       메뉴 보기
  junho -add        메뉴 추가
  junho -delete     메뉴 삭제
  junho -update     업데이트
  junho -help       도움말
`));
}

// 실행
const cmd = process.argv[2];
switch(cmd) {
  case "-menu": printMenu(); process.exit(0); break;
  case "-add": addMenu(); break;
  case "-delete": deleteMenu(); break;
  case "-update": updateCLI(); break;
  default: printHelp(); break;
}
