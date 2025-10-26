class FloatingVideoPlayer {
    constructor() {
        this.player = document.getElementById('floating-player');
        this.video = document.getElementById('videoPlayer');
        this.minimizedPlayer = document.getElementById('minimized-player');
        this.isDragging = false;
        this.isMinimized = false;
        this.isFullscreen = false;
        this.dragOffset = { x: 0, y: 0 };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.setupVideoEvents();
        this.setupDragAndDrop();
        this.setupTouchEvents();
        this.requestFullscreenOnMobile();
    }
    
    setupEventListeners() {
        // Botones de control
        document.getElementById('playPauseBtn').addEventListener('click', () => this.togglePlayPause());
        document.getElementById('minimizeBtn').addEventListener('click', () => this.minimize());
        document.getElementById('closeBtn').addEventListener('click', () => this.close());
        document.getElementById('restoreBtn').addEventListener('click', () => this.restore());
        document.getElementById('fullscreenBtn').addEventListener('click', () => this.toggleFullscreen());
        
        // Barra de progreso
        const progressContainer = document.querySelector('.progress-container');
        progressContainer.addEventListener('click', (e) => this.seekTo(e));
        
        // Doble click para pantalla completa
        this.player.addEventListener('dblclick', () => this.toggleFullscreen());
        
        // Teclado
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }
    
    setupVideoEvents() {
        this.video.addEventListener('loadedmetadata', () => this.updateDuration());
        this.video.addEventListener('timeupdate', () => this.updateProgress());
        this.video.addEventListener('play', () => this.updatePlayButton());
        this.video.addEventListener('pause', () => this.updatePlayButton());
        this.video.addEventListener('ended', () => this.onVideoEnded());
        this.video.addEventListener('error', (e) => this.onVideoError(e));
    }
    
    setupDragAndDrop() {
        const dragHandle = document.getElementById('drag-handle');
        
        dragHandle.addEventListener('mousedown', (e) => this.startDrag(e));
        document.addEventListener('mousemove', (e) => this.drag(e));
        document.addEventListener('mouseup', () => this.endDrag());
        
        // Prevenir selección de texto durante el arrastre
        dragHandle.addEventListener('selectstart', (e) => e.preventDefault());
    }
    
    setupTouchEvents() {
        const dragHandle = document.getElementById('drag-handle');
        let touchStartX, touchStartY;
        
        dragHandle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
            this.startDrag({ clientX: touch.clientX, clientY: touch.clientY });
        });
        
        dragHandle.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.drag({ clientX: touch.clientX, clientY: touch.clientY });
        });
        
        dragHandle.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.endDrag();
        });
    }
    
    requestFullscreenOnMobile() {
        // En móviles, intentar entrar en pantalla completa automáticamente
        if (this.isMobile()) {
            this.video.addEventListener('loadeddata', () => {
                // Pequeño delay para asegurar que el video esté listo
                setTimeout(() => {
                    this.requestFullscreen();
                }, 500);
            });
            
            // Configurar para Android específicamente
            this.setupAndroidOptimizations();
        }
    }
    
    setupAndroidOptimizations() {
        // Prevenir el comportamiento de scroll en Android
        document.addEventListener('touchmove', (e) => {
            if (e.target.closest('.floating-player')) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Manejar cambios de orientación
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleOrientationChange();
            }, 100);
        });
        
        // Configurar para modo standalone (PWA)
        if (window.matchMedia('(display-mode: standalone)').matches) {
            this.setupStandaloneMode();
        }
    }
    
    setupStandaloneMode() {
        // Ocultar la barra de direcciones en modo standalone
        document.body.style.height = '100vh';
        document.body.style.overflow = 'hidden';
        
        // Configurar para que funcione como app nativa
        this.player.style.position = 'fixed';
        this.player.style.zIndex = '9999';
    }
    
    handleOrientationChange() {
        // Ajustar el reproductor cuando cambie la orientación
        if (this.isFullscreen) {
            this.player.classList.add('fullscreen');
        }
        
        // Recalcular posición si está minimizado
        if (this.isMinimized) {
            this.minimizedPlayer.style.top = '20px';
            this.minimizedPlayer.style.right = '20px';
        }
    }
    
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    startDrag(e) {
        this.isDragging = true;
        const rect = this.player.getBoundingClientRect();
        this.dragOffset.x = e.clientX - rect.left;
        this.dragOffset.y = e.clientY - rect.top;
        this.player.style.cursor = 'grabbing';
    }
    
    drag(e) {
        if (!this.isDragging) return;
        
        e.preventDefault();
        const x = e.clientX - this.dragOffset.x;
        const y = e.clientY - this.dragOffset.y;
        
        // Limitar a los bordes de la pantalla
        const maxX = window.innerWidth - this.player.offsetWidth;
        const maxY = window.innerHeight - this.player.offsetHeight;
        
        const boundedX = Math.max(0, Math.min(x, maxX));
        const boundedY = Math.max(0, Math.min(y, maxY));
        
        this.player.style.left = boundedX + 'px';
        this.player.style.top = boundedY + 'px';
        this.player.style.transform = 'none';
    }
    
    endDrag() {
        this.isDragging = false;
        this.player.style.cursor = 'move';
    }
    
    togglePlayPause() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }
    
    updatePlayButton() {
        const btn = document.getElementById('playPauseBtn');
        btn.textContent = this.video.paused ? '▶' : '⏸';
    }
    
    updateProgress() {
        const progress = document.getElementById('progress');
        const currentTime = document.getElementById('currentTime');
        
        if (this.video.duration) {
            const percent = (this.video.currentTime / this.video.duration) * 100;
            progress.style.width = percent + '%';
        }
        
        currentTime.textContent = this.formatTime(this.video.currentTime);
    }
    
    updateDuration() {
        const duration = document.getElementById('duration');
        duration.textContent = this.formatTime(this.video.duration);
    }
    
    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    seekTo(e) {
        const progressContainer = e.currentTarget;
        const rect = progressContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        
        if (this.video.duration) {
            this.video.currentTime = percentage * this.video.duration;
        }
    }
    
    minimize() {
        this.isMinimized = true;
        this.player.classList.add('minimized');
        this.minimizedPlayer.classList.add('visible');
        this.video.pause();
    }
    
    restore() {
        this.isMinimized = false;
        this.player.classList.remove('minimized');
        this.minimizedPlayer.classList.remove('visible');
    }
    
    close() {
        this.video.pause();
        this.video.currentTime = 0;
        this.player.style.display = 'none';
        
        // Mostrar mensaje de confirmación
        if (confirm('¿Estás seguro de que quieres cerrar el reproductor?')) {
            window.close();
        } else {
            this.player.style.display = 'block';
        }
    }
    
    toggleFullscreen() {
        if (!this.isFullscreen) {
            this.requestFullscreen();
        } else {
            this.exitFullscreen();
        }
    }
    
    requestFullscreen() {
        const elem = this.player;
        
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        }
        
        this.isFullscreen = true;
        this.player.classList.add('fullscreen');
    }
    
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        
        this.isFullscreen = false;
        this.player.classList.remove('fullscreen');
    }
    
    onVideoEnded() {
        this.updatePlayButton();
        // Opcional: reiniciar automáticamente
        // this.video.currentTime = 0;
        // this.video.play();
    }
    
    onVideoError(e) {
        console.error('Error en el video:', e);
        alert('Error al cargar el video. Verifica que el archivo existe y es compatible.');
    }
    
    handleKeyboard(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlayPause();
                break;
            case 'Escape':
                if (this.isFullscreen) {
                    this.exitFullscreen();
                }
                break;
            case 'KeyF':
                this.toggleFullscreen();
                break;
            case 'KeyM':
                this.minimize();
                break;
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new FloatingVideoPlayer();
});

// Manejar cambios en el estado de pantalla completa
document.addEventListener('fullscreenchange', () => {
    const player = document.getElementById('floating-player');
    if (!document.fullscreenElement) {
        player.classList.remove('fullscreen');
    }
});

// Prevenir el comportamiento por defecto del navegador
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());

// Configurar para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('SW registrado: ', registration);
            })
            .catch((registrationError) => {
                console.log('Error en SW: ', registrationError);
            });
    });
}
