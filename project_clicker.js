﻿//---------------------------------------------------------------------глобальные данные

let progressCook = document.getElementById('progressCook');
let getCook = document.getElementById('getCook');
let getMoney = document.getElementById('getMoney');
let cookie = document.getElementById('cookie');
let money = document.getElementById('money');
let button_upgrade_mixer = document.getElementById("upgrade_mixer");
let button_upgrade_spread = document.getElementById("upgrade_spread");
let button_upgrade_cashbox = document.getElementById("upgrade_cashbox");
let button_upgrade_baker = document.getElementById("upgrade_baker");
let counter_mixer = document.getElementById("counter_mixer");
let counter_spread = document.getElementById("counter_spread");
let counter_cashbox = document.getElementById("counter_cashbox");
let counter_baker = document.getElementById("counter_baker");
let currentCookie = 0;
let currentMoney = 0;

// if("cookie" in localStorage && "money" in localStorage) {
//   save_cook = JSON.parse(localStorage.cookie);
//   save_money = JSON.parse(localStorage.money);
// }

// if("counter_mixer" in localStorage)
//   save_mixer = JSON.parse(localStorage.mixer);
//   save_spread = JSON.parse(localStorage.spread);
//   save_cashbox = JSON.parse(localStorage.cashbox);
//   save_baker = JSON.parse(localStorage.baker); 
//   currentCookie = save_cook;
//   currentMoney = save_money;
//   counter_mixer = save_mixer;
//   counter_spread = save_spread;
//   counter_cashbox = save_cashbox;
//   counter_baker = save_baker;

switch(localStorage) {
  case cookie: JSON.parse(localStorage.cookie);
    currentCookie = save_cookie;
  break;
  case money: JSON.parse(localStorage.money);
    currentMoney = save_money;
  break;
  case save_mixer: JSON.parse(localStorage.mixer);
    counter_mixer = save_mixer;
  break;
  case save_spread: JSON.parse(localStorage.spread);
  counter_spread = save_spread;
  break;
  case save_cashbox: JSON.parse(localStorage.cashbox);
    counter_cashbox = save_cashbox;
  break;
  case save_baker: JSON.parse(localStorage.baker);
    counter_baker = save_baker;
  break;
}

let mods = {																                                            //Цена и лвл каждого апдейта
	mixer: {
  	current_lvl: 0,
    base_cost: 10,
    base_progress_click: 1,
  }, 
	spread: {
  	current_lvl: 0,
    base_cost: 100,
    base_price_cookie: 1,
  },
  cashbox: {
  	current_lvl: 0,
    base_cost: 1000,
    base_cost_cookie: 0,
    base_money: 1,
    cashbox_started: false,
  },
  baker: {
		current_lvl: 0,
  	base_cost: 10000,
  	base_cookie: 1,
    baker_started: false,
  }
}

//------------------------------ проверка денег и активация/деактивация кнопок апгрейдов

function check_money_for_mixer() {
  let up_lvl = mods.mixer.current_lvl + 1;
  let up_cost = mods.mixer.base_cost * up_lvl;
  if(currentMoney >= up_cost) {
    button_upgrade_mixer.disabled = false;
  }
  else {
    button_upgrade_mixer.disabled = true;
  }
}

function check_money_for_spread() {
  let up_lvl = mods.spread.current_lvl + 1;
  let up_cost = mods.spread.base_cost * up_lvl;
  if(currentMoney >= up_cost) {
    button_upgrade_spread.disabled = false;
  }
  else {
    button_upgrade_spread.disabled = true; 
  }
}

function check_money_for_cashbox() {
  let up_lvl = mods.cashbox.current_lvl + 1;
  let up_cost = mods.cashbox.base_cost * up_lvl;
  if(currentMoney >= up_cost) {
    button_upgrade_cashbox.disabled = false;
  }
  else {
    button_upgrade_cashbox.disabled = true;
  }
}

function check_money_for_baker() {
  let up_lvl = mods.baker.current_lvl + 1;
  let up_cost = mods.baker.base_cost * up_lvl;
  if(currentMoney >= up_cost) {
    button_upgrade_baker.disabled = false;
  }
  else {
    button_upgrade_baker.disabled = true;
  }
}


//-----------------------------------------------------------------кнопки продать/купить

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

getCook.ondragstart = function() {
  return false;
};

async function animation_cookie() {
  let element = document.getElementById("getCook");
  element.classList.toggle("animation_cook_click");
  await sleep(65);
  element.classList.toggle("animation_cook_click");
}

getCook.onclick = function() {							                                            //Лепка печенья по нажатию
  animation_cookie();
  let progress_click = mods.mixer.base_progress_click * mods.mixer.current_lvl;
  progressCook.value = progressCook.value + 1 + progress_click;
  if(progressCook.value === progressCook.max) {
  	addCookies(1);
    progressCook.value = 0;
  }
}

getMoney.ondragstart = function() {
  return false;
};

async function animation_money() {
  let element = document.getElementById("getMoney");
  element.classList.toggle("animation_sell_click");
  await sleep(65);
  element.classList.toggle("animation_sell_click");
}

