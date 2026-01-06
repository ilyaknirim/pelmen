// Audio Manager
class AudioManager {
    constructor() {
        this.sounds = {};
        this.music = null;
        this.musicVolume = 0.5;
        this.sfxVolume = 0.7;
        this.isMuted = false;
        this.currentMusic = null;
        this.audioContext = null;
        this.initialized = false;
    }

    // Initialize audio system
    async init() {
        try {
            // Create audio context for better control
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

            // Load audio files
            await this.loadSounds();

            this.initialized = true;
            console.log('Audio system initialized');
        } catch (error) {
            console.error('Error initializing audio system:', error);
            this.initialized = false;
        }
    }

    // Load all sound files
    async loadSounds() {
        // Background music tracks
        this.sounds.background = await this.loadAudio('../audio/background.mp3');
        this.sounds.menu = await this.loadAudio('../audio/menu.mp3');
        this.sounds.success = await this.loadAudio('../audio/success.mp3');
        this.sounds.click = await this.loadAudio('../audio/click.mp3');
        this.sounds.discovery = await this.loadAudio('../audio/discovery.mp3');
        this.sounds.quest_complete = await this.loadAudio('../audio/quest_complete.mp3');
    }

    // Load individual audio file
    async loadAudio(path) {
        try {
            const response = await fetch(path);
            const arrayBuffer = await response.arrayBuffer();
            const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
            return audioBuffer;
        } catch (error) {
            console.warn(`Failed to load audio: ${path}`, error);
            return null;
        }
    }

    // Play background music
    playMusic(soundName, loop = true) {
        if (!this.initialized || this.isMuted || !this.sounds[soundName]) {
            return;
        }

        // Stop current music if playing
        this.stopMusic();

        // Create source for the music
        const source = this.audioContext.createBufferSource();
        source.buffer = this.sounds[soundName];
        source.loop = loop;

        // Create gain node for volume control
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = this.musicVolume;

        // Connect nodes
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Start playing
        source.start(0);
        this.currentMusic = { source, gainNode };
    }

    // Stop background music
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.source.stop();
            this.currentMusic = null;
        }
    }

    // Play sound effect
    playSfx(soundName) {
        if (!this.initialized || this.isMuted || !this.sounds[soundName]) {
            return;
        }

        // Create source for the sound
        const source = this.audioContext.createBufferSource();
        source.buffer = this.sounds[soundName];

        // Create gain node for volume control
        const gainNode = this.audioContext.createGain();
        gainNode.gain.value = this.sfxVolume;

        // Connect nodes
        source.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Start playing
        source.start(0);
    }

    // Set music volume
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        if (this.currentMusic) {
            this.currentMusic.gainNode.gain.value = this.musicVolume;
        }
    }

    // Set sound effects volume
    setSfxVolume(volume) {
        this.sfxVolume = Math.max(0, Math.min(1, volume));
    }

    // Mute/unmute all sounds
    setMuted(muted) {
        this.isMuted = muted;
        if (muted) {
            this.stopMusic();
        }
    }

    // Toggle mute state
    toggleMute() {
        this.setMuted(!this.isMuted);
        return this.isMuted;
    }

    // Resume audio context (needed for some browsers)
    resumeAudio() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Initialize audio manager
window.audioManager = new AudioManager();

// Add event listener to resume audio on user interaction
document.addEventListener('click', () => {
    window.audioManager.resumeAudio();
}, { once: true });
