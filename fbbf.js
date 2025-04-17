// Add at the beginning of the file
document.addEventListener("DOMContentLoaded", function () {
  // Fetch both session status and profile picture
  Promise.all([
    fetch('session_status.php').then(res => res.json()),
    fetch('get_profile_pic.php').then(res => res.json())
  ])
    .then(([sessionData, profileData]) => {
      const userInfo = document.getElementById('user-info');

      if (sessionData.loggedIn) {
        // If user is logged in, show welcome message with profile pic and logout
        const profilePic = profileData.status === 'success' ? profileData.profilePic : 'https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/sigma.png?v=1740408925158';
        userInfo.innerHTML = `
          <img src="${profilePic}" alt="Profile" class="nav-profile-pic">
          <a class="welcome-message">Velkommen, ${sessionData.username}!</a>
          <a class="login" href="logout.php" class="logout-btn">Logout</a>
        `;
      } else {
        // If not logged in, show login and signup buttons
        userInfo.innerHTML = `
          <a class="login" href="/login.html" class="login-btn">Login</a>
          <a class="login" href="/signup.html" class="signup-btn">Sign up</a>
        `;
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });

  // JavaScript for toggling the navigation menu on mobile
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Rest of your existing DOMContentLoaded code...
  checkHighScore();
  checkCoins();
  gameLoop();
  // ... etc
});

// Rest of your existing code...

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const hackMenu = document.getElementById("hackMenu");

// Load images for textures
const birdImage = new Image();
birdImage.src =
  "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/bird.png?v=1732129064609";

const pipeImageTop = new Image();
pipeImageTop.src =
  "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pipetop.png?v=1732129185543";

const pipeImageBottom = new Image();
pipeImageBottom.src =
  "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pipedown.png?v=1732129180987";

const backgroundImage = new Image();
backgroundImage.src =
  "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/bg.png?v=1732129240407";

// Add the old bird image with other image declarations at the top
const oldBirdImage = new Image();
oldBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/oldbird.png?v=1732129057515";

// First, add the sky bird image declaration at the top with other images
const skyBirdImage = new Image();
skyBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/skybird.png?v=1737634179438";

// Add the gay bird image declaration at the top with other images
const gayBirdImage = new Image();
gayBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/gaybird.png?v=1737634807247";

// Add the green bird image declaration at the top with other images
const greenBirdImage = new Image();
greenBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/Greenbird.png?v=1737625395421";

// Add the red bird image declaration at the top with other images
const redBirdImage = new Image();
redBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/redbird.png?v=1737634940085";

// Add the admin bird image declaration at the top with other images
const adminBirdImage = new Image();
adminBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/adminbird.png?v=1737633378122";

// Add the jule bird image declaration at the top with other images
const juleBirdImage = new Image();
juleBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/julebird.png?v=1737625423581";

// Add the jones bird image declaration at the top with other images
const jonesBirdImage = new Image();
jonesBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/jonesbird.png?v=1737634136020";

// Add the monster bird image declaration at the top with other images
const monsterBirdImage = new Image();
monsterBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/monsterbird.png?v=1737635198464";

// Add the primo bird image declaration at the top with other images
const primoBirdImage = new Image();
primoBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/primobird.png?v=1737654857794";

// Add the omirp bird image declaration at the top with other images
const omirpBirdImage = new Image();
omirpBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/omirpbird.png?v=1737654882084";

// Add the neerg bird image declaration at the top with other images
const neergBirdImage = new Image();
neergBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/neergbird.png?v=1737633385748";

// Add the dansk bird image declaration at the top with other images
const danskBirdImage = new Image();
danskBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/danskbird.png?v=1737657507949";

// Add the pixil bird image declaration at the top with other images
const pixilBirdImage = new Image();
pixilBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pixil-frame-0%20(4).png?v=1737713161228";

// Add the owner bird image declaration at the top with other images
const ownerBirdImage = new Image();
ownerBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/ownerbird.png?v=1737712622618";

// Add the invisible bird image declaration at the top with other images
const invisibleBirdImage = new Image();
invisibleBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/invisbird.png?v=1737747973698";

// Add the countryball maker bird image declaration at the top with other images
const countryballBirdImage = new Image();
countryballBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/countryball_makerbird.png?v=1737747994014";

// Add the poland bird image declaration at the top with other images
const polandBirdImage = new Image();
polandBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/polandbird.png?v=1737748028818";

// Add the pixil2 bird image declaration at the top with other images
const pixil2BirdImage = new Image();
pixil2BirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pixil-frame-0%20(6).png?v=1737986940333";

// Add the pixil3 bird image declaration at the top with other images
const pixil3BirdImage = new Image();
pixil3BirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pixil-frame-0%20(5).png?v=1737986945570";

// Add the gray bird image declaration at the top with other images
const grayBirdImage = new Image();
grayBirdImage.crossOrigin = "Anonymous";
grayBirdImage.onload = function() {
    console.log('Gray bird image loaded successfully');
    // Force a redraw when the image loads
    if (gameRunning) {
        drawBird();
    }
};
grayBirdImage.onerror = function(e) {
    console.error('Error loading gray bird image:', e);
};
grayBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/gray.png?v=1740405202322";

// Add the CYHN bird image declaration at the top with other images
const cyhnBirdImage = new Image();
cyhnBirdImage.crossOrigin = "Anonymous";
cyhnBirdImage.onload = function() {
    console.log('CYHN bird image loaded successfully');
    if (gameRunning) {
        drawBird();
    }
};
cyhnBirdImage.onerror = function(e) {
    console.error('Error loading CYHN bird image:', e);
};
cyhnBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/cyhn.png?v=1740405798099";

// Add the uncollared bird image declaration at the top with other images
const uncollaredBirdImage = new Image();
uncollaredBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/uncollardbird.png?v=1740671059886";

// Game Variables
const birdWidth = 34;
const birdHeight = 24;
let birdX = 50;
let birdY = 400;
let birdVelocity = 0;
let gravity = 0.08;
const jump = -2.5;
const mobileJump = -2.5;
const pipeWidth = 70;
let pipeGap = 150;
let pipeSpeed = 1.5;
let pipes = [];
let score = 0;
let highScore = 0;
let gameRunning = false;
let gameOver = false;
let birdAngle = 0;
let keepInMiddle = false;
let godMode = false;
let backgroundX = 0;
const backgroundSpeed = 0.8;
let coins = 0;
let coinsSaved = false;
let shopOpen = false;
let reviveCount = 0;
let upgrades = {
  widerPipeGap: false,
  slowerPipes: false,
  lowerGravity: false,
  tripleCoins: false,
  secondChance: false,  // Add the new upgrade
  blueBirdSkin: false,
  makerBirdSkin: false,
  oldBirdSkin: false,
  skyBirdSkin: false,
  gayBirdSkin: false,
  greenBirdSkin: false,
  redBirdSkin: false,
  adminBirdSkin: false,
  juleBirdSkin: false,
  jonesBirdSkin: false,
  monsterBirdSkin: false,
  primoBirdSkin: false,
  omirpBirdSkin: false,
  neergBirdSkin: false,
  danskBirdSkin: false,
  pixilBirdSkin: false,
  ownerBirdSkin: false,
  invisibleBirdSkin: false,
  countryballBirdSkin: false,
  polandBirdSkin: false,
  pixil2BirdSkin: false,
  pixil3BirdSkin: false,
  grayBirdSkin: false,
  cyhnBirdSkin: false,
  uncollaredBirdSkin: false,
};

const keybinds = {
  keepInMiddle: "KeyK",
  godMode: "KeyG",
  increaseScore: "KeyI",
};

const minY = 100;
const maxY = canvas.height - pipeGap - 150;

// Add this to your game variables at the top
let birdSkins = {
    default: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/bird.png?v=1732129064609",
    blue: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/bluebird.png?v=1732129050592",
    maker: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/makerbird.png?v=1732129060676",
    old: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/oldbird.png?v=1732129057515",
    sky: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/skybird.png?v=1737634179438",
    gay: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/gaybird.png?v=1737634807247",
    green: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/Greenbird.png?v=1737625395421",
    red: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/redbird.png?v=1737634940085",
    admin: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/adminbird.png?v=1737633378122",
    jule: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/julebird.png?v=1737625423581",
    jones: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/jonesbird.png?v=1737634136020",
    monster: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/monsterbird.png?v=1737635198464",
    primo: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/primobird.png?v=1737654857794",
    omirp: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/omirpbird.png?v=1737654882084",
    neerg: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/neergbird.png?v=1737633385748",
    dansk: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/danskbird.png?v=1737657507949",
    pixil: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pixil-frame-0%20(4).png?v=1737713161228",
    owner: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/ownerbird.png?v=1737712622618",
    invisible: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/invisbird.png?v=1737747973698",
    countryball: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/countryball_makerbird.png?v=1737747994014",
    poland: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/polandbird.png?v=1737748028818",
    pixil2: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pixil-frame-0%20(6).png?v=1737986940333",
    pixil3: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pixil-frame-0%20(5).png?v=1737986945570",
    gray: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/gray.png?v=1740405202322",
    cyhn: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/cyhn.png?v=1740405798099",
    uncollared: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/uncollardbird.png?v=1740671059886"
};

let currentBirdSkin = birdSkins.default;

// First, create a new Image for the blue bird skin
const blueBirdImage = new Image();
blueBirdImage.src = "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/bluebird.png?v=1732129050592";

// Update your shopItems definition
let shopItems = {
    blueBirdSkin: { visible: true, price: 50000 },
    makerBirdSkin: { visible: true, price: 50000 },
    revive: { visible: true, price: 25000 },
    oldBirdSkin: { visible: true, price: 50000 },
    skyBirdSkin: { visible: true, price: 50000 },
    gayBirdSkin: { visible: true, price: 50000 },
    widerPipeGap: { visible: true, price: 10000 },
    slowerPipes: { visible: true, price: 10000 },
    lowerGravity: { visible: true, price: 10000 },
    greenBirdSkin: { visible: true, price: 50000 },
    redBirdSkin: { visible: true, price: 50000 },
    adminBirdSkin: { visible: true, price: 100000 },
    juleBirdSkin: { visible: true, price: 50000 },
    jonesBirdSkin: { visible: true, price: 50000 },
    monsterBirdSkin: { visible: true, price: 50000 },
    primoBirdSkin: { visible: true, price: 50000 },
    omirpBirdSkin: { visible: true, price: 50000 },
    neergBirdSkin: { visible: true, price: 50000 },
    danskBirdSkin: { visible: true, price: 50000 },
    pixilBirdSkin: { visible: true, price: 50000 },
    ownerBirdSkin: { visible: true, price: 50000 },
    invisibleBirdSkin: { visible: true, price: 50000 },
    tripleCoins: { visible: true, price: 100000 },
    countryballBirdSkin: { visible: true, price: 50000 },
    polandBirdSkin: { visible: true, price: 50000 },
    pixil2BirdSkin: { visible: true, price: 50000 },
    pixil3BirdSkin: { visible: true, price: 50000 },
    grayBirdSkin: { visible: true, price: 50000 },
    cyhnBirdSkin: { visible: true, price: 50000 },
    uncollaredBirdSkin: { visible: true, price: 50000 },
    secondChance: { visible: true, price: 75000 }  // Add the new upgrade
};

// Add these variables after the other game variables
let hasSecondChance = false;
let isSecondChanceActive = false;
let birdOpacity = 1;

// Add this with the other game variables at the top
let hitPipeId = null;

// Add these variables at the top with other game variables
let hasUsedSecondChance = false;
let secondChancePipeId = null;

// Add this to your checkHackMenuAccess function
function checkHackMenuAccess() {
    fetch("session_status.php")
        .then((response) => response.json())
        .then((data) => {
            const hackMenu = document.getElementById("hackMenu");
            const shopControlPanel = document.getElementById("shopControlPanel");
            if (data.loggedIn && data.username === "Farmjoey") {
                // Add event listener for both menus
                document.addEventListener("keydown", hackMenuKeyHandler);
                // Initially hide both menus
                if (hackMenu) hackMenu.style.display = "none";
                if (shopControlPanel) shopControlPanel.style.display = "none";
            } else {
                // Remove event listener and hide menus for non-Farmjoey users
                document.removeEventListener("keydown", hackMenuKeyHandler);
                if (hackMenu) hackMenu.style.display = "none";
                if (shopControlPanel) shopControlPanel.style.display = "none";
            }
        })
        .catch((error) => {
            console.error("Error checking access:", error);
            const hackMenu = document.getElementById("hackMenu");
            const shopControlPanel = document.getElementById("shopControlPanel");
            if (hackMenu) hackMenu.style.display = "none";
            if (shopControlPanel) shopControlPanel.style.display = "none";
        });
}

// Add this function to initialize the control panel with current prices
function initializeControlPanel() {
    Object.entries(shopItems).forEach(([itemId, item]) => {
        const priceInput = document.getElementById(`${itemId}Price`);
        if (priceInput) {
            priceInput.value = item.price;
        }
    });
}

// Update the updateShopDisplay function
function updateShopDisplay() {
    // Update the shop items visibility and prices
    Object.entries(shopItems).forEach(([itemId, item]) => {
        // Find all instances of this item in the shop
        const shopItems = document.querySelectorAll(`.shop-item:has([data-type="${itemId}"])`);
        shopItems.forEach(shopItem => {
            // Update visibility
            shopItem.style.display = item.visible ? 'block' : 'none';
            
            // Update price text - find the price element that contains "Cost"
            const priceElements = shopItem.getElementsByTagName('p');
            for (let p of priceElements) {
                if (p.textContent.includes('Cost')) {
                    p.textContent = `Cost: ${item.price} coins`;
                    break;
                }
            }
        });
    });

    // Save the changes to localStorage or your server
    saveShopSettings();
}

// Update the saveShopSettings function
function saveShopSettings() {
    const shopData = JSON.stringify({
        ...shopItems,
        skyBirdSkin: shopItems.skyBirdSkin
    }, null, 2);
    
    fetch('save_shop_settings.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: shopData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Shop settings saved successfully');
        } else {
            console.error('Error saving shop settings:', data.message);
        }
    })
    .catch(error => {
        console.error('Error saving shop settings:', error);
    });
}

