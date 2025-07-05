# 🔧 Configuración de Servidor para MykeDev Portfolio

## 📋 Problema Solucionado

Error: `Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of "application/octet-stream"`

**Causa**: El servidor no está configurado para servir archivos JavaScript con el MIME type correcto.

## 🎯 Soluciones por Tipo de Servidor

### 1. **Apache (.htaccess)** ✅
Si tu hosting usa Apache, el archivo `.htaccess` en la carpeta `public/` ya está configurado.

**Archivo**: `public/.htaccess`
- ✅ Configuración automática de MIME types
- ✅ Compresión optimizada
- ✅ Headers de seguridad
- ✅ Caché configurado

### 2. **Nginx** 🔧
Si tu hosting usa Nginx, copia el contenido de `public/nginx.conf` a tu configuración.

**Archivo**: `public/nginx.conf`
```bash
# En tu servidor block de Nginx
server {
    # ... tu configuración existente ...
    
    # Copia el contenido del archivo nginx.conf aquí
    include /path/to/your/nginx.conf;
}
```

### 3. **IIS (Windows Server)** 🔧
Si tu hosting usa IIS, el archivo `web.config` ya está listo.

**Archivo**: `public/web.config`
- ✅ Configuración automática
- ✅ URL Rewrite para SPA
- ✅ Compresión y caché

## 🚀 Plataformas de Hosting Específicas

### **Vercel** 🟢
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*).js",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/javascript"
        }
      ]
    }
  ]
}
```

### **Netlify** 🟢
```toml
# netlify.toml
[build]
  publish = "dist"

[[headers]]
  for = "/*.js"
  [headers.values]
    Content-Type = "application/javascript"
```

### **Firebase Hosting** 🟢
```json
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.js",
        "headers": [
          {
            "key": "Content-Type",
            "value": "application/javascript"
          }
        ]
      }
    ]
  }
}
```

### **GitHub Pages** 🟢
Usa el archivo `.htaccess` (funciona automáticamente).

### **Cloudflare Pages** 🟢
```toml
# _headers file
/*.js
  Content-Type: application/javascript
```

## 🔍 Cómo Verificar la Solución

1. **Abre DevTools** (F12)
2. **Network Tab** > Recarga la página
3. **Busca archivos .js** en la lista
4. **Verifica Content-Type**: Debe ser `application/javascript`

## 📞 Contacto con Hosting

Si ninguna configuración funciona, contacta a tu proveedor de hosting con:

```
Mensaje tipo:
"Hola, mi sitio web está devolviendo MIME type 'application/octet-stream' 
para archivos JavaScript en lugar de 'application/javascript'. 
¿Pueden configurar el servidor para que sirva archivos .js con el 
MIME type correcto? Gracias."
```

## ✅ Archivos Incluidos

- `public/.htaccess` - Para Apache
- `public/nginx.conf` - Para Nginx  
- `public/web.config` - Para IIS
- Este archivo con instrucciones

## 🎯 Resultado Esperado

Después de aplicar la configuración correcta:
- ✅ No más errores de MIME type
- ✅ Carga rápida de archivos JavaScript
- ✅ Mejor performance general
- ✅ Headers de seguridad aplicados

---

**¿Necesitas ayuda?** Revisa la documentación de tu proveedor de hosting o contacta con su soporte técnico. 