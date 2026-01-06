// Game State Management
class GameState {
    constructor() {
        this.currentScreen = 'loading';
        this.player = {
            name: 'Лёха',
            inventory: [],
            completedQuests: [],
            currentLocation: 'kremlin',
            progress: 0,
            achievements: []
        };
        this.gameData = {
            locations: {},
            characters: {},
            quests: {},
            items: {},
            achievements: {
                "first_item": {
                    "id": "first_item",
                    "name": "Первое открытие",
                    "description": "Найдите первый предмет в игре",
                    "icon": "🔍",
                    "unlocked": false
                },
                "quest_master": {
                    "id": "quest_master",
                    "name": "Мастер квестов",
                    "description": "Выполните все квесты в игре",
                    "icon": "🏆",
                    "unlocked": false
                },
                "collector": {
                    "id": "collector",
                    "name": "Коллекционер",
                    "description": "Соберите все предметы в игре",
                    "icon": "💎",
                    "unlocked": false
                },
                "explorer": {
                    "id": "explorer",
                    "name": "Исследователь",
                    "description": "Посетите все локации в игре",
                    "icon": "🗺️",
                    "unlocked": false
                },
                "historian": {
                    "id": "historian",
                    "name": "Историк",
                    "description": "Прочитайте всю информацию о локациях",
                    "icon": "📚",
                    "unlocked": false
                },
                "social_butterfly": {
                    "id": "social_butterfly",
                    "name": "Социальная бабочка",
                    "description": "Поделитесь игрой с друзьями",
                    "icon": "🦋",
                    "unlocked": false
                }
            }
        };
        this.miniGames = {
            kremlin_wall_building: {
                steps: [
                    {
                        question: 'Выбери первый элемент для строительства стены Кремля:',
                        choices: [
                            { text: 'Основание', correct: true },
                            { text: 'Крыша', correct: false },
                            { text: 'Двери', correct: false }
                        ]
                    },
                    {
                        question: 'Теперь выбери материал для стен:',
                        choices: [
                            { text: 'Кирпичи', correct: true },
                            { text: 'Дерево', correct: false },
                            { text: 'Стекло', correct: false }
                        ]
                    },
                    {
                        question: 'Заверши стену, добавив:',
                        choices: [
                            { text: 'Башню', correct: true },
                            { text: 'Окна', correct: false },
                            { text: 'Фонтан', correct: false }
                        ]
                    }
                ]
            },
            trade_route: {
                steps: [
                    {
                        question: 'Торговый караван плывет по рекам. Какой путь выбрать первым?',
                        choices: [
                            { text: 'По реке Великой', correct: true },
                            { text: 'Через лес', correct: false },
                            { text: 'По суше', correct: false }
                        ]
                    },
                    {
                        question: 'Встретили развилку. Куда повернуть?',
                        choices: [
                            { text: 'К Пскову', correct: true },
                            { text: 'В обратную сторону', correct: false },
                            { text: 'В лес', correct: false }
                        ]
                    },
                    {
                        question: 'Достигли цели. Что привезли купцы?',
                        choices: [
                            { text: 'Шелк и специи', correct: true },
                            { text: 'Дерево', correct: false },
                            { text: 'Оружие', correct: false }
                        ]
                    }
                ]
            },
            archaeological_excavations: {
                steps: [
                    {
                        question: 'Где начать раскопки в Довмонтовом городе?',
                        choices: [
                            { text: 'У стен крепости', correct: true },
                            { text: 'В центре площади', correct: false },
                            { text: 'У реки', correct: false }
                        ]
                    },
                    {
                        question: 'Нашли древний предмет. Что это?',
                        choices: [
                            { text: 'Меч князя Довмонта', correct: true },
                            { text: 'Современная монета', correct: false },
                            { text: 'Камень', correct: false }
                        ]
                    },
                    {
                        question: 'Что еще нашли в раскопках?',
                        choices: [
                            { text: 'Археологические артефакты', correct: true },
                            { text: 'Золото', correct: false },
                            { text: 'Современные вещи', correct: false }
                        ]
                    }
                ]
            },
            tower_defense: {
                steps: [
                    {
                        question: 'Враги приближаются к Гремячей башне. Что делать первым?',
                        choices: [
                            { text: 'Закрыть ворота', correct: true },
                            { text: 'Бежать', correct: false },
                            { text: 'Сдаваться', correct: false }
                        ]
                    },
                    {
                        question: 'Враги у стен. Как защититься?',
                        choices: [
                            { text: 'Бросать камни сверху', correct: true },
                            { text: 'Открыть ворота', correct: false },
                            { text: 'Спрятаться', correct: false }
                        ]
                    },
                    {
                        question: 'Враги отступили. Что узнали о башне?',
                        choices: [
                            { text: 'Легенды о ее обороне', correct: true },
                            { text: 'Как ее разрушить', correct: false },
                            { text: 'Где спрятаны сокровища', correct: false }
                        ]
                    }
                ]
            },
            museum_detective: {
                steps: [
                    {
                        question: 'В музее нашли древний манускрипт. Что в нем зашифровано?',
                        choices: [
                            { text: 'Местоположение клада', correct: true },
                            { text: 'Рецепт пирога', correct: false },
                            { text: 'Список покупок', correct: false }
                        ]
                    },
                    {
                        question: 'Расшифровали символы. Где искать клад?',
                        choices: [
                            { text: 'В Довмонтовом городе', correct: true },
                            { text: 'В Кремле', correct: false },
                            { text: 'На набережной', correct: false }
                        ]
                    },
                    {
                        question: 'Нашли клад. Что в нем было?',
                        choices: [
                            { text: 'Исторические артефакты', correct: true },
                            { text: 'Золото', correct: false },
                            { text: 'Современные вещи', correct: false }
                        ]
                    }
                ]
            }
        };
        this.currentMiniGame = null;
        this.miniGameStep = 0;
        this.dialogState = {
            active: false,
            character: null,
            text: '',
            choices: []
        };
    }

