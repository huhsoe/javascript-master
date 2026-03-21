// =====================
// СОСТОЯНИЕ ИГРОКА
// =====================

const player = {
    hp: 100,
    maxHp: 100,
    level: 1,
    damage: 10,
    tempDamageBoost: 0,
    tempArmorBoost: 0,
    inventory: [],
    room: "beginning",
    visitedRooms: [],
    finalUnlocked: false,
    duckFound: false,
    gladDefeated: false,
    cinemaUnlocked: false,
    cinemaVisited: false,
    hasTicket: false,
    secretRoomOpened: false,
    trueEndingUnlocked: false,
    boyTalkStage: 0,
    keeperKeyGiven: false
};

// =====================
// КОМНАТЫ
// =====================

function createRoom(data) {
    return {
        monster: true,
        cleared: false,
        keyFound: false,
        lockpickFound: false,
        doorFound: false,
        doorUnlocked: false,
        lootFoundCount: 0,
        maxLootPerRoom: 3,
        backupExitFound: false,
        pendingItem: null,
        usedEvents: [],
        activeMonster: null,
        postFleeExplore: false,
        ...data
    };
}

const rooms = {
    beginning: createRoom({
        name: "Коридор",
        image: "./images/beginning_hallway.png",
        emptyImage: "./images/beginning_hallway_empty.png",
        currentImage: "./images/beginning_hallway.png",
        text: "Вы очнулись в темном коридоре. Перед вами стоит пугающая фигура.",
        emptyText: "Вы ещё раз осматриваете коридор, но больше здесь ничего нет.",
        clearedText: "Теперь можно осмотреться."
    }),

    waterpark: createRoom({
        name: "Аквапарк",
        image: "./images/waterpark.png",
        text: "Заброшенный аквапарк. Вода капает со сломанных труб.",
        emptyText: "Вы ещё раз осматриваетесь, но больше здесь ничего нет.",
        clearedText: "В аквапарке тихо. Можно исследовать помещение."
    }),

    playroom: createRoom({
        name: "Игровая",
        image: "./images/playroom.png",
        text: "Детская игровая. Игрушки разбросаны по полу.",
        emptyText: "Вы ещё раз осматриваетесь, но больше здесь ничего нет.",
        clearedText: "Игрушки валяются на полу. Что-то можно поискать."
    }),

    hospital: createRoom({
        name: "Больница",
        image: "./images/hospital.png",
        text: "Палата старой больницы. Воздух пахнет антисептиком и ржавчиной.",
        emptyText: "Вы ещё раз осматриваетесь, но больше здесь ничего нет.",
        clearedText: "Больничные койки пусты. Но ощущение осмотра не проходит."
    }),

    library: createRoom({
        name: "Библиотека",
        image: "./images/library.png",
        text: "Старая библиотека. Между высокими стеллажами висит пыльная тишина.",
        emptyText: "Вы ещё раз осматриваетесь, но больше здесь ничего нет.",
        clearedText: "Книги больше не шевелятся сами по себе, но библиотека всё ещё слушает."
    }),

    supermarket: createRoom({
        name: "Супермаркет",
        image: "./images/supermarket.png",
        text: "Пустой супермаркет. Между рядами мигает холодный свет, а в глубине качается тележка.",
        emptyText: "Вы ещё раз осматриваетесь, но больше здесь ничего нет.",
        clearedText: "Полки стоят неподвижно, но ощущение чужого взгляда из соседнего ряда никуда не исчезло."
    }),

    laundry: createRoom({
        name: "Прачечная",
        image: "./images/laundry.png",
        text: "Старая прачечная. Между рядами машин висит влажная ткань, а из глубины слышится шум воды.",
        emptyText: "Вы ещё раз осматриваетесь, но больше здесь ничего нет.",
        clearedText: "Машины замолкли, но от простыней всё ещё тянет сыростью."
    }),

    cinema: createRoom({
        name: "Кинотеатр",
        image: "./images/cinema.png",
        text: "Дверь приводит вас в удивительное место. И главное, вы здесь не одни.",
        emptyText: "Вы ещё раз осматриваетесь, но больше здесь ничего нет.",
        clearedText: "Экран продолжает мерцать, но зал будто ждёт, что вы досмотрите до конца."
    }),

    secretRoom: createRoom({
        name: "Комната за экраном",
        image: "./images/secret_room.png",
        text: "Небольшая скрытая комната за экраном. Здесь слишком тихо, и от этой тишины становится не по себе.",
        emptyText: "Вы ещё раз осматриваетесь, но больше здесь ничего нет.",
        clearedText: "Комната за экраном пуста. Но память уже не отпускает."
    }),

    finalRoom: createRoom({
        name: "Последний зал",
        image: "./images/final_room.png",
        text: "Просторный тёмный зал. Здесь тишина кажется живой.",
        clearedText: "Зал опустел. Но сказанные здесь слова ещё звучат в вас."
    })
};

// =====================
// ПРЕДМЕТЫ
// =====================

const items = {
    "Ключ": {
        type: "tool",
        description: "Старый ключ от двери."
    },

    "Отмычка": {
        type: "tool",
        description: "Позволяет вскрыть замок."
    },

    "Конфета": {
        type: "heal",
        heal: 15,
        useText: "Вы съели конфету. +15 HP"
    },

    "Бинт": {
        type: "heal",
        heal: 10,
        useText: "Вы перевязали рану. +10 HP"
    },

    "Энергетик": {
        type: "heal",
        heal: 30,
        useText: "Вы делаете пару глотков. Сердце колотится бодрее. +30 HP"
    },

    "Фонарик": {
        type: "tool",
        description: "Помогает ослепить мелкого врага в начале боя.",
        unique: true
    },

    "Батарейка": {
        type: "tool",
        description: "Подходит для фонарика."
    },

    "Резиновый утёнок": {
        type: "special",
        description: "Маленький жёлтый утёнок для купания."
    },

    "Кастрюля": {
        type: "shield",
        block: 3,
        useText: "Вы нахлобучиваете кастрюлю на голову. На один бой входящий урон снижен на 3."
    },

    "Скальпель": {
        type: "boostDamage",
        damageBoost: 10,
        useText: "Вы сжимаете скальпель покрепче. На один бой ваш урон увеличен."
    },

    "Смятый билет": {
        type: "story",
        description: "Старый билет в кинотеатр.",
        unique: true
    }
};

// =====================
// МОНСТРЫ
// =====================


const monsters = {
    unique: {
        keeper: {
            id: "keeper",
            name: "Тень Смотрителя",
            image: "./images/beginning_figure.png",
            hp: 35,
            damage: 5,
            exp: 1,
            canTalk: true,
            isBoss: false,

            battleStartLine: "«Ну что, проверим, насколько ты жалок?»",

            battleLines: [
                "«Бежать умеешь хорошо. Жаль, возвращаться — нет.»",
                "«Коридор не держит тех, кто готов идти дальше. Ты пока не из них.»",
                "«Некоторые двери были открыты. Ты просто не вошёл.»",
                "«Ты всё ещё называешь это забывчивостью, чтобы не назвать страхом.»"
            ],

            lowHpLines: [
                "«Да... Ты учишься смотреть не только вперёд, но и назад.»",
                "«Вот так. Правда всегда кусает сильнее тени.»",
                "«Удивительно. Ты всё-таки способен не отводить взгляд.»"
            ],

            defeatLine: "«Хорошо. Потенциал в тебе есть. Но дальше будет уже не коридор — память.»"
        },

        finalBoss: {
            id: "finalBoss",
            name: "Последняя Тень",
            image: "./images/final_boss_shadow.png",
            trueFormImage: "./images/final_boss_human.png",
            hp: 110,
            damage: 14,
            exp: 0,
            canTalk: true,
            isBoss: true,

            battleStartLine: "«Я — тот, кто остался с тобой после побега.»",

            battleLines: [
                "«Ты не потерял память. Ты спрятался в ней.»",
                "«Ты запутал всё внутри себя, лишь бы не видеть тот выбор.»",
                "«Ты слышал её. И всё равно бежал дальше.»",
                "«Ты вышел не целиком. Часть тебя осталась там.»",
                "«Я вырос не из двери. Я вырос из вины, которую ты оставил открытой.»"
            ],

            lowHpLines: [
                "«Да... ещё немного — и ты перестанешь врать себе.»",
                "«Слабее меня только та ложь, которой ты жил дальше.»",
                "«Ты почти добрался не до меня. До себя.»"
            ],

            defeatLine: "«Хорошо... Теперь попробуй не отвернуться в последний раз.»"
        }
    },

    room: {
        waterpark: {
            id: "glad",
            name: "Гладь",
            image: "./images/monster_waterpark.png",
            hp: 55,
            damage: 8,
            exp: 1,

            introText: "Поверхность воды слишком долго остаётся неподвижной. Потом из неё медленно поднимается силуэт.",
            introButtonText: "Подойти ближе",
            retreatText: "Вода снова замирает, но вам всё ещё кажется, что на вас смотрят.",

            battleStartLine: "«Не подходи так близко... Или подходи. Мне любопытно посмотреть на твоё отражение.»",

            battleLines: [
                "«Ах... вот так. Ты смотришь почти с отвращением. Или ты видишь другое лицо?»",
                "«Время утекает, милый. Тратишь своё на меня?»",
                "«Некоторые лица лучше не отражать. Но я попробую.»",
                "«Ты пытаешься пробить меня насквозь... довольно интимный способ знакомства.»",
                "«Поверхность врёт, пока ты слаб.»",
                "«Ты всё ещё не замечаешь, как похож на того, кто бежит первым.»"
            ],

            lowHpLines: [
                "«Ммм... почти. Моя поверхность уже дрожит.»",
                "«Ещё немного — и ты увидишь, кто всё это время смотрел в ответ.»",
                "«Какой ты настойчивый... Мне это даже нравится.»"
            ],

            defeatLine: "«Забавно... Ты так старался добраться до глубины. Но знаешь что? Глубина всё это время смотрела на тебя.»"
        },

        playroom: {
            id: "jackInTheBox",
            name: "Джек-В-Коробке",
            image: "./images/monster_playroom.png",
            hp: 45,
            damage: 7,
            exp: 1,

            introText: "Огромная коробка в углу с щелчком распахивается, и из неё выстреливает кукольная голова на ржавой пружине.",
            introButtonText: "«Что за?..»",
            retreatText: "Коробка дёргается и хрипло смеётся где-то в полумраке.",

            battleStartLine: "«ХА-ХА-ХА! Пришёл поиграть?»",

            battleLines: [
                "«ХА-ХА-ХА! Давай ещё!»",
                "«Ты такой серьёзный! Это же просто игра!»",
                "«Чем больше чудовищ ты ломаешь, тем ближе конец игры! ХА-ХА-ХА!»",
                "«Ты всё ещё думаешь, что всё это настоящее? Ох, как мило! ХА-ХА!»",
                "«Ты опять хочешь выйти один? ХА-ХА... Ну конечно хочешь.»"
            ],

            lowHpLines: [
                "«ХА... ХА... Кто-то вошёл во вкус?»",
                "«Почти выиграл! Или почти вспомнил! ХА...»",
                "«О... да. Прямо в пружину. ХА-ХА-ХА!»"
            ],

            defeatLine: "«ХА-ХА... Ты понял правила... Стань ещё сильнее, и увидишь, с кем на самом деле играешь.»"
        },

        hospital: {
            id: "doctorStitch",
            name: "Доктор Шов",
            image: "./images/monster_hospital.png",
            hp: 50,
            damage: 8,
            exp: 1,

            introText: "За занавеской слышится металлическое позвякивание. Из полумрака выходит высокая фигура в старом врачебном халате.",
            introButtonText: "«Кто здесь?»",
            retreatText: "За спиной ещё долго слышится тихий шелест ткани и металлический звон инструментов.",

            battleStartLine: "«Не волнуйтесь. Я уже видел случаи гораздо хуже вашего.»",

            battleLines: [
                "«Тише. Резкие движения только усугубляют состояние.»",
                "«У вас дрожь, учащённый пульс... Любопытный случай.»",
                "«Я лишь пытаюсь собрать вас в нечто более устойчивое.»",
                "«Вы так отчаянно цепляетесь за свою нынешнюю форму.»",
                "«Некоторые дети ломаются тише других. Вы, к счастью, шумный.»",
                "«Я уже вскрывал вещи и похуже. Намного меньше, например.»"
            ],

            lowHpLines: [
                "«Хм. Швы расходятся быстрее, чем я ожидал.»",
                "«Любопытно... Вы и правда хотите остаться таким?»",
                "«Столько повреждений. А вы всё ещё стоите.»"
            ],

            defeatLine: "«Вы отвергли лечение. Значит, понесёте свою боль дальше сами.»"
        },

        library: {
            id: "bookbind",
            name: "Переплёт",
            image: "./images/monster_library.png",
            hp: 45,
            damage: 8,
            exp: 1,

            introText: "Между стеллажами что-то шевелится. Страницы дрожат сами собой, и из пыли поднимается высокая фигура из корешков и рваной бумаги.",
            introButtonText: "Подойти",
            retreatText: "Шелест страниц затихает, но ощущение чужого взгляда между полок остаётся.",

            battleStartLine: "«Тише. Здесь принято хранить то, что слишком поздно возвращать.»",

            battleLines: [
                "«У каждого есть своё место на полке.»",
                "«Некоторые истории лучше не открывать повторно.»",
                "«Шуметь среди чужих воспоминаний — дурной тон.»",
                "«Ты удивительно хорошо держишься для существа без твёрдого корешка.»",
                "«Я бы переписал тебя, но и так читается печально.»"
            ],

            lowHpLines: [
                "«Страницы рвутся... как неаккуратно.»",
                "«Хм. Ты всё-таки умеешь оставлять следы.»",
                "«Редкий случай. Тебя не получается закрыть с первого раза.»"
            ],

            defeatLine: "«Ладно... Некоторые книги приходится оставлять недочитанными.»"
        },

        supermarket: {
            id: "cashier",
            name: "Кассир",
            image: "./images/monster_supermarket.png",
            hp: 45,
            damage: 8,
            exp: 1,

            introText: "В глубине зала кто-то медленно пробивает невидимые товары. Красный свет сканера скользит по пустой кассе, а потом останавливается на вас.",
            introButtonText: "Подойти к кассе",
            retreatText: "Сканер гаснет, но ощущение, что вас уже пробили по штрихкоду, не проходит.",

            battleStartLine: "«Следующий. Надеюсь, у вас есть чем расплатиться.»",

            battleLines: [
                "«Всё имеет цену. Особенно попытки уйти бесплатно.»",
                "«Вы пришли с пустыми руками. Как неловко.»",
                "«Некоторые долги звенят громче монет.»",
                "«Пробивается тяжело. Значит, испорчено.»",
                "«Не спорьте с ценником. Он уже всё решил.»",
                "«Двоих забирают реже. Один товар удобнее.»"
            ],

            lowHpLines: [
                "«Чек выходит длиннее, чем я рассчитывал.»",
                "«Хм. Возврат, похоже, невозможен.»",
                "«Странно... Обычно на этом месте покупатели уже ломаются.»"
            ],

            defeatLine: "«Ладно... Считайте, сегодня по акции.»"
        },

        laundry: {
            id: "wringer",
            name: "Отжим",
            image: "./images/monster_laundry.png",
            hp: 46,
            damage: 9,
            exp: 1,

            introText: "Простыни между машинами начинают скручиваться сами собой. Из влажной ткани медленно складывается длинная перекрученная фигура.",
            introButtonText: "Подойти",
            retreatText: "Влажная ткань снова безвольно повисает, но шум барабанов в ушах остаётся.",

            battleStartLine: "«Ну-ка, посмотрим, сколько из тебя ещё можно выжать.»",

            battleLines: [
                "«Не дёргайся. Только сильнее мнёшься.»",
                "«Ты весь в пятнах. И некоторые старше тебя.»",
                "«Сейчас прополощем как следует.»",
                "«Слишком много в тебе въелось. Придётся тереть сильнее.»",
                "«Некоторые вещи лучше сушить по частям.»",
                "«Из тебя ещё много чего можно выжать. Особенно вины.»"
            ],

            lowHpLines: [
                "«Ох... меня самого уже перекрутило.»",
                "«А ты упрямое пятно.»",
                "«Ещё чуть-чуть — и нас можно будет развесить рядом.»"
            ],

            defeatLine: "«Ну вот... Всё равно не отстиралось.»"
        }
    },

    randomSmall: [
        {
            id: "smallEcho",
            name: "Эхо",
            image: "./images/monster_small_echo.png",
            hp: 18,
            damage: 4,
            exp: 1
        },
        {
            id: "hallCrawler",
            name: "Ползун",
            image: "./images/monster_crawler.png",
            hp: 24,
            damage: 5,
            exp: 1
        }
    ]
};

