document.addEventListener('DOMContentLoaded', function() {
    // Initialize the trading system
    loadUserData();
    loadPlayers();
    loadUserSkins();
    loadGiftHistory();
    
    // Add event listeners
    document.getElementById('tradePartner').addEventListener('change', onPartnerSelect);
    document.getElementById('proposeTrade').addEventListener('click', proposeTrade);
    document.getElementById('cancelTrade').addEventListener('click', cancelTrade);
    
    // Start updating trade boxes
    startUpdating();
});

function loadUserData() {
    // Load user's skins and coins
    fetch('get_user_inventory.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Add this line to update the coin display
                document.getElementById('userCoins').textContent = data.coins;
                
                // Populate user's skins
                const yourSkins = document.getElementById('yourSkins');
                data.skins.forEach(skin => {
                    const option = document.createElement('option');
                    option.value = skin.id;
                    option.textContent = skin.name;
                    yourSkins.appendChild(option);
                });
                
                // Update user's coin balance
                document.getElementById('yourBalance').textContent = data.coins;
            }
        })
        .catch(error => console.error('Error loading user data:', error));
}

function loadPlayers() {
    fetch('get_players.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const skinGiftPlayer = document.getElementById('skinGiftPlayer');
                const coinGiftPlayer = document.getElementById('coinGiftPlayer');
                
                data.players.forEach(player => {
                    // Add to skin gift select
                    const skinOption = document.createElement('option');
                    skinOption.value = player;
                    skinOption.textContent = player;
                    skinGiftPlayer.appendChild(skinOption);
                    
                    // Add to coin gift select
                    const coinOption = document.createElement('option');
                    coinOption.value = player;
                    coinOption.textContent = player;
                    coinGiftPlayer.appendChild(coinOption);
                });
            }
        })
        .catch(error => console.error('Error loading players:', error));
}