// Update the loadShopSettings function
function loadShopSettings() {
    fetch('load_shop_settings.php')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success' && data.settings) {
            const savedSettings = JSON.parse(data.settings);
            // Merge saved settings with default settings to ensure skyBirdSkin is included
            shopItems = {
                ...shopItems,
                ...savedSettings,
                skyBirdSkin: savedSettings.skyBirdSkin || { visible: true, price: 50000 }
            };
            updateShopDisplay();
            initializeControlPanel();
        }
    })
    .catch(error => {
        console.error('Error loading shop settings:', error);
    });
}

// Update the updatePrice function
function updatePrice(itemId) {
    const priceInput = document.getElementById(`${itemId}Price`);
    const newPrice = parseInt(priceInput.value);
    if (!isNaN(newPrice) && newPrice >= 0) {
        shopItems[itemId].price = newPrice;
        updateShopDisplay();
        
        // Show feedback
        const button = priceInput.nextElementSibling;
        const originalText = button.textContent;
        button.textContent = 'Updated!';
        button.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 1000);
    }
}

// Update the toggleShopItem function
function toggleShopItem(itemId) {
    shopItems[itemId].visible = !shopItems[itemId].visible;
    updateShopDisplay();
    
    // Show feedback on the toggle button
    const button = document.querySelector(`button[onclick="toggleShopItem('${itemId}')"]`);
    if (button) {
        button.textContent = shopItems[itemId].visible ? 'Hide Item' : 'Show Item';
        button.style.backgroundColor = shopItems[itemId].visible ? '#4CAF50' : '#f44336';
    }
}

// Update the buyUpgrade function to add some debug logging
function buyUpgrade(type) {
    console.log('buyUpgrade called with type:', type);
    console.log('Current shopItems:', shopItems);
    
    if (!shopItems[type]) {
        console.error('Invalid item type:', type);
        return;
    }

    if (upgrades[type]) {
        alert('You already own this upgrade!');
        return;
    }

    const cost = shopItems[type].price;
    if (!shopItems[type].visible) {
        alert('This item is not available in the shop!');
        return;
    }

    console.log('Current coins before purchase:', coins);
    if (coins >= cost) {
        coins -= cost;
        updateShopCoinsDisplay();
        upgrades[type] = true;
        activeUpgrades[type] = true;
        console.log(`Purchased ${type}. Upgrades:`, upgrades);
        console.log(`Purchased ${type}. Active upgrades:`, activeUpgrades);
        console.log('Current coins after purchase:', coins);
        
        // Apply the upgrade effect immediately
        switch(type) {
            case 'widerPipeGap':
                pipeGap = 180;
                break;
            case 'slowerPipes':
                pipeSpeed = 1;
                break;
            case 'lowerGravity':
                gravity = 0.05;
                break;
            case 'tripleCoins':
                // No immediate effect needed as it's handled in the gameLoop
                break;
            case 'blueBirdSkin':
                currentBirdSkin = birdSkins.blue;
                console.log('Blue Bird Skin purchased and applied');
                break;
            case 'makerBirdSkin':
                currentBirdSkin = birdSkins.maker;
                console.log('Maker Bird Skin purchased and applied');
                break;
            case 'oldBirdSkin':
                currentBirdSkin = oldBirdImage;
                console.log('Old Bird Skin purchased and applied');
                break;
            case 'skyBirdSkin':
                currentBirdSkin = birdSkins.sky;
                activeUpgrades.blueBirdSkin = false;
                activeUpgrades.makerBirdSkin = false;
                activeUpgrades.oldBirdSkin = false;
                activeUpgrades.defaultSkin = false;
                console.log('Sky Bird Skin purchased and applied');
                break;
            case 'gayBirdSkin':
                currentBirdSkin = birdSkins.gay;
                activeUpgrades.blueBirdSkin = false;
                activeUpgrades.makerBirdSkin = false;
                activeUpgrades.oldBirdSkin = false;
                activeUpgrades.skyBirdSkin = false;
                activeUpgrades.defaultSkin = false;
                console.log('Gay Bird Skin purchased and applied');
                break;
            case 'greenBirdSkin':
                currentBirdSkin = birdSkins.green;
                console.log('Green Bird Skin purchased and applied');
                break;
            case 'redBirdSkin':
                currentBirdSkin = birdSkins.red;
                console.log('Red Bird Skin purchased and applied');
                break;
            case 'adminBirdSkin':
                currentBirdSkin = birdSkins.admin;
                console.log('Admin Bird Skin purchased and applied');
                break;
            case 'juleBirdSkin':
                currentBirdSkin = birdSkins.jule;
                console.log('Jule Bird Skin purchased and applied');
                break;
            case 'jonesBirdSkin':
                currentBirdSkin = birdSkins.jones;
                console.log('Jones Bird Skin purchased and applied');
                break;
            case 'monsterBirdSkin':
                currentBirdSkin = birdSkins.monster;
                console.log('Monster Bird Skin purchased and applied');
                break;
            case 'primoBirdSkin':
                currentBirdSkin = birdSkins.primo;
                console.log('Primo Bird Skin purchased and applied');
                break;
            case 'omirpBirdSkin':
                currentBirdSkin = birdSkins.omirp;
                console.log('Omirp Bird Skin purchased and applied');
                break;
            case 'neergBirdSkin':
                currentBirdSkin = birdSkins.neerg;
                console.log('Neerg Bird Skin purchased and applied');
                break;
            case 'danskBirdSkin':
                currentBirdSkin = birdSkins.dansk;
                console.log('Dansk Bird Skin purchased and applied');
                break;
            case 'pixilBirdSkin':
                currentBirdSkin = birdSkins.pixil;
                console.log('Pixil Bird Skin purchased and applied');
                break;
            case 'ownerBirdSkin':
                currentBirdSkin = birdSkins.owner;
                console.log('Owner Bird Skin purchased and applied');
                break;
            case 'invisibleBirdSkin':
                currentBirdSkin = birdSkins.invisible;
                console.log('Invisible Bird Skin purchased and applied');
                break;
            case 'countryballBirdSkin':
                currentBirdSkin = birdSkins.countryball;
                console.log('Countryball Bird Skin purchased and applied');
                break;
            case 'polandBirdSkin':
                currentBirdSkin = birdSkins.poland;
                console.log('Poland Bird Skin purchased and applied');
                break;
            case 'pixil2BirdSkin':
                currentBirdSkin = birdSkins.pixil2;
                console.log('Pixil2 Bird Skin purchased and applied');
                break;
            case 'pixil3BirdSkin':
                currentBirdSkin = birdSkins.pixil3;
                console.log('Pixil3 Bird Skin purchased and applied');
                break;
            case 'grayBirdSkin':
                currentBirdSkin = birdSkins.gray;
                console.log('Gray Bird Skin purchased and applied');
                break;
            case 'cyhnBirdSkin':
                currentBirdSkin = birdSkins.cyhn;
                console.log('CYHN Bird Skin purchased and applied');
                break;
            case 'uncollaredBirdSkin':
                currentBirdSkin = birdSkins.uncollared;
                console.log('Uncollared Bird Skin purchased and applied');
                break;
            case 'secondChance':
                // Add any additional logic for secondChance
                break;
        }
        
        saveCoins();
        saveUpgrades();
        updateUpgradesList();
        updateUpgradeButtons();
        alert('Upgrade purchased successfully!');
    } else {
        alert(`Not enough coins! You need ${cost} coins to purchase this upgrade.`);
    }
}