let currentMonster = null;

const npcs = {
    cinemaBoy: {
        id: "cinemaBoy",
        name: "Мальчик на последнем ряду",
        image: "./images/cinema_boy.png"
    },

    sisterEcho: {
        id: "sisterEcho",
        name: "Эхо сестры",
        image: "./images/sister_echo.png"
    }
};

const uniqueMonsterState = {
    keeper: null,
    finalBoss: null
};

// =====================
// UI
// =====================

function updateUI(text, buttons) {

    const textBox = document.querySelector(".typewriter");
    const choices = document.getElementById("choices");

    textBox.textContent = text;

    choices.innerHTML = "";

    buttons.forEach(btnData => {

        const btn = document.createElement("button");

        btn.className = "action_button";
        btn.textContent = btnData.text;
        btn.onclick = btnData.action;

        choices.appendChild(btn);

    });
}

// =====================
// КАРТИНКА КОМНАТЫ
// =====================

function showRoomImage(roomName) {
    const scene = document.getElementById("scene");
    const room = rooms[roomName];

    const imagePath = room.currentImage || room.image;

    scene.style.backgroundImage = `url(${imagePath})`;
}

// =====================
// СТАТЫ
// =====================

function updateStats() {
    document.getElementById("hp").textContent = player.hp;
    document.getElementById("level").textContent = player.level;
}

// =====================
// ИНВЕНТАРЬ
// =====================

function updateInventory() {
    const inv = document.getElementById("inventory");

    if (!inv) return;

    inv.innerHTML = "";

    if (player.inventory.length === 0) {
        inv.innerHTML = "<p>Пусто</p>";
        return;
    }

    const counts = {};

    player.inventory.forEach(item => {
        counts[item] = (counts[item] || 0) + 1;
    });

    Object.keys(counts).forEach(item => {
        const row = document.createElement("div");
        row.className = "inventory-item";

        const text = document.createElement("span");
        text.textContent = `${item} x${counts[item]}`;
        row.appendChild(text);

        const itemData = items[item];

        if (
            itemData &&
            (
                itemData.type === "heal" ||
                itemData.type === "boostDamage" ||
                itemData.type === "shield"
            )
        ) {
            const useBtn = document.createElement("button");
            useBtn.textContent = "Исп.";
            useBtn.className = "action_button";
            useBtn.onclick = () => useItem(item);
            row.appendChild(useBtn);
        }

        inv.appendChild(row);
    });
}

function useItem(item) {
    const itemData = items[item];

    if (!itemData) {
        notify("Этот предмет нельзя использовать.");
        return;
    }

    if (itemData.type === "heal") {
        if (player.hp >= player.maxHp) {
            notify("Здоровье уже полное.");
            return;
        }

        removeItem(item);
        player.hp = Math.min(player.hp + itemData.heal, player.maxHp);
        updateStats();

        if (currentMonster) {
            updateBattleHud(currentMonster);
        }

        notify(itemData.useText);
        return;
    }

    if (itemData.type === "boostDamage") {
        if (player.tempDamageBoost > 0) {
            notify("У вас уже есть усиление урона на следующий бой.");
            return;
        }

        removeItem(item);
        player.tempDamageBoost = itemData.damageBoost;
        notify(itemData.useText);
        return;
    }

    if (itemData.type === "shield") {
        if (player.tempArmorBoost > 0) {
            notify("У вас уже есть защита на следующий бой.");
            return;
        }

        removeItem(item);
        player.tempArmorBoost = itemData.block;
        notify(itemData.useText);
        return;
    }

    notify("Этот предмет нельзя использовать прямо сейчас.");
}

// =====================
// УВЕДОМЛЕНИЯ
// =====================

function notify(text) {

    const container = document.getElementById("notification-area");

    const msg = document.createElement("div");

    msg.className = "notification";
    msg.textContent = text;

    container.appendChild(msg);

    setTimeout(() => msg.remove(), 3000);
}


// =================
// УПР СЦЕНАМИ
// =================

let sceneTimeout = null;
let typingInterval = null;
let currentPageTimeout = null;

let currentTextState = {
    pages: [],
    pageIndex: 0,
    isTyping: false,
    currentFullText: "",
    currentTypedText: "",
    onFinish: null
};

function splitTextIntoPages(element, text, maxLines = 3) {
    const safeText = String(text ?? "");
    const computed = window.getComputedStyle(element);

    let lineHeight = parseFloat(computed.lineHeight);
    if (Number.isNaN(lineHeight)) {
        const fontSize = parseFloat(computed.fontSize) || 11;
        lineHeight = fontSize * 1.55;
    }

    const maxVisibleHeight = lineHeight * maxLines;
    const pages = [];

    let start = 0;

    while (start < safeText.length) {
        let end = start + 1;
        let lastGood = "";

        element.textContent = "";

        while (end <= safeText.length) {
            const chunk = safeText.slice(start, end);
            element.textContent = chunk;

            if (element.scrollHeight > maxVisibleHeight) {
                break;
            }

            lastGood = chunk;
            end++;
        }

        if (!lastGood) {
            lastGood = safeText.slice(start, start + 1);
        }

        let pageText = lastGood;
        let nextStart = start + pageText.length;

        if (nextStart < safeText.length) {
            let cut = pageText.length;

            while (
                cut > 0 &&
                safeText.charAt(start + cut) !== " " &&
                safeText.charAt(start + cut) !== "\n"
            ) {
                cut--;
            }

            if (cut > Math.floor(pageText.length * 0.6)) {
                pageText = safeText.slice(start, start + cut).trimEnd();
                nextStart = start + cut;

                while (
                    nextStart < safeText.length &&
                    (safeText.charAt(nextStart) === " " || safeText.charAt(nextStart) === "\n")
                ) {
                    nextStart++;
                }
            }
        }

        pages.push(pageText);
        start = nextStart;
    }

    element.textContent = "";
    return pages;
}

function getTypingDelay(char) {
    if (char === "." || char === "!" || char === "?" || char === "…") return 70;
    if (char === "," || char === ";" || char === ":") return 45;
    if (char === "\n") return 90;
    if (char === " ") return 12;

    return 46;
}

function ensureContinueIndicator() {
    let indicator = document.getElementById("continue-indicator");

    if (!indicator) {
        indicator = document.createElement("div");
        indicator.id = "continue-indicator";
        indicator.textContent = "▼";
        document.querySelector(".text_panel").appendChild(indicator);
    }

    return indicator;
}

function hideContinueIndicator() {
    const indicator = ensureContinueIndicator();
    indicator.style.display = "none";
}

function showContinueIndicator() {
    const indicator = ensureContinueIndicator();
    indicator.style.display = "block";
}

function typeCurrentPage(element) {
    clearTimeout(currentPageTimeout);
    clearInterval(typingInterval);
    hideContinueIndicator();

    const fullText = currentTextState.currentFullText;
    currentTextState.currentTypedText = "";
    currentTextState.isTyping = true;

    let i = 0;
    element.textContent = "";

    function step() {
        if (i >= fullText.length) {
            currentTextState.isTyping = false;
            element.textContent = fullText;
            showContinueIndicator();

            if (currentTextState.pageIndex === currentTextState.pages.length - 1) {
                if (currentTextState.onFinish) {
                    currentTextState.onFinish();
                }
            }

            return;
        }

        const ch = fullText.charAt(i);
        currentTextState.currentTypedText += ch;
        element.textContent = currentTextState.currentTypedText;
        i++;

        currentPageTimeout = setTimeout(step, getTypingDelay(ch));
    }

    step();
}

function finishCurrentPageInstantly(element) {
    clearTimeout(currentPageTimeout);
    clearInterval(typingInterval);

    currentTextState.isTyping = false;
    currentTextState.currentTypedText = currentTextState.currentFullText;
    element.textContent = currentTextState.currentFullText;
    showContinueIndicator();

    if (currentTextState.pageIndex === currentTextState.pages.length - 1) {
        if (currentTextState.onFinish) {
            currentTextState.onFinish();
        }
    }
}

function advanceTextPage() {
    const textEl = document.querySelector(".typewriter");

    if (!currentTextState.pages.length) return;

    if (currentTextState.isTyping) {
        finishCurrentPageInstantly(textEl);
        return;
    }

    if (currentTextState.pageIndex < currentTextState.pages.length - 1) {
        currentTextState.pageIndex++;
        currentTextState.currentFullText = stabilizePageText(
            textEl,
            currentTextState.pages[currentTextState.pageIndex],
            3
        );
        typeCurrentPage(textEl);
    }
}

function enableTextAdvance() {
    const panel = document.querySelector(".text_panel");

    if (!panel.dataset.textAdvanceBound) {
        panel.addEventListener("click", () => {
            advanceTextPage();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                const choices = document.getElementById("choices");

                if (choices && choices.children.length === 0) {
                    e.preventDefault();
                    advanceTextPage();
                }
            }
        });

        panel.dataset.textAdvanceBound = "true";
    }
}