    // Update loading progress
    updateLoadingProgress(percent) {
        const progressBar = document.querySelector('.loading-progress');
        const loadingText = document.querySelector('.loading-text');

        if (progressBar) {
            progressBar.style.width = `${percent}%`;
        }

        if (loadingText) {
            loadingText.textContent = `Загрузка... ${percent}%`;
        }
    }

    // Initialize game
    async init() {
        // Show loading screen
        this.showScreen('loading');
        this.updateLoadingProgress(10);

        // Initialize audio system
        await window.audioManager.init();
        this.updateLoadingProgress(30);

        // Load game data
        await this.loadGameData();
        this.updateLoadingProgress(70);

        // Setup UI and event listeners
        this.setupEventListeners();
        this.updateLoadingProgress(85);

        // Initialize Telegram integration
        this.initTelegramIntegration();
        this.updateLoadingProgress(95);

        // Show menu screen
        setTimeout(() => {
            this.showScreen('menu');
            window.audioManager.playMusic('menu', true);
        }, 500);
    }

    // Load game data from JSON files
    async loadGameData() {
        try {
            const [locationsRes, charactersRes, questsRes, itemsRes] = await Promise.all([
                fetch('data/locations.json'),
                fetch('data/characters.json'),
                fetch('data/quests.json'),
                fetch('data/items.json')
            ]);

            this.gameData.locations = await locationsRes.json();
            this.gameData.characters = await charactersRes.json();
            this.gameData.quests = await questsRes.json();
            this.gameData.items = await itemsRes.json();

            console.log('Game data loaded successfully');
        } catch (error) {
            console.error('Error loading game data:', error);
            // Fallback to empty data
            this.gameData = {
                locations: {},
                characters: {},
                quests: {},
                items: {}
            };
        }
    }

    // Screen management
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;

            // Update screen content
            this.updateScreenContent(screenId);