// Create pipes at random height within min/max Y
function createPipe() {
  const pipeHeight = Math.random() * (maxY - minY) + minY;
  pipes.push({
    x: canvas.width,
    y: pipeHeight,
    passed: false,
  });
}

function checkCoins() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "get_coins.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        coins = response.coins;
        console.log("Coins loaded:", coins);
      } else {
        console.error("Error loading coins:", response.message);
      }
    }
  };
  xhr.send();
}


function saveCoins() {
  const xhr = new XMLHttpRequest();
  const data = new FormData();
  data.append("coins", coins);

  xhr.open("POST", "save_coins.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        console.log("Coins saved successfully!");
      } else {
        console.error("Error saving coins:", response.message);
      }
    }
  };
  xhr.send(data);
}


// Fetch high score from the server when the game starts
function checkHighScore() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "get_score.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        highScore = response.high_score;
        console.log("High score loaded:", highScore);
      } else {
        console.error("Error loading high score:", response.message);
      }
    }
  };
  xhr.send();
}

// Save high score to the server
function saveHighScore() {
  const xhr = new XMLHttpRequest();
  const data = new FormData();
  data.append("high_score", score);

  xhr.open("POST", "save_score.php", true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        console.log("High score saved successfully!");
      } else {
        console.error("Error saving high score:", response.message);
      }
    }
  };
  xhr.send(data);
}

function resetGame() {
    // Store the current skin before reset
    const previousSkin = currentBirdSkin;
    const previousUpgrades = { ...activeUpgrades };

    // Reset game variables
    birdY = canvas.height / 2;
    birdVelocity = 0;
    pipes = [];
    score = 0;
    gameRunning = false;
    gameOver = false;
    reviveCount = 0;
    coinsSaved = false;
    hasUsedSecondChance = false;  // Reset second chance usage
    secondChancePipeId = null;    // Reset second chance pipe ID

    // Restore the previous skin and upgrades
    currentBirdSkin = previousSkin;
    activeUpgrades = previousUpgrades;

    // Update the visual state
    updateUpgradesList();
}

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    handleJump();
  } else if (e.code === "Digit0") {
    toggleHackMenu();
  } else if (e.code === keybinds.keepInMiddle) {
    toggleKeepInMiddle();
  } else if (e.code === keybinds.godMode) {
    toggleGodMode();
  } else if (e.code === keybinds.increaseScore) {
    increaseScore();
  }
});

canvas.addEventListener("touchstart", function () {
  handleJump();
});

function handleJump() {
  if (!gameRunning && !gameOver) {
    gameRunning = true;
    birdVelocity = mobileJump;
  } else if (gameRunning) {
    birdVelocity = mobileJump;
  } else if (gameOver) {
    resetGame();
  }
}

function drawBackground() {
  ctx.drawImage(backgroundImage, backgroundX, 0, canvas.width, canvas.height);
  ctx.drawImage(
    backgroundImage,
    backgroundX + canvas.width,
    0,
    canvas.width,
    canvas.height
  );

  backgroundX -= backgroundSpeed;
  if (backgroundX <= -canvas.width) {
    backgroundX = 0;
  }
}

function drawBird() {
    let birdImageToDraw;
    
    // Set the global alpha based on second chance state
    ctx.globalAlpha = isSecondChanceActive ? 0.5 : 1;
    
    if (upgrades.primoBirdSkin && currentBirdSkin === birdSkins.primo) {
        birdImageToDraw = primoBirdImage;
    } else if (upgrades.greenBirdSkin && currentBirdSkin === birdSkins.green) {
        birdImageToDraw = greenBirdImage;
    } else if (upgrades.gayBirdSkin && currentBirdSkin === birdSkins.gay) {
        birdImageToDraw = gayBirdImage;
    } else if (upgrades.skyBirdSkin && currentBirdSkin === birdSkins.sky) {
        birdImageToDraw = skyBirdImage;
    } else if (upgrades.blueBirdSkin && currentBirdSkin === birdSkins.blue) {
        birdImageToDraw = blueBirdImage;
    } else if (upgrades.makerBirdSkin && currentBirdSkin === birdSkins.maker) {
        if (!window.customBirdImage) {
            window.customBirdImage = new Image();
            window.customBirdImage.src = birdSkins.maker;
        }
        birdImageToDraw = window.customBirdImage;
    } else if (upgrades.oldBirdSkin && currentBirdSkin === birdSkins.old) {
        birdImageToDraw = oldBirdImage;
    } else if (upgrades.redBirdSkin && currentBirdSkin === birdSkins.red) {
        birdImageToDraw = redBirdImage;
    } else if (upgrades.adminBirdSkin && currentBirdSkin === birdSkins.admin) {
        birdImageToDraw = adminBirdImage;
    } else if (upgrades.juleBirdSkin && currentBirdSkin === birdSkins.jule) {
        birdImageToDraw = juleBirdImage;
    } else if (upgrades.jonesBirdSkin && currentBirdSkin === birdSkins.jones) {
        birdImageToDraw = jonesBirdImage;
    } else if (upgrades.monsterBirdSkin && currentBirdSkin === birdSkins.monster) {
        birdImageToDraw = monsterBirdImage;
    } else if (upgrades.omirpBirdSkin && currentBirdSkin === birdSkins.omirp) {
        birdImageToDraw = omirpBirdImage;
    } else if (upgrades.neergBirdSkin && currentBirdSkin === birdSkins.neerg) {
        birdImageToDraw = neergBirdImage;
    } else if (upgrades.danskBirdSkin && currentBirdSkin === birdSkins.dansk) {
        birdImageToDraw = danskBirdImage;
    } else if (upgrades.pixilBirdSkin && currentBirdSkin === birdSkins.pixil) {
        birdImageToDraw = pixilBirdImage;
    } else if (upgrades.ownerBirdSkin && currentBirdSkin === birdSkins.owner) {
        birdImageToDraw = ownerBirdImage;
    } else if (upgrades.invisibleBirdSkin && currentBirdSkin === birdSkins.invisible) {
        birdImageToDraw = invisibleBirdImage;
    } else if (upgrades.countryballBirdSkin && currentBirdSkin === birdSkins.countryball) {
        birdImageToDraw = countryballBirdImage;
    } else if (upgrades.polandBirdSkin && currentBirdSkin === birdSkins.poland) {
        birdImageToDraw = polandBirdImage;
    } else if (upgrades.pixil2BirdSkin && currentBirdSkin === birdSkins.pixil2) {
        birdImageToDraw = pixil2BirdImage;
    } else if (upgrades.pixil3BirdSkin && currentBirdSkin === birdSkins.pixil3) {
        birdImageToDraw = pixil3BirdImage;
    } else if (upgrades.grayBirdSkin && currentBirdSkin === birdSkins.gray) {
        birdImageToDraw = grayBirdImage;
    } else if (upgrades.cyhnBirdSkin && currentBirdSkin === birdSkins.cyhn) {
        birdImageToDraw = cyhnBirdImage;
    } else if (upgrades.uncollaredBirdSkin && currentBirdSkin === birdSkins.uncollared) {
        birdImageToDraw = uncollaredBirdImage;
    } else {
        birdImageToDraw = birdImage;
    }

    // Make sure we have a valid image before drawing
    if (birdImageToDraw && birdImageToDraw.complete) {
        ctx.save();
        ctx.translate(birdX + birdWidth / 2, birdY + birdHeight / 2);
        ctx.rotate(birdAngle);
        ctx.drawImage(
            birdImageToDraw,
            -birdWidth / 2,
            -birdHeight / 2,
            birdWidth,
            birdHeight
        );
        ctx.restore();
    }
    
    // Reset global alpha after drawing
    ctx.globalAlpha = 1;
}