function runPagedScene(text, finalButtons, image = null) {
    hideBattleHud();
    enableTextAdvance();

    const textEl = document.querySelector(".typewriter");
    const choices = document.getElementById("choices");

    clearTimeout(sceneTimeout);
    clearTimeout(currentPageTimeout);
    clearInterval(typingInterval);

    choices.innerHTML = "";
    hideContinueIndicator();

    if (image) {
        showRoomImage(image);
    }

    currentTextState.pages = splitTextIntoPages(textEl, text, 3);
    currentTextState.pageIndex = 0;
    currentTextState.currentFullText = stabilizePageText(
        textEl,
        currentTextState.pages[0] || "",
        3
    );
    currentTextState.currentTypedText = "";
    currentTextState.isTyping = false;
    currentTextState.onFinish = () => {
        choices.innerHTML = "";

        finalButtons.forEach(btnData => {
            const btn = document.createElement("button");
            btn.className = "action_button";
            btn.textContent = btnData.text;
            btn.onclick = btnData.action;
            choices.appendChild(btn);
        });

        hideContinueIndicator();
    };

    typeCurrentPage(textEl);
}

function runScene(text, buttons, image = null) {
    runPagedScene(text, buttons, image);
}

function renderBattleScene(text, buttons) {
    enableTextAdvance();

    const textEl = document.querySelector(".typewriter");
    const choices = document.getElementById("choices");

    clearTimeout(sceneTimeout);
    clearTimeout(currentPageTimeout);
    clearInterval(typingInterval);

    choices.innerHTML = "";
    hideContinueIndicator();

    currentTextState.pages = splitTextIntoPages(textEl, text, 3);
    currentTextState.pageIndex = 0;
    currentTextState.currentFullText = stabilizePageText(
        textEl,
        currentTextState.pages[0] || "",
        3
    );
    currentTextState.currentTypedText = "";
    currentTextState.isTyping = false;
    currentTextState.onFinish = () => {
        choices.innerHTML = "";

        buttons.forEach(btnData => {
            const btn = document.createElement("button");
            btn.className = "action_button";
            btn.textContent = btnData.text;
            btn.onclick = btnData.action;
            choices.appendChild(btn);
        });

        hideContinueIndicator();
    };

    typeCurrentPage(textEl);
}

function protectShortWords(text) {
    return String(text ?? "").replace(
        `/\b(а|и|но|да|не|ни|Кажется|нет|в|ты|во|с|со|к|ко|у|о|об|от|по|за|на|из|до|для|под|над|при)\s+/gi,
        "$1\u00A0"
    `);
}

function buildStableLines(element, text, maxLines = 3) {
    const safeText = protectShortWords(text);
    const words = safeText.split(`/([ \n\r\t]+)/`);

    const measure = document.createElement("div");
    const style = window.getComputedStyle(element);

    measure.style.position = "absolute";
    measure.style.visibility = "hidden";
    measure.style.pointerEvents = "none";
    measure.style.left = "-9999px";
    measure.style.top = "-9999px";
    measure.style.width = style.width;
    measure.style.fontSize = style.fontSize;
    measure.style.lineHeight = style.lineHeight;
    measure.style.fontFamily = style.fontFamily;
    measure.style.fontWeight = style.fontWeight;
    measure.style.whiteSpace = "pre-wrap";
    measure.style.wordBreak = "break-word";
    measure.style.overflowWrap = "break-word";

    document.body.appendChild(measure);

    let currentLine = "";
    let currentText = "";
    let lines = [];

    for (let i = 0; i < words.length; i++) {
        const token = words[i];

        if (token.includes("\n")) {
            const parts = token.split("\n");

            for (let j = 0; j < parts.length; j++) {
                const part = parts[j];

                if (part) {
                    const testLine = currentLine + part;
                    measure.textContent = testLine;

                    if (measure.scrollHeight > parseFloat(style.lineHeight) * 1.2 && currentLine.trim() !== "") {
                        lines.push(currentLine.trimEnd());
                        currentLine = part;
                    } else {
                        currentLine = testLine;
                    }
                }

                if (j < parts.length - 1) {
                    lines.push(currentLine.trimEnd());
                    currentLine = "";
                }
            }

            continue;
        }

        const testLine = currentLine + token;
        measure.textContent = testLine;

        if (measure.scrollHeight > parseFloat(style.lineHeight) * 1.2 && currentLine.trim() !== "") {
            lines.push(currentLine.trimEnd());
            currentLine = token.trimStart();
        } else {
            currentLine = testLine;
        }
    }

    if (currentLine.trim() !== "") {
        lines.push(currentLine.trimEnd());
    }

    document.body.removeChild(measure);

    return lines.slice(0, maxLines);
}

function stabilizePageText(element, text, maxLines = 3) {
    const lines = buildStableLines(element, text, maxLines);
    return lines.join("\n");
}


// =====================
// НАЧАЛО ИГРЫ
// =====================

function showStartScreen() {
    const scene = document.getElementById("scene");
    scene.classList.add("start_screen");

    runScene(
        "Добро пожаловать в игру!",
        [
            { text: "Где я?", action: startAdventure }
        ]
    );
}

function startAdventure() {
    document.getElementById("scene").classList.remove("start_screen");

    player.hp = 100;
    player.maxHp = 100;
    player.level = 1;
    player.damage = 10;
    player.tempDamageBoost = 0;
    player.tempArmorBoost = 0;
    player.inventory = [];
    player.room = "beginning";
    player.visitedRooms = [];
    player.keeperKeyGiven = false;
    player.finalUnlocked = false;
    player.duckFound = false;
    player.gladDefeated = false;
    player.cinemaUnlocked = false;
    player.cinemaVisited = false;
    player.hasTicket = false;
    player.secretRoomOpened = false;
    player.trueEndingUnlocked = false;
    player.boyTalkStage = 0;

    rooms.beginning.currentImage = rooms.beginning.image;

    resetGameState();

    updateStats();
    updateInventory();

    runScene(
        "Вы очнулись в темном коридоре. Перед вами стоит пугающая фигура.",
        [
            { text: "Подойти", action: approachFigure },
            { text: "Бежать", action: runFromFigure }
        ],
        "beginning"
    );
}


// =====================
// ИКОНКА МОНСТРА
// =====================

function showMonsterIconByData(monster) {
    const oldIcon = document.getElementById("monster-icon");

    if (oldIcon) {
        oldIcon.remove();
    }

    const icon = document.createElement("img");
    icon.id = "monster-icon";
    icon.src = monster.image;
    icon.alt = monster.name;

    document.getElementById("scene").appendChild(icon);
    document.getElementById("scene-darkness").style.opacity = "1";
}

function hideMonsterIcon(){
    const icon = document.getElementById("monster-icon");

    if(icon){
        icon.remove();
    }

    document.getElementById("scene-darkness").style.opacity = "0";
}


// =====================
// ФИГУРА
// =====================

let figureTalkStage = 0;

function talkFigure() {

    showMonsterIconByData(monsters.unique.keeper);

    if (figureTalkStage === 0) {

        figureTalkStage++;

        runScene(
            "Фигура молчит. Только холод становится сильнее.",
            [
                { text: "«Эй! Ты меня слышишь?»", action: talkFigure },
                { text: "Атаковать", action: () => startBattle(getOrCreateUniqueMonster("keeper")) }
            ]
        );

        return;
    }

    if (figureTalkStage === 1) {
        figureTalkStage++;
        runScene(
            "«...Ты не должен быть здесь.»",
            [
                { text: "«Где это - здесь?»", action: talkFigure }
            ]
        );
        return;
    }

    if (figureTalkStage === 2) {
        figureTalkStage++;
        runScene(
            "«Здесь - это здесь, очевидно. Ты всегда задаешь глупые вопросы?»",
            [
                { text: "«Окей, гений. И как отсюда выбраться?»", action: talkFigure }
            ]
        );
        return;
    }

    if (figureTalkStage === 3) {
        figureTalkStage++;
        runScene(
            "«Через дверь, конечно.»",
            [
                { text: "«Замечательно. Значит, я могу идти?»", action: talkFigure }
            ]
        );
        return;
    }

    if (figureTalkStage === 4) {
        figureTalkStage++;
        runScene(
            "«Все двери заперты. Ты не сможешь их открыть.»",
            [
                { text: "«...ты издеваешься?»", action: talkFigure }
            ]
        );
        return;
    }

    if (figureTalkStage === 5) {
        runScene(
            "«...ты не сможешь, а этот ключ - да. Возьми и уходи, от тебя слишком много шума.»",
            [
                {
                    text: "Взять ключ",
                    action: () => {
                        addItem("Ключ");
                        player.keeperKeyGiven = true;
                        rooms.beginning.keyFound = true;
                        hideMonsterIcon();
                        runScene(
                            "Холодный ключ оказывается у вас в руке.",
                            [
                                { text: "Осмотреться", action: exploreRoom }
                            ],
                            "beginning"
                        );
                    }
                }
            ]
        );

    }
}

function runFromFigure() {

    hideMonsterIcon();

    runScene(
        "Вы бросаетесь бежать. Коридор тянется бесконечно.  \nДвери повторяются. Шаги эхом возвращаются к вам. Фигура оказывается рядом.",
        [
            {
                text: "Остановиться",
                action: () => approachFigure()
            }
        ],
        "beginning"
    );
}

function approachFigure() {

    const figure = monsters.unique.keeper;

    rooms.beginning.currentImage = rooms.beginning.emptyImage;

    showMonsterIconByData(figure);
    showRoomImage("beginning");

    runScene(
        "Фигура неподвижна. Она похожа на старика, но слишком темная, словно сделана из тени.",
        [
            { text: "Поговорить", action: talkFigure },
            { text: "Атаковать", action: () => startBattle(getOrCreateUniqueMonster("keeper")) },
            { text: "Бежать", action: runFromFigure }
        ]
    );

}

function afterBattle() {
    renderRoom("Монстр повержен. Теперь можно осмотреться.");
}

// =====================================
// О КОМНАТАХ (рендер, случайные, финал)
// =====================================

function canEnterFinalRoom() {
    return player.level >= 10;
}

function openNextRoom() {
    if (player.room === "secretRoom") {
        returnToCinemaFromSecret();
        return;
    }

    if (player.level >= 10 && !player.cinemaVisited) {
        player.room = "cinema";
        player.cinemaVisited = true;

        runScene(
            rooms.cinema.text,
            [
                { text: "Осмотреть зал", action: cinemaIntro }
            ],
            "cinema"
        );
        return;
    }

    if (player.cinemaVisited && canEnterFinalRoom() && !player.finalUnlocked) {
        player.finalUnlocked = true;

        runScene(
            player.trueEndingUnlocked
                ? "За дверью ждёт уже не очередная комната, а место, куда вы всё это время шли. Вы дрожите."
                : "За дверью ждёт последний зал. Вы чувствуете, что это конец.",
            [
                { text: "Идти дальше", action: enterFinalRoom }
            ],
            "finalRoom"
        );
        return;
    }

    if (player.visitedRooms.length === 0) {
        player.room = "playroom";
        player.visitedRooms.push("playroom");

        runScene(
            rooms.playroom.text,
            [
                { text: "Осмотреться", action: exploreRoom },
                { text: "Поискать", action: searchRoom }
            ],
            "playroom"
        );
        return;
    }

    let allRooms = [
        "waterpark",
        "hospital",
        "library",
        "supermarket",
        "laundry"
    ];

    if (!player.duckFound && !player.gladDefeated) {
        allRooms = ["hospital", "library", "supermarket", "laundry"];
    }

    const availableRooms = allRooms.filter(
        roomName => !player.visitedRooms.includes(roomName)
    );

    if (availableRooms.length === 0) {
        if (canEnterFinalRoom()) {
            runScene(
                "Вы чувствуете, что последний путь открыт.",
                [
                    { text: "Идти дальше", action: enterFinalRoom }
                ],
                "finalRoom"
            );
            return;
        }

        runScene(
            "Похоже, дальше пока некуда идти.",
            [
                { text: "Осмотреться", action: () => renderRoom() }
            ],
            player.room
        );
        return;
    }

    const randomRoom =
        availableRooms[Math.floor(Math.random() * availableRooms.length)];

    player.room = randomRoom;
    player.visitedRooms.push(randomRoom);

    runScene(
        rooms[randomRoom].text,
        [
            { text: "Осмотреться", action: exploreRoom },
            { text: "Поискать", action: searchRoom }
        ],
        randomRoom
    );
}

function enterFinalRoom() {
    player.room = "finalRoom";

    runScene(
        "Вы оказываетесь в просторном тёмном зале. Здесь тишина кажется живой.",
        [
            { text: "Идти дальше", action: finalBossIntro }
        ],
        "finalRoom"
    );
}

function isRoomFullyExhausted(room) {
    return (
        room.cleared &&
        room.lootFoundCount >= room.maxLootPerRoom &&
        !getNextRoomEvent(player.room) &&
        (room.doorFound || room.backupExitFound || player.room === "cinema" || player.room === "secretRoom" || player.room === "finalRoom")
    );
}