            // Play appropriate music for the screen
            this.updateMusicForScreen(screenId);
        }
    }

    updateMusicForScreen(screenId) {
        // Change music based on the current screen
        switch (screenId) {
            case 'menu':
                window.audioManager.playMusic('menu', true);
                break;
            case 'game':
                // Play background music for exploration
                window.audioManager.playMusic('background', true);
                break;
            case 'inventory':
            case 'map':
            case 'quests':
            case 'help':
                // Keep current music (no change)
                break;
        }
    }

    updateScreenContent(screenId) {
        switch (screenId) {
            case 'game':
                this.updateGameScreen();
                break;
            case 'inventory':
                this.updateInventoryScreen();
                break;
            case 'map':
                this.updateMapScreen();
                break;
            case 'quests':
                this.updateQuestsScreen();
                break;
        }
    }

    // Game screen updates
    updateGameScreen() {
        const location = this.gameData.locations[this.player.currentLocation];
        if (location) {
            const locationImage = document.querySelector('.location-image');
            locationImage.style.backgroundImage = `url('${location.image || 'images/locations/default.jpg'}')`;

            const locationInfo = document.querySelector('.location-info');
            locationInfo.innerHTML = `
                <h3>${location.name}</h3>
                <p>${location.description}</p>
            `;
        }

        // Add staggered animation to action buttons
        const actionButtons = document.querySelectorAll('.action-btn');
        actionButtons.forEach((btn, index) => {
            btn.style.animationDelay = `${index * 0.2}s`;
            btn.classList.add('slide-in-up');
        });
    }

    // Inventory screen updates
    updateInventoryScreen() {
        const inventoryGrid = document.querySelector('.inventory-grid');
        inventoryGrid.innerHTML = '';

        // Get all items
        Object.values(this.gameData.items).forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = `inventory-item ${this.player.inventory.includes(item.id) ? 'collected' : ''}`;
            itemElement.innerHTML = item.icon || '📦';
            itemElement.title = item.name;

            // Add staggered animation
            itemElement.style.animationDelay = `${index * 0.1}s`;
            itemElement.classList.add('fade-in');

            itemElement.addEventListener('click', () => {
                if (this.player.inventory.includes(item.id)) {
                    this.showItemDialog(item);
                }
            });

            inventoryGrid.appendChild(itemElement);
        });
    }

    // Map screen updates
    updateMapScreen() {
        const mapContent = document.querySelector('.map-content');

        // Create interactive map if it doesn't exist
        if (!mapContent.querySelector('.interactive-map')) {
            const mapContainer = document.createElement('div');
            mapContainer.className = 'interactive-map';

            // Create map background
            const mapBg = document.createElement('div');
            mapBg.className = 'map-background';
            mapBg.style.backgroundImage = 'url("images/map/pskov_map.jpg")';
            mapBg.style.backgroundSize = 'contain';
            mapBg.style.backgroundPosition = 'center';
            mapBg.style.backgroundRepeat = 'no-repeat';
            mapBg.style.width = '100%';
            mapBg.style.height = '100%';
            mapBg.style.position = 'relative';

            // Add location markers
            Object.values(this.gameData.locations).forEach(location => {
                const marker = document.createElement('div');
                marker.className = 'location-marker';
                marker.style.position = 'absolute';
                marker.style.left = `${location.coordinates.x}px`;
                marker.style.top = `${location.coordinates.y}px`;
                marker.style.width = '20px';
                marker.style.height = '20px';
                marker.style.borderRadius = '50%';
                marker.style.backgroundColor = this.player.currentLocation === location.id ? '#27ae60' : '#3498db';
                marker.style.border = '2px solid white';
                marker.style.cursor = 'pointer';
                marker.style.transform = 'translate(-50%, -50%)';
                marker.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
                marker.style.transition = 'all 0.2s ease';
                marker.title = location.name;

                // Add click event
                marker.addEventListener('click', () => {
                    // Haptic feedback
                    if (window.tgAPI) {
                        window.tgAPI.hapticFeedback('selection');
                    }

                    // Show location info
                    this.showDialog('Карта', `${location.name}

${location.description}`, [
                        {
                            text: 'Перейти',
                            action: {
                                type: 'change_location',
                                locationId: location.id
                            }
                        },
                        {
                            text: 'Отмена',
                            action: null
                        }
                    ]);
                });

                // Add hover effect
                marker.addEventListener('mouseenter', () => {
                    marker.style.transform = 'translate(-50%, -50%) scale(1.2)';
                });

                marker.addEventListener('mouseleave', () => {
                    marker.style.transform = 'translate(-50%, -50%) scale(1)';
                });

                mapBg.appendChild(marker);
            });

            mapContainer.appendChild(mapBg);
            mapContent.innerHTML = '';
            mapContent.appendChild(mapContainer);
        }

        // Update markers based on current location
        const markers = document.querySelectorAll('.location-marker');
        markers.forEach(marker => {
            // Find corresponding location
            const locationName = marker.title;
            const location = Object.values(this.gameData.locations).find(loc => loc.name === locationName);

            if (location) {
                marker.style.backgroundColor = this.player.currentLocation === location.id ? '#27ae60' : '#3498db';
            }
        });
    }

    // Quests screen updates
    updateQuestsScreen() {
        const questsList = document.querySelector('.quests-list');
        questsList.innerHTML = '';

        Object.values(this.gameData.quests).forEach((quest, index) => {
            const questElement = document.createElement('div');
            questElement.className = `quest-item ${this.player.completedQuests.includes(quest.id) ? 'completed' : ''}`;

            // Add staggered animation
            questElement.style.animationDelay = `${index * 0.15}s`;
            questElement.classList.add('slide-in-left');

            questElement.innerHTML = `
                <h4>${quest.name}</h4>
                <p>${quest.description}</p>
            `;

            questsList.appendChild(questElement);
        });
    }

    // Dialog system
    showDialog(character, text, choices = []) {
        this.dialogState = {
            active: true,
            character: character,
            text: text,
            choices: choices
        };

        this.updateDialogDisplay();
        const dialogWindow = document.querySelector('.dialog-window');
        dialogWindow.classList.remove('hidden');
        dialogWindow.classList.add('slide-in-bottom');
    }

    hideDialog() {
        this.dialogState.active = false;
        document.querySelector('.dialog-window').classList.add('hidden');
    }

    updateDialogDisplay() {
        const dialogWindow = document.querySelector('.dialog-window');
        const characterElement = dialogWindow.querySelector('.dialog-character');
        const textElement = dialogWindow.querySelector('.dialog-text');
        const choicesElement = dialogWindow.querySelector('.dialog-choices');

        if (this.dialogState.character) {
            characterElement.textContent = this.dialogState.character;
        }

        textElement.textContent = this.dialogState.text;

        choicesElement.innerHTML = '';
        this.dialogState.choices.forEach(choice => {
            const choiceElement = document.createElement('button');
            choiceElement.className = 'dialog-choice';
            choiceElement.textContent = choice.text;
            choiceElement.addEventListener('click', () => {
                this.handleDialogChoice(choice);
            });
            choicesElement.appendChild(choiceElement);
        });
    }

    handleDialogChoice(choice) {
        // Handle choice logic here
        console.log('Dialog choice selected:', choice);

        if (choice.action) {
            this.executeAction(choice.action);
        }

        if (choice.nextDialog) {
            this.showDialog(choice.nextDialog.character, choice.nextDialog.text, choice.nextDialog.choices);
        } else {
            this.hideDialog();
        }
    }

    // Action system
    executeAction(action) {
        switch (action.type) {
            case 'add_item':
                if (!this.player.inventory.includes(action.itemId)) {
                    this.player.inventory.push(action.itemId);
                    this.showNotification(`Получен предмет: ${this.gameData.items[action.itemId]?.name || action.itemId}`);

                    // Play discovery sound
                    window.audioManager.playSfx('discovery');

                    // Haptic feedback
                    if (window.tgAPI) {
                        window.tgAPI.hapticFeedback('notification');
                    }
                }
                break;
            case 'complete_quest':
                if (!this.player.completedQuests.includes(action.questId)) {
                    this.player.completedQuests.push(action.questId);
                    this.showNotification(`Квест выполнен: ${this.gameData.quests[action.questId]?.name || action.questId}`);

                    // Play quest complete sound
                    window.audioManager.playSfx('quest_complete');

                    // Haptic feedback
                    if (window.tgAPI) {
                        window.tgAPI.hapticFeedback('notification');
                    }
                }
                break;
            case 'change_location':
                this.player.currentLocation = action.locationId;
                this.updateGameScreen();

                // Play transition sound
                window.audioManager.playSfx('click');

                // Check for explorer achievement
                this.checkExplorerAchievement();
                break;
            case 'start_quest':
                this.startQuest(action.questId);
                window.audioManager.playSfx('click');
                break;
            case 'collect_items':
                this.collectItemsAtLocation(action.locationId);
                window.audioManager.playSfx('click');
                break;
            case 'talk_to_npc':
                this.talkToNPCAtLocation(action.locationId);
                window.audioManager.playSfx('click');
                break;
            case 'explore_location':
                this.exploreCurrentLocation();
                window.audioManager.playSfx('discovery');
                break;
            case 'continue_exploration':
                this.continueExploration();
                window.audioManager.playSfx('click');
                break;
            case 'accept_quest':
                // Quest is already accepted, just show confirmation
                this.showNotification('Квест принят в работу!');
                window.audioManager.playSfx('success');
                break;
            case 'show_location_map':
                this.showScreen('map');
                window.audioManager.playSfx('click');
                break;
            case 'start_mini_game':
                this.startMiniGame(action.gameId);
                window.audioManager.playSfx('click');
                break;
            case 'mini_game_choice':
                this.handleMiniGameChoice(action.correct);
                window.audioManager.playSfx('click');
                break;
        }

        // Save game progress after action
        this.saveGameProgress();
    }

    // Notification system
    showNotification(message) {
        console.log('Notification:', message);

        // Use Telegram notification if available
        if (window.tgAPI && window.tgAPI.isInTelegram()) {
            window.tgAPI.showAlert(message);
            return;
        }

        // Create custom notification element
        const notification = document.createElement('div');
        notification.className = 'notification bounce-in';
        notification.textContent = message;

        // Add styles
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#3498db';
        notification.style.color = 'white';
        notification.style.padding = '12px 20px';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';

        // Add to document
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // Hide and remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Item dialog
    showItemDialog(item) {
        this.showDialog(
            'Информация о предмете',
            `${item.name}\n\n${item.description}`,
            [{ text: 'Закрыть', action: null }]
        );
    }

    // Event listeners setup
    setupEventListeners() {
        // Menu buttons
        document.getElementById('start-game-btn')?.addEventListener('click', () => {
            window.audioManager.playSfx('click');
            this.startNewGame();
        });

        document.getElementById('continue-game-btn')?.addEventListener('click', () => {
            window.audioManager.playSfx('click');
            this.loadGameProgress();
            this.showScreen('game');
        });

        document.getElementById('achievements-btn')?.addEventListener('click', () => {
            window.audioManager.playSfx('click');
            this.showScreen('quests');
        });

        document.getElementById('share-btn')?.addEventListener('click', () => {
            window.audioManager.playSfx('click');
            this.shareGame();
        });

        document.getElementById('help-btn')?.addEventListener('click', () => {
            window.audioManager.playSfx('click');
            this.showScreen('help');
        });

        // Action buttons
        document.getElementById('inventory-btn')?.addEventListener('click', () => {
            window.audioManager.playSfx('click');
            this.showScreen('inventory');
        });

        document.getElementById('map-btn')?.addEventListener('click', () => {
            window.audioManager.playSfx('click');
            this.showScreen('map');
        });

        document.getElementById('quests-btn')?.addEventListener('click', () => {
            window.audioManager.playSfx('click');
            this.showScreen('quests');
        });

        document.getElementById('sound-toggle-btn')?.addEventListener('click', () => {
            const isMuted = window.audioManager.toggleMute();
            document.getElementById('sound-toggle-btn').textContent = isMuted ? '🔇' : '🔊';
        });

        // Back buttons
        document.querySelectorAll('.back-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.audioManager.playSfx('click');
                this.showScreen('game');
            });
        });

        // Location interactions
        document.querySelector('.location-image')?.addEventListener('click', (e) => {
            window.audioManager.playSfx('click');
            this.handleLocationInteraction(e);
        });

        // Add click sound to all buttons
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.classList.contains('dialog-choice')) {
                window.audioManager.playSfx('click');
            }
        });
    }

    // Save/Load system
    async saveGameProgress() {
        const saveData = JSON.stringify(this.player);

        // Save to local storage
        localStorage.setItem('pskov-leha-save', saveData);

        // Save to Telegram cloud if available
        if (window.tgAPI && window.tgAPI.isInTelegram()) {
            try {
                await window.tgAPI.saveToCloudStorage('pskov-leha-save', saveData);
                console.log('Game saved to Telegram cloud');
            } catch (error) {
                console.error('Error saving to Telegram cloud:', error);
            }
        }
    }

    async loadGameProgress() {
        let saved = null;

        // Try to load from Telegram cloud first
        if (window.tgAPI && window.tgAPI.isInTelegram()) {
            try {
                saved = await window.tgAPI.loadFromCloudStorage('pskov-leha-save');
                console.log('Game loaded from Telegram cloud');
            } catch (error) {
                console.error('Error loading from Telegram cloud:', error);
            }
        }

        // Fallback to local storage
        if (!saved) {
            saved = localStorage.getItem('pskov-leha-save');
        }

        if (saved) {
            this.player = { ...this.player, ...JSON.parse(saved) };
        }
    }

    // Initialize Telegram integration
    initTelegramIntegration() {
        if (window.tgAPI && window.tgAPI.isInTelegram()) {
            // Set up Telegram main button
            window.tgAPI.setMainButton('Сохранить прогресс', () => {
                this.saveGameProgress();
                window.tgAPI.showAlert('Прогресс сохранен!');
            });

            // Get user info
            const user = window.tgAPI.getUserInfo();
            console.log('Telegram user:', user);
        }
    }

    // Start new game
    startNewGame() {
        // Reset player data
        this.player = {
            name: 'Лёха',
            inventory: [],
            completedQuests: [],
            currentLocation: 'kremlin',
            progress: 0,
            achievements: []
        };

        // Show starting dialog
        this.showDialog('Лёха', 'Привет! Я Лёха. Приехал в Псков на каникулы к деду. Говорят, здесь много интересного!', [
            {
                text: 'Начать исследование!',
                action: {
                    type: 'start_quest',
                    questId: 'city_explorer'
                }
            }
        ]);

        // Show game screen
        this.showScreen('game');

        // Initialize visited locations
        this.player.visitedLocations = [this.player.currentLocation];

        // Save initial state
        this.saveGameProgress();
    }

    // Handle location interaction
    handleLocationInteraction(e) {
        const location = this.gameData.locations[this.player.currentLocation];

        if (!location) return;

        // Haptic feedback
        if (window.tgAPI) {
            window.tgAPI.hapticFeedback('selection');
        }

        // Check if there are items to collect
        const availableItems = location.items.filter(itemId => 
            !this.player.inventory.includes(itemId)
        );

        // Check if there are NPCs to interact with
        const availableNPCs = location.npcs;

        // Show appropriate dialog
        if (availableItems.length > 0 && availableNPCs.length > 0) {
            this.showDialog('Лёха', 'Интересное место! Здесь есть и предметы, и персонажи для разговора.', [
                {
                    text: 'Осмотреться',
                    action: {
                        type: 'collect_items',
                        locationId: location.id
                    }
                },
                {
                    text: 'Поговорить с местными',
                    action: {
                        type: 'talk_to_npc',
                        locationId: location.id
                    }
                }
            ]);
        } else if (availableItems.length > 0) {
            this.showDialog('Лёха', 'Кажется, здесь что-то есть. Нужно осмотреться внимательнее.', [
                {
                    text: 'Осмотреться',
                    action: {
                        type: 'collect_items',
                        locationId: location.id
                    }
                }
            ]);
        } else if (availableNPCs.length > 0) {
            this.showDialog('Лёха', 'Здесь кто-то есть. Может, они расскажут что-то интересное?', [
                {
                    text: 'Поговорить',
                    action: {
                        type: 'talk_to_npc',
                        locationId: location.id
                    }
                }
            ]);
        } else {
            this.showDialog('Лёха', 'Интересное место! Нужно исследовать получше.');
        }
    }

    // Start a quest
    startQuest(questId) {
        const quest = this.gameData.quests[questId];
        if (!quest) return;

        // Check if quest is already completed
        if (this.player.completedQuests.includes(questId)) {
            this.showDialog('Лёха', 'Этот квест уже выполнен!');
            return;
        }

        // For mini-game quests, start the mini-game directly
        if (quest.type === 'mini_game') {
            this.startMiniGame(questId);
            return;
        }

        // Show quest details for other quest types
        this.showDialog('Новый квест', `${quest.name}

${quest.description}`, [
            {
                text: 'Принять квест',
                action: {
                    type: 'accept_quest',
                    questId: questId
                }
            },
            {
                text: 'Позже',
                action: null
            }
        ]);
    }

    // Collect items at location
    collectItemsAtLocation(locationId) {
        const location = this.gameData.locations[locationId];
        if (!location) return;

        // Find items that are not yet collected
        const availableItems = location.items.filter(itemId => 
            !this.player.inventory.includes(itemId)
        );

        if (availableItems.length === 0) {
            this.showDialog('Лёха', 'Здесь больше ничего интересного нет.');
            return;
        }

        // Collect first available item
        const itemId = availableItems[0];
        const item = this.gameData.items[itemId];

        if (item) {
            this.player.inventory.push(itemId);
            this.showNotification(`Найден предмет: ${item.name}`);

            // Show item info dialog
            this.showItemDialog(item);

            // Check if this item is part of any quest
            this.checkQuestProgress(itemId);

            // Check for first item achievement
            this.checkFirstItemAchievement();

            // Check for collector achievement
            this.checkCollectorAchievement();
        }
    }

    // Talk to NPC at location
    talkToNPCAtLocation(locationId) {
        const location = this.gameData.locations[locationId];
        if (!location || location.npcs.length === 0) return;

        // Get first available NPC
        const npcId = location.npcs[0];
        const npc = this.gameData.characters[npcId];

        if (npc) {
            // Start dialog with NPC
            const greetingDialog = npc.dialogues.greeting;
            this.showDialog(npc.name, greetingDialog.text, greetingDialog.choices);
        }
    }

    // Explore current location
    exploreCurrentLocation() {
        const location = this.gameData.locations[this.player.currentLocation];
        if (!location) return;

        // Show location info
        this.showDialog('Лёха', `${location.name}

${location.description}`, [
            {
                text: 'Исследовать дальше',
                action: {
                    type: 'collect_items',
                    locationId: location.id
                }
            },
            {
                text: 'Перейти к другой локации',
                action: {
                    type: 'show_location_map',
                    locationId: location.id
                }
            }
        ]);
    }

    // Continue exploration
    continueExploration() {
        // Check if there are unvisited locations
        const unvisitedLocations = Object.values(this.gameData.locations).filter(loc => 
            loc.connections.includes(this.player.currentLocation)
        );

        if (unvisitedLocations.length === 0) {
            this.showDialog('Лёха', 'Похоже, я исследовал все доступные места. Нужно найти новую информацию или предметы.');
            return;
        }

        // Show available locations to travel to
        const choices = unvisitedLocations.map(loc => ({
            text: loc.name,
            action: {
                type: 'change_location',
                locationId: loc.id
            }
        }));

        this.showDialog('Лёха', 'Куда отправимся дальше?', choices);
    }

    // Check quest progress
    checkQuestProgress(itemId) {
        // Check if item is part of any active quest
        Object.values(this.gameData.quests).forEach(quest => {
            if (quest.requirements.includes(itemId) && !this.player.completedQuests.includes(quest.id)) {
                // Check if all requirements are met
                const allRequirementsMet = quest.requirements.every(req =>
                    this.player.inventory.includes(req)
                );

                if (allRequirementsMet) {
                    // Complete quest
                    this.player.completedQuests.push(quest.id);

                    // Get reward items
                    if (quest.rewards) {
                        quest.rewards.forEach(rewardId => {
                            if (!this.player.inventory.includes(rewardId)) {
                                this.player.inventory.push(rewardId);
                            }
                        });
                    }

                    // Show completion dialog
                    this.showDialog('Квест выполнен!', `Поздравляю! Ты выполнил квест "${quest.name}"!`, [
                        {
                            text: 'Отлично!',
                            action: null
                        }
                    ]);

                    // Check for quest master achievement
                    this.checkQuestMasterAchievement();
                }
            }
        });
    }

    // Start mini-game
    startMiniGame(gameId) {
        const game = this.miniGames[gameId];
        if (!game) return;

        this.currentMiniGame = gameId;
        this.miniGameStep = 0;

        // Show first question
        this.showMiniGameStep();
    }

    // Show current mini-game step
    showMiniGameStep() {
        const game = this.miniGames[this.currentMiniGame];
        if (!game || this.miniGameStep >= game.steps.length) {
            this.completeMiniGame();
            return;
        }

        const step = game.steps[this.miniGameStep];

        // Create choices with actions
        const choices = step.choices.map(choice => ({
            text: choice.text,
            action: {
                type: 'mini_game_choice',
                correct: choice.correct
            }
        }));

        this.showDialog('Мини-игра', step.question, choices);
    }

    // Handle mini-game choice
    handleMiniGameChoice(correct) {
        if (correct) {
            this.miniGameStep++;
            if (this.miniGameStep < this.miniGames[this.currentMiniGame].steps.length) {
                this.showMiniGameStep();
            } else {
                this.completeMiniGame();
            }
        } else {
            // Wrong answer - restart mini-game
            this.showDialog('Неправильно!', 'Попробуй еще раз. Нужно выбрать правильный ответ.', [
                {
                    text: 'Попробовать снова',
                    action: {
                        type: 'start_mini_game',
                        gameId: this.currentMiniGame
                    }
                }
            ]);
        }
    }

    // Complete mini-game
    completeMiniGame() {
        const questId = this.currentMiniGame; // Assuming gameId matches questId for mini-games
        const quest = this.gameData.quests[questId];

        if (quest) {
            // Complete the quest
            if (!this.player.completedQuests.includes(questId)) {
                this.player.completedQuests.push(questId);

                // Get reward items
                if (quest.rewards) {
                    quest.rewards.forEach(rewardId => {
                        if (!this.player.inventory.includes(rewardId)) {
                            this.player.inventory.push(rewardId);
                        }
                    });
                }
            }
        }

        this.currentMiniGame = null;
        this.miniGameStep = 0;

        this.showDialog('Мини-игра завершена!', 'Поздравляю! Ты успешно прошел мини-игру и выполнил квест!', [
            {
                text: 'Отлично!',
                action: null
            }
        ]);
    }

    // Unlock achievement
    unlockAchievement(achievementId) {
        // Check if achievement is already unlocked
        if (this.player.achievements.includes(achievementId)) {
            return;
        }

        const achievement = this.gameData.achievements[achievementId];
        if (!achievement) return;

        // Add to player's achievements
        this.player.achievements.push(achievementId);

        // Show achievement notification
        this.showAchievementNotification(achievement);

        // Haptic feedback
        if (window.tgAPI) {
            window.tgAPI.hapticFeedback('notification');
        }

        // Save progress
        this.saveGameProgress();
    }

    // Show achievement notification
    showAchievementNotification(achievement) {
        // Create achievement notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';

        // Add content
        notification.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <div class="achievement-title">Достижение разблокировано!</div>
                <div class="achievement-name">${achievement.name}</div>
            </div>
        `;

        // Add styles
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#f39c12';
        notification.style.color = 'white';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '8px';
        notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.gap = '15px';
        notification.style.maxWidth = '300px';

        // Style child elements
        const iconStyle = `
            font-size: 2rem;
        `;

        const infoStyle = `
            display: flex;
            flex-direction: column;
        `;

        const titleStyle = `
            font-weight: bold;
            margin-bottom: 5px;
        `;

        // Apply styles
        const iconElement = notification.querySelector('.achievement-icon');
        const infoElement = notification.querySelector('.achievement-info');
        const titleElement = notification.querySelector('.achievement-title');
        const nameElement = notification.querySelector('.achievement-name');

        if (iconElement) iconElement.style.cssText = iconStyle;
        if (infoElement) infoElement.style.cssText = infoStyle;
        if (titleElement) titleElement.style.cssText = titleStyle;

        // Add to document
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);

        // Hide and remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Check for first item achievement
    checkFirstItemAchievement() {
        if (this.player.inventory.length === 1 && !this.player.achievements.includes('first_item')) {
            this.unlockAchievement('first_item');
        }
    }

    // Check for quest master achievement
    checkQuestMasterAchievement() {
        const allQuests = Object.keys(this.gameData.quests);
        const completedAllQuests = allQuests.every(questId => 
            this.player.completedQuests.includes(questId)
        );

        if (completedAllQuests && !this.player.achievements.includes('quest_master')) {
            this.unlockAchievement('quest_master');
        }
    }

    // Check for collector achievement
    checkCollectorAchievement() {
        const allItems = Object.keys(this.gameData.items).filter(itemId => 
            this.gameData.items[itemId].collectible !== false
        );
        const collectedAllItems = allItems.every(itemId => 
            this.player.inventory.includes(itemId)
        );

        if (collectedAllItems && !this.player.achievements.includes('collector')) {
            this.unlockAchievement('collector');
        }
    }

    // Check for explorer achievement
    checkExplorerAchievement() {
        const allLocations = Object.keys(this.gameData.locations);

        // Initialize visited locations if needed
        if (!this.player.visitedLocations) {
            this.player.visitedLocations = [this.player.currentLocation];
        } else if (!this.player.visitedLocations.includes(this.player.currentLocation)) {
            this.player.visitedLocations.push(this.player.currentLocation);
        }

        const visitedAllLocations = allLocations.every(locationId => 
            this.player.visitedLocations.includes(locationId)
        );

        if (visitedAllLocations && !this.player.achievements.includes('explorer')) {
            this.unlockAchievement('explorer');
        }
    }

    // Check for social butterfly achievement
    checkSocialButterflyAchievement() {
        if (this.player.sharedGame && !this.player.achievements.includes('social_butterfly')) {
            this.unlockAchievement('social_butterfly');
        }
    }

    // Share game with friends
    shareGame() {
        if (window.tgAPI) {
            window.tgAPI.shareGame();
            this.player.sharedGame = true;
            this.checkSocialButterflyAchievement();
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new GameState();

    // Simulate loading progress
    let progress = 0;
    const progressBar = document.querySelector('.loading-progress');
    const loadingText = document.querySelector('.loading-text');

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                window.game.init();
            }, 500);
        }

        progressBar.style.width = progress + '%';
        loadingText.textContent = `Загрузка... ${Math.round(progress)}%`;
    }, 200);
});