function drawPipes() {
  pipes.forEach((pipe) => {
    ctx.drawImage(pipeImageTop, pipe.x, 0, pipeWidth, pipe.y);
    ctx.drawImage(
      pipeImageBottom,
      pipe.x,
      pipe.y + pipeGap,
      pipeWidth,
      canvas.height - (pipe.y + pipeGap)
    );
  });
}

function updatePipes() {
  pipes.forEach((pipe) => {
    pipe.x -= pipeSpeed;
  });

  pipes = pipes.filter((pipe) => pipe.x + pipeWidth > 0);

  if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width - 200) {
    createPipe();
  }
}

function checkCollision() {
    if (!godMode) {
        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];
            if (
                birdX < pipe.x + pipeWidth &&
                birdX + birdWidth > pipe.x &&
                (birdY < pipe.y || birdY + birdHeight > pipe.y + pipeGap)
            ) {
                // Check if player owns Second Chance, has it active, and hasn't used it yet
                if (upgrades.secondChance && activeUpgrades.secondChance && !hasUsedSecondChance) {
                    // Activate second chance
                    hasUsedSecondChance = true;
                    secondChancePipeId = i;
                    return;
                }
                
                // If we hit a different pipe than the one we used second chance on, or don't have second chance
                if (hasUsedSecondChance && secondChancePipeId !== i) {
                    gameOver = true;
                } else if (!upgrades.secondChance || !activeUpgrades.secondChance) {
                    gameOver = true;
                }
            }
            
            // Check if we've passed the pipe we hit
            if (secondChancePipeId === i && birdX > pipe.x + pipeWidth) {
                secondChancePipeId = null;
            }
        }
    }
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.fillText(`High Score: ${highScore}`, 10, 60);
  ctx.fillText(`Coins: ${coins}`, 10, 90);
}


function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  if (gameRunning) {
    // Apply gravity and update bird position
    if (!keepInMiddle) {
      birdVelocity += gravity;
      birdY += birdVelocity;
    } else {
      birdY = canvas.height / 2 - birdHeight / 2;
    }

    // Keep bird within canvas bounds
    if (birdY < 0) {
      birdY = 0;
      birdVelocity = 0;
    }
    if (birdY + birdHeight > canvas.height) {
      birdY = canvas.height - birdHeight;
      gameOver = true;
    }

    // Update bird angle based on velocity
    if (birdVelocity < 0) {
      birdAngle = -Math.min(-birdVelocity / 10, Math.PI / 4);
    } else {
      birdAngle = Math.min(birdVelocity / 10, Math.PI / 2);
    }

    drawBird();
    updatePipes();
    drawPipes();
    checkCollision();

    // Update score and coins with triple coins multiplier
    pipes.forEach((pipe) => {
      if (pipe.x + pipeWidth < birdX && !pipe.passed) {
        score++;
        // Apply triple coins if upgrade is active
        coins += activeUpgrades.tripleCoins ? 3 : 1;
        updateShopCoinsDisplay();
        pipe.passed = true;
      }
    });

    drawScore();
  }

  if (gameOver) {
    gameRunning = false;

    if (score > highScore) {
      highScore = score;
      saveHighScore();
    }
    
    if (!coinsSaved) {
      saveCoins();
      coinsSaved = true;
    }

    // Draw game over screen
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    const gameOverText = "Game Over";
    const finalScoreText = `Final Score: ${score}`;
    const highScoreText = `High Score: ${highScore}`;
    const restartText = "Press SPACE to Restart";

    const gameOverTextWidth = ctx.measureText(gameOverText).width;
    const finalScoreTextWidth = ctx.measureText(finalScoreText).width;
    const highScoreTextWidth = ctx.measureText(highScoreText).width;
    const restartTextWidth = ctx.measureText(restartText).width;

    ctx.fillText(gameOverText, (canvas.width - gameOverTextWidth) / 2, canvas.height / 2 - 80);
    ctx.fillStyle = "black";
    ctx.fillText(finalScoreText, (canvas.width - finalScoreTextWidth) / 2, canvas.height / 2 - 40);
    ctx.fillText(highScoreText, (canvas.width - highScoreTextWidth) / 2, canvas.height / 2 + 20);
    ctx.fillText(restartText, (canvas.width - restartTextWidth) / 2, canvas.height / 2 + 100);
  }

  if (!gameRunning && !gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    const startText = "Press SPACE to Start";
    const startTextWidth = ctx.measureText(startText).width;
    ctx.fillText(startText, (canvas.width - startTextWidth) / 2, canvas.height / 2 - 20);
  }

  requestAnimationFrame(gameLoop);
}

// Start the game and check for high score when the game is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Start by loading basic game data
    checkHighScore();
    checkCoins();
    gameLoop();

    // Shop functionality
    const openShopBtn = document.getElementById('openShop');
    const shopMenu = document.getElementById('shopMenu');

    if (openShopBtn) {
        openShopBtn.addEventListener('click', function() {
            if (shopMenu.style.display === 'block') {
                closeShop();
            } else {
                console.log('Opening shop...');
                shopMenu.style.display = 'block';
                updateShopCoinsDisplay();
                if (gameRunning) {
                    gameRunning = false;
                }
            }
        });
    }

    // Shop upgrade buttons
    const buyPipeGapBtn = document.getElementById('buyPipeGap');
    const buySlowPipesBtn = document.getElementById('buySlowPipes');
    const buyLowGravityBtn = document.getElementById('buyLowGravity');
    const buyAllPackBtn = document.getElementById('buyAllPack');
    const addCoinsButton = document.getElementById('addCoinsButton');
    const buyBlueBirdBtn = document.getElementById('buyBlueBird');

    if (buyPipeGapBtn) {
        buyPipeGapBtn.addEventListener('click', () => buyUpgrade('widerPipeGap'));
    }
    if (buySlowPipesBtn) {
        buySlowPipesBtn.addEventListener('click', () => buyUpgrade('slowerPipes'));
    }
    if (buyLowGravityBtn) {
        buyLowGravityBtn.addEventListener('click', () => buyUpgrade('lowerGravity'));
    }
    if (buyAllPackBtn) {
        buyAllPackBtn.addEventListener('click', buyAllPack);
    }
    if (addCoinsButton) {
        addCoinsButton.addEventListener('click', addCoins);
    }
    if (buyBlueBirdBtn) {
        buyBlueBirdBtn.addEventListener('click', () => buyUpgrade('blueBirdSkin'));
    }

    // Escape key to close shop
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeShop();
        }
    });


    // Check hack menu access
    checkHackMenuAccess();

    // Update the click handlers for upgrade buttons
    document.querySelectorAll('.upgrade-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type; // Change from getAttribute to dataset
            console.log('Attempting to buy:', type); // Debug log
            console.log('Button element:', this); // Debug log
            console.log('Available shop items:', Object.keys(shopItems)); // Debug log
            
            if (type && shopItems[type]) {
                buyUpgrade(type);
            } else {
                console.error('Invalid upgrade type:', type);
            }
        });
    });

    // Add this to your DOMContentLoaded event listener
    loadShopSettings();

    // Update the event listener for the locker button
    document.getElementById('openLocker').addEventListener('click', function() {
        const sideInventory = document.getElementById('sideInventory');
        sideInventory.style.display = sideInventory.style.display === 'block' ? 'none' : 'block';
    });

    // Update leaderboard
    updateLeaderboard();
});

// Update the hackMenuKeyHandler function
function hackMenuKeyHandler(e) {
    if (e.code === "Digit0") {
        const hackMenu = document.getElementById("hackMenu");
        if (hackMenu) {
            hackMenu.style.display = hackMenu.style.display === "none" ? "block" : "none";
        }
    } else if (e.code === "Digit9") {
        const shopControlPanel = document.getElementById("shopControlPanel");
        if (shopControlPanel) {
            shopControlPanel.style.display = shopControlPanel.style.display === "none" ? "block" : "none";
        }
    } else if (e.code === "Digit8") {
        const giftPanel = document.getElementById('giftPanel');
        if (giftPanel) {
            giftPanel.style.display = giftPanel.style.display === 'none' ? 'block' : 'none';
            if (giftPanel.style.display === 'block') {
                populateGiftSkinOptions();
                populatePlayersList();
            }
        }
    } else if (e.code === "Digit7") {
        const coinGiftPanel = document.getElementById('coinGiftPanel');
        if (coinGiftPanel) {
            coinGiftPanel.style.display = coinGiftPanel.style.display === 'none' ? 'block' : 'none';
            if (coinGiftPanel.style.display === 'block') {
                populatePlayersList('coinGiftUsername');
            }
        }
    }
}

// Hack functions
function toggleGodMode() {
    godMode = !godMode;
    alert(godMode ? "God Mode Activated" : "God Mode Deactivated");
}

function increaseScore() {
    score += 100;
}

// Allow custom keybind changes via hack menu inputs
const keybindInputs = document.querySelectorAll(".keybind-input");
keybindInputs.forEach((input) => {
    input.addEventListener("focus", () => {
        input.value = ""; // Clear current value
        document.addEventListener("keydown", function keyHandler(e) {
            input.value = e.code;
            const keybindAction = input.id.replace("Key", "");
            keybinds[keybindAction] = e.code; // Update the keybind
            document.removeEventListener("keydown", keyHandler);
        });
    });
});

// Toggle the keep in middle button
function toggleKeepInMiddle() {
    keepInMiddle = !keepInMiddle;
    alert(keepInMiddle ? "Bird will now keep in the middle" : "Bird will now fly freely");
}

// Toggle the god mode button
function toggleGodMode() {
    godMode = !godMode;
    alert(godMode ? "God Mode Activated" : "God Mode Deactivated");
}

