const gameState = {
    player: {
        hp: 100,
        level: 1,
        location: "Город"
    }
};

/*function log(message) {
    const logDiv = document.getElementById('log');
    logDiv.innerHTML += `<p>${message}</p>`; 
    logDiv.scrollTop = logDiv.scrollHeight;
}*/

// Конфигурация врагов
const ENEMY_TYPES = {
    goblin: { name: 'Гоблин', hp: 30, str: 5, xp: 10 },
    orc: { name: 'Орк', hp: 60, str: 10, xp: 25 },
    dragon: { name: 'Дракон', hp: 150, str: 20, xp: 100 }
};

// Класс Персонажа
class Player {
    constructor() {
        this.reset();
    }

    reset() {
        this.name = "Герой";
        this.hp = 100;
        this.maxHp = 100;
        this.str = 10;
        this.def = 5;
        this.level = 1;
        this.xp = 0;
        this.inventory = ['Зелье лечения'];
        this.location = "Город";
    }

    attack(target) {
        let damage = Math.max(0, this.str - target.def);
        target.hp -= damage;
        return damage;
    }

    gainXp(amount) {
        this.xp += amount;
        log(`Вы получили ${amount} опыта.`);
        if (this.xp >= this.level * 50) {
            this.levelUp();
        }
    }

    levelUp() {
        this.level++;
        this.maxHp += 20;
        this.hp = this.maxHp;
        this.str += 5;
        log(`УРОВЕНЬ ПОВЫШЕН! Теперь вы ${this.level} уровня.`);
    }
}

// Глобальные переменные
let player = new Player();
let currentEnemy = null;

// Функции логирования
function log(msg) {
    const logBox = document.getElementById('log');
    logBox.innerHTML += `<div>${msg}</div>`;
    logBox.scrollTop = logBox.scrollHeight;
}

/* Обновление интерфейса
function updateUI() {
    document.getElementById('stats').innerText = 
        `${player.name} | HP: ${player.hp}/${player.maxHp} | Ур: ${player.level} | Локация: ${player.location}`;
}*/




function updateUI() {
    document.getElementById('hp').innerText = gameState.player.hp;
    document.getElementById('level').innerText = gameState.player.level;
    
    const controls = document.getElementById('controls');
    controls.innerHTML = '';

    const currentLoc = gameState.locations[gameState.player.location];
    log(`--- ${currentLoc.description} ---`);

    for (let direction in currentLoc.exits) {
        const btn = document.createElement('button');
        btn.innerText = `Go to ${direction}`;
        btn.onclick = () => move(currentLoc.exits[direction]);
        controls.appendChild(btn);
    }

    if (currentLoc.enemy) {
        const btn = document.createElement('button');
        btn.innerText = `Attack ${currentLoc.enemy.name}`;
        btn.onclick = () => attack(currentLoc.enemy);
        controls.appendChild(btn);
    }
}

// Функция передвижения
function move(location) {
    player.location = location;
    log(`Вы переместились в: ${location}`);
    
    // Случайное событие (шанс 50%)
    if (Math.random() > 0.5) {
        spawnEnemy();
    }
    updateUI();
}

// Спавн врага
function spawnEnemy() {
    const types = Object.keys(ENEMY_TYPES);
    const type = types[Math.floor(Math.random() * types.length)];
    const data = ENEMY_TYPES[type];
    
    currentEnemy = { ...data, def: 2 }; // Копируем данные врага
    log(`Внезапная атака! На вас напал ${currentEnemy.name}!`);
    updateUI();
}

// Кнопка атаки
function actionAttack() {
    if (!currentEnemy) {
        log("Здесь не с кем сражаться.");
        return;
    }
    
    // Игрок бьет
    const dmg = player.attack(currentEnemy);
    log(`Вы нанесли ${dmg} урона врагу ${currentEnemy.name}.`);
    
    if (currentEnemy.hp <= 0) {
        log(`Вы победили ${currentEnemy.name}!`);
        player.gainXp(currentEnemy.xp);
        currentEnemy = null;
    } else {
        // Враг бьет в ответ
        player.hp -= currentEnemy.str;
        log(`${currentEnemy.name} ударил вас на ${currentEnemy.str} урона.`);
    }
    updateUI();
}

// Сброс
function resetGame() {
    player.reset();
    currentEnemy = null;
    document.getElementById('log').innerHTML = "Игра начата заново.";
    updateUI();
}


/*function attack(enemy) {
    const playerDamage = 15;
    enemy.hp -= playerDamage;
    log(`You attacked ${enemy.name}, damage: ${playerDamage}`);

    if (enemy.hp <= 0) {
        log(`${enemy.name} has been defeated!`);
        delete gameState.locations[gameState.player.location].enemy;
        gameState.player.level += 1;
    } else {
        const enemyDamage = 10;
        gameState.player.hp -= enemyDamage;
        log(`${enemy.name} attacks you! Your damage: ${enemyDamage}`);
        
        if (gameState.player.hp <= 0) {
            log("You have died. Game is over.");
            document.getElementById('controls').innerHTML = '<button onclick="location.reload()">Start over</button>';
            return;
        }
    }
}*/