function loadUserSkins() {
    fetch('get_user_inventory.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const skinSelect = document.getElementById('skinSelect');
                data.skins.forEach(skin => {
                    const option = document.createElement('option');
                    option.value = skin.id;
                    option.textContent = skin.name;
                    skinSelect.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error loading skins:', error));
}

function onPartnerSelect(e) {
    const partner = e.target.value;
    if (partner) {
        // Load partner's inventory
        fetch(`get_player_inventory.php?username=${partner}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    // Show partner's offer section
                    document.getElementById('partnerOfferContent').style.display = 'block';
                    
                    // Populate partner's skins
                    const partnerSkins = document.getElementById('partnerSkins');
                    partnerSkins.innerHTML = ''; // Clear existing options
                    data.skins.forEach(skin => {
                        const option = document.createElement('option');
                        option.value = skin.id;
                        option.textContent = skin.name;
                        partnerSkins.appendChild(option);
                    });
                    
                    // Update partner's coin balance
                    document.getElementById('partnerBalance').textContent = data.coins;
                }
            })
            .catch(error => console.error('Error loading partner data:', error));
    } else {
        document.getElementById('partnerOfferContent').style.display = 'none';
    }
}

function proposeTrade() {
    const tradeData = {
        partner: document.getElementById('tradePartner').value,
        yourOffer: {
            skins: Array.from(document.getElementById('yourSkins').selectedOptions).map(opt => opt.value),
            coins: parseInt(document.getElementById('yourCoins').value) || 0
        },
        partnerOffer: {
            skins: Array.from(document.getElementById('partnerSkins').selectedOptions).map(opt => opt.value),
            coins: parseInt(document.getElementById('partnerCoins').value) || 0
        }
    };

    if (!tradeData.partner) {
        showStatus('Please select a trade partner', 'error');
        return;
    }

    fetch('propose_trade.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tradeData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showStatus('Trade proposal sent!', 'success');
        } else {
            showStatus(data.message || 'Error proposing trade', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showStatus('Error proposing trade', 'error');
    });
}

function cancelTrade() {
    // Reset form
    document.getElementById('tradePartner').value = '';
    document.getElementById('yourSkins').selectedIndex = -1;
    document.getElementById('yourCoins').value = '';
    document.getElementById('partnerSkins').selectedIndex = -1;
    document.getElementById('partnerCoins').value = '';
    document.getElementById('partnerOfferContent').style.display = 'none';
    document.getElementById('tradeStatus').textContent = '';
}

function showStatus(message, type) {
    // Create a status div if it doesn't exist
    let statusDiv = document.getElementById('tradeStatus');
    if (!statusDiv) {
        statusDiv = document.createElement('div');
        statusDiv.id = 'tradeStatus';
        document.querySelector('.trading-container').appendChild(statusDiv);
    }
    
    statusDiv.textContent = message;
    statusDiv.className = 'trade-status ' + type;
    
    // Clear the message after 3 seconds
    setTimeout(() => {
        statusDiv.textContent = '';
        statusDiv.className = 'trade-status';
    }, 3000);
}

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
});

// JavaScript for toggling the navigation menu on mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

let activeBoxes = {
    1: { slot1: null, slot2: null },
    2: { slot1: null, slot2: null },
    3: { slot1: null, slot2: null },
    4: { slot1: null, slot2: null }
};

let updateInterval = null;

function startUpdating() {
    // Clear any existing interval
    if (updateInterval) {
        clearInterval(updateInterval);
    }
    
    // Update immediately
    updateTradeBoxes();
    
    // Then update every 3 seconds
    updateInterval = setInterval(updateTradeBoxes, 3000);
}

function updateTradeBoxes() {
    fetch('get_active_trades.php')
        .then(response => response.json())
        .then(data => {
            console.log('Received trade data:', data); // Debug log
            if (data.status === 'success') {
                // Update each box with current players
                activeBoxes = data.trades;
                
                // Update the display for all boxes
                for (let boxNumber = 1; boxNumber <= 4; boxNumber++) {
                    const box = activeBoxes[boxNumber];
                    const boxElement = document.getElementById(`box${boxNumber}`);
                    
                    // Update slot 1
                    const slot1Element = boxElement.querySelector(`[data-slot="1"]`);
                    if (box && box.slot1) {
                        slot1Element.innerHTML = `
                            <p>${box.slot1}</p>
                            <button class="join-btn" onclick="leaveSlot(${boxNumber}, 1)">Leave</button>
                        `;
                    } else {
                        slot1Element.innerHTML = `
                            <p>Empty Slot</p>
                            <button class="join-btn" onclick="joinSlot(${boxNumber}, 1)">Join</button>
                        `;
                    }
                    
                    // Update slot 2
                    const slot2Element = boxElement.querySelector(`[data-slot="2"]`);
                    if (box && box.slot2) {
                        slot2Element.innerHTML = `
                            <p>${box.slot2}</p>
                            <button class="join-btn" onclick="leaveSlot(${boxNumber}, 2)">Leave</button>
                        `;
                    } else {
                        slot2Element.innerHTML = `
                            <p>Empty Slot</p>
                            <button class="join-btn" onclick="joinSlot(${boxNumber}, 2)">Join</button>
                        `;
                    }

                    // Show trade interface if both slots are filled
                    if (box && box.slot1 && box.slot2) {
                        initiateTrade(boxNumber, box.slot1, box.slot2);
                    }
                }
            }
        })
        .catch(error => {
            console.error('Error updating trade boxes:', error);
        });
}

function joinSlot(boxNumber, slotNumber) {
    console.log('Attempting to join box:', boxNumber, 'slot:', slotNumber);
    
    fetch('get_current_player.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            try {
                return JSON.parse(text);
            } catch (e) {
                console.error('JSON parse error:', e);
                throw new Error('Invalid JSON response');
            }
        })
        .then(data => {
            if (data.status !== 'success') {
                showStatus('You must be logged in to trade', 'error');
                return;
            }

            // Save the slot assignment to the server
            fetch('update_trade_slot.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    boxNumber: boxNumber,
                    slotNumber: slotNumber,
                    username: data.username,
                    action: 'join'
                })
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    showStatus('Successfully joined the trading box', 'success');
                    updateTradeBoxes(); // Update immediately after joining
                } else {
                    showStatus(result.message || 'Error joining slot', 'error');
                }
            });
        })
        .catch(error => {
            console.error('Error joining slot:', error);
            showStatus('Error: Make sure you are logged in', 'error');
        });
}

function updateSlotDisplay(boxNumber, slotNumber, username) {
    const slot = document.querySelector(`[data-box="${boxNumber}"][data-slot="${slotNumber}"]`);
    slot.innerHTML = `
        <p>${username}</p>
        <button class="join-btn" onclick="leaveSlot(${boxNumber}, ${slotNumber})">Leave</button>
    `;
}

function leaveSlot(boxNumber, slotNumber) {
    fetch('update_trade_slot.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            boxNumber: boxNumber,
            slotNumber: slotNumber,
            action: 'leave'
        })
    })
    .then(response => response.json())
    .then(result => {
        if (result.status === 'success') {
            // Reset the slot display
            const slotElement = document.querySelector(`[data-box="${boxNumber}"][data-slot="${slotNumber}"]`);
            slotElement.innerHTML = `
                <p>Empty Slot</p>
                <button class="join-btn" onclick="joinSlot(${boxNumber}, ${slotNumber})">Join</button>
            `;
            
            // Hide trade area if it was visible
            document.getElementById(`tradeArea${boxNumber}`).style.display = 'none';
            
            updateTradeBoxes(); // Update immediately after leaving
        }
    });
}

function initiateTrade(boxNumber, player1, player2) {
    const tradeArea = document.getElementById(`tradeArea${boxNumber}`);
    tradeArea.style.display = 'block';
    tradeArea.innerHTML = `
        <div class="trade-interface">
            <div class="player-offer">
                <h3>${player1}'s Offer</h3>
                <select multiple id="player1Skins${boxNumber}" class="trade-select">
                    <!-- Will be populated with player's skins -->
                </select>
                <input type="number" id="player1Coins${boxNumber}" placeholder="Enter coins amount" min="0">
            </div>
            <div class="player-offer">
                <h3>${player2}'s Offer</h3>
                <select multiple id="player2Skins${boxNumber}" class="trade-select">
                    <!-- Will be populated with player's skins -->
                </select>
                <input type="number" id="player2Coins${boxNumber}" placeholder="Enter coins amount" min="0">
            </div>
            <div class="trade-controls">
                <button onclick="confirmTrade(${boxNumber})" class="trade-button">Confirm Trade</button>
                <button onclick="cancelTrade(${boxNumber})" class="cancel-button">Cancel</button>
            </div>
        </div>
    `;

    // Load both players' inventories
    loadPlayerInventory(boxNumber, player1, 1);
    loadPlayerInventory(boxNumber, player2, 2);
}

function loadPlayerInventory(boxNumber, username, playerNumber) {
    fetch(`get_player_inventory.php?username=${username}`)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const select = document.getElementById(`player${playerNumber}Skins${boxNumber}`);
                select.innerHTML = '';
                data.skins.forEach(skin => {
                    const option = document.createElement('option');
                    option.value = skin.id;
                    option.textContent = skin.name;
                    select.appendChild(option);
                });
            }
        })
        .catch(error => console.error('Error loading inventory:', error));
}

function confirmTrade(boxNumber) {
    const box = activeBoxes[boxNumber];
    const tradeData = {
        player1: {
            username: box.slot1,
            skins: Array.from(document.getElementById(`player1Skins${boxNumber}`).selectedOptions).map(opt => opt.value),
            coins: parseInt(document.getElementById(`player1Coins${boxNumber}`).value) || 0
        },
        player2: {
            username: box.slot2,
            skins: Array.from(document.getElementById(`player2Skins${boxNumber}`).selectedOptions).map(opt => opt.value),
            coins: parseInt(document.getElementById(`player2Coins${boxNumber}`).value) || 0
        }
    };

    fetch('execute_trade.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tradeData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showStatus('Trade completed successfully!', 'success');
            resetTradeBox(boxNumber);
        } else {
            showStatus(data.message || 'Error completing trade', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showStatus('Error completing trade', 'error');
    });
}

function resetTradeBox(boxNumber) {
    // Clear the trade area
    document.getElementById(`tradeArea${boxNumber}`).style.display = 'none';
    
    // Reset both slots
    leaveSlot(boxNumber, 1);
    leaveSlot(boxNumber, 2);
    
    // Clear the activeBoxes data
    activeBoxes[boxNumber] = { slot1: null, slot2: null };
}

function sendSkinGift() {
    const player = document.getElementById('skinGiftPlayer').value;
    const selectedSkins = Array.from(document.getElementById('skinSelect').selectedOptions).map(opt => opt.value);
    
    if (!player) {
        showStatus('Please select a player', 'error');
        return;
    }
    
    if (selectedSkins.length === 0) {
        showStatus('Please select at least one skin', 'error');
        return;
    }
    
    fetch('send_gift2.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'skin',
            username: player,
            skins: selectedSkins
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showStatus('Skin gift sent successfully!', 'success');
            loadUserSkins(); // Reload the sender's skins
            loadGiftHistory();
        } else {
            showStatus(data.message || 'Error sending gift', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showStatus('Error sending gift', 'error');
    });
}

function sendCoinGift() {
    const player = document.getElementById('coinGiftPlayer').value;
    const amount = parseInt(document.getElementById('coinAmount').value);
    
    if (!player) {
        showStatus('Please select a player', 'error');
        return;
    }
    
    if (!amount || amount <= 0) {
        showStatus('Please enter a valid coin amount', 'error');
        return;
    }
    
    fetch('send_gift2.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            type: 'coins',
            username: player,
            amount: amount
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showStatus('Coins sent successfully!', 'success');
            loadUserData(); // Reload the sender's coin balance
            loadGiftHistory();
            // Clear the input
            document.getElementById('coinAmount').value = '';
        } else {
            showStatus(data.message || 'Error sending coins', 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showStatus('Error sending coins', 'error');
    });
}

function loadGiftHistory() {
    fetch('get_gift_history.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                const historyDiv = document.getElementById('giftHistory');
                historyDiv.innerHTML = data.history.map(gift => `
                    <div class="gift-history-item">
                        <div>${gift.message}</div>
                        <div class="timestamp">${gift.timestamp}</div>
                    </div>
                `).join('');
            }
        })
        .catch(error => console.error('Error loading gift history:', error));
}