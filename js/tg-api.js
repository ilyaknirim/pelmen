// Telegram WebApp API Integration
class TelegramAPI {
    constructor() {
        this.isTelegram = typeof window.Telegram !== 'undefined' && window.Telegram.WebApp;
        this.webApp = null;
        this.init();
    }

    init() {
        if (this.isTelegram) {
            this.webApp = window.Telegram.WebApp;
            this.webApp.ready();
            this.webApp.expand();

            // Set theme colors
            document.documentElement.style.setProperty('--tg-theme-bg-color', this.webApp.backgroundColor);
            document.documentElement.style.setProperty('--tg-theme-text-color', this.webApp.textColor);
            document.documentElement.style.setProperty('--tg-theme-hint-color', this.webApp.hintColor);
            document.documentElement.style.setProperty('--tg-theme-link-color', this.webApp.linkColor);
            document.documentElement.style.setProperty('--tg-theme-button-color', this.webApp.buttonColor);
            document.documentElement.style.setProperty('--tg-theme-button-text-color', this.webApp.buttonTextColor);

            console.log('Telegram WebApp initialized');
        } else {
            console.log('Not running in Telegram, using fallback mode');
        }
    }

    // Show a popup message
    showPopup(message, title = 'Уведомление') {
        if (this.isTelegram && this.webApp) {
            this.webApp.showPopup({
                title: title,
                message: message,
                buttons: [{ type: 'ok' }]
            });
        } else {
            alert(`${title}: ${message}`);
        }
    }

    // Show an alert message
    showAlert(message) {
        if (this.isTelegram && this.webApp) {
            this.webApp.showAlert(message);
        } else {
            alert(message);
        }
    }

    // Show a confirmation dialog
    showConfirm(message, callback) {
        if (this.isTelegram && this.webApp) {
            this.webApp.showConfirm(message, (confirmed) => {
                if (callback) callback(confirmed);
            });
        } else {
            const confirmed = confirm(message);
            if (callback) callback(confirmed);
        }
    }

    // Share game with friends
    shareGame(score = null) {
        if (this.isTelegram && this.webApp) {
            const shareText = score 
                ? `Я прошел игру "Псков: Путешествие Лёхи" и набрал ${score} очков! Попробуй и ты!`
                : 'Играю в "Псков: Путешествие Лёхи" - исследую историю Пскова вместе с Лёхой!';

            this.webApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(shareText)}`);
        } else {
            // Fallback: copy to clipboard
            const shareText = score 
                ? `Я прошел игру "Псков: Путешествие Лёхи" и набрал ${score} очков! Попробуй и ты!`
                : 'Играю в "Псков: Путешествие Лёхи" - исследую историю Пскова вместе с Лёхой!';

            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareText).then(() => {
                    this.showAlert('Текст скопирован в буфер обмена!');
                });
            } else {
                this.showAlert('Поделиться: ' + shareText);
            }
        }
    }

    // Set main button
    setMainButton(text, callback, isVisible = true, isActive = true) {
        if (this.isTelegram && this.webApp) {
            this.webApp.MainButton.text = text;
            this.webApp.MainButton.isVisible = isVisible;
            this.webApp.MainButton.isActive = isActive;

            if (callback) {
                this.webApp.MainButton.onClick(callback);
            }

            return this.webApp.MainButton;
        } else {
            // Fallback: create a custom button
            let button = document.getElementById('tg-main-button');
            if (!button) {
                button = document.createElement('button');
                button.id = 'tg-main-button';
                button.className = 'tg-main-button';
                document.body.appendChild(button);
            }

            button.textContent = text;
            button.style.display = isVisible ? 'block' : 'none';
            button.disabled = !isActive;

            if (callback) {
                button.onclick = callback;
            }

            return button;
        }
    }

    // Haptic feedback
    hapticFeedback(type = 'selection') {
        if (this.isTelegram && this.webApp && this.webApp.HapticFeedback) {
            switch (type) {
                case 'selection':
                    this.webApp.HapticFeedback.selectionChanged();
                    break;
                case 'impact':
                    this.webApp.HapticFeedback.impactOccurred('medium');
                    break;
                case 'notification':
                    this.webApp.HapticFeedback.notificationOccurred('success');
                    break;
            }
        }
    }

    // Cloud storage
    async saveToCloudStorage(key, value) {
        if (this.isTelegram && this.webApp && this.webApp.CloudStorage) {
            return new Promise((resolve, reject) => {
                this.webApp.CloudStorage.setItem(key, value, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });
        } else {
            // Fallback to localStorage
            try {
                localStorage.setItem(key, value);
                return Promise.resolve(true);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }

    async loadFromCloudStorage(key) {
        if (this.isTelegram && this.webApp && this.webApp.CloudStorage) {
            return new Promise((resolve, reject) => {
                this.webApp.CloudStorage.getItem(key, (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                });
            });
        } else {
            // Fallback to localStorage
            try {
                const value = localStorage.getItem(key);
                return Promise.resolve(value);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }

    // Get user info
    getUserInfo() {
        if (this.isTelegram && this.webApp && this.webApp.initDataUnsafe && this.webApp.initDataUnsafe.user) {
            return this.webApp.initDataUnsafe.user;
        } else {
            // Fallback: anonymous user
            return {
                id: 'anonymous',
                first_name: 'Игрок',
                last_name: '',
                username: 'player'
            };
        }
    }

    // Close the web app
    closeApp() {
        if (this.isTelegram && this.webApp) {
            this.webApp.close();
        } else {
            console.log('Cannot close app: not in Telegram');
        }
    }

    // Check if the app is running in Telegram
    isInTelegram() {
        return this.isTelegram;
    }
}

// Initialize Telegram API
window.tgAPI = new TelegramAPI();

// Add fallback styles for Telegram main button if not in Telegram
if (!window.tgAPI.isInTelegram()) {
    const style = document.createElement('style');
    style.textContent = `
        .tg-main-button {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
        }

        .tg-main-button:hover {
            background-color: #2980b9;
        }

        .tg-main-button:disabled {
            background-color: #7f8c8d;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
}
