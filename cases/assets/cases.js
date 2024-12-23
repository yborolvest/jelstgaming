// Setup global chances
var sessionProfit = 0;
var creditsEl = document.querySelector('#credits');
GetCredits().then((credits) => {
    creditsEl.innerHTML = credits.toString();
});
// rarities
const rarities_colors = {
    // total 100
    "Mil-Spec": 40,
    "Restricted": 30,
    "Classified": 15,
    "Covert": 10,
    "Knife": 5
};

const rarities_quality = {
    "Battle-Scarred": {
        name: "Battle-Scarred",
        chance: 0.15,
        mult: 0.7
    },
    "Well-Worn": {
        name: "Well-Worn",
        chance: 0.20,
        mult: 0.8
    },
    "Field-Tested": {
        name: "Field-Tested",
        chance: 0.35,
        mult: 1
    },

    "Minimal Wear": {
        name: "Minimal Wear",
        chance: 0.20,
        mult: 1.3
    },
    "Factory New": {
        name: "Factory New",
        chance: 0.10,
        mult: 1.7
    }
}


// Cases

const cases = {
    "jelstcase":
    {
        "name": "Jelst Case",
        "price": 20,
        "items": [
            {
                "name": "2 Kg Huzarensalade",
                "rarity": "Mil-Spec",
                "img": "https://jumbo.com/dam-images/fit-in/720x720/Products/29092023_1695994870270_1695994896148_8710948601192_5.png",
                "worth": 15
            },
            {
                "name": "PSV shirt",
                "rarity": "Restricted",
                "img": "/cases/assets/img/psvshirt.webp",
                "worth": 15
            },
            {
                "name": "Max Vestappen's Red Bull Racing Cap",
                "rarity": "Classified",
                "img": "https://www.verstappen.com/img/thumb/thumb.php?src=/img/product/1643_c60d1b0_0005_60505181.png",
                "worth": 20
            },
            {
                "name": "Jeroen's Renault Clio",
                "rarity": "Covert",
                "img": "/cases/assets/img/renaultclio.png",
                "worth": 50
            },
            {
                "name": "★ Jeroen Elst",
                "rarity": "Knife",
                "img": "/assets/img/jeroen.png",
                "worth": 90
            }
        ]
    },
    "chroma": {
        "name": "Chroma Case",
        "price": 30,
        "items": [
            {
                "name": "★ Bayonet | Marble Fade", 
                "rarity": "Knife",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_bayonet_am_marble_fade_light_large.adc286f39c98a9630620a97831ca2e5050229dff.png",
                "worth": 350
            },
            {
                "name": "★ Flip Knife | Tiger Tooth", 
                "rarity": "Knife",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_knife_flip_an_tiger_orange_light_large.441c0d2cf427d90fb079e82af0d074c1bfad13e4.png",
                "worth": 550
            },
            {
                "name": "Galil AR | Chatterbox",
                "rarity": "Covert",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_galilar_cu_galil_abrasion_light_large.8398e4836a0c26add3514a6af2262704d85fec07.png",
                "worth": 70
            },
            {
                "name": "AWP | Man-o'-war",
                "rarity": "Covert",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_awp_am_awp_glory_light_large.348eae0f5d4da8671886826648dd4197a9829090.png",
                "worth": 65
            },
            {
                "name": "AK-47 | Cartel",
                "rarity": "Classified",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_ak47_aq_ak47_cartel_light_large.2e7be9f4c7bda304f2a7c374260d95affca93f0b.png",
                "worth": 50
            },
            {
                "name": "M4A4 | 龍王 (Dragon King)",
                "rarity": "Classified",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4a4_ancestral_light_large.cbd9732689f42b7aec91bdb9166b1ee414974cb7.png",
                "worth": 45
            },
            {
                "name": "P250 | Muertos",
                "rarity": "Classified",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_p250_cu_p250_mandala_light_large.0acb51464cd72643c6a1fefaf8736288eb5d02f7.png",
                "worth": 40
            },
            {
                "name": "Sawed-Off | Serenity",
                "rarity": "Restricted",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_sawedoff_cu_sawedoff_deva_light_large.9ffde04f2f082dce492b2fa6e250f69f538a50b5.png",
                "worth": 30
            },
            {
                "name": "Desert Eagle | Naga",
                "rarity": "Restricted",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_deagle_aq_deagle_naga_light_large.b410ad835b1894a448676ae0590586298af2cb33.png",
                "worth": 20
            },
            {
                "name": "Mac-10 | Malachite",
                "rarity": "Restricted",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mac10_am_mac10_malachite_light_large.65b0eff12e655fb94ec9de545348178f1a5d60e0.png",
                "worth": 15
            },
            {
                "name": "Dual Berettas | Urban Shock",
                "rarity": "Restricted",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_elite_cu_elites_urbanstorm_light_large.d33c9dd65434d8b9f4e7b5092fcc2e07a874e625.png",
                "worth": 12
            },
            {
                "name": "Glock-18 | Catacombs",
                "rarity": "Mil-Spec",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_glock_cu_glock_deathtoll_light_large.cfcc6a17037a33bbb524ca1856c07cf76dda449d.png",
                "worth": 6
            },
            {
                "name": "MP9 | Deadly Poison",
                "rarity": "Mil-Spec",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_mp9_cu_mp9_deadly_poison_light_large.0776976e709ec7b503dd7e47b8c962338615b5da.png",
                "worth": 8
            },
            {
                "name": "M249 | System Lock",
                "rarity": "Mil-Spec",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_m249_cu_m249_sektor_light_large.c957e70c656024b2c062f7af2031a76cb3c83f1c.png",
                "worth": 5
            },
            {
                "name": "XM1014 | Quicksilver",
                "rarity": "Mil-Spec",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_xm1014_aq_xm1014_sigla_light_large.71c180cd3b8bdea7d0b119ab2b9d54792c51b3aa.png",
                "worth": 5
            },
            {
                "name": "SCAR-20 | Grotto",
                "rarity": "Mil-Spec",
                "img": "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/default_generated/weapon_scar20_aq_scar20_leak_light_large.06b9231638ba347e91c671ecf2c1364754794893.png",
                "worth": 4
            }


        ]
    }
}

