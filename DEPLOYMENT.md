# 🚀 Guía de Despliegue en GitHub Pages

Esta guía te ayudará a desplegar tu reproductor de video flotante en GitHub Pages paso a paso.

## 📋 Prerrequisitos

- Cuenta de GitHub
- Git instalado en tu computadora
- Un video en formato MP4 (recomendado)

## 🔧 Pasos para el Despliegue

### 1. Preparar el Repositorio

1. **Crea un nuevo repositorio** en GitHub:
   - Ve a [github.com/new](https://github.com/new)
   - Nombre: `floating-video-player` (o el que prefieras)
   - Descripción: "Reproductor de video flotante PWA"
   - Marca como **Público**
   - NO inicialices con README, .gitignore o licencia

2. **Clona el repositorio** localmente:
   ```bash
   git clone https://github.com/tu-usuario/floating-video-player.git
   cd floating-video-player
   ```

### 2. Configurar el Proyecto

1. **Copia todos los archivos** del proyecto a la carpeta del repositorio

2. **Coloca tu video**:
   - Renombra tu video a `vivo.mp4`
   - Colócalo en la carpeta `media/`

3. **Personaliza la configuración**:
   - Edita `manifest.json` y cambia las URLs por las tuyas
   - Edita `sitemap.xml` y actualiza la URL
   - Edita `package.json` y actualiza el repositorio

### 3. Subir a GitHub

```bash
# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: Floating video player"

# Subir al repositorio
git push -u origin main
```

### 4. Configurar GitHub Pages

1. **Ve a la configuración** del repositorio:
   - Click en "Settings" en tu repositorio
   - Scroll hasta "Pages" en el menú lateral

2. **Configura la fuente**:
   - Source: "Deploy from a branch"
   - Branch: "main" (o "master")
   - Folder: "/ (root)"

3. **Guarda** la configuración

4. **Espera** unos minutos para que se despliegue

### 5. Verificar el Despliegue

1. **Accede** a tu sitio:
   - URL: `https://tu-usuario.github.io/floating-video-player`
   - Reemplaza `tu-usuario` y `floating-video-player` con tus valores

2. **Prueba** todas las funcionalidades:
   - Reproducción del video
   - Arrastrar el reproductor
   - Controles de video
   - Pantalla completa
   - Minimizar/restaurar

## 📱 Configuración para PWA

### 1. Generar Iconos

Necesitas crear iconos para la PWA. Puedes usar:

- **Herramientas online**: [PWA Builder](https://www.pwabuilder.com/imageGenerator)
- **Photoshop/GIMP**: Crear iconos de 512x512 y redimensionar
- **Herramientas de línea de comandos**: ImageMagick, etc.

**Tamaños necesarios**: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512

### 2. Colocar Iconos

Coloca todos los iconos en la carpeta `icons/` con los nombres:
- `icon-72x72.png`
- `icon-96x96.png`
- `icon-128x128.png`
- `icon-144x144.png`
- `icon-152x152.png`
- `icon-192x192.png`
- `icon-384x384.png`
- `icon-512x512.png`

### 3. Crear Screenshots

Toma capturas de pantalla de tu aplicación:
- **Desktop**: 1280x720 (colocar en `screenshots/desktop.png`)
- **Mobile**: 375x667 (colocar en `screenshots/mobile.png`)

## 🔄 Actualizaciones Automáticas

El proyecto incluye GitHub Actions para despliegue automático:

1. **Cada push** a la rama main activará el despliegue
2. **No necesitas** hacer nada manualmente
3. **Los cambios** se reflejarán en unos minutos

## 🛠️ Personalización Avanzada

### Dominio Personalizado

Si tienes un dominio propio:

1. **Crea un archivo CNAME**:
   ```
   tu-dominio.com
   ```

2. **Configura DNS**:
   - CNAME: `www` → `tu-usuario.github.io`
   - A: `@` → `185.199.108.153` (IP de GitHub)

3. **Actualiza** `manifest.json` y `sitemap.xml`

### Variables de Entorno

Para diferentes entornos, puedes usar:

```javascript
// En script.js
const isProduction = window.location.hostname !== 'localhost';
const baseUrl = isProduction ? 'https://tu-usuario.github.io/floating-video-player' : '';
```

## 🐛 Solución de Problemas

### El sitio no carga

1. **Verifica** que GitHub Pages esté habilitado
2. **Revisa** que el archivo `index.html` esté en la raíz
3. **Espera** unos minutos más (puede tardar hasta 10 minutos)

### El video no se reproduce

1. **Verifica** que el archivo existe en `media/vivo.mp4`
2. **Comprueba** que el formato es compatible (MP4 recomendado)
3. **Revisa** la consola del navegador para errores

### PWA no se instala

1. **Verifica** que todos los iconos existen
2. **Comprueba** que `manifest.json` es válido
3. **Usa** Chrome/Edge (navegadores compatibles)

### GitHub Actions falla

1. **Revisa** el archivo `.github/workflows/deploy.yml`
2. **Verifica** que el token `GITHUB_TOKEN` esté disponible
3. **Comprueba** los logs en la pestaña "Actions"

## 📊 Monitoreo

### Analytics (Opcional)

Puedes agregar Google Analytics:

1. **Obtén** tu código de seguimiento
2. **Agrega** en `index.html` antes de `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_MEASUREMENT_ID');
   </script>
   ```

### Logs de Errores

Para monitorear errores en producción:

```javascript
// En script.js
window.addEventListener('error', (e) => {
  console.error('Error:', e.error);
  // Aquí puedes enviar el error a un servicio de logging
});
```

## ✅ Checklist de Despliegue

- [ ] Repositorio creado en GitHub
- [ ] Archivos subidos al repositorio
- [ ] Video colocado en `media/vivo.mp4`
- [ ] GitHub Pages habilitado
- [ ] Iconos PWA creados y colocados
- [ ] Screenshots creados
- [ ] URLs personalizadas actualizadas
- [ ] Sitio accesible públicamente
- [ ] PWA instalable
- [ ] Funcionalidades probadas en PC y móvil

## 🎉 ¡Listo!

Tu reproductor de video flotante ya está desplegado y funcionando. Los usuarios pueden:

- **Acceder** desde cualquier dispositivo
- **Instalar** como PWA
- **Usar** offline después de la primera carga
- **Disfrutar** de una experiencia fluida

---

**¿Necesitas ayuda?** Abre un [Issue](https://github.com/tu-usuario/floating-video-player/issues) en el repositorio.