function renderRoom(customText = null) {
    const room = rooms[player.room];

    let text = room.text;

    if (customText) {
        text = customText;
    } else if (isRoomFullyExhausted(room) && room.emptyText) {
        text = room.emptyText;
    } else if (room.cleared) {
        text = room.clearedText;
    }

    runScene(text, getRoomButtons(), player.room);
}

// =====================
// ОСМОТР
// =====================

function exploreRoom() {
    const room = rooms[player.room];

    if (player.room === "finalRoom") {
        if (!room.cleared) {
            runScene(
                "В пустоте зала чувствуется чьё-то присутствие. Здесь некуда отступать.",
                [
                    { text: "Идти дальше", action: finalBossIntro },
                    { text: "Поискать", action: searchRoom }
                ],
                "finalRoom"
            );
            return;
        }

        runScene(
            "После сказанного здесь зал кажется почти мёртвым. Больше здесь нечего открывать.",
            [
                { text: "Поискать", action: searchRoom }
            ],
            "finalRoom"
        );
        return;
    }

    if (!room.cleared && room.activeMonster) {
        if (room.postFleeExplore) {
            room.postFleeExplore = false;

            const nextEvent = getNextRoomEvent(player.room);

            if (nextEvent) {
                runRoomEvent(nextEvent);
                return;
            }

            runScene(
                "Существо отступило в тень. У вас есть немного времени перевести дух.",
                [
                    { text: "Поискать", action: searchRoom },
                    { text: "Осмотреться", action: exploreRoom }
                ],
                player.room
            );
            return;
        }

        startBattle(room.activeMonster);
        return;
    }

    if (!room.cleared) {
        if (!room.activeMonster && monsters.room[player.room]) {
            showMonsterIntro(player.room);
            return;
        }

        startBattle();
        return;
    }

    const nextEvent = getNextRoomEvent(player.room);

    if (nextEvent) {
        runRoomEvent(nextEvent);
        return;
    }

    if (!room.doorFound) {
        room.doorFound = true;
        renderRoom("Осматривая комнату, вы замечаете запертую дверь.");
        return;
    }

    if (
        room.doorFound &&
        !room.doorUnlocked &&
        room.lootFoundCount >= room.maxLootPerRoom &&
        !hasItem("Ключ") &&
        !hasItem("Отмычка") &&
        !room.backupExitFound
    ) {
        room.backupExitFound = true;

        runScene(
            "Осматривая стены внимательнее, вы замечаете узкий запасной проход.",
            [
                { text: "Протиснуться", action: openNextRoom },
                { text: "Назад", action: () => renderRoom() }
            ],
            player.room
        );
        return;
    }

    notify("Вы ничего нового не заметили.");
    renderRoom();
}

// =====================
// ПОИСК
// =====================

function searchRoom() {
    const room = rooms[player.room];

    if (room.pendingItem) {
        showFoundItemScene(room.pendingItem);
        return;
    }

    if (
        player.room === "playroom" &&
        !player.duckFound &&
        !player.gladDefeated
    ) {
        room.pendingItem = "Резиновый утёнок";

        showFoundItemScene(
            "Резиновый утёнок",
            "Под кучей игрушек вы замечаете яркого резинового утёнка. Почему-то он кажется важным. Взять его?"
        );
        return;
    }

    if (room.lootFoundCount >= room.maxLootPerRoom) {
        runScene(
            "Вы снова осматриваете комнату, но больше ничего полезного не находите.",
            getRoomButtons(),
            player.room
        );
        return;
    }

    let baseLootTable;

    if (player.room === "finalRoom") {
        baseLootTable = [
            "Конфета",
            "Конфета",
            "Бинт",
            "Бинт",
            "Энергетик",
            "Энергетик",
            "Кастрюля"
        ];
    } else {
        baseLootTable = [
            "Ключ",
            "Отмычка",

            "Конфета",
            "Конфета",
            "Конфета",

            "Бинт",
            "Бинт",
            "Бинт",
            "Бинт",

            "Энергетик",
            "Энергетик",

            "Батарейка",
            "Кастрюля",
            "Фонарик"
        ];
    }

    const lootTable = baseLootTable.filter(item => canFindItem(item));

    if (lootTable.length === 0) {
        runScene(
            "Вы снова осматриваете комнату, но больше ничего полезного не находите.",
            getRoomButtons(),
            player.room
        );
        return;
    }

    const item = lootTable[Math.floor(Math.random() * lootTable.length)];

    room.pendingItem = item;

    showFoundItemScene(item);
}

function showFoundItemScene(item, customText = null) {
    let foundText = customText || "";

    if (!foundText) {
        if (item === "Ключ") {
            foundText = "Среди пыли вы замечаете старый ключ. Взять его?";
        } else if (item === "Конфета") {
            foundText = "На полу лежит яркая конфета в шуршащей обёртке. Взять её?";
        } else if (item === "Отмычка") {
            foundText = "В щели между плитками застряла тонкая металлическая отмычка. Взять её?";
        } else if (item === "Бинт") {
            foundText = "Под обломками вы замечаете чистый бинт. Взять его?";
        } else if (item === "Батарейка") {
            foundText = "У стены валяется почти новая батарейка. Взять её?";
        } else if (item === "Фонарик") {
            foundText = "В тёмном углу лежит старый фонарик. Взять его?";
        } else if (item === "Резиновый утёнок") {
            foundText = "Вы замечаете жёлтого резинового утёнка. Он выглядит странно уместным. Взять его?";
        } else if (item === "Энергетик") {
            foundText = "У стены стоит тёплая банка энергетика. Взять её?";
        } else if (item === "Кастрюля") {
            foundText = "Среди хлама вы замечаете помятую кастрюлю. Почему-то она кажется полезной. Взять её?";
        } 
    }

    runScene(
        foundText,
        [
            { text: "Взять", action: takePendingItem },
            { text: "Не трогать", action: leavePendingItem }
        ],
        player.room
    );
}

function takePendingItem() {
    const room = rooms[player.room];
    const item = room.pendingItem;

    if (!item) {
        renderRoom();
        return;
    }

    room.lootFoundCount += 1;

    if (item === "Ключ") {
        room.keyFound = true;
    }

    if (item === "Отмычка") {
        room.lockpickFound = true;
    }

    if (item === "Резиновый утёнок") {
        player.duckFound = true;
    }

    addItem(item);
    room.pendingItem = null;

    let text = "";

    if (item === "Ключ") {
        text = "Вы поднимаете ключ и убираете его в инвентарь.";
    } else if (item === "Конфета") {
        text = "Вы забираете конфету. Лучше сохранить её на потом.";
    } else if (item === "Отмычка") {
        text = "Вы осторожно берёте отмычку. Она может пригодиться.";
    } else if (item === "Бинт") {
        text = "Вы берёте бинт. Он может пригодиться для перевязки ран.";
    } else if (item === "Батарейка") {
        text = "Вы поднимаете батарейку и кладёте её в инвентарь.";
    } else if (item === "Фонарик") {
        text = "Вы берёте фонарик. Теперь в темноте будет проще осматриваться... Если бы в нем была батарейка.";
    } else if (item === "Резиновый утёнок") {
        text = "Вы берёте резинового утёнка. Он тихо пищит.";
    } else if (item === "Энергетик") {
    text = "Вы забираете энергетик. Пахнет химией и сомнительными решениями.";
    } else if (item === "Кастрюля") {
        text = "Вы берёте кастрюлю. Стыдно, но потенциально полезно.";
    } else if (item === "Скальпель") {
        text = "Вы поднимаете скальпель. Он удобно ложится в ладонь.";
    }

    runScene(text, getRoomButtons(), player.room);
}

function leavePendingItem() {
    const room = rooms[player.room];
    const item = room.pendingItem;

    if (!item) {
        renderRoom();
        return;
    }

    let text = "";

    if (item === "Ключ") {
        text = "Вы не стали брать ключ. Он остаётся лежать в пыли.";
    } else if (item === "Конфета") {
        text = "Вы не стали рисковать и оставили конфету на месте.";
    } else if (item === "Отмычка") {
        text = "Вы решили пока не трогать странный металлический предмет.";
    } else if (item === "Бинт") {
        text = "Вы оставили бинт на месте.";
    } else if (item === "Батарейка") {
        text = "Вы не стали поднимать батарейку.";
    } else if (item === "Фонарик") {
        text = "Вы решили пока не брать фонарик. Все равно он бесполезен без батарейки.";
    } else if (item === "Энергетик") {
    text = "Вы решили не рисковать сомнительной бодростью.";
    } else if (item === "Кастрюля") {
        text = "Вы оставили кастрюлю на месте. Пока что гордость сильнее страха.";
    } else if (item === "Резиновый утёнок") {
        text = "Вы решили не брать утёнка.";
    }

    runScene(text, getRoomButtons(), player.room);
}

function addItem(item) {
    player.inventory.push(item);
    updateInventory();
}

function hasItem(item) {
    return player.inventory.includes(item);
}

function canFindItem(item) {
    const itemData = items[item];

    if (!itemData) return true;

    const room = rooms[player.room];

    if (itemData.unique && hasItem(item)) {
        return false;
    }

    if (item === "Ключ") {
        if (room.keyFound || room.pendingItem === "Ключ") {
            return false;
        }

        if (player.room === "beginning" && player.keeperKeyGiven) {
            return false;
        }
    }

    if (item === "Отмычка") {
        if (room.lockpickFound || room.pendingItem === "Отмычка") {
            return false;
        }
    }

    const roomHasPendingSameItem = Object.values(rooms).some(
        room => room.pendingItem === item
    );

    if (itemData.unique && roomHasPendingSameItem) {
        return false;
    }

    if (item === "Резиновый утёнок" && player.gladDefeated) {
        return false;
    }

    return true;
}

function removeItem(item) {
    const index = player.inventory.indexOf(item);

    if (index !== -1) {
        player.inventory.splice(index, 1);
        updateInventory();
    }
}

// =====================
// БОЙ
// =====================