getMoney.onclick = function() {                                                         //продажа печенья по нажатию
  animation_money();
  if(currentCookie >= 1) {								                                              //Если печенек >= 5, то продаем 
    let spread_value = mods.spread.base_price_cookie * mods.spread.current_lvl;
    addMoney(1 + spread_value);
    decreaseCookies(1);
  }
  else {
   alert("Недостаточно печенья!");
  }
}

//----------------------------------------------------------------------Ключевые функции

function save_cook_progress() {
  let save_cookie = JSON.stringify(currentCookie);
  localStorage.setItem("cookie", save_cookie);
}

function save_money_progress() {
  let save_money = JSON.stringify(currentMoney);
  localStorage.setItem("money", save_money);
}

function addCookies(count) {
	currentCookie = currentCookie + count;
  cookie.innerHTML = currentCookie;
  save_cook_progress();
}

function decreaseCookies(count) {
  if(currentCookie - count >= 0) {
    currentCookie = currentCookie - count;
    cookie.innerHTML = currentCookie;
    save_cook_progress();
    return true;
    }
  return false;
}

function addMoney(count) {
  currentMoney = currentMoney + count;
  money.innerHTML = currentMoney;
  save_money_progress();
}

function decreaseMoney(count) {
  if(currentMoney - count >= 0) {
	  currentMoney = currentMoney - count;
    money.innerHTML = currentMoney;
    save_money_progress();
    return true;
  }
  return false;
}

//--------------------------------------------------------------Контроль выбора апгрейда

button_upgrade_mixer.onclick = function() {
  upgrade_mixer();
}

button_upgrade_spread.onclick = function() {
  upgrade_spread();
}

button_upgrade_cashbox.onclick = function() {
  upgrade_cashbox();
}

button_upgrade_baker.onclick = function() {
  upgrade_baker();
}

//----------------------------------------------------------------------Работа апгрейдов

function save_mixer_progress() {
  let save_mixer = JSON.stringify(counter_mixer);
  localStorage.setItem("mixer", save_mixer);
}

function save_spread_progress() {
  let save_spread = JSON.stringify(counter_spread);
  localStorage.setItem("spread", save_spread);
}

function save_cashbox_progress() {
  let save_cashbox = JSON.stringify(counter_cashbox);
  localStorage.setItem("cashbox", save_cashbox);
}

function save_baker_progress() {
  let save_baker = JSON.stringify(counter_baker);
  localStorage.setItem("baker", save_baker);
}

function upgrade_mixer() {
  let up_lvl = mods.mixer.current_lvl + 1;
  let up_cost = mods.mixer.base_cost * up_lvl;
  if( decreaseMoney(up_cost) ) {
    mods.mixer.current_lvl = up_lvl;
    save_mixer_progress();
  }
}

function upgrade_spread() {
  let up_lvl = mods.spread.current_lvl + 1;
  let up_cost = mods.spread.base_cost * up_lvl;
  if( decreaseMoney(up_cost) ) {
    mods.spread.current_lvl = up_lvl;
    save_spread_progress();
  }
}

function work_spread() {
  let money = mods.spread.base_price_cookie * mods.spread.current_lvl;
  addMoney(money); 
}

function upgrade_cashbox() {
  let up_lvl = mods.cashbox.current_lvl + 1;
  let up_cost = mods.cashbox.base_cost * up_lvl;
  let up_cost_cookie = mods.cashbox.base_cost_cookie + 1;
  if(currentMoney >= up_cost && currentCookie >= up_cost_cookie) {
    mods.cashbox.current_lvl = up_lvl;
    mods.cashbox.base_cost_cookie = up_cost_cookie;
    decreaseMoney(up_cost);
    save_cashbox_progress();
  }
  else {
    alert("Недостаточно печенья!");
  }
}

function work_cashbox() {
  let money = mods.cashbox.base_money * mods.cashbox.current_lvl;
  let cookie = mods.cashbox.base_cost_cookie;
  if(mods.cashbox.current_lvl >= 1 && currentCookie >= cookie) {
    addMoney(money);
    decreaseCookies(cookie);
    work_spread();
  }
}

function upgrade_baker() {
  let up_lvl = mods.baker.current_lvl + 1;
  let up_cost =  mods.baker.base_cost * up_lvl;
  if(currentMoney >= up_cost) {
    mods.baker.current_lvl = up_lvl;
    decreaseMoney(up_cost);
    save_baker_progress();
  }
}

function work_baker() {
  let cookies = mods.baker.base_cookie * mods.baker.current_lvl;
  addCookies(cookies);
}

//---------------------------------------------------------------- функции запуска

function startMods() {
  work_cashbox();
  work_baker();
}
setInterval(startMods, 10000);

function start_status() {
  check_money_for_mixer();
  check_money_for_spread();
  check_money_for_cashbox();
  check_money_for_baker();
  cookie.innerHTML = currentCookie;
  money.innerHTML = currentMoney;
  counter_mixer.innerHTML = mods.mixer.current_lvl;
  counter_spread.innerHTML = mods.spread.current_lvl;
  counter_cashbox.innerHTML = mods.cashbox.current_lvl;
  counter_baker.innerHTML = mods.baker.current_lvl;
 // check_save_progress();
}
setInterval(start_status, 1);

//---------------------------------------------------------------- сохранение прогресса

// сделать ценники для апгрейдов
// сделать сохранение прогресса

