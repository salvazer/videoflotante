# 🎬 Reproductor Video Flotante

Un reproductor de video web flotante que se superpone sobre otras aplicaciones, diseñado para funcionar tanto en PC como en dispositivos Android. Incluye funcionalidades de PWA (Progressive Web App) para una experiencia similar a una aplicación nativa.

## ✨ Características

- **Ventana flotante**: Se superpone sobre otras aplicaciones
- **Arrastrable**: Puedes mover el reproductor por toda la pantalla
- **Controles personalizados**: Play/Pause, barra de progreso, tiempo, pantalla completa
- **Minimizable**: Reduce a un pequeño botón flotante
- **Responsive**: Optimizado para PC y Android
- **PWA**: Instalable como aplicación nativa
- **Offline**: Funciona sin conexión a internet
- **Atajos de teclado**: Controles rápidos con el teclado

## 🚀 Instalación y Uso

### Opción 1: GitHub Pages (Recomendado)

1. **Fork este repositorio** en tu cuenta de GitHub
2. **Sube tu video** a la carpeta `media/` y renómbralo a `vivo.mp4`
3. **Habilita GitHub Pages** en la configuración del repositorio
4. **Accede** a `https://tu-usuario.github.io/nombre-del-repo`

### Opción 2: Servidor Local

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/floating-video-player.git
   cd floating-video-player
   ```

2. **Instala dependencias**:
   ```bash
   npm install
   ```

3. **Coloca tu video** en `media/vivo.mp4`

4. **Ejecuta el servidor**:
   ```bash
   npm start
   ```

5. **Abre** `http://localhost:8080` en tu navegador

## 📱 Uso en Android

### Instalación como PWA

1. **Abre** la aplicación en Chrome/Edge
2. **Toca** el menú (⋮) → "Instalar aplicación"
3. **Confirma** la instalación
4. **Abre** desde el escritorio como app nativa

### Funcionalidades Android

- **Pantalla completa automática** al cargar
- **Gestos táctiles** para arrastrar
- **Orientación adaptativa** (portrait/landscape)
- **Controles optimizados** para pantalla táctil
- **Modo standalone** sin barras del navegador

## 🎮 Controles

### Ratón/Táctil
- **Arrastrar**: Mover el reproductor
- **Doble clic**: Pantalla completa
- **Clic en barra de progreso**: Saltar a posición
- **Botones**: Play/Pause, minimizar, cerrar, pantalla completa

### Teclado
- **Espacio**: Play/Pause
- **F**: Pantalla completa
- **M**: Minimizar
- **Escape**: Salir de pantalla completa

## 🛠️ Personalización

### Cambiar el Video

1. Reemplaza `media/vivo.mp4` con tu video
2. Asegúrate de que sea compatible con HTML5 (MP4 recomendado)

### Modificar Tamaño

Edita en `styles.css`:
```css
.floating-player {
    width: 400px;  /* Ancho */
    height: 300px; /* Alto */
}
```

### Cambiar Colores

Modifica las variables CSS:
```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #4ecdc4;
    --background: rgba(0, 0, 0, 0.9);
}
```

## 📁 Estructura del Proyecto

```
floating-video-player/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── manifest.json       # Configuración PWA
├── sw.js              # Service Worker
├── package.json        # Dependencias NPM
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Actions
├── icons/             # Iconos PWA
├── screenshots/       # Capturas de pantalla
└── media/
    └── vivo.mp4       # Video a reproducir
```

## 🔧 Configuración Avanzada

### GitHub Pages

1. **Configura el dominio** en `manifest.json`:
   ```json
   "start_url": "https://tu-dominio.com/"
   ```

2. **Personaliza el CNAME** en `.github/workflows/deploy.yml`

### Service Worker

El Service Worker está configurado para:
- **Cachear recursos** para funcionamiento offline
- **Actualizar automáticamente** cuando hay cambios
- **Manejar errores** de red

### Manifest PWA

Configuración para instalación como app:
- **Iconos** en múltiples tamaños
- **Tema** oscuro
- **Orientación** flexible
- **Modo standalone**

## 🐛 Solución de Problemas

### El video no se reproduce
- Verifica que el archivo existe en `media/vivo.mp4`
- Asegúrate de que el formato es compatible (MP4 recomendado)
- Revisa la consola del navegador para errores

### No funciona en Android
- Usa Chrome o Edge (navegadores compatibles con PWA)
- Instala como PWA para mejor experiencia
- Verifica que JavaScript está habilitado

### No se puede arrastrar
- Asegúrate de hacer clic en el área superior del reproductor
- En móviles, usa gestos táctiles suaves

### Problemas de pantalla completa
- Algunos navegadores requieren interacción del usuario
- En móviles, puede requerir orientación landscape

## 📄 Licencia

MIT License - Puedes usar, modificar y distribuir libremente.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📞 Soporte

Si tienes problemas o preguntas:
- Abre un [Issue](https://github.com/tu-usuario/floating-video-player/issues)
- Revisa la documentación
- Verifica que sigues los pasos de instalación

---

**¡Disfruta tu reproductor de video flotante! 🎬✨**