function startBattle(monster = null) {
    const room = rooms[player.room];

    if (!monster) {
        monster = getOrCreateRoomMonster(player.room);
    } else if (!monster.currentHp) {
        monster = prepareMonsterForBattle(monster);
    }

    currentMonster = monster;

    showMonsterIconByData(currentMonster);
    showBattleHud(currentMonster);

    const isSmallMonster = monsters.randomSmall.some(m => m.id === currentMonster.id);

    const fightLoop = (battleText = null) => {
        if (player.hp <= 0) {
            player.tempDamageBoost = 0;
            player.tempArmorBoost = 0;

            hideMonsterIcon();
            hideBattleHud();

            renderBattleScene("Вы погибли.", [
                {
                    text: "Начать заново",
                    action: () => location.reload()
                }
            ]);
            return;
        }

        if (
            currentMonster.lowHpLines &&
            currentMonster.currentHp <= currentMonster.hp * 0.3 &&
            !currentMonster.lowHpTriggered
        ) {
            currentMonster.lowHpTriggered = true;

            const lowHpLine = getUniqueLine(
                currentMonster.lowHpLines,
                currentMonster.usedLowHpLines
            );

            if (lowHpLine) {
                battleText = lowHpLine;
            }
        }

        if (currentMonster.currentHp <= 0) {
            hideBattleHud();

            if (currentMonster.id === "finalBoss") {
                hideMonsterIcon();
                player.tempDamageBoost = 0;
                player.tempArmorBoost = 0;
                handleFinalBossDefeat();
                return;
            }

            const defeatedMonsterId = currentMonster.id;

           const oldLevel = player.level;
            player.level += currentMonster.exp || 1;

            const gainedLevels = player.level - oldLevel;
            if (gainedLevels > 0) {
                const hpGain = gainedLevels * 5;
                player.maxHp += hpGain;

                notify(`Уровень повышен! Максимальное HP увеличено на +${hpGain}.`);
            }

            updateStats();

            if (currentMonster.id === "glad") {
                player.gladDefeated = true;
            }

            if (oldLevel < 10 && player.level >= 10) {
                notify("Вы чувствуете, что где-то впереди открылся новый путь.");
            }

            if (room.activeMonster && room.activeMonster.id === currentMonster.id) {
                room.activeMonster = null;
                room.cleared = true;
            }

            const defeatLine = currentMonster.defeatLine;
            currentMonster = null;

            player.tempDamageBoost = 0;
            player.tempArmorBoost = 0;

            if (defeatLine) {
                runScene(
                    defeatLine,
                    [
                        {
                            text: "...",
                            action: () => {
                                dissolveMonster(() => {
                                    if (defeatedMonsterId === "doctorStitch" && !hasItem("Скальпель")) {
                                        addItem("Скальпель");

                                        runScene(
                                            "На полу, среди блестящих инструментов, остаётся скальпель. Вы поднимаете его.",
                                            [
                                                {
                                                    text: "Осмотреться",
                                                    action: () => renderRoom("Враг повержен. Теперь можете осмотреться.")
                                                }
                                            ],
                                            player.room
                                        );
                                        return;
                                    }

                                    renderRoom("Враг повержен. Теперь можете осмотреться.");
                                });
                            }
                        }
                    ],
                    player.room
                );
            } else {
                dissolveMonster(() => {
                    if (defeatedMonsterId === "doctorStitch" && !hasItem("Скальпель")) {
                        addItem("Скальпель");

                        runScene(
                            "На полу, среди блестящих инструментов, остаётся скальпель. Вы поднимаете его.",
                            [
                                {
                                    text: "Осмотреться",
                                    action: () => renderRoom("Враг повержен. Теперь можете осмотреться.")
                                }
                            ],
                            player.room
                        );
                        return;
                    }

                    renderRoom("Враг повержен. Теперь можете осмотреться.");
                });
            }

            return;
        }

        updateBattleHud(currentMonster);

        const buttons = [
            {
                text: "Ударить",
                action: () => {
                    const totalDamage = player.damage + player.tempDamageBoost;
                    currentMonster.currentHp -= totalDamage;

                    let incomingDamage = currentMonster.damage;

                    if (currentMonster.id === "glad") {
                        currentMonster.duckUnlocked = true;
                    }

                    if (currentMonster.flashlightBlinded) {
                        incomingDamage = 0;
                        currentMonster.flashlightBlinded = false;
                        notify("Свет фонарика ослепляет врага. Первый удар пропущен.");
                    } else {
                        incomingDamage = Math.max(0, currentMonster.damage - player.tempArmorBoost);
                    }

                    player.hp -= incomingDamage;

                    updateStats();
                    updateBattleHud(currentMonster);

                    const nextText =
                        getUniqueLine(currentMonster.battleLines, currentMonster.usedBattleLines) ||
                        `${currentMonster.name} получает удар.`;

                    fightLoop(nextText);
                }
            }
        ];

        if (currentMonster.id === "glad" && currentMonster.duckUnlocked && hasItem("Резиновый утёнок")) {
            buttons.push({
                text: "Показать утёнка",
                action: giveDuckToGlad
            });
        }

        if (currentMonster.id === "finalBoss" && hasItem("Смятый билет")) {
            buttons.push({
                text: "Отдать билет",
                action: giveTicketToFinalBoss
            });
        }

        if (
            isSmallMonster &&
            hasItem("Фонарик") &&
            hasItem("Батарейка") &&
            !currentMonster.flashlightBlinded &&
            !currentMonster.flashlightUsed
        ) {
            buttons.push({
                text: "Посветить",
                action: () => {
                    removeItem("Батарейка");
                    currentMonster.flashlightBlinded = true;
                    currentMonster.flashlightUsed = true;

                    fightLoop("Вы резко светите фонариком в лицо врагу. Он дёргается и теряет первый шанс ударить.");
                }
            });
        }

        buttons.push({
            text: "Бежать",
            action: () => {
                const monsterName = currentMonster.name;

                hideMonsterIcon();
                hideBattleHud();

                if (rooms[player.room] && rooms[player.room].activeMonster && rooms[player.room].activeMonster.id === currentMonster.id) {
                    rooms[player.room].postFleeExplore = true;
                }

                currentMonster = null;
                player.tempDamageBoost = 0;
                player.tempArmorBoost = 0;

                renderRoom(`Вы отступаете, но ${monsterName} всё ещё где-то поблизости.`);
            }
        });

        renderBattleScene(
            battleText || currentMonster.battleStartLine || `${currentMonster.name} преграждает вам путь.`,
            buttons
        );
    };

    fightLoop(currentMonster.battleStartLine || `${currentMonster.name} преграждает вам путь.`);
}

// =====================
// ГЛАДЬ И УТЕНОК
// =====================

function giveDuckToGlad() {

    removeItem("Резиновый утёнок");

    hideBattleHud();

    runScene(
        "Вы, тяжело дыша после удара, осторожно протягиваете Глади резинового утёнка.\nОн на секунду замирает.\n\n«Ах... какая милая жертва.»",
        [
            {
                text: "...",
                action: gladDuckEnding
            }
        ],
        "waterpark"
    );
}

function gladDuckEnding() {
    player.hp = player.maxHp;
    updateStats();

    player.gladDefeated = true;
    rooms.waterpark.cleared = true;
    rooms.waterpark.activeMonster = null;

    dissolveMonster(() => {
        runScene(
            "Гладь тихо смеётся.\n\n«Ты умеешь быть очаровательным.»\n\nПоверхность воды касается ваших губ холодным поцелуем.",
            [
                {
                    text: "...",
                    action: () => {
                        notify("Вы получили поцелуй Глади, здоровье было восстановлено");
                        exploreRoom();
                    }
                }
            ],
            "waterpark"
        );
    });
}

// =====================
// МОНСТРЫ В КОМНАТАХ
// =====================


function prepareMonsterForBattle(monster) {
    return {
        ...monster,
        currentHp: monster.currentHp ?? monster.hp,
        usedBattleLines: monster.usedBattleLines ?? [],
        usedLowHpLines: monster.usedLowHpLines ?? [],
        lowHpTriggered: monster.lowHpTriggered ?? false,
        duckUnlocked: monster.duckUnlocked ?? false,
        flashlightBlinded: false,
        flashlightUsed: false
    };
}

function showMonsterIntro(roomName) {
    const monster = monsters.room[roomName];

    if (!monster || !monster.introText) {
        startBattle(getOrCreateRoomMonster(roomName));
        return;
    }

    showMonsterIconByData(monster);

    runScene(
        monster.introText,
        [
            {
                text: monster.introButtonText || "Подойти",
                action: () => startBattle(getOrCreateRoomMonster(roomName))
            },
            {
                text: "Отступить",
                action: () => {
                    hideMonsterIcon();

                    runScene(
                        monster.retreatText || "Вы отступаете, но чувствуете, что существо всё ещё рядом.",
                        [
                            { text: "Осмотреться", action: exploreRoom },
                            { text: "Поискать", action: searchRoom }
                        ],
                        roomName
                    );
                }
            }
        ],
        roomName
    );
}

function getRandomSmallMonster() {
    const pool = monsters.randomSmall;
    return pool[Math.floor(Math.random() * pool.length)];
}

function createSmallMonsterForBattle() {
    return prepareMonsterForBattle(getRandomSmallMonster());
}

function getRoomMonster(roomName) {
    const roomMonster = monsters.room[roomName];

    if (roomMonster) {
        return roomMonster;
    }

    return getRandomSmallMonster();
}

function getOrCreateRoomMonster(roomName) {
    const room = rooms[roomName];

    if (room.activeMonster) {
        return room.activeMonster;
    }

    room.activeMonster = prepareMonsterForBattle(getRoomMonster(roomName));
    return room.activeMonster;
}

function getOrCreateUniqueMonster(monsterId) {
    if (uniqueMonsterState[monsterId]) {
        return uniqueMonsterState[monsterId];
    }

    uniqueMonsterState[monsterId] = prepareMonsterForBattle(
        monsters.unique[monsterId]
    );

    return uniqueMonsterState[monsterId];
}

// =============
// BATTLE HUD
// =============

function showBattleHud(monster) {
    const hud = document.getElementById("battle-hud");
    hud.classList.remove("hidden");

    document.getElementById("enemy-name").textContent = monster.name;
    document.getElementById("enemy-hp").textContent = monster.currentHp;
    document.getElementById("player-battle-hp").textContent = player.hp;
}

function updateBattleHud(monster) {
    document.getElementById("enemy-name").textContent = monster.name;
    document.getElementById("enemy-hp").textContent = monster.currentHp;
    document.getElementById("player-battle-hp").textContent = player.hp;
}

function hideBattleHud() {
    const hud = document.getElementById("battle-hud");
    hud.classList.add("hidden");
}

//

function getUniqueLine(lines, usedLines) {
    if (!Array.isArray(lines) || lines.length === 0) {
        return null;
    }

    const availableLines = lines.filter(line => !usedLines.includes(line));

    if (availableLines.length === 0) {
        return null;
    }

    const line = availableLines[Math.floor(Math.random() * availableLines.length)];
    usedLines.push(line);

    return String(line);
}

function dissolveMonster(callback){

    const icon = document.getElementById("monster-icon");

    if(!icon){
        callback();
        return;
    }

    icon.classList.add("monster-disappear");

    setTimeout(()=>{

        hideMonsterIcon();

        if(callback){
            callback();
        }

    },800);

}

// =====================
// DOM
// =====================

document.addEventListener("DOMContentLoaded", () => {
    updateStats();
    updateInventory();
    showStartScreen();
});

// ===================
// ОТКРЫТЬ ДВЕРЬ
// ===================

function openDoor() {
    const room = rooms[player.room];

    if (player.room === "playroom" && !player.duckFound) {
        runScene(
            "Вы тянетесь к двери, но чувствуете странное сопротивление, будто сама комната не хочет вас выпускать. Поищите причину.",
            [
                { text: "Осмотреться", action: exploreRoom },
                { text: "Поискать", action: searchRoom }
            ],
            "playroom"
        );
        return;
    }

    if (!room.doorFound) {
        notify("Вы еще не нашли дверь.");
        return;
    }
    if (room.doorUnlocked) {
        runScene(
            "Дверь уже открыта.",
            [
                { text: "Войти", action: openNextRoom },
                { text: "Назад", action: () => renderRoom() }
            ],
            player.room
        );
        return;
    }
    const buttons = [];

    if (hasItem("Ключ")) {
        buttons.push({
            text: "Использовать ключ",
            action: () => {
                removeItem("Ключ");
                room.doorUnlocked = true;

                runScene(
                    "Замок щелкнул. Дверь открыта.",
                    [
                        { text: "Войти", action: openNextRoom },
                        { text: "Назад", action: () => renderRoom() }
                    ],
                    player.room
                );
            }
        });
    }

    if (hasItem("Отмычка")) {
        buttons.push({
            text: "Использовать отмычку",
            action: () => {
                removeItem("Отмычка");
                room.doorUnlocked = true;

                runScene(
                    "После нескольких попыток замок поддается.",
                    [
                        { text: "Войти", action: openNextRoom },
                        { text: "Назад", action: () => renderRoom() }
                    ],
                    player.room
                );
            }
        });
    }

    buttons.push({
        text: "Назад",
        action: () => renderRoom()
    });

    if (buttons.length === 1) {
        notify("Дверь заперта. Нужен ключ или отмычка.");
        return;
    }

    runScene("Дверь заперта.", buttons, player.room);
}

// ===================
// КНОПКИ В КОМНАТЕ
// ===================

function getRoomButtons() {
    const room = rooms[player.room];

    if (player.room === "cinema") {
        return [
            { text: "Осмотреть зал", action: cinemaIntro },
            { text: "Осмотреть экран", action: cinemaBackstageDoor },
            { text: "Выйти из зала", action: openNextRoom }
        ];
    }

    if (player.room === "secretRoom") {
        return [
            { text: "Осмотреть рисунок", action: inspectSecretDrawing },
            { text: "Осмотреть дверь", action: inspectSecretDoor },
            { text: "Осмотреть игрушку", action: inspectSecretToy },
            { text: "Вернуться в зал", action: returnToCinemaFromSecret }
        ];
    }

    if (player.room === "finalRoom") {
        if (!rooms.finalRoom.cleared) {
            return [
                { text: "Идти дальше", action: finalBossIntro },
                { text: "Поискать", action: searchRoom }
            ];
        }

        return [
            { text: "Осмотреться", action: exploreRoom },
            { text: "Поискать", action: searchRoom }
        ];
    }

    const buttons = [
        { text: "Осмотреться", action: exploreRoom },
        { text: "Поискать", action: searchRoom }
    ];

    if (room.doorFound && !room.doorUnlocked) {
        buttons.push({
            text: "Открыть дверь",
            action: openDoor
        });
    }

    if (room.doorUnlocked) {
        buttons.push({
            text: "Войти",
            action: openNextRoom
        });
    }

    if (room.backupExitFound) {
        buttons.push({
            text: "Протиснуться",
            action: () => {
                if (player.room === "playroom" && !player.duckFound) {
                    runScene(
                        "Проход будто не хочет вас выпускать. Сначала нужно осмотреть игровую внимательнее.",
                        [
                            { text: "Назад", action: () => renderRoom() },
                            { text: "Поискать", action: searchRoom }
                        ],
                        "playroom"
                    );
                    return;
                }

                openNextRoom();
            }
        });
    }

    return buttons;
}

// ===============
// СОБЫТИЯ В КОМНАТАХ 
// ===============


