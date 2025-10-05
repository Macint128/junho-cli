#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { execSync } from "child_process";
import chalk from "chalk";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const menuPath = path.join(__dirname, "menu.json");

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
  console.log(chalk.bgBlue.white.bold("\n🍜 Junho CLI 식당 v17.2 🍜\n"));

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
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question("추가할 카테고리 (main, drinks, dessert, goods, seasonal): ", (category) => {
    if (!menu[category]) {
      console.log(chalk.red("❌ 존재하지 않는 카테고리입니다."));
      rl.close();
      return;
    }

    rl.question("메뉴 이름: ", (name) => {
      rl.question("가격: ", (price) => {
        rl.question("설명(선택): ", (desc) => {
          menu[category].push({ name, price: parseInt(price), desc: desc || undefined });
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
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

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

// CLI 업데이트 (로컬 변경 사항 자동 처리)
function updateCLI() {
  console.log(chalk.cyan("\n🔄 최신 버전으로 업데이트 중...\n"));
  try {
    // 1. 현재 변경 사항 임시 저장
    execSync("git add .");
    execSync("git stash push -m 'junho-cli auto-stash'", { stdio: "ignore" });

    // 2. 최신 pull
    execSync("git pull origin main", { stdio: "inherit" });

    // 3. stash pop
    try {
      execSync("git stash pop", { stdio: "inherit" });
    } catch (err) {
      console.log(chalk.yellow("\n⚠️ 일부 변경 사항 충돌! 수동으로 해결 필요.\n"));
    }

    console.log(chalk.green("\n✅ CLI가 최신 버전으로 업데이트되었습니다!\n"));
  } catch (err) {
    console.log(chalk.red("\n❌ 업데이트 실패! Git 상태를 확인하세요.\n"));
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

// 실행
const command = process.argv[2];

switch (command) {
  case "-menu":
    printMenu();
    process.exit(0);
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
