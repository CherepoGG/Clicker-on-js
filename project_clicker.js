let progressCook = document.getElementById('progressCook');
let getCook = document.getElementById('getCook');
let getMoney = document.getElementById('getMoney');
let cookie = document.getElementById('cookie');
let money = document.getElementById('money');
let currentCookie = 0;
let currentMoney = 0;
let mods = {																//Цена и лвл каждого апдейта
	Mixer: {
  	current_lvl: 0,
    base_cost: 1,
  }, 
	Spread: {
  	current_lvl: 0,
    base_cost: 1,
  },
  Cashbox: {
  	current_lvl: 0,
    base_cost: 1,
  },
  baker: {
		current_lvl: 0,
  	base_cost: 1,
  	base_cookie: 1,
    baker_started: false,
  }
}

getCook.onclick = function() {							//Лепка печенья по нажатию
  progressCook.value = progressCook.value + 10;
  handlerClickСookie();
}
function handlerClickСookie(){
	if(progressCook.value === 10) {
  	addCookies(1);
    progressCook.value = 0;
  }
}

getMoney.onclick = function() {							//продажа печенья по нажатию
  money.innerHTML = currentMoney;
  handlerClickSell();
}
function handlerClickSell(){
	if(currentCookie >= 5) {								//Если печенек >= 5, то продаем 
  	currentMoney = currentMoney + 5;		
    money.innerHTML = currentMoney;
    currentCookie = currentCookie - 5;		//кол-во печенья в общем на 1 монету
    cookie.innerHTML = currentCookie;
  }
  else {
   alert("Недостаточно печенья!");
  }
}

function addCookies(count) {
	currentCookie = currentCookie + count;
  cookie.innerHTML = currentCookie;
}
function decreaseCookies(count) {
	currentCookie = currentCookie - count; 
  cookie.innerHTML = currentCookie;
}
function addMoney(count) {
	currentMoney = currentMoney + count;
  money.innerHTML = currentMoney;
}
function decreaseMoney(count) {
	currentMoney = currentMoney - count;
  money.innerHTML = currentMoney;
}

let upgrades = document.getElementsByName('upgrade');
document.getElementById('upgrader').onclick = checkRadio;

function checkRadio() {
  let allUpgrades = document.getElementsByName('upgrade');
  for(i = 0; i < allUpgrades.length; i++) {
    if(allUpgrades[i].checked) {
			val_input = allUpgrades[i].value;
      
    switch(val_input) {
      case "mixer": alert('mixer');
      break;
      case "spread": alert('spread');
      break;
      case "cashbox": alert('cashbox');
      break;
      case "baker": upgrade_baker();
     	break;
      }
    }
  }
}

function upgrade_baker() {
  let up_lvl = mods.baker.current_lvl + 1;
  let up_cost =  mods.baker.base_cost * up_lvl;
  if(currentMoney >= up_cost) {
    mods.baker.current_lvl = up_lvl;
    decreaseMoney(up_cost);
    if(mods.baker.baker_started === false) {
    	setInterval(add_cookie_baker, 1000);
      mods.baker.baker_started = true;
    }
  }
  else {
    alert("Недостаточно денег!");
  }
}

function add_cookie_baker() {
  let cookies = mods.baker.base_cookie * mods.baker.current_lvl;
  addCookies(cookies);
}