const roomEvents = {
    waterpark: [
        {
            id: "pool_noise",
            text: "Из тёмной воды доносится громкий всплеск. Что-то двигается у края бассейна.",
            choices: [
                {
                    text: "Подойти ближе",
                    result: "monster"
                },
                {
                    text: "Осмотреть пол рядом",
                    result: "findItem",
                    item: "Ключ",
                    foundText: "У самого края бассейна, среди мокрой плитки, вы замечаете старый ключ. Взять его?"
                },
                {
                    text: "Отступить",
                    result: "leave"
                }
            ]
        },
        {
            id: "locker_row",
            text: "У стены тянется ряд ржавых шкафчиков. Один из них едва заметно подрагивает изнутри.",
            choices: [
                {
                    text: "Открыть шкафчик",
                    result: "monster"
                },
                {
                    text: "Прислушаться",
                    result: "damage",
                    damage: 8
                },
                {
                    text: "Отойти",
                    result: "leave"
                }
            ]
        },
        {
            id: "control_panel",
            text: "На стене мигает старый щиток управления. Некоторые кнопки ещё работают.",
            choices: [
                {
                    text: "Нажать кнопку",
                    result: "random",
                    outcomes: ["unlockDoor", "findItem"],
                    item: "Отмычка",
                    foundText: "За приоткрывшейся панелью щитка вы замечаете тонкую отмычку. Взять её?"
                },
                {
                    text: "Не трогать",
                    result: "leave"
                }
            ]
        },
        {
            id: "inflatable_matress",
            text: "В мутной воде покачивается детский надувной матрас. Внутри что-то блестит.",
            choices: [
                {
                    text: "Вытащить матрас",
                    result: "random",
                    outcomes: ["findItem", "damage"],
                    item: "Батарейка",
                    foundText: "В складках надувного матраса почти новая батарейка. Взять её?",
                    damage: 10
                },
                {
                    text: "Оставить",
                    result: "leave"
                }
            ]
        }
    ],

    playroom: [
        {
            id: "music_toy",
            text: "На полу лежит музыкальная шкатулка. Она вдруг начинает тихо играть сама по себе.",
            choices: [
                {
                    text: "Поднять шкатулку",
                    result: "monster"
                },
                {
                    text: "Открыть крышку",
                    result: "findItem",
                    item: "Конфета",
                    foundText: "Под крышкой шкатулки спрятана маленькая конфета. Взять её?"
                },
                {
                    text: "Отойти",
                    result: "leave"
                }
            ]
        },
        {
            id: "paper_mask",
            text: "На полу лежит детская бумажная маска с нарисованной улыбкой. Изнутри она влажная.",
            choices: [
                {
                    text: "Поднять маску",
                    result: "random",
                    outcomes: ["monster", "findItem"],
                    item: "Конфета",
                    foundText: "Под маской прилипла маленькая конфета в яркой обёртке. Взять её?"
                },
                {
                    text: "Оттолкнуть ногой",
                    result: "leave"
                }
            ]
        },
        {
            id: "toy_phone",
            text: "Игрушечный телефон на низком столике вдруг начинает звонить. Экран у него чёрный.",
            choices: [
                {
                    text: "Поднять трубку",
                    result: "damage",
                    damage: 9
                },
                {
                    text: "Открыть крышку батареек",
                    result: "findItem",
                    item: "Батарейка",
                    foundText: "Под крышкой телефона спрятана батарейка. Взять её?"
                },
                {
                    text: "Отойти",
                    result: "leave"
                }
            ]
        },
        {
            id: "toy_box",
            text: "В углу стоит пластиковая коробка с кубиками и деталями конструктора.",
            choices: [
                {
                    text: "Порыться внутри",
                    result: "random",
                    outcomes: ["findItem", "damage"],
                    item: "Ключ",
                    foundText: "Под грудой кубиков вы находите маленький ключ. Взять его?",
                    damage: 10
                },
                {
                    text: "Не трогать",
                    result: "leave"
                }
            ]
        },
        {
            id: "creepy_doll",
            text: "На стуле сидит кукла с треснувшим лицом. Кажется, она смотрит прямо на вас.",
            choices: [
                {
                    text: "Осмотреть куклу",
                    result: "findItem",
                    item: "Фонарик",
                    foundText: "За спинкой стула, рядом с куклой, лежит небольшой фонарик. Взять его?"
                },
                {
                    text: "Отвернуться",
                    result: "leave"
                },
                {
                    text: "Сбросить на пол",
                    result: "monster"
                }
            ]
        }
    ],

    hospital: [
        {
            id: "medkit",
            text: "На каталке лежит старая аптечка. Замок на ней почти сломан.",
            choices: [
                {
                    text: "Открыть аптечку",
                    result: "random",
                    outcomes: ["findItem", "findItem", "damage"],
                    item: "Энергетик",
                    foundText: "Внутри аптечки вы замечаете банку энергетика. Взять её?",
                    damage: 10
                },
                {
                    text: "Не трогать",
                    result: "leave"
                }
            ]
        },
        {
            id: "curtain_bed",
            text: "Одна из занавесок вокруг койки колышется, хотя ветра в палате нет.",
            choices: [
                {
                    text: "Резко отдёрнуть занавеску",
                    result: "random",
                    outcomes: ["monster", "findItem"],
                    item: "Бинт",
                    foundText: "На смятой простыне лежит аккуратно сложенный бинт. Взять его?"
                },
                {
                    text: "Обойти койку",
                    result: "leave"
                }
            ]
        },
        {
            id: "medical_cart",
            text: "Рядом с койкой стоит медицинская тележка с закрытым ящиком.",
            choices: [
                {
                    text: "Обыскать ящик",
                    result: "findItem",
                    item: "Бинт",
                    foundText: "Внутри ящика, среди ржавых инструментов, лежит чистый бинт. Взять его?"
                },
                {
                    text: "Оставить",
                    result: "leave"
                }
            ]
        },
        {
            id: "monitor_signal",
            text: "Старый монитор внезапно загорается, издавая резкий писк. На экране мигает сообщение: «НЕ ВОЗВРАЩАТЬСЯ».",
            choices: [
                {
                    text: "Подойти к монитору",
                    result: "random",
                    outcomes: ["unlockDoor", "damage"],
                    damage: 15
                },
                {
                    text: "Отключить питание",
                    result: "unlockDoor"
                },
                {
                    text: "Уйти",
                    result: "leave"
                }
            ]
        }
    ],

    library: [
        {
            id: "blank_book",
            text: "На столе лежит тяжёлая книга без названия. Когда вы раскрываете её, большинство страниц оказываются пустыми.",
            choices: [
                {
                    text: "Перелистать дальше",
                    result: "random",
                    outcomes: ["findItem", "monster"],
                    item: "Ключ",
                    foundText: "Между пустыми страницами зажат маленький ключ. Взять его?"
                },
                {
                    text: "Закрыть книгу",
                    result: "leave"
                }
            ]
        },
        {
            id: "ladder_shelf",
            text: "К высокой полке приставлена библиотечная лестница. Сверху доносится сухой треск страниц.",
            choices: [
                {
                    text: "Подняться наверх",
                    result: "monster"
                },
                {
                    text: "Не лезть",
                    result: "leave"
                }
            ]
        },
        {
            id: "high_shelf",
            text: "На верхней полке виднеется коробка с библиотечными карточками и пыльный металлический блеск.",
            choices: [
                {
                    text: "Дотянуться",
                    result: "findItem",
                    item: "Отмычка",
                    foundText: "За коробкой вы нащупываете тонкую металлическую отмычку. Взять её?"
                },
                {
                    text: "Оставить",
                    result: "leave"
                }
            ]
        },
        {
            id: "reading_lamp",
            text: "Старая лампа для чтения вдруг загорается сама. Под её светом на столе проступает надпись: «ТЫ ВЕРНЁШЬСЯ ЗА НЕЙ?»",
            choices: [
                {
                    text: "Стереть надпись",
                    result: "damage",
                    damage: 8
                },
                {
                    text: "Осмотреть стол",
                    result: "findItem",
                    item: "Батарейка",
                    foundText: "В ящике стола вы находите батарейку. Взять её?"
                },
                {
                    text: "Отойти",
                    result: "leave"
                }
            ]
        }
    ],

    supermarket: [
        {
            id: "fallen_cart",
            text: "В соседнем ряду сама собой катится тележка. Внутри что-то звенит.",
            choices: [
                {
                    text: "Остановить тележку",
                    result: "random",
                    outcomes: ["findItem", "monster"],
                    item: "Конфета",
                    foundText: "На дне тележки лежит конфета в яркой обёртке. Взять её?"
                },
                {
                    text: "Отойти в сторону",
                    result: "leave"
                }
            ]
        },
        {
            id: "freezer_door",
            text: "Дверца морозильника покрыта инеем изнутри. На стекле кто-то провёл линию, будто пытался писать пальцем.",
            choices: [
                {
                    text: "Открыть морозильник",
                    result: "random",
                    outcomes: ["findItem", "monster"],
                    item: "Батарейка",
                    foundText: "На полке морозильника лежит холодная батарейка. Взять её?"
                },
                {
                    text: "Вытереть стекло",
                    result: "leave"
                }
            ]
        },
        {
            id: "discount_box",
            text: "На полу стоит коробка с выцветшей надписью: «УЦЕНКА». Внутри всё перемешано.",
            choices: [
                {
                    text: "Порыться в коробке",
                    result: "random",
                    outcomes: ["findItem", "damage"],
                    item: "Энергетик",
                    foundText: "Среди мусора вы находите банку энергетика. Взять её?",
                    damage: 7
                },
                {
                    text: "Не трогать",
                    result: "leave"
                }
            ]
        },
        {
            id: "checkout_belt",
            text: "Лента кассы неожиданно начинает двигаться сама. На ней медленно подъезжает что-то металлическое.",
            choices: [
                {
                    text: "Взять предмет",
                    result: "findItem",
                    item: "Кастрюля",
                    foundText: "На ленте оказывается помятая кастрюля. Взять её?"
                },
                {
                    text: "Выключить ленту",
                    result: "unlockDoor"
                },
                {
                    text: "Отойти",
                    result: "leave"
                }
            ]
        }
    ],

    laundry: [
        {
            id: "spinning_drum",
            text: "Один из барабанов стиральной машины крутится сам по себе. За стеклом мелькает пятно.",
            choices: [
                {
                    text: "Открыть дверцу",
                    result: "monster"
                },
                {
                    text: "Отойти",
                    result: "leave"
                }
            ]
        },
        {
            id: "wet_sheets",
            text: "Между простынями что-то шуршит. На одной из них проступают две маленькие мокрые ладони.",
            choices: [
                {
                    text: "Раздвинуть ткань",
                    result: "monster"
                },
                {
                    text: "Проверить карман халата на крючке",
                    result: "findItem",
                    item: "Бинт",
                    foundText: "В кармане висевшего халата лежит свёрнутый бинт. Взять его?"
                },
                {
                    text: "Отойти",
                    result: "leave"
                }
            ]
        },
        {
            id: "detergent_shelf",
            text: "На полке стоят коробки порошка и бутылки моющего средства. Между ними что-то поблёскивает.",
            choices: [
                {
                    text: "Осмотреть полку",
                    result: "random",
                    outcomes: ["findItem", "damage"],
                    item: "Ключ",
                    foundText: "За коробками вы находите ключ. Взять его?",
                    damage: 8
                },
                {
                    text: "Не трогать",
                    result: "leave"
                }
            ]
        }
    ],

    cinema: [
        {
            id: "white_screen",
            text: "Белый экран мерцает так, будто фильм закончился очень давно, а проектор забыл об этом.",
            choices: [
                {
                    text: "Посмотреть на последний ряд",
                    result: "cinemaBoy"
                },
                {
                    text: "Осмотреть дверь за экраном",
                    result: "cinemaDoor"
                },
                {
                    text: "Уйти",
                    result: "leave"
                }
            ]
        },
        {
            id: "empty_seat",
            text: "В одном из кресел лежит старый плед и бумажный стаканчик. Кажется, кто-то только что вышел и должен вернуться.",
            choices: [
                {
                    text: "Осмотреть кресло",
                    result: "cinemaMemory"
                },
                {
                    text: "Не трогать",
                    result: "leave"
                }
            ]
        }
    ],

    secretRoom: [
        {
            id: "secret_drawing",
            text: "На стене неровно нацарапаны две фигурки, держащиеся за руки.",
            choices: [
                {
                    text: "Осмотреть рисунок ближе",
                    result: "secretLore1"
                },
                {
                    text: "Назад",
                    result: "leave"
                }
            ]
        },
        {
            id: "secret_door_marks",
            text: "Изнутри на двери множество царапин. Не глубоких. Слишком маленьких.",
            choices: [
                {
                    text: "Коснуться двери",
                    result: "secretLore2"
                },
                {
                    text: "Назад",
                    result: "leave"
                }
            ]
        },
        {
            id: "secret_toy",
            text: "В углу лежит маленькая тряпичная игрушка.",
            choices: [
                {
                    text: "Поднять игрушку",
                    result: "secretLore3"
                },
                {
                    text: "Назад",
                    result: "leave"
                }
            ]
        }
    ]
};

function getNextRoomEvent(roomName) {
    const room = rooms[roomName];
    const events = roomEvents[roomName];

    if (!events || events.length === 0) {
        return null;
    }

    const unusedEvents = events.filter(
        event => !room.usedEvents.includes(event.id)
    );

    if (unusedEvents.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * unusedEvents.length);
    return unusedEvents[randomIndex];
}