// Add this function to check and update button states
function updateUpgradeButtons() {
    // Update skin purchase buttons
    if (upgrades.blueBirdSkin) {
        const blueBirdBtn = document.querySelector('[data-type="blueBirdSkin"]');
        if (blueBirdBtn) {
            blueBirdBtn.disabled = true;
            blueBirdBtn.textContent = 'Purchased';
        }
    }
    
    if (upgrades.makerBirdSkin) {
        const makerBirdBtn = document.querySelector('[data-type="makerBirdSkin"]');
        if (makerBirdBtn) {
            makerBirdBtn.disabled = true;
            makerBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.oldBirdSkin) {
        const oldBirdBtn = document.querySelector('[data-type="oldBirdSkin"]');
        if (oldBirdBtn) {
            oldBirdBtn.disabled = true;
            oldBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.skyBirdSkin) {
        const skyBirdBtn = document.querySelector('[data-type="skyBirdSkin"]');
        if (skyBirdBtn) {
            skyBirdBtn.disabled = true;
            skyBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.gayBirdSkin) {
        const gayBirdBtn = document.querySelector('[data-type="gayBirdSkin"]');
        if (gayBirdBtn) {
            gayBirdBtn.disabled = true;
            gayBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.greenBirdSkin) {
        const greenBirdBtn = document.querySelector('[data-type="greenBirdSkin"]');
        if (greenBirdBtn) {
            greenBirdBtn.disabled = true;
            greenBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.redBirdSkin) {
        const redBirdBtn = document.querySelector('[data-type="redBirdSkin"]');
        if (redBirdBtn) {
            redBirdBtn.disabled = true;
            redBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.adminBirdSkin) {
        const adminBirdBtn = document.querySelector('[data-type="adminBirdSkin"]');
        if (adminBirdBtn) {
            adminBirdBtn.disabled = true;
            adminBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.juleBirdSkin) {
        const juleBirdBtn = document.querySelector('[data-type="juleBirdSkin"]');
        if (juleBirdBtn) {
            juleBirdBtn.disabled = true;
            juleBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.jonesBirdSkin) {
        const jonesBirdBtn = document.querySelector('[data-type="jonesBirdSkin"]');
        if (jonesBirdBtn) {
            jonesBirdBtn.disabled = true;
            jonesBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.monsterBirdSkin) {
        const monsterBirdBtn = document.querySelector('[data-type="monsterBirdSkin"]');
        if (monsterBirdBtn) {
            monsterBirdBtn.disabled = true;
            monsterBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.primoBirdSkin) {
        const primoBirdBtn = document.querySelector('[data-type="primoBirdSkin"]');
        if (primoBirdBtn) {
            primoBirdBtn.disabled = true;
            primoBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.omirpBirdSkin) {
        const omirpBirdBtn = document.querySelector('[data-type="omirpBirdSkin"]');
        if (omirpBirdBtn) {
            omirpBirdBtn.disabled = true;
            omirpBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.neergBirdSkin) {
        const neergBirdBtn = document.querySelector('[data-type="neergBirdSkin"]');
        if (neergBirdBtn) {
            neergBirdBtn.disabled = true;
            neergBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.danskBirdSkin) {
        const danskBirdBtn = document.querySelector('[data-type="danskBirdSkin"]');
        if (danskBirdBtn) {
            danskBirdBtn.disabled = true;
            danskBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.pixilBirdSkin) {
        const pixilBirdBtn = document.querySelector('[data-type="pixilBirdSkin"]');
        if (pixilBirdBtn) {
            pixilBirdBtn.disabled = true;
            pixilBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.ownerBirdSkin) {
        const ownerBirdBtn = document.querySelector('[data-type="ownerBirdSkin"]');
        if (ownerBirdBtn) {
            ownerBirdBtn.disabled = true;
            ownerBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.invisibleBirdSkin) {  
        const invisibleBirdBtn = document.querySelector('[data-type="invisibleBirdSkin"]');
        if (invisibleBirdBtn) {
            invisibleBirdBtn.disabled = true;
            invisibleBirdBtn.textContent = 'Purchased';
        }
    }

    // Update other upgrade buttons
    if (upgrades.widerPipeGap) {
        const pipeGapBtn = document.querySelector('[data-type="widerPipeGap"]');
        if (pipeGapBtn) {
            pipeGapBtn.disabled = true;
            pipeGapBtn.textContent = 'Purchased';
        }
    }
    
    if (upgrades.slowerPipes) {
        const slowPipesBtn = document.querySelector('[data-type="slowerPipes"]');
        if (slowPipesBtn) {
            slowPipesBtn.disabled = true;
            slowPipesBtn.textContent = 'Purchased';
        }
    }
    
    if (upgrades.lowerGravity) {
        const lowGravityBtn = document.querySelector('[data-type="lowerGravity"]');
        if (lowGravityBtn) {
            lowGravityBtn.disabled = true;
            lowGravityBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.secondChance) {
        const secondChanceBtn = document.querySelector('[data-type="secondChance"]');
        if (secondChanceBtn) {
            secondChanceBtn.disabled = true;
            secondChanceBtn.textContent = 'Purchased';
        }
    }
    
    // Check if all upgrades are purchased to disable the All-in-One Pack
    if (upgrades.widerPipeGap && upgrades.slowerPipes && upgrades.lowerGravity) {
        const allPackBtn = document.getElementById('buyAllPack');
        if (allPackBtn) {
            allPackBtn.disabled = true;
            allPackBtn.textContent = 'All Purchased';
        }
    }

    // Add this new section for countryball bird skin
    if (upgrades.countryballBirdSkin) {
        const countryballBirdBtn = document.querySelector('[data-type="countryballBirdSkin"]');
        if (countryballBirdBtn) {
            countryballBirdBtn.disabled = true;
            countryballBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.polandBirdSkin) {
        const polandBirdBtn = document.querySelector('[data-type="polandBirdSkin"]');
        if (polandBirdBtn) {
            polandBirdBtn.disabled = true;
            polandBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.pixil2BirdSkin) {
        const pixil2BirdBtn = document.querySelector('[data-type="pixil2BirdSkin"]');
        if (pixil2BirdBtn) {
            pixil2BirdBtn.disabled = true;
            pixil2BirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.pixil3BirdSkin) {
        const pixil3BirdBtn = document.querySelector('[data-type="pixil3BirdSkin"]');
        if (pixil3BirdBtn) {
            pixil3BirdBtn.disabled = true;
            pixil3BirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.tripleCoins) {
        const tripleCoinsBtn = document.querySelector('[data-type="tripleCoins"]');
        if (tripleCoinsBtn) {
            tripleCoinsBtn.disabled = true;
            tripleCoinsBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.grayBirdSkin) {
        const grayBirdBtn = document.querySelector('[data-type="grayBirdSkin"]');
        if (grayBirdBtn) {
            grayBirdBtn.disabled = true;
            grayBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.cyhnBirdSkin) {
        const cyhnBirdBtn = document.querySelector('[data-type="cyhnBirdSkin"]');
        if (cyhnBirdBtn) {
            cyhnBirdBtn.disabled = true;
            cyhnBirdBtn.textContent = 'Purchased';
        }
    }

    if (upgrades.uncollaredBirdSkin) {
        const uncollaredBirdBtn = document.querySelector('[data-type="uncollaredBirdSkin"]');
        if (uncollaredBirdBtn) {
            uncollaredBirdBtn.disabled = true;
            uncollaredBirdBtn.textContent = 'Purchased';
        }
    }
}

// Modify the buyAllPack function to save upgrades
function buyAllPack() {
    const alreadyPurchased = upgrades.widerPipeGap || upgrades.slowerPipes || upgrades.lowerGravity;
    
    if (alreadyPurchased) {
        alert('You already own some upgrades! Please purchase remaining upgrades individually.');
        return;
    }

    if (coins >= 25000) {
        coins -= 25000;
        updateShopCoinsDisplay();
        
        // Enable all upgrades
        upgrades.widerPipeGap = true;
        upgrades.slowerPipes = true;
        upgrades.lowerGravity = true;
        
        // Automatically activate all upgrades
        activeUpgrades.widerPipeGap = true;
        activeUpgrades.slowerPipes = true;
        activeUpgrades.lowerGravity = true;
        
        // Apply all upgrades
        pipeGap = 180;
        pipeSpeed = 1;
        gravity = 0.05;
        
        saveCoins();
        saveUpgrades();  // Save upgrades after purchase
        updateUpgradesList();
        updateUpgradeButtons();
        alert('All upgrades purchased successfully!');
    } else {
        alert('Not enough coins! You need 25000 coins to purchase the All-in-One Pack.');
    }
}

// Add this function at the top level of your code
function closeShop() {
    const shopMenu = document.getElementById('shopMenu');
    shopMenu.style.display = 'none';
    if (!gameOver) {
        gameRunning = true;
    }
}

// Update the updateShopCoinsDisplay function to also update gambling display
function updateShopCoinsDisplay() {
    const shopCoinsDisplay = document.getElementById('shopCoinsDisplay');
    const gamblingCoinsDisplay = document.getElementById('gamblingCoinsDisplay');
    if (shopCoinsDisplay) {
        shopCoinsDisplay.textContent = coins;
    }
    if (gamblingCoinsDisplay) {
        gamblingCoinsDisplay.textContent = coins;
    }
}

// Add this function with your other hack functions
function addCoins() {
    coins += 5000;
    updateShopCoinsDisplay();
    saveCoins(); // Save the new coin amount
    alert('Added 5000 coins!');
}

// Add these functions after your existing code
function saveUpgrades() {
    const formData = new FormData();
    console.log('Saving upgrades:', upgrades); // Debug log
    formData.append('upgrades', JSON.stringify(upgrades));

    fetch('save_upgrades.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Save response:', data); // Debug log
        if (data.status === 'success') {
            console.log('Upgrades saved successfully');
        } else {
            console.error('Error saving upgrades:', data.message);
        }
    })
    .catch(error => {
        console.error('Error saving upgrades:', error);
    });
}

function loadUpgrades() {
    fetch('get_upgrades.php')
        .then(response => response.json())
        .then(data => {
            console.log('Load response:', data);
            if (data.status === 'success') {
                // Update the upgrades object with saved data
                upgrades = data.upgrades;
                
                // Enable all purchased upgrades by default
                for (const [key, owned] of Object.entries(upgrades)) {
                    if (owned) {
                        activeUpgrades[key] = true;  // Set all owned upgrades to active
                        
                        // Apply upgrade effects immediately
                        switch(key) {
                            case 'widerPipeGap':
                                pipeGap = 180;
                                break;
                            case 'slowerPipes':
                                pipeSpeed = 1;
                                break;
                            case 'lowerGravity':
                                gravity = 0.05;
                                break;
                        }
                    }
                }

                // Set the most recently purchased skin as active
                if (upgrades.oldBirdSkin) {
                    activeUpgrades.oldBirdSkin = true;
                    currentBirdSkin = birdSkins.old;
                } else if (upgrades.makerBirdSkin) {
                    activeUpgrades.makerBirdSkin = true;
                    currentBirdSkin = birdSkins.maker;
                } else if (upgrades.blueBirdSkin) {
                    activeUpgrades.blueBirdSkin = true;
                    currentBirdSkin = birdSkins.blue;
                } else {
                    activeUpgrades.defaultSkin = true;
                    currentBirdSkin = birdSkins.default;
                }

                // Update UI
                updateUpgradeButtons();
                updateUpgradesList();
                
                console.log('Loaded upgrades:', upgrades);
                console.log('Active upgrades:', activeUpgrades);
            } else {
                console.error('Error loading upgrades:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching upgrades:', error);
        });
}

let activeUpgrades = {
    widerPipeGap: false,
    slowerPipes: false,
    lowerGravity: false,
    tripleCoins: false,
    secondChance: false,  // Add the new upgrade
    blueBirdSkin: false,
    makerBirdSkin: false,
    oldBirdSkin: false,
    skyBirdSkin: false,
    gayBirdSkin: false,
    greenBirdSkin: false,
    redBirdSkin: false,
    adminBirdSkin: false,
    juleBirdSkin: false,
    jonesBirdSkin: false,
    monsterBirdSkin: false,
    primoBirdSkin: false,
    omirpBirdSkin: false,
    neergBirdSkin: false,
    danskBirdSkin: false,
    pixilBirdSkin: false,
    ownerBirdSkin: false,
    invisibleBirdSkin: false,
    defaultSkin: true,
    countryballBirdSkin: false,
    polandBirdSkin: false,
    pixil2BirdSkin: false,
    pixil3BirdSkin: false,
    grayBirdSkin: false,
    cyhnBirdSkin: false,
    uncollaredBirdSkin: false,
};

function isUpgradeActive(type) {
    return activeUpgrades[type];
}

function toggleUpgrade(type) {
    if (!upgrades[type]) return;
    
    // Special handling for skins
    if (type === 'blueBirdSkin' || type === 'makerBirdSkin' || type === 'oldBirdSkin') {
        // Disable all other skins first
        if (type === 'blueBirdSkin') {
            activeUpgrades.makerBirdSkin = false;
            activeUpgrades.oldBirdSkin = false;
            activeUpgrades.defaultSkin = false;
        } else if (type === 'makerBirdSkin') {
            activeUpgrades.blueBirdSkin = false;
            activeUpgrades.oldBirdSkin = false;
            activeUpgrades.defaultSkin = false;
        } else if (type === 'oldBirdSkin') {
            activeUpgrades.blueBirdSkin = false;
            activeUpgrades.makerBirdSkin = false;
            activeUpgrades.defaultSkin = false;
        }

        
        // Toggle the selected skin
        activeUpgrades[type] = !activeUpgrades[type];
        
        // Update the bird skin
        if (activeUpgrades[type]) {
            currentBirdSkin = type === 'blueBirdSkin' ? birdSkins.blue : type === 'makerBirdSkin' ? birdSkins.maker : oldBirdImage;
        } else {
            currentBirdSkin = birdSkins.default;
            activeUpgrades.defaultSkin = true;  // Re-enable default skin when disabling others
        }
    } else {
        // Handle non-skin upgrades normally
        activeUpgrades[type] = !activeUpgrades[type];
        
        if (activeUpgrades[type]) {
            switch(type) {
                case 'widerPipeGap':
                    pipeGap = 180;
                    break;
                case 'slowerPipes':
                    pipeSpeed = 1;
                    break;
                case 'lowerGravity':
                    gravity = 0.05;
                    break;
            }
        } else {
            switch(type) {
                case 'widerPipeGap':
                    pipeGap = 150;
                    break;
                case 'slowerPipes':
                    pipeSpeed = 1.5;
                    break;
                case 'lowerGravity':
                    gravity = 0.08;
                    break;
            }
        }
    }
    
    updateUpgradesList();
}

// Update the updateUpgradesList function
function updateUpgradesList() {
    // Update skins grid
    const skinsGrid = document.querySelector('.skins-grid');
    if (skinsGrid) {
        skinsGrid.innerHTML = '';
        
        // Add default skin
        const defaultSkin = createSkinItem('default', birdSkins.default, activeUpgrades.defaultSkin);
        skinsGrid.appendChild(defaultSkin);
        
        // Add blue bird skin if purchased
        if (upgrades.blueBirdSkin) {
            const blueSkin = createSkinItem('blue', birdSkins.blue, activeUpgrades.blueBirdSkin);
            skinsGrid.appendChild(blueSkin);
        }
        
        // Add maker bird skin if purchased
        if (upgrades.makerBirdSkin) {
            const makerSkin = createSkinItem('maker', birdSkins.maker, activeUpgrades.makerBirdSkin);
            skinsGrid.appendChild(makerSkin);
        }

        // Add old bird skin if purchased
        if (upgrades.oldBirdSkin) {
            const oldSkin = createSkinItem('old', birdSkins.old, activeUpgrades.oldBirdSkin);
            skinsGrid.appendChild(oldSkin);
        }

        // Add sky bird skin if purchased
        if (upgrades.skyBirdSkin) {
            const skySkin = createSkinItem('sky', birdSkins.sky, activeUpgrades.skyBirdSkin);
            skinsGrid.appendChild(skySkin);
        }

        // Add gay bird skin if purchased
        if (upgrades.gayBirdSkin) {
            const gaySkin = createSkinItem('gay', birdSkins.gay, activeUpgrades.gayBirdSkin);
            skinsGrid.appendChild(gaySkin);
        }

        // Add green bird skin if purchased
        if (upgrades.greenBirdSkin) {
            const greenSkin = createSkinItem('green', birdSkins.green, activeUpgrades.greenBirdSkin);
            skinsGrid.appendChild(greenSkin);
        }

        // Add red bird skin if purchased
        if (upgrades.redBirdSkin) {
            const redSkin = createSkinItem('red', birdSkins.red, activeUpgrades.redBirdSkin);
            skinsGrid.appendChild(redSkin);
        }

        // Add admin bird skin if purchased
        if (upgrades.adminBirdSkin) {
            const adminSkin = createSkinItem('admin', birdSkins.admin, activeUpgrades.adminBirdSkin);
            skinsGrid.appendChild(adminSkin);
        }

        // Add jule bird skin if purchased
        if (upgrades.juleBirdSkin) {
            const juleSkin = createSkinItem('jule', birdSkins.jule, activeUpgrades.juleBirdSkin);
            skinsGrid.appendChild(juleSkin);
        }

        // Add jones bird skin if purchased
        if (upgrades.jonesBirdSkin) {
            const jonesSkin = createSkinItem('jones', birdSkins.jones, activeUpgrades.jonesBirdSkin);
            skinsGrid.appendChild(jonesSkin);
        }

        // Add monster bird skin if purchased
        if (upgrades.monsterBirdSkin) {
            const monsterSkin = createSkinItem('monster', birdSkins.monster, activeUpgrades.monsterBirdSkin);
            skinsGrid.appendChild(monsterSkin);
        }

        // Add primo bird skin if purchased
        if (upgrades.primoBirdSkin) {
            const primoSkin = createSkinItem('primo', birdSkins.primo, activeUpgrades.primoBirdSkin);
            skinsGrid.appendChild(primoSkin);
        }

        // Add omirp bird skin if purchased
        if (upgrades.omirpBirdSkin) {
            const omirpSkin = createSkinItem('omirp', birdSkins.omirp, activeUpgrades.omirpBirdSkin);
            skinsGrid.appendChild(omirpSkin);
        }

        // Add neerg bird skin if purchased
        if (upgrades.neergBirdSkin) {
            const neergSkin = createSkinItem('neerg', birdSkins.neerg, activeUpgrades.neergBirdSkin);
            skinsGrid.appendChild(neergSkin);
        }

        // Add dansk bird skin if purchased
        if (upgrades.danskBirdSkin) {
            const danskSkin = createSkinItem('dansk', birdSkins.dansk, activeUpgrades.danskBirdSkin);
            skinsGrid.appendChild(danskSkin);
        }

        // Add pixil bird skin if purchased
        if (upgrades.pixilBirdSkin) {
            const pixilSkin = createSkinItem('pixil', birdSkins.pixil, activeUpgrades.pixilBirdSkin);
            skinsGrid.appendChild(pixilSkin);
        }

        // Add owner bird skin if purchased
        if (upgrades.ownerBirdSkin) {
            const ownerSkin = createSkinItem('owner', birdSkins.owner, activeUpgrades.ownerBirdSkin);
            skinsGrid.appendChild(ownerSkin);
        }

        // Add invisible bird skin if purchased
        if (upgrades.invisibleBirdSkin) {
            const invisibleSkin = createSkinItem('invisible', birdSkins.invisible, activeUpgrades.invisibleBirdSkin);
            skinsGrid.appendChild(invisibleSkin);
        }

        // Add countryball bird skin if purchased
        if (upgrades.countryballBirdSkin) {
            const countryballSkin = createSkinItem('countryball', birdSkins.countryball, activeUpgrades.countryballBirdSkin);
            skinsGrid.appendChild(countryballSkin);
        }

        // Add poland bird skin if purchased
        if (upgrades.polandBirdSkin) {
            const polandSkin = createSkinItem('poland', birdSkins.poland, activeUpgrades.polandBirdSkin);
            skinsGrid.appendChild(polandSkin);
        }

        // Add pixil2 bird skin if purchased
        if (upgrades.pixil2BirdSkin) {
            const pixil2Skin = createSkinItem('pixil2', birdSkins.pixil2, activeUpgrades.pixil2BirdSkin);
            skinsGrid.appendChild(pixil2Skin);
        }

        // Add pixil3 bird skin if purchased
        if (upgrades.pixil3BirdSkin) {
            const pixil3Skin = createSkinItem('pixil3', birdSkins.pixil3, activeUpgrades.pixil3BirdSkin);
            skinsGrid.appendChild(pixil3Skin);
        }

        // Add gray bird skin if purchased
        if (upgrades.grayBirdSkin) {
            const graySkin = createSkinItem('gray', birdSkins.gray, activeUpgrades.grayBirdSkin);
            skinsGrid.appendChild(graySkin);
        }

        // Add cyhn bird skin if purchased
        if (upgrades.cyhnBirdSkin) {
            const cyhnSkin = createSkinItem('cyhn', birdSkins.cyhn, activeUpgrades.cyhnBirdSkin);
            skinsGrid.appendChild(cyhnSkin);
        }

        // Add uncollared bird skin if purchased
        if (upgrades.uncollaredBirdSkin) {
            const uncollaredSkin = createSkinItem('uncollared', birdSkins.uncollared, activeUpgrades.uncollaredBirdSkin);
            skinsGrid.appendChild(uncollaredSkin);
        }
    }

    // Update upgrades list
    const sideUpgradesList = document.getElementById('sideUpgradesList');
    if (sideUpgradesList) {
        sideUpgradesList.innerHTML = '';
        
        const upgradeNames = {
            widerPipeGap: 'Wider Pipe Gap',
            slowerPipes: 'Slower Pipes',
            lowerGravity: 'Lower Gravity',
            tripleCoins: '3X Coins',
            secondChance: 'Second Chance'  // Add Second Chance to the list
        };

        for (const [key, name] of Object.entries(upgradeNames)) {
            if (upgrades[key]) {
                const li = document.createElement('li');
                li.className = 'upgrade-item';
                
                const nameSpan = document.createElement('span');
                nameSpan.className = 'upgrade-name';
                nameSpan.textContent = name;
                
                const toggleBtn = document.createElement('button');
                toggleBtn.className = `toggle-btn ${activeUpgrades[key] ? '' : 'disabled'}`;
                toggleBtn.textContent = activeUpgrades[key] ? 'Disable' : 'Enable';
                toggleBtn.onclick = () => toggleUpgrade(key);
                
                li.appendChild(nameSpan);
                li.appendChild(toggleBtn);
                sideUpgradesList.appendChild(li);
            }
        }
    }
}

function createSkinItem(type, src, isActive) {
    const div = document.createElement('div');
    const isOwned = type === 'default' || upgrades[`${type}BirdSkin`];
    div.className = `skin-item ${isActive ? 'selected' : ''} ${!isOwned ? 'locked' : ''}`;
    div.dataset.skin = type;
    
    const img = document.createElement('img');
    img.src = src;
    img.alt = `${type} Bird`;
    
    const overlay = document.createElement('div');
    overlay.className = 'skin-overlay';
    
    const checkmark = document.createElement('span');
    checkmark.className = 'checkmark';
    checkmark.textContent = isOwned ? '✓' : '';
    
    overlay.appendChild(checkmark);
    div.appendChild(img);
    div.appendChild(overlay);
    
    div.onclick = () => {
        if (isOwned) {
            selectSkin(type);
        } else {
            // Show specific price for each skin type
            let price;
            switch(type) {
                case 'admin':
                    price = '100,000';
                    break;
                default:
                    price = '50,000';
                    break;
            }
            alert(`You need to purchase the ${type.charAt(0).toUpperCase() + type.slice(1)} Bird Skin first! Cost: ${price} coins`);
        }
    };
    
    return div;
}

function selectSkin(type) {
    // Check if skin is owned
    const isOwned = type === 'default' || upgrades[`${type}BirdSkin`];
    console.log(`Checking ownership for ${type}: ${isOwned}`);
    if (!isOwned) {
        let price = type === 'admin' ? '100,000' : '50,000';
        alert(`You need to purchase the ${type.charAt(0).toUpperCase() + type.slice(1)} Bird Skin first! Cost: ${price} coins`);
        return;
    }
    
    // Check if clicking on already active skin to unequip
    const isUnequipping = (type === 'default' && activeUpgrades.defaultSkin) ||
                         (type === 'blue' && activeUpgrades.blueBirdSkin) ||
                         (type === 'maker' && activeUpgrades.makerBirdSkin) ||
                         (type === 'old' && activeUpgrades.oldBirdSkin) ||
                         (type === 'sky' && activeUpgrades.skyBirdSkin) ||
                         (type === 'gay' && activeUpgrades.gayBirdSkin) ||
                         (type === 'green' && activeUpgrades.greenBirdSkin) ||
                         (type === 'red' && activeUpgrades.redBirdSkin) ||
                         (type === 'admin' && activeUpgrades.adminBirdSkin) ||
                         (type === 'jule' && activeUpgrades.juleBirdSkin) ||
                         (type === 'jones' && activeUpgrades.jonesBirdSkin) ||
                         (type === 'monster' && activeUpgrades.monsterBirdSkin) ||
                         (type === 'primo' && activeUpgrades.primoBirdSkin) ||
                         (type === 'omirp' && activeUpgrades.omirpBirdSkin) ||
                         (type === 'neerg' && activeUpgrades.neergBirdSkin) ||
                         (type === 'dansk' && activeUpgrades.danskBirdSkin) ||
                         (type === 'pixil' && activeUpgrades.pixilBirdSkin) ||
                         (type === 'owner' && activeUpgrades.ownerBirdSkin) ||
                         (type === 'invisible' && activeUpgrades.invisibleBirdSkin) ||
                         (type === 'countryball' && activeUpgrades.countryballBirdSkin) ||
                         (type === 'poland' && activeUpgrades.polandBirdSkin) ||
                         (type === 'pixil2' && activeUpgrades.pixil2BirdSkin) ||
                         (type === 'pixil3' && activeUpgrades.pixil3BirdSkin) ||
                         (type === 'gray' && activeUpgrades.grayBirdSkin) ||
                         (type === 'cyhn' && activeUpgrades.cyhnBirdSkin) ||
                         (type === 'uncollared' && activeUpgrades.uncollaredBirdSkin);

    // Reset all skin states
    Object.keys(activeUpgrades).forEach(key => {
        if (key.endsWith('BirdSkin') || key === 'defaultSkin') {
            activeUpgrades[key] = false;
        }
    });

    if (isUnequipping) {
        activeUpgrades.defaultSkin = true;
        currentBirdSkin = birdSkins.default;
    } else if (type === 'blue') {
        activeUpgrades.blueBirdSkin = true;
        currentBirdSkin = birdSkins.blue;
    } else if (type === 'maker') {
        activeUpgrades.makerBirdSkin = true;
        currentBirdSkin = birdSkins.maker;
    } else if (type === 'old') {
        activeUpgrades.oldBirdSkin = true;
        currentBirdSkin = birdSkins.old;
    } else if (type === 'sky') {
        activeUpgrades.skyBirdSkin = true;
        activeUpgrades.blueBirdSkin = false;
        activeUpgrades.makerBirdSkin = false;
        activeUpgrades.oldBirdSkin = false;
        activeUpgrades.defaultSkin = false;
        currentBirdSkin = birdSkins.sky;
    } else if (type === 'gay') {
        activeUpgrades.gayBirdSkin = true;
        activeUpgrades.blueBirdSkin = false;
        activeUpgrades.makerBirdSkin = false;
        activeUpgrades.oldBirdSkin = false;
        activeUpgrades.skyBirdSkin = false;
        activeUpgrades.defaultSkin = false;
        currentBirdSkin = birdSkins.gay;
    } else if (type === 'green') {
        activeUpgrades.greenBirdSkin = true;
        currentBirdSkin = birdSkins.green;
    } else if (type === 'red') {
        activeUpgrades.redBirdSkin = true;
        currentBirdSkin = birdSkins.red;
    } else if (type === 'admin') {
        activeUpgrades.adminBirdSkin = true;
        currentBirdSkin = birdSkins.admin;
    } else if (type === 'jule') {
        activeUpgrades.juleBirdSkin = true;
        currentBirdSkin = birdSkins.jule;
    } else if (type === 'jones') {
        activeUpgrades.jonesBirdSkin = true;
        currentBirdSkin = birdSkins.jones;
    } else if (type === 'monster') {
        activeUpgrades.monsterBirdSkin = true;
        currentBirdSkin = birdSkins.monster;
    } else if (type === 'primo') {
        activeUpgrades.primoBirdSkin = true;
        currentBirdSkin = birdSkins.primo;
    } else if (type === 'omirp') {
        activeUpgrades.omirpBirdSkin = true;
        currentBirdSkin = birdSkins.omirp;
    } else if (type === 'neerg') {
        activeUpgrades.neergBirdSkin = true;
        currentBirdSkin = birdSkins.neerg;
    } else if (type === 'dansk') {
        activeUpgrades.danskBirdSkin = true;
        currentBirdSkin = birdSkins.dansk;
    } else if (type === 'pixil') {
        activeUpgrades.pixilBirdSkin = true;
        currentBirdSkin = birdSkins.pixil;
    } else if (type === 'owner') {
        activeUpgrades.ownerBirdSkin = true;
        currentBirdSkin = birdSkins.owner;
    } else if (type === 'invisible') {
        activeUpgrades.invisibleBirdSkin = true;
        currentBirdSkin = birdSkins.invisible;
    } else if (type === 'countryball') {
        activeUpgrades.countryballBirdSkin = true;
        currentBirdSkin = birdSkins.countryball;
    } else if (type === 'poland') {
        activeUpgrades.polandBirdSkin = true;
        currentBirdSkin = birdSkins.poland;
    } else if (type === 'pixil2') {
        activeUpgrades.pixil2BirdSkin = true;
        currentBirdSkin = birdSkins.pixil2;
    } else if (type === 'pixil3') {
        activeUpgrades.pixil3BirdSkin = true;
        currentBirdSkin = birdSkins.pixil3;
    } else if (type === 'gray') {
        activeUpgrades.grayBirdSkin = true;
        currentBirdSkin = birdSkins.gray;
    } else if (type === 'cyhn') {
        activeUpgrades.cyhnBirdSkin = true;
        currentBirdSkin = birdSkins.cyhn;
    } else if (type === 'uncollared') {
        activeUpgrades.uncollaredBirdSkin = true;
        currentBirdSkin = birdSkins.uncollared;
    }
    
    updateUpgradesList();
}

// Add some CSS to style the locked skins
const style = document.createElement('style');
style.textContent = `
    .skin-item.locked {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .skin-item.locked .checkmark {
        color: #ff0000;
    }
    .skin-item:not(.locked) .checkmark {
        color: #00ff00;
    }
`;
document.head.appendChild(style);

// Make sure loadUpgrades is called when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCoins();
    loadUpgrades();
    gameLoop();
});

// Add these functions at the top of your file, before any event listeners
function loadCoins() {
    fetch('get_coins.php')
        .then(response => response.json())
        .then(data => {
            console.log('Coin data received:', data); // Debug log
            if (data.status === 'success') {
                coins = parseInt(data.coins);
                updateCoinsDisplay();
                console.log('Coins loaded:', coins); // Debug log
            } else {
                console.error('Error loading coins:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching coins:', error);
        });
}

function updateCoinsDisplay() {
    const display = document.getElementById('gamblingCoinsDisplay');
    if (display) {
        display.textContent = coins;
        console.log('Display updated with coins:', coins); // Debug log
    }
    // Save to server
    saveCoins();
}

// Add to your skins configuration object/array
const SKINS = {
    // ... other skins ...
    pixilBirdSkin: {
        name: "Pixil Bird Skin",
        price: 50000,
        image: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pixil-frame-0%20(4).png?v=1737713161228"
    },
    pixil2BirdSkin: {
        name: "Pixil2 Bird Skin",
        price: 50000,
        image: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pixil-frame-0%20(6).png?v=1737986940333"
    },
    pixil3BirdSkin: {
        name: "Pixil3 Bird Skin",
        price: 50000,
        image: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/pixil-frame-0%20(5).png?v=1737986945570"
    },
    grayBirdSkin: {
        name: "Gray Bird Skin",
        price: 50000,
        image: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/gray.png?v=1740405202322"
    },
    cyhnBirdSkin: {
        name: "CYHN Bird Skin",
        price: 50000,
        image: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/cyhn.png?v=1740405798099"
    },
    uncollaredBirdSkin: {
        name: "Uncollared Bird Skin",
        price: 50000,
        image: "https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/uncollardbird.png?v=1740671059886"
    }
};

// If you have a function that loads skin images, add:
// ... existing code ...
skinImages.pixilBirdSkin = new Image();
skinImages.pixilBirdSkin.src = SKINS.pixilBirdSkin.image;

// If you have an inventory/purchased items system, you might need to add the skin to the default inventory structure:
const defaultInventory = {
    // ... existing inventory items ...
    pixilBirdSkin: false  // false means not purchased by default
};

// If you have a function that handles skin purchases, make sure it can handle the new skin:
function handleSkinPurchase(skinType) {
    switch(skinType) {
        case 'pixilBirdSkin':
            if (playerCoins >= SKINS.pixilBirdSkin.price) {
                // Purchase logic
            }
            break;
        default:
            console.log('Unknown skin type:', skinType);
    }
}

// If you have a function that applies skins, add the new skin handling:
function applySkin(skinType) {
    switch(skinType) {
        case 'pixilBirdSkin':
            currentBirdImage = skinImages.pixilBirdSkin;
            break;
        default:
            console.log('Unknown skin type:', skinType);
    }
}

// Update the event listener for the locker button
document.getElementById('openLocker').addEventListener('click', function() {
    const sideInventory = document.getElementById('sideInventory');
    sideInventory.style.display = sideInventory.style.display === 'block' ? 'none' : 'block';
});

function updateLeaderboard() {
    fetch('get_leaderboard.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const leaderboardList = document.getElementById('leaderboardList');
                leaderboardList.innerHTML = '';

                data.leaderboard.forEach((entry, index) => {
                    const li = document.createElement('li');
                    // Get profile pic from the entry, fallback to default if not available
                    const profilePic = entry.profile_pic || 'https://cdn.glitch.global/c3af7ac1-befa-43f4-a580-dee2646df58c/sigma.png?v=1740408925158';
                    li.innerHTML = `
                        <div class="leaderboard-entry">
                            <img src="${profilePic}" alt="Profile" class="leaderboard-profile-pic">
                            <span class="player-name">${index + 1}. ${entry.username}</span>
                            <span class="player-score">${entry.high_score}</span>
                        </div>
                    `;
                    leaderboardList.appendChild(li);
                });
            } else {
                console.error('Error loading leaderboard:', data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching leaderboard:', error);
        });
}

// Add these new functions
function populateGiftSkinOptions() {
    const giftSkin = document.getElementById('giftSkin');
    if (!giftSkin) return;
    
    // Clear existing options
    giftSkin.innerHTML = '';
    
    // Create a more organized list of skins with proper display names
    const skinsList = [
        { value: 'blueBirdSkin', name: 'Blue Bird' },
        { value: 'skyBirdSkin', name: 'Sky Bird' },
        { value: 'makerBirdSkin', name: 'Maker Bird' },
        { value: 'oldBirdSkin', name: 'Old Bird' },
        { value: 'gayBirdSkin', name: 'Gay Bird' },
        { value: 'greenBirdSkin', name: 'Green Bird' },
        { value: 'redBirdSkin', name: 'Red Bird' },
        { value: 'adminBirdSkin', name: 'Admin Bird' },
        { value: 'juleBirdSkin', name: 'Jule Bird' },
        { value: 'jonesBirdSkin', name: 'Jones Bird' },
        { value: 'monsterBirdSkin', name: 'Monster Bird' },
        { value: 'primoBirdSkin', name: 'Primo Bird' },
        { value: 'omirpBirdSkin', name: 'Omirp Bird' },
        { value: 'neergBirdSkin', name: 'Neerg Bird' },
        { value: 'danskBirdSkin', name: 'Dansk Bird' },
        { value: 'pixilBirdSkin', name: 'Pixil Bird' },
        { value: 'ownerBirdSkin', name: 'Owner Bird' },
        { value: 'invisibleBirdSkin', name: 'Invisible Bird' },
        { value: 'countryballBirdSkin', name: 'Countryball Bird' },
        { value: 'polandBirdSkin', name: 'Poland Bird' },
        { value: 'pixil2BirdSkin', name: 'Pixil2 Bird' },
        { value: 'pixil3BirdSkin', name: 'Pixil3 Bird' },
        { value: 'grayBirdSkin', name: 'Gray Bird' },
        { value: 'cyhnBirdSkin', name: 'CYHN Bird' },
        { value: 'uncollaredBirdSkin', name: 'Uncollared Bird' }
    ];
    
    // Add each skin as an option
    skinsList.forEach(skin => {
        const option = document.createElement('option');
        option.value = skin.value;
        option.textContent = skin.name;
        giftSkin.appendChild(option);
    });
}

// Update sendGift function to only handle skins
function sendGift() {
    const username = document.getElementById('giftUsername').value;
    
    if (!username) {
        alert('Please select a player!');
        return;
    }
    
    // For skins, get the value from the giftSkin select
    const skinSelect = document.getElementById('giftSkin');
    if (!skinSelect || !skinSelect.value) {
        alert('Please select a skin!');
        return;
    }
    
    // Send skin gift
    fetch('send_gift.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'skin',
            username: username,
            skin: skinSelect.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(`Successfully sent ${skinSelect.options[skinSelect.selectedIndex].text} to ${username}!`);
        } else {
            alert('Error sending gift: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending gift!');
    });
}

// Add this new function
function populatePlayersList(selectId = 'giftUsername') {
    const playerSelect = document.getElementById(selectId);
    
    fetch('get_players.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                playerSelect.innerHTML = '<option value="">Select a player</option>';
                
                data.players.forEach(player => {
                    const option = document.createElement('option');
                    option.value = player;
                    option.textContent = player;
                    playerSelect.appendChild(option);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching players:', error);
        });
}

// When opening the gift panel, populate the skins immediately
document.getElementById('hackMenu')?.addEventListener('click', function(e) {
    if (e.target.id === 'openGiftPanel') {
        populateGiftSkinOptions();
        populatePlayersList();
    }
});

// Add this new function for sending coin gifts
function sendCoinGift() {
    const username = document.getElementById('coinGiftUsername').value;
    const amount = parseInt(document.getElementById('coinAmount').value);
    
    if (!username) {
        alert('Please select a player!');
        return;
    }
    
    if (!amount) {
        alert('Please select an amount!');
        return;
    }
    
    // Send coin gift
    fetch('send_gift.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'coins',
            username: username,
            amount: amount
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(`Successfully sent ${amount.toLocaleString()} coins to ${username}!`);
        } else {
            alert('Error sending gift: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error sending gift!');
    });
}

