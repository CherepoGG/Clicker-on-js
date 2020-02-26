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
let progress_auto_sell = document.getElementById("progress_auto_sell");
let progress_auto_cook = document.getElementById("progress_auto_cook");
let currentCookie = 0;
let currentMoney = 0;

let mods = {																                                            //Цена и лвл каждого апдейта
	mixer: {
  	current_lvl: 0,
    base_cost: 1,
    base_progress_click: 1,
  }, 
	spread: {
  	current_lvl: 0,
    base_cost: 1,
    base_price_cookie: 1,
  },
  cashbox: {
  	current_lvl: 0,
    base_cost: 1,
    base_cost_cookie: 0,
    base_money: 1,
    cashbox_started: false,
  },
  baker: {
		current_lvl: 0,
  	base_cost: 1,
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

function addCookies(count) {
	currentCookie = currentCookie + count;
  cookie.innerHTML = currentCookie;
}

function decreaseCookies(count) {
  if(currentCookie - count >= 0) {
    currentCookie = currentCookie - count;
    cookie.innerHTML = currentCookie;
    return true;
    }
  return false;
}

function addMoney(count) {
  currentMoney = currentMoney + count;
  money.innerHTML = currentMoney;
}

function decreaseMoney(count) {
  if(currentMoney - count >= 0) {
	  currentMoney = currentMoney - count;
    money.innerHTML = currentMoney;
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

function upgrade_mixer() {
  let up_lvl = mods.mixer.current_lvl + 1;
  let up_cost = mods.mixer.base_cost * up_lvl;
  if( decreaseMoney(up_cost) ) {
    mods.mixer.current_lvl = up_lvl;
  }
  else {
    alert("Недостаточно денег!");
  }
}

function upgrade_spread() {
  let up_lvl = mods.spread.current_lvl + 1;
  let up_cost = mods.spread.base_cost * up_lvl;
  if( decreaseMoney(up_cost) ) {
    mods.spread.current_lvl = up_lvl;
  }
  else {
    alert("Недостаточно денег!");
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
  }
  else {
    alert("Недостаточно печенья!");
  }
}

function start_cashbox_pb() {
  let element = document.getElementById("progress_auto_sell");
  if(mods.cashbox.current_lvl >= 1) {
    progress_auto_sell.value += 1;
    element.classList.remove("upgrade_bar_start");
    element.classList.add("upgrade_bar");
  }
}

function upgrade_cashbox_speed() {
  switch(mods.cashbox.current_lvl) {
    case 1: progress_auto_sell.max = 10;
      break;
    case 2: progress_auto_sell.max = 9;
      break;
    case 3: progress_auto_sell.max = 8;
      break;
    case 4: progress_auto_sell.max = 7;
      break;
    case 5: progress_auto_sell.max = 6;
      break;
    case 6: progress_auto_sell.max = 5;
      break;
    case 7: progress_auto_sell.max = 4;
      break;
    case 8: progress_auto_sell.max = 3;
      break;
    case 9: progress_auto_sell.max = 2;
      break;
    case 10: progress_auto_sell.max = 1;
      break;
  }
}

function work_cashbox() {
  let money = mods.cashbox.base_money * mods.cashbox.current_lvl;
  let cookie = mods.cashbox.base_cost_cookie;
  if(mods.cashbox.current_lvl >= 1 && currentCookie >= cookie && progress_auto_sell.value === progress_auto_sell.max) {
    progress_auto_sell.value = 0;
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
  }
  else {
    alert("Недостаточно денег!");
  }
}

function start_baker_pb() {
  let element = document.getElementById("progress_auto_cook");
  if(mods.baker.current_lvl >= 1) {
    progress_auto_cook.value += 1;
    element.classList.remove("upgrade_bar_start");
    element.classList.add("upgrade_bar");
  }
}

function upgrade_baker_speed() {
  switch(mods.baker.current_lvl) {
    case 1: progress_auto_cook.max = 10;
      break;
    case 2: progress_auto_cook.max = 9;
      break;
    case 3: progress_auto_cook.max = 8;
      break;
    case 4: progress_auto_cook.max = 7;
      break;
    case 5: progress_auto_cook.max = 6;
      break;
    case 6: progress_auto_cook.max = 5;
      break;
    case 7: progress_auto_cook.max = 4;
      break;
    case 8: progress_auto_cook.max = 3;
      break;
    case 9: progress_auto_cook.max = 2;
      break;
    case 10: progress_auto_cook.max = 1;
      break;
  }
}

function work_baker() {
  let cookies = mods.baker.base_cookie * mods.baker.current_lvl;
  if(progress_auto_cook.value === progress_auto_cook.max) {
    addCookies(cookies);
    progress_auto_cook.value = 0;
  }
}

function startMods() {
  work_cashbox();
  start_cashbox_pb();
  work_baker();
  start_baker_pb();
}
setInterval(startMods, 1000);

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
  upgrade_baker_speed();
  upgrade_cashbox_speed();
  progress_auto_sell.innerHTML
  progress_auto_cook.innerHTML
}
setInterval(start_status, 1);