function runRoomEvent(event) {
    if (!event) return;

    rooms[player.room].usedEvents.push(event.id);

    runScene(
        event.text,
        event.choices.map(choice => ({
            text: choice.text,
            action: () => handleEventChoice(choice)
        })),
        player.room
    );
}

function handleEventChoice(choice) {
    if (choice.result === "monster") {
        startBattle(createSmallMonsterForBattle());
        return;
    }

    if (choice.result === "findItem") {
        const room = rooms[player.room];

        if (!canFindItem(choice.item)) {
            runScene(
                "Вы находите что-то полезное, но понимаете, что это вам уже не нужно.",
                getRoomButtons(),
                player.room
            );
            return;
        }

        room.pendingItem = choice.item;

        showFoundItemScene(choice.item, choice.foundText);
        return;
    }

    if (choice.result === "damage") {
        player.hp = Math.max(0, player.hp - choice.damage);
        updateStats();

        runScene(
            `Вы получили ${choice.damage} урона.`,
            getRoomButtons(),
            player.room
        );
        return;
    }

    if (choice.result === "unlockDoor") {
        const room = rooms[player.room];
        room.doorFound = true;
        room.doorUnlocked = true;

        runScene(
            "Вы слышите щелчок. Похоже, дверь открылась.",
            getRoomButtons(),
            player.room
        );
        return;
    }

    if (choice.result === "cinemaBoy") {
        cinemaIntro();
        return;
    }

    if (choice.result === "cinemaDoor") {
        cinemaBackstageDoor();
        return;
    }

    if (choice.result === "cinemaMemory") {
        runScene(
            "На дне кресла застрял смятый бумажный уголок. На секунду вам кажется, что рядом кто-то должен сидеть. Но место пусто.",
            [
                { text: "Назад", action: () => renderRoom() }
            ],
            "cinema"
        );
        return;
    }

    if (choice.result === "secretLore1") {
        inspectSecretDrawing();
        return;
    }

    if (choice.result === "secretLore2") {
        inspectSecretDoor();
        return;
    }

    if (choice.result === "secretLore3") {
        inspectSecretToy();
        return;
    }

    if (choice.result === "leave") {
        runScene(
            "Вы решаете не рисковать.",
            getRoomButtons(),
            player.room
        );
        return;
    }

    if (choice.result === "random") {
        const outcomes = choice.outcomes;
        const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];

        handleEventChoice({
            ...choice,
            result: randomOutcome
        });
    }
}

// ===============
// КИНО 
// ===============

function cinemaHubText() {
    if (player.secretRoomOpened) {
        return "Пустой кинозал больше не кажется просто заброшенным. Теперь он похож на место, где слишком долго ждали конца.";
    }

    if (player.hasTicket || hasItem("Смятый билет")) {
        return "Мальчик всё так же сидит на последнем ряду. Экран мерцает, будто знает, что вы уже заметили дверь за ним.";
    }

    return "Старый кинозал. Экран мерцает мёртвым белым светом. На последнем ряду сидит мальчик, и вам неприятно от того, как неподвижно он ждёт.";
}

function cinemaHub() {
    hideMonsterIcon();

    if (player.secretRoomOpened) {
        runScene(
            "Пустой кинозал больше не кажется просто заброшенным. Теперь он похож на место, где слишком долго ждали конца.\n\nПоследний ряд пуст.\nЭкран уже ничего не показывает вам нового.",
            [
                { text: "Осмотреть пустой зал", action: cinemaAfterSecretLook },
                { text: "Выйти из зала", action: openNextRoom }
            ],
            "cinema"
        );
        return;
    }

    runScene(
        cinemaHubText(),
        [
            { text: "Подойти к мальчику", action: cinemaApproachBoy },
            { text: "Осмотреть экран", action: cinemaBackstageDoor },
            { text: "Выйти из зала", action: openNextRoom }
        ],
        "cinema"
    );
}

function cinemaIntro() {
    player.boyTalkStage = 0;
    cinemaHub();
}

function cinemaApproachBoy() {
    showMonsterIconByData(npcs.cinemaBoy);

    runScene(
        "Мальчик сидит на последнем ряду, чуть ссутулившись. Он не поворачивается к вам, только смотрит на пустой экран.\n\nКресло рядом с ним свободно — и это почему-то кажется неправильным.",
        [
            { text: "Сесть рядом", action: cinemaSitWithBoy },
            { text: "Заговорить", action: cinemaTalkToBoy },
            { text: "Отойти", action: cinemaHub }
        ],
        "cinema"
    );
}

function cinemaSitWithBoy() {
    showMonsterIconByData(npcs.cinemaBoy);

    if (player.hasTicket || hasItem("Смятый билет")) {
        runScene(
            "Вы садитесь рядом. Кресло скрипит тихо, почти виновато.\n\nМальчик не смотрит на вас.\n\n«Теперь у тебя есть то, без чего не пускают дальше.»",
            [
                { text: "Заговорить", action: cinemaTalkToBoy },
                { text: "Осмотреть экран", action: cinemaBackstageDoor },
                { text: "Встать", action: cinemaHub }
            ],
            "cinema"
        );
        return;
    }

    runScene(
        "Вы садитесь рядом. На сиденье между вами лежит смятый билет. \n\nОт одного взгляда на него у вас начинает ныть грудь, будто вы слишком долго не решались подобрать именно эту вещь.",
        [
            { text: "Взять билет", action: cinemaTakeTicket },
            { text: "Заговорить", action: cinemaTalkToBoy },
            { text: "Встать", action: cinemaHub }
        ],
        "cinema"
    );
}

function cinemaTalkToBoy() {
    showMonsterIconByData(npcs.cinemaBoy);

    if (player.boyTalkStage === 0) {
        player.boyTalkStage++;

        runScene(
            "Вы тихо спрашиваете, что он здесь делает.\nМальчик отвечает не сразу.\n\n«Жду, пока досмотрят до конца.»",
            [
                { text: "«Кто?»", action: cinemaTalkToBoy }
            ],
            "cinema"
        );
        return;
    }

    if (player.boyTalkStage === 1) {
        player.boyTalkStage++;

        runScene(
            "«Те, кто всегда встают раньше нужного места.»\n\nОн наконец чуть поворачивает голову.\n\n«А потом говорят, что не помнят фильм.»",
            [
                { text: "...", action: cinemaTalkToBoy }
            ],
            "cinema"
        );
        return;
    }

    if (player.boyTalkStage === 2) {
        player.boyTalkStage++;

        if (!(player.hasTicket || hasItem("Смятый билет"))) {
            runScene(
                "Мальчик смотрит не на вас, а на смятый билет между креслами.\n\n«Без него дверь за экраном не откроется.»",
                [
                    { text: "Взять билет", action: cinemaTakeTicket },
                    { text: "Осмотреть экран", action: cinemaBackstageDoor },
                    { text: "Отойти", action: cinemaHub }
                ],
                "cinema"
            );
            return;
        }

        runScene(
            "«Ты уже держал его раньше.»\n\n«Просто тогда не остался до конца.»",
            [
                { text: "...", action: cinemaTalkToBoy }
            ],
            "cinema"
        );
        return;
    }

    runScene(
        "«Некоторые двери открываются не ключом.»\n«А тем, что ты наконец перестаёшь отворачиваться.»",
        [
            { text: "Осмотреть экран", action: cinemaBackstageDoor },
            { text: "Отойти", action: cinemaHub }
        ],
        "cinema"
    );
}

function cinemaTakeTicket() {
    if (player.hasTicket || hasItem("Смятый билет")) {
        showMonsterIconByData(npcs.cinemaBoy);

        runScene(
            "Билет уже у вас в руке. Бумага тёплая, словно её слишком долго сжимали чужие пальцы.",
            [
                { text: "Осмотреть экран", action: cinemaBackstageDoor },
                { text: "Отойти", action: cinemaHub }
            ],
            "cinema"
        );
        return;
    }

    addItem("Смятый билет");
    player.hasTicket = true;

    showMonsterIconByData(npcs.cinemaBoy);

    runScene(
        "Вы поднимаете смятый билет.\nНа обороте проступают слова: «не уходи без меня».\nМальчик по-прежнему смотрит на экран.\n\n«Теперь можешь подойти к двери.»",
        [
            { text: "Осмотреть экран", action: cinemaBackstageDoor },
            { text: "Спросить ещё", action: cinemaTalkToBoy },
            { text: "Отойти", action: cinemaHub }
        ],
        "cinema"
    );
}

function cinemaBackstageDoor() {
    hideMonsterIcon();

    if (!(player.hasTicket || hasItem("Смятый билет"))) {
        runScene(
            "За экраном угадывается узкая дверь без таблички.\nВы тянетесь к ней, но вдруг понимаете, \nчто без чего-то маленького и бумажного \nона так и останется просто дверью в темноте.",
            [
                { text: "Подойти к мальчику", action: cinemaApproachBoy },
                { text: "Назад", action: cinemaHub }
            ],
            "cinema"
        );
        return;
    }

    if (player.secretRoomOpened) {
        runScene(
            "За экраном всё та же узкая дверь.\nТеперь вы уже знаете, что за ней было. Возвращаться туда снова незачем.",
            [
                { text: "Назад", action: cinemaHub },
                { text: "Выйти из зала", action: openNextRoom }
            ],
            "cinema"
        );
        return;
    }

    runScene(
        "За экраном прячется узкая дверь без таблички.\nТеперь, когда билет у вас в руке, кажется, будто она ждала именно этого.",
        [
            { text: "Использовать билет", action: openSecretRoom },
            { text: "Назад", action: cinemaHub }
        ],
        "cinema"
    );
}

function openSecretRoom() {
    player.secretRoomOpened = true;
    player.room = "secretRoom";

    runScene(
        "Вы подносите смятый билет к двери.\nЗамок щёлкает так тихо, будто и без того был готов открыться.",
        [
            { text: "Войти", action: enterSecretRoom }
        ],
        "secretRoom"
    );
}

function isSecretRoomFullyInspected() {
    const room = rooms.secretRoom;
    return !!(room.inspectedDrawing && room.inspectedDoor && room.inspectedToy);
}

function getSecretRoomStateText() {
    const room = rooms.secretRoom;
    const inspectedCount =
        (room.inspectedDrawing ? 1 : 0) +
        (room.inspectedDoor ? 1 : 0) +
        (room.inspectedToy ? 1 : 0);

    if (inspectedCount === 0) {
        return room.text;
    }

    if (inspectedCount === 1) {
        return "Тишина комнаты уже не кажется пустой. Один фрагмент встал на место, но здесь всё ещё есть на что посмотреть.";
    }

    if (inspectedCount === 2) {
        return "Комната будто сжимается вокруг вас. Почти всё уже сказано, остался ещё один последний след.";
    }

    return "Комната за экраном больше не прячет правду. Здесь уже нечего искать — только выйти обратно в кинозал.";
}

function secretRoomHub(customText = null) {
    const room = rooms.secretRoom;

    if (customText && typeof customText !== "string") {
        customText = null;
    }

    const text = customText || getSecretRoomStateText();

    const buttons = [
        {
            text: room.inspectedDrawing ? "Осмотреть рисунок ещё раз" : "Осмотреть рисунок",
            action: inspectSecretDrawing
        },
        {
            text: room.inspectedDoor ? "Осмотреть дверь ещё раз" : "Осмотреть дверь",
            action: inspectSecretDoor
        },
        {
            text: room.inspectedToy ? "Осмотреть игрушку ещё раз" : "Осмотреть игрушку",
            action: inspectSecretToy
        }
    ];

    if (isSecretRoomFullyInspected()) {
        buttons.push({
            text: "Выйти в кинозал",
            action: returnToCinemaFromSecret
        });
    }

    runScene(text, buttons, "secretRoom");
}

function enterSecretRoom() {
    player.room = "secretRoom";
    secretRoomHub();
}

function inspectSecretDrawing() {
    const room = rooms.secretRoom;

    if (room.inspectedDrawing) {
        runScene(
            "Рисунок всё так же лежит на полу. Теперь вы уже не можете делать вид, что не понимаете, кто на нём.",
            [
                { text: "Осмотреть дальше", action: () => secretRoomHub() }
            ],
            "secretRoom"
        );
        return;
    }

    room.inspectedDrawing = true;

    if (room.inspectedDoor && room.inspectedToy) {
        runScene(
            "На полу лежит детский рисунок: мальчик и маленькая девочка держатся за руки.\n\nПод одной фигуркой нацарапано: «я». Под другой — смазанная буква.\n\nИ вдруг всё, что раньше не складывалось, болезненно тянется друг к другу.",
            [
                { text: "...", action: secretRoomMemory }
            ],
            "secretRoom"
        );
        return;
    }

    runScene(
        "На полу лежит детский рисунок: мальчик и маленькая девочка держатся за руки.\n\nПод одной фигуркой нацарапано: «я». Под другой — смазанная буква.\n\nВ животе холодеет от простой, слишком ясной мысли: вас здесь когда-то было двое.",
        [
            { text: "Осмотреть дальше", action: () => secretRoomHub() }
        ],
        "secretRoom"
    );
}

