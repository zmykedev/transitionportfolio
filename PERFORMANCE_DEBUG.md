# Performance Debugging Guide

Este documento explica cómo usar el sistema de monitoreo de rendimiento para detectar y resolver problemas de FPS.

## 🚀 Características del Sistema

### 1. Monitoreo Automático de FPS

- **FPS en tiempo real**: Muestra los FPS actuales y promedio
- **Detección de caídas**: Alerta automáticamente cuando los FPS bajan de 30
- **Historial de FPS**: Mantiene un historial de los últimos 60 segundos

### 2. Panel de Control de Rendimiento

- **Ubicación**: Esquina superior derecha (solo en desarrollo)
- **Información mostrada**:
  - FPS actual
  - FPS promedio
  - Animaciones activas
  - Elementos DOM totales

### 3. Análisis Avanzado

- **Análisis de DOM**: Detecta árboles DOM complejos
- **Análisis de CSS**: Identifica selectores complejos
- **Análisis de JavaScript**: Monitorea uso de memoria
- **Detección de tareas largas**: Identifica operaciones lentas

## 🎯 Cómo Usar

### Atajos de Teclado

- **Ctrl + Shift + P**: Ejecuta análisis completo de rendimiento
- **Panel de control**: Botones para análisis manual y avanzado

### Interpretación de Resultados

#### FPS Normales

- **60 FPS**: Rendimiento óptimo
- **30-60 FPS**: Rendimiento aceptable
- **< 30 FPS**: Problema de rendimiento

#### Alertas Comunes

**⚠️ Low FPS detected**

- Causa: Demasiadas animaciones simultáneas
- Solución: Reducir número de animaciones activas

**⚠️ Large DOM tree detected**

- Causa: Demasiados elementos en el DOM
- Solución: Virtualizar listas largas o simplificar estructura

**⚠️ Deep DOM nesting detected**

- Causa: Estructura DOM muy anidada
- Solución: Aplanar la estructura del DOM

**⚠️ High memory usage**

- Causa: Posibles memory leaks
- Solución: Revisar event listeners y limpiar referencias

**⚠️ Many event listeners**

- Causa: Demasiados event listeners
- Solución: Usar event delegation

### Métricas Importantes

#### Elementos DOM

- **< 500**: Óptimo
- **500-1000**: Aceptable
- **> 1000**: Problema potencial

#### Animaciones Activas

- **< 10**: Óptimo
- **10-20**: Aceptable
- **> 20**: Posible problema

#### Uso de Memoria

- **< 50%**: Óptimo
- **50-70%**: Aceptable
- **> 70%**: Problema potencial

## 🔧 Optimizaciones Recomendadas

### 1. Animaciones GSAP

```typescript
// ❌ Malo - Muchas animaciones simultáneas
elements.forEach(el => {
  gsap.to(el, { duration: 1, y: 100 });
});

// ✅ Bueno - Usar stagger
gsap.to(elements, {
  duration: 1,
  y: 100,
  stagger: 0.1,
});
```

### 2. Efectos de Ondas

```typescript
// ❌ Malo - Efectos complejos en muchos elementos
waves.forEach(wave => {
  gsap.to(wave, {
    y: -10,
    duration: 3,
    repeat: -1,
    yoyo: true,
  });
});

// ✅ Bueno - Reducir número de elementos
const limitedWaves = Array.from(waves).slice(0, 3);
```

### 3. Optimización de CSS

```css
/* ❌ Malo - Selectores complejos */
.container .wrapper .content .item .button:hover

/* ✅ Bueno - Selectores simples */
.button:hover
```

### 4. Event Listeners

```typescript
// ❌ Malo - Muchos event listeners
buttons.forEach(button => {
  button.addEventListener('click', handler);
});

// ✅ Bueno - Event delegation
container.addEventListener('click', e => {
  if (e.target.matches('.button')) {
    handler(e);
  }
});
```

## 📊 Interpretación del Log

### Ejemplo de Log de Rendimiento

```
🚀 Performance monitoring started
📉 Moderate FPS: 45 FPS
⚠️ Low FPS detected: 25 FPS

🔍 Performance Analysis
🎬 Active GSAP animations: 15
🏗️ Total DOM elements: 850
⚖️ Heavy elements count: 8
💾 Memory usage: 45MB / 120MB

🔍 Performance Bottleneck Analysis
🏗️ DOM Analysis:
  Total elements: 850
  Most common elements: [["div", 200], ["span", 150]]
  Maximum nesting depth: 12

🎨 CSS Analysis:
  Total rules: 1200
  Complex selectors: 180

⚡ JavaScript Analysis:
  Memory usage: 37.5%
  Estimated event listeners: 45
```

### Qué Buscar

1. **FPS bajos**: < 30 FPS indica problema
2. **Muchas animaciones**: > 20 animaciones activas
3. **DOM grande**: > 1000 elementos
4. **Memoria alta**: > 70% de uso
5. **Selectores complejos**: > 30% del total

## 🛠️ Herramientas Adicionales

### Chrome DevTools

- **Performance Tab**: Para análisis detallado
- **Memory Tab**: Para detectar memory leaks
- **Layers Tab**: Para problemas de composición

### React DevTools

- **Profiler**: Para analizar re-renders
- **Components**: Para inspeccionar estructura

## 🚨 Troubleshooting

### Problema: FPS bajos constantes

1. Revisar número de animaciones activas
2. Verificar complejidad del DOM
3. Analizar uso de memoria
4. Revisar event listeners

### Problema: Caídas repentinas de FPS

1. Buscar operaciones pesadas
2. Verificar tareas largas
3. Revisar garbage collection
4. Analizar layout thrashing

### Problema: Memory leaks

1. Usar Memory tab en DevTools
2. Revisar event listeners no removidos
3. Verificar referencias circulares
4. Limpiar timeouts/intervals

## 📝 Notas de Desarrollo

- El sistema solo está activo en modo desarrollo
- Los logs se muestran en la consola del navegador
- El panel de control se puede ocultar haciendo clic en "×"
- Los análisis avanzados pueden tomar tiempo en páginas complejas
