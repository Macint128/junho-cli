#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const menuFile = path.join(__dirname, 'menu.json');

let menu = {
  main: [],
  drinks: [],
  dessert: [],
  goods: [],
  seasonal: []
};

// menu.json 읽기 (안전하게)
if (fs.existsSync(menuFile)) {
  try {
    const data = fs.readFileSync(menuFile, 'utf-8');
    if (data.trim()) menu = JSON.parse(data);
  } catch {
    console.log(chalk.red("⚠ menu.json 읽기 오류. 기본 메뉴로 초기화됩니다."));
  }
}

const args = process.argv.slice(2);

function printMenu() {
  console.log(chalk.bgBlue.white.bold(" Junho CLI 식당 v17.0 "));
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

function addMenu(section, name, price, desc = "") {
  if(!menu[section]) {
    console.log(chalk.red('❌ 섹션 이름이 올바르지 않습니다.'));
    return;
  }
  menu[section].push({ name, price: parseInt(price), desc });
  fs.writeFileSync(menuFile, JSON.stringify(menu, null, 2), 'utf-8');
  console.log(chalk.green(`✅ 메뉴 추가 완료: [${section}] ${name} ₩${price}`));
}

function deleteMenu(section, name) {
  if(!menu[section]) {
    console.log(chalk.red('❌ 섹션 이름이 올바르지 않습니다.'));
    return;
  }
  const index = menu[section].findIndex(item => item.name === name);
  if(index === -1) {
    console.log(chalk.red(`❌ ${name} 메뉴를 찾을 수 없습니다.`));
    return;
  }
  menu[section].splice(index, 1);
  fs.writeFileSync(menuFile, JSON.stringify(menu, null, 2), 'utf-8');
  console.log(chalk.green(`✅ 메뉴 삭제 완료: [${section}] ${name}`));
}

if(args[0] === '-menu') {
  printMenu();
} else if(args[0] === '-add') {
  const [ , section, name, price, ...descArr] = args;
  const desc = descArr.join(' ');
  addMenu(section, name, price, desc);
} else if(args[0] === '-delete') {
  const [ , section, name] = args;
  deleteMenu(section, name);
} else {
  console.log("사용법:");
  console.log("  junho -menu");
  console.log("  junho -add [섹션] [이름] [가격] [설명]");
  console.log("  junho -delete [섹션] [이름]");
  console.log("섹션: main, drinks, dessert, goods, seasonal");
}
// update 기능 추가
import { execSync } from "child_process";

if (command === "-update") {
  console.log(chalk.blueBright("🌀 최신 버전으로 업데이트 중입니다..."));
  try {
    execSync("git pull origin main", { stdio: "inherit" });
    console.log(chalk.greenBright("✅ 업데이트 완료! 최신 메뉴를 불러왔습니다."));
  } catch (error) {
    console.error(chalk.red("❌ 업데이트 실패! Git 리포지토리 상태를 확인하세요."));
  }
}