function getRandomQuality() {
    const totalWeight = Object.values(rarities_quality).reduce((acc, quality) => acc + quality.chance, 0);
    let random = Math.random() * totalWeight;
    for (const quality of Object.values(rarities_quality)) {
        if (random < quality.chance) {
            return quality;
        }
        random -= quality.chance;
    }
}

function openCase(caseName) {
    const selectedCase = cases[caseName];
    if (!selectedCase) {
        throw new Error(`Case ${caseName} not found`);
    }

    const totalWeight = selectedCase.items.reduce((acc, item) => acc + rarities_colors[item.rarity], 0);
    let random = Math.random() * totalWeight;

    for (const item of selectedCase.items) {
        if (random < rarities_colors[item.rarity]) {
            const quality = getRandomQuality();
            console.log(`You got: ${item.name} (${quality.name})`);
            return { ...item, quality };
        }
        random -= rarities_colors[item.rarity];
    }
}

function getColorByRarity(rarity) {
    const colors = {
        "Mil-Spec": "blue",
        "Restricted": "purple",
        "Classified": "pink",
        "Covert": "red",
        "Knife": "gold"
    };
    return colors[rarity] || "gray";
}

// when a case is selected in form #case-picker-form, fill the .case-spinner with the items of the selected case making use of the rarities

