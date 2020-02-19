//-------------------------------------------------глобальные данные

let progressCook = document.getElementById('progressCook');
let getCook = document.getElementById('getCook');
let getMoney = document.getElementById('getMoney');
let cookie = document.getElementById('cookie');
let money = document.getElementById('money');
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
    base_cost: 10,
    base_price_cookie: 1,
  },
  cashbox: {
  	current_lvl: 0,
    base_cost: 100,
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

//---------------------------------------------------- кнопки продать/купить

getCook.onmousedown = function () {
  let element = document.getElementById("getCook");
  element.classList.toggle("input_cookie_click");
}

getCook.onmouseup = function () {
  let element = document.getElementById("getCook");
  element.classList.toggle("input_cookie_click");
}

getCook.onclick = function() {							                                            //Лепка печенья по нажатию
  let progress_click = mods.mixer.base_progress_click * mods.mixer.current_lvl;
  progressCook.value = progressCook.value + 1 + progress_click;
  if(progressCook.value === 10) {
  	addCookies(1);
    progressCook.value = 0;
  }
}

getMoney.onmousedown = function () {
  let element = document.getElementById("getMoney");
  element.classList.toggle("input_sell_click");
}

getMoney.onmouseup = function () {
  let element = document.getElementById("getMoney");
  element.classList.toggle("input_sell_click");
}

getMoney.onclick = function() {							                                            //продажа печенья по нажатию
  if(currentCookie >= 1) {								                                              //Если печенек >= 5, то продаем 
    let spread_value = mods.spread.base_price_cookie * mods.spread.current_lvl;
    addMoney(1 + spread_value);
    decreaseCookies(1);
  }
  else {
   alert("Недостаточно печенья!");
  }
}

//--------------------------------------------------Ключевые функции

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

function counterMixer() {
  let counter = getElementById("counter_mixer");
  counter = mods.mixer.current_lvl;
  counter_mixer.innerHTML = counter;
}

//-----------------------------------------------------Контроль выбора апгрейда

let upgrades = document.getElementsByName('upgrade');
document.getElementById('upgrader').onclick = checkRadio;

function checkRadio() {                                                                 //Проверка выбранного пункта
  let allUpgrades = document.getElementsByName('upgrade');
  for(i = 0; i < allUpgrades.length; i++) {
    if(allUpgrades[i].checked) {
			val_input = allUpgrades[i].value;
      
    switch(val_input) {
      case "mixer": upgrade_mixer();
      break;
      case "spread": upgrade_spread();
      break;
      case "cashbox": upgrade_cashbox();
      break;
      case "baker": upgrade_baker();
     	break;
      }
    }
  }
}

//-------------------------------------------------------------Работа апгрейдов

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
  if(currentMoney >= up_cost & currentCookie >= up_cost_cookie) {
    mods.cashbox.current_lvl = up_lvl;
    mods.cashbox.base_cost_cookie = up_cost_cookie;
    decreaseMoney(up_cost);
  }
  else {
    alert("Недостаточно денег или печенья!");
  }
}

function work_cashbox() {
  let money = mods.cashbox.base_money * mods.cashbox.current_lvl;
  let cookie = mods.cashbox.base_cost_cookie
  if(currentCookie >= cookie) {
    addMoney(money);
    decreaseCookies(cookie);
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

function work_baker() {
  let cookies = mods.baker.base_cookie * mods.baker.current_lvl;
  addCookies(cookies);
}

function startMods() {
  counterMixer();
  work_cashbox();
  work_baker();
}
setInterval(startMods, 1000);
