#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { execSync } from "child_process";
import chalk from "chalk";
import { fileURLToPath } from "url";

// 경로 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const menuPath = path.join(__dirname, "menu.json");

// 콘솔 입력 세팅
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 메뉴 로드
function loadMenu() {
  const data = fs.readFileSync(menuPath, "utf-8");
  return JSON.parse(data);
}

// 메뉴 저장
function saveMenu(menu) {
  fs.writeFileSync(menuPath, JSON.stringify(menu, null, 2), "utf-8");
}

// 메뉴 출력
function printMenu() {
  const menu = loadMenu();
  console.log(chalk.bgBlue.white.bold("\n🍜 Junho CLI 식당 v17.0 🍜\n"));

  for (const [category, items] of Object.entries(menu)) {
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
  const menu = loadMenu();

  rl.question("추가할 카테고리 (main, drinks, dessert, goods, seasonal): ", (category) => {
    if (!menu[category]) {
      console.log(chalk.red("❌ 존재하지 않는 카테고리입니다."));
      rl.close();
      return;
    }

    rl.question("메뉴 이름: ", (name) => {
      rl.question("가격: ", (price) => {
        rl.question("설명(선택): ", (desc) => {
          menu[category].push({
            name,
            price: parseInt(price),
            desc: desc || undefined,
          });
          saveMenu(menu);
          console.log(chalk.green(`✅ '${name}' 이(가) '${category}'에 추가되었습니다!`));
          rl.close();
        });
      });
    });
  });
}

// 메뉴 삭제
function deleteMenu() {
  const menu = loadMenu();

  rl.question("삭제할 메뉴 이름: ", (name) => {
    let found = false;

    for (const [category, items] of Object.entries(menu)) {
      const index = items.findIndex((item) => item.name === name);
      if (index !== -1) {
        items.splice(index, 1);
        found = true;
        console.log(chalk.red(`🗑️ '${name}' 이(가) ${category}에서 삭제되었습니다.`));
        break;
      }
    }

    if (!found) console.log(chalk.yellow("❗ 해당 이름의 메뉴를 찾을 수 없습니다."));
    saveMenu(menu);
    rl.close();
  });
}

// CLI 업데이트
function updateCLI() {
  console.log(chalk.cyan("\n🔄 최신 버전으로 업데이트 중...\n"));
  try {
    execSync("git pull origin main", { stdio: "inherit" });
    console.log(chalk.green("\n✅ CLI가 최신 버전으로 업데이트되었습니다!\n"));
  } catch (err) {
    console.log(chalk.red("\n❌ 업데이트 실패! 리포지토리 상태를 확인하세요.\n"));
  }
}

// 도움말
function printHelp() {
  console.log(chalk.yellow(`
🧾 Junho CLI 명령어 목록

  junho -menu       전체 메뉴 보기
  junho -add        메뉴 추가
  junho -delete     메뉴 삭제
  junho -update     최신 버전으로 업데이트
  junho -help       도움말 보기
`));
}

// 실행 파트
const command = process.argv[2];

switch (command) {
  case "-menu":
    printMenu();
    break;
  case "-add":
    addMenu();
    break;
  case "-delete":
    deleteMenu();
    break;
  case "-update":
    updateCLI();
    break;
  case "-help":
  default:
    printHelp();
    break;
}