document.querySelectorAll('input[name="caseSelect"]').forEach(radio => {
    radio.addEventListener('change', function () {
        const caseName = this.value;
        const selectedCase = cases[caseName];
        const spinner = document.querySelector('.case-spinner-inner');
        spinner.innerHTML = '';
        for (let i = 0; i < 64; i++) {
            selectedCase.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('case-item');
            itemElement.style.borderColor = getColorByRarity(item.rarity);
            itemElement.style.background = `linear-gradient(0deg, ${getColorByRarity(item.rarity)} 0%, transparent 30%)`;
            itemElement.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
            `;
            spinner.appendChild(itemElement);
            });
        }
    });
});

// when the open case button is clicked, append the winning item to the .case-spinner at the 60th place and scroll to it.

document.querySelector('.open-case').addEventListener('click', function () {
    // generate 64 items
    const caseName = document.querySelector('input[name="caseSelect"]:checked').value;
    const selectedCase = cases[caseName];
    const spinner = document.querySelector('.case-spinner-inner');

    // check if user has enough credits
    GetCredits().then((credits) => {
        if (credits < selectedCase.price) {
            console.log('Not enough credits');
        }
        else{

    // clear items
    spinner.innerHTML = '';
    // set spinner to margin-left 0
    spinner.classList.add('spinning-block');
    spinner.style.marginLeft = "0px";
    setTimeout(() => {
        spinner.classList.remove('spinning-block');
    }, 1);

    // play sound
    const audio = new Audio('/cases/assets/audio/spin.mp3');
    audio.play();


    for (let i = 0; i < 64; i++) {
        const randomItem = selectedCase.items[Math.floor(Math.random() * selectedCase.items.length)];
        const itemElement = document.createElement('div');
        itemElement.classList.add('case-item');
        itemElement.style.borderColor = getColorByRarity(randomItem.rarity);
        itemElement.style.background = `linear-gradient(0deg, ${getColorByRarity(randomItem.rarity)} -30%, transparent 30%)`;
        itemElement.innerHTML = `
            <img src="${randomItem.img}" alt="${randomItem.name}">
        `;
        spinner.appendChild(itemElement);
    }

    // Generate winning item

    const winningItem = openCase(caseName);
    const winningElement = document.createElement('div');
    winningElement.classList.add('winning-case-item');
    winningElement.style.borderColor = getColorByRarity(winningItem.rarity);
    winningElement.style.background = `linear-gradient(0deg, ${getColorByRarity(winningItem.rarity)} -30%, transparent 40%)`;
    winningElement.innerHTML = `
        <img src="${winningItem.img}" alt="${winningItem.name}">
    `;
    spinner.insertBefore(winningElement, spinner.children[60]);

    setTimeout(() => {
        // number between 12300 and 12100
        var randomNum = Math.floor(Math.random() * 200) + ( 56 * 316 );
        spinner.style.marginLeft = `-${randomNum}px`;
    }, 1);

    // add winning item to .last-case

    var totalCredits = Math.round(winningItem.worth * winningItem.quality.mult);
    AdjustCredits((totalCredits - selectedCase.price)).then((credits) => {
        creditsEl.innerHTML = credits;
    });
    const lastCase = document.querySelector('.last-case');
    lastCase.innerHTML = '';
    const lastCaseItem = document.createElement('div');
    lastCaseItem.classList.add('case-item');
    lastCaseItem.innerHTML = `
        <img src="${winningItem.img}" alt="${winningItem.name}">
        <span>${winningItem.name} (${winningItem.quality.name})</span>
        <span class="earnings"> ${totalCredits} credits</span>
    `;
    lastCase.appendChild(lastCaseItem);

    // update history
    const history = document.querySelector('.case-history-list');
    const historyItem = document.createElement('li');
    historyItem.innerHTML = `
        ${winningItem.name} (${winningItem.quality.name}) <span class="earnings">+ ${totalCredits} credits</span>
    `;
    history.appendChild(historyItem);

    // update session profit
    sessionProfit += totalCredits - selectedCase.price;
    document.querySelector('.profit').textContent = sessionProfit;
        }
    });
});