function inspectSecretDoor() {
    const room = rooms.secretRoom;

    if (room.inspectedDoor) {
        runScene(
            "Царапины на двери никуда не делись. Вы больше не можете убедить себя, что это просто следы времени.",
            [
                { text: "Осмотреть дальше", action: () => secretRoomHub() }
            ],
            "secretRoom"
        );
        return;
    }

    room.inspectedDoor = true;

    if (room.inspectedDrawing && room.inspectedToy) {
        runScene(
            "Изнутри на двери множество мелких царапин.\n\nНе отчаянных — частых.\n\nБудто кто-то маленький много раз скрёб её изнутри, пока снаружи никто не открывал.\n\nИ в этот раз память уже не успевает отступить.",
            [
                { text: "...", action: secretRoomMemory }
            ],
            "secretRoom"
        );
        return;
    }

    runScene(
        "Изнутри на двери множество мелких царапин.\n\nНе отчаянных — частых.\n\nБудто кто-то маленький много раз скрёб её изнутри, пока снаружи никто не открывал.",
        [
            { text: "Осмотреть дальше", action: () => secretRoomHub() }
        ],
        "secretRoom"
    );
}

function inspectSecretToy() {
    const room = rooms.secretRoom;

    if (room.inspectedToy) {
        runScene(
            "Игрушка всё ещё здесь. После всего увиденного она выглядит не как вещь, а как чьё-то слишком долгое ожидание.",
            [
                { text: "Осмотреть дальше", action: () => secretRoomHub() }
            ],
            "secretRoom"
        );
        return;
    }

    room.inspectedToy = true;

    if (room.inspectedDrawing && room.inspectedDoor) {
        runScene(
            "В углу лежит маленькая тряпичная игрушка. Пальцы узнают её раньше памяти.\n\nТемнота.\nТесная каморка.\nЧужой грубый голос за дверью.\nИ детский шёпот совсем рядом:\n«Только не бросай меня».",
            [
                { text: "...", action: secretRoomMemory }
            ],
            "secretRoom"
        );
        return;
    }

    runScene(
        "В углу лежит маленькая тряпичная игрушка. Пальцы узнают её раньше памяти.\n\nНа секунду в голове вспыхивает теснота, темнота и чужой грубый голос за дверью.\nНо картина тут же распадается, будто вам всё ещё не хватает чего-то важного.",
        [
            { text: "Осмотреть дальше", action: () => secretRoomHub() }
        ],
        "secretRoom"
    );
}

function secretRoomMemory() {
    player.trueEndingUnlocked = true;

    runScene(
        "Память наконец складывается.\nКогда-то мужчина похитил вас обоих — вас и младшую сестру.\nОн держал вас в маленькой каморке, пока за дверью шли чужие взрослые разговоры.\nОднажды дверь осталась открыта дольше обычного.\nВы успели выскользнуть.\nОна — нет.\nВы бежали за помощью.\nНо когда помощь пришла, было уже поздно.",
        [
            {
                text: "Осмотреться",
                action: () => secretRoomHub("Комната за экраном больше не прячет правду. Теперь она только ждёт, что вы перестанете от неё отворачиваться.")
            }
        ],
        "secretRoom"
    );
}

function cinemaAfterSecretLook() {
    hideMonsterIcon();

    runScene(
        "Вы медленно осматриваете зал.\nНа последнем ряду больше никто не сидит.\n\nСмятое кресло всё ещё хранит чужую тяжесть, но теперь вы уже знаете: ждать здесь больше некого.\nИз кинотеатра можно только идти дальше.",
        [
            { text: "Выйти из зала", action: openNextRoom },
            { text: "Назад", action: cinemaHub }
        ],
        "cinema"
    );
}

function returnToCinemaFromSecret() {
    player.room = "cinema";
    hideMonsterIcon();

    runScene(
        "Вы выбираетесь обратно в кинозал.\nПоследний ряд пуст.\n\nЭкран льёт мёртвый свет, но теперь это уже не место ожидания — только короткий путь к тому, что ждёт дальше.",
        [
            { text: "Осмотреть пустой зал", action: cinemaAfterSecretLook },
            { text: "Выйти из зала", action: openNextRoom }
        ],
        "cinema"
    );
}


// ===============
// ФИНАЛ
// ===============

let finalBossTalkStage = 0;

function finalBossIntro() {
    const boss = monsters.unique.finalBoss;
    finalBossTalkStage = 0;

    showMonsterIconByData(boss);

    runScene(
        player.trueEndingUnlocked
            ? "В глубине последнего зала сгущается огромная тень. \nТеперь в ней чувствуется уже не только страх.\nУзнавание."
            : "В глубине последнего зала сгущается огромная тень.\nОна стоит так, будто ждала именно вас.",
        [
            { text: "«Кто ты?»", action: finalBossTalk },
            { text: "Атаковать", action: () => startBattle(getOrCreateUniqueMonster("finalBoss")) }
        ],
        "finalRoom"
    );
}

function finalBossTalk() {
    const boss = monsters.unique.finalBoss;
    showMonsterIconByData(boss);

    if (finalBossTalkStage === 0) {
        finalBossTalkStage++;

        runScene(
            "«Я не тот мужчина.»\n«И не та дверь.»\n«Я — то, что осталось с тобой после них.»",
            [
                { text: "«Почему ты здесь?»", action: finalBossTalk }
            ],
            "finalRoom"
        );
        return;
    }

    if (finalBossTalkStage === 1) {
        finalBossTalkStage++;

        runScene(
            "«Потому что ты не потерял память.»\n«Ты запутал её так, чтобы не смотреть на себя в тот момент.»",
            [
                { text: "...", action: finalBossTalk }
            ],
            "finalRoom"
        );
        return;
    }

    if (finalBossTalkStage === 2) {
        finalBossTalkStage++;

        runScene(
            "«Ты называл это кошмаром.\nСтрахом.\nДетством.»\n\n«Чем угодно, лишь бы не той секундой, когда побежал один.»",
            [
                { text: "...", action: finalBossTalk }
            ],
            "finalRoom"
        );
        return;
    }

    runScene(
        "«Ты уже знаешь, что случилось.»\n\n«Осталось только выдержать правду о себе.»",
        [
            { text: "Сразиться", action: () => startBattle(getOrCreateUniqueMonster("finalBoss")) }
        ],
        "finalRoom"
    );
}

function giveTicketToFinalBoss() {
    removeItem("Смятый билет");
    hideBattleHud();

    currentMonster.currentHp = 0;
    player.trueEndingUnlocked = true;

    runScene(
        "Вы поднимаете смятый билет.\nТень замирает.\nТеперь дело уже не в том, чтобы вспомнить.\nВы помните.\n\nДело в другом:всю жизнь вы называли это забывчивостью, страхом, детским кошмаром — чем угодно, лишь бы не тем моментом, когда вы побежали один.\nТень едва слышно произносит:\n\n«…Ты всё-таки досмотрел до конца.»",
        [
            { text: "...", action: handleFinalBossDefeat }
        ],
        "finalRoom"
    );
}

function handleFinalBossDefeat() {
    hideMonsterIcon();
    document.getElementById("scene-darkness").style.opacity = "1";

    if (player.trueEndingUnlocked) {
        runScene(
            "Тень дрожит и теряет форму.\nПеред вами остаётся не чудовище.",
            [
                { text: "...", action: revealFinalBossHumanForm }
            ],
            "finalRoom"
        );
        return;
    }

    runScene(
        "Тень распадается, но внутри вас не становится легче.\nВы справились с ней, так и не позволив себе назвать, \nчто именно она всё это время прятала от вас.",
        [
            { text: "Уйти", action: badEndingScene }
        ],
        "finalRoom"
    );
}

function revealFinalBossHumanForm() {
    const boss = monsters.unique.finalBoss;

    showMonsterIconByData({
        name: "Вы",
        image: boss.trueFormImage
    });

    document.getElementById("scene-darkness").style.opacity = "1";

    runScene(
        "Человек, которого вы слишком долго не хотели узнавать.",
        [
            { text: "...", action: trueEndingConfession }
        ],
        "finalRoom"
    );
}

function trueEndingConfession() {
    runScene(
        "«Я помню не только то, что случилось.»\n«Я помню себя в тот момент.»\n\n«Я помню, как побежал. \nИ как потом ненавидел себя за это. \nЭта вина поглотила меня на многие годы.»",
        [
            { text: "...", action: sisterEchoScene }
        ],
        "finalRoom"
    );
}

function badEndingScene() {
    hideMonsterIcon();

    runScene(
        "Вы отворачиваетесь от правды в тот самый миг, когда она почти стала вашей.\nТень остаётся позади, но не исчезает по-настоящему: \nей больше не нужно лицо, чтобы жить внутри вас.\n\nПроснувшись, вы снова унесёте с собой только бесформенную тяжесть.",
        [
            { text: "Проснуться", action: endingScene }
        ],
        "finalRoom"
    );
}

function sisterEchoScene() {
    hideMonsterIcon();

    runScene(
        "Тьма впереди редеет.\n\nПеред вами — узкая дверь.\n\nРядом с ней кто-то стоит, но вы несколько секунд не решаетесь поднять взгляд.",
        [
            { text: "...", action: sisterEchoReveal }
        ],
        "finalRoom"
    );
}

function sisterEchoReveal() {
    showMonsterIconByData(npcs.sisterEcho);

    runScene(
        "Маленький силуэт становится чётче.",
        [
            { text: "...", action: sisterEchoScene2 }
        ],
        "finalRoom"
    );
}

function sisterEchoScene2() {
    runScene(
        "Она смотрит на вас спокойно, с грустной, почти сочувствующей улыбкой.\n\n«Ты наконец перестал убегать.»\n\n«Я всё время была здесь.\nНе в этой комнате.\nВ том месте, куда ты не позволял себе смотреть.»",
        [
            { text: "...", action: sisterEchoScene3 }
        ],
        "finalRoom"
    );
}

function sisterEchoScene3() {
    runScene(
        "«Ты не забыл меня.»\n«Ты просто запутался в своей вине так сильно, \nчто спрятал вместе с ней и меня, и себя.»",
        [
            { text: "...", action: sisterEchoScene4 }
        ],
        "finalRoom"
    );
}

function sisterEchoScene4() {
    runScene(
        "«Я звала тебя.\nИ ты испугался.» \n\n«Но ты был ребёнком.»\n«А всё это время судил себя так, будто должен был стать кем-то большим уже тогда.»",
        [
            { text: "...", action: sisterEchoScene5 }
        ],
        "finalRoom"
    );
}

function sisterEchoScene5() {
    runScene(
        "Она делает маленький шаг к двери.\n«Теперь ты помнишь.»\n«Значит, можно больше не путаться.»",
        [
            { text: "Открыть дверь", action: trueEndingScene }
        ],
        "finalRoom"
    );
}

function trueEndingScene() {
    runScene(
        "Вы открываете дверь.\nЗа ней нет ни каморки, ни кинозала, ни последнего зала — \nтолько тихое пустое пространство, \nв котором больше не нужно делать вид, что ничего не было.\nНа этот раз вы не уходите раньше конца.",
        [
            { text: "Проснуться", action: endingScene }
        ],
        "finalRoom"
    );
}

function finalBossLastWords() {
    runScene(
        "«Видишь?\nДаже теперь тебе легче победить меня, чем остаться с правдой до конца.»",
        [
            { text: "Проснуться", action: endingScene }
        ],
        "finalRoom"
    );
}

function endingScene() {
    hideMonsterIcon();

    runScene(
        "Вы открываете глаза.",
        [
            { text: "Начать заново", action: () => location.reload() }
        ]
    );
}

function resetGameState() {
    figureTalkStage = 0;
    finalBossTalkStage = 0;
    currentMonster = null;

    uniqueMonsterState.keeper = null;
    uniqueMonsterState.finalBoss = null;

    Object.keys(rooms).forEach(roomName => {
        const room = rooms[roomName];

        room.cleared = false;
        room.keyFound = false;
        room.lockpickFound = false;
        room.doorFound = false;
        room.doorUnlocked = false;
        room.lootFoundCount = 0;
        room.maxLootPerRoom = 3;
        room.backupExitFound = false;
        room.pendingItem = null;
        room.usedEvents = [];
        room.activeMonster = null;
        room.postFleeExplore = false;
        room.inspectedDrawing = false;
        room.inspectedDoor = false;
        room.inspectedToy = false;
    });

    rooms.beginning.currentImage = rooms.beginning.image;

    player.duckFound = false;
    player.gladDefeated = false;
    player.cinemaVisited = false;
    player.hasTicket = false;
    player.secretRoomOpened = false;
    player.trueEndingUnlocked = false;
    player.boyTalkStage = 0;
    player.tempDamageBoost = 0;
    player.tempArmorBoost = 0;
    player.keeperKeyGiven = false;
}