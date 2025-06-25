// Performance debugging utilities
export class PerformanceDebugger {
  private static instance: PerformanceDebugger;
  private frameTimeHistory: number[] = [];
  private lastFrameTime = performance.now();
  private isDebugging = false;

  static getInstance(): PerformanceDebugger {
    if (!PerformanceDebugger.instance) {
      PerformanceDebugger.instance = new PerformanceDebugger();
    }
    return PerformanceDebugger.instance;
  }

  startFrameTimeTracking() {
    if (this.isDebugging) return;
    
    this.isDebugging = true;
    this.frameTimeHistory = [];
    this.lastFrameTime = performance.now();
    
    console.log('🎯 Frame time tracking started');
    this.trackFrameTime();
  }

  stopFrameTimeTracking() {
    this.isDebugging = false;
    console.log('⏹️ Frame time tracking stopped');
    
    if (this.frameTimeHistory.length > 0) {
      const avgFrameTime = this.frameTimeHistory.reduce((a, b) => a + b, 0) / this.frameTimeHistory.length;
      const maxFrameTime = Math.max(...this.frameTimeHistory);
      const minFrameTime = Math.min(...this.frameTimeHistory);
      
      console.log('📊 Frame Time Analysis:');
      console.log(`  Average: ${avgFrameTime.toFixed(2)}ms`);
      console.log(`  Maximum: ${maxFrameTime.toFixed(2)}ms`);
      console.log(`  Minimum: ${minFrameTime.toFixed(2)}ms`);
      console.log(`  FPS Range: ${(1000 / maxFrameTime).toFixed(1)} - ${(1000 / minFrameTime).toFixed(1)} FPS`);
    }
  }

  private trackFrameTime() {
    if (!this.isDebugging) return;

    const currentTime = performance.now();
    const frameTime = currentTime - this.lastFrameTime;
    this.frameTimeHistory.push(frameTime);
    
    // Keep only last 300 measurements (5 seconds at 60fps)
    if (this.frameTimeHistory.length > 300) {
      this.frameTimeHistory.shift();
    }
    
    // Log slow frames
    if (frameTime > 33) { // More than 30fps threshold
      console.warn(`🐌 Slow frame detected: ${frameTime.toFixed(2)}ms (${(1000 / frameTime).toFixed(1)} FPS)`);
      this.analyzeSlowFrame();
    }
    
    this.lastFrameTime = currentTime;
    requestAnimationFrame(() => this.trackFrameTime());
  }

  private analyzeSlowFrame() {
    console.group('🔍 Slow Frame Analysis');
    
    // Check for layout thrashing
    const layoutMetrics = this.getLayoutMetrics();
    console.log('📐 Layout metrics:', layoutMetrics);
    
    // Check for memory pressure
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      if (memoryUsage > 80) {
        console.warn(`💾 High memory usage: ${memoryUsage.toFixed(1)}%`);
      }
    }
    
    // Check for long tasks
    this.detectLongTasks();
    
    console.groupEnd();
  }

  private getLayoutMetrics() {
    const start = performance.now();
    
    // Force layout calculation
    const elements = document.querySelectorAll('*');
    const totalElements = elements.length;
    
    // Check for elements with complex styles
    const complexElements = Array.from(elements).filter(el => {
      const styles = window.getComputedStyle(el);
      return styles.transform !== 'none' || 
             styles.filter !== 'none' || 
             styles.backdropFilter !== 'none' ||
             styles.boxShadow !== 'none';
    }).length;
    
    const end = performance.now();
    
    return {
      totalElements,
      complexElements,
      layoutTime: end - start
    };
  }

  private detectLongTasks() {
    // This is a simplified version - in a real implementation you'd use PerformanceObserver
    const now = performance.now();
    const tasks = performance.getEntriesByType('measure');
    const longTasks = tasks.filter(task => task.duration > 16);
    
    if (longTasks.length > 0) {
      console.warn(`⏱️ Long tasks detected: ${longTasks.length}`);
      longTasks.forEach(task => {
        console.log(`  - ${task.name}: ${task.duration.toFixed(2)}ms`);
      });
    }
  }

  // Method to analyze specific performance bottlenecks
  analyzeBottlenecks() {
    console.group('🔍 Performance Bottleneck Analysis');
    
    // Analyze DOM complexity
    this.analyzeDOMComplexity();
    
    // Analyze CSS complexity
    this.analyzeCSSComplexity();
    
    // Analyze JavaScript performance
    this.analyzeJavaScriptPerformance();
    
    console.groupEnd();
  }

  private analyzeDOMComplexity() {
    const elements = document.querySelectorAll('*');
    const totalElements = elements.length;
    
    // Count elements by type
    const elementTypes = new Map<string, number>();
    elements.forEach(el => {
      const tagName = el.tagName.toLowerCase();
      elementTypes.set(tagName, (elementTypes.get(tagName) || 0) + 1);
    });
    
    // Find most common elements
    const sortedTypes = Array.from(elementTypes.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    
    console.log('🏗️ DOM Analysis:');
    console.log(`  Total elements: ${totalElements}`);
    console.log(`  Most common elements:`, sortedTypes);
    
    // Check for deeply nested elements
    const maxDepth = Math.max(...Array.from(elements).map(el => {
      let depth = 0;
      let parent = el.parentElement;
      while (parent) {
        depth++;
        parent = parent.parentElement;
      }
      return depth;
    }));
    
    console.log(`  Maximum nesting depth: ${maxDepth}`);
    
    if (totalElements > 1000) {
      console.warn('⚠️ Large DOM tree detected - consider virtualizing or simplifying');
    }
    
    if (maxDepth > 15) {
      console.warn('⚠️ Deep DOM nesting detected - consider flattening structure');
    }
  }

  private analyzeCSSComplexity() {
    const stylesheets = Array.from(document.styleSheets);
    let totalRules = 0;
    let complexSelectors = 0;
    
    stylesheets.forEach(sheet => {
      try {
        const rules = Array.from(sheet.cssRules || []);
        totalRules += rules.length;
        
        rules.forEach(rule => {
          if (rule instanceof CSSStyleRule) {
            const selector = rule.selectorText;
            // Count complex selectors (with multiple parts, pseudo-selectors, etc.)
            if (selector.includes(' ') || selector.includes(':') || selector.includes('[')) {
              complexSelectors++;
            }
          }
        });
      } catch (e) {
        // CORS error or other issues
      }
    });
    
    console.log('🎨 CSS Analysis:');
    console.log(`  Total rules: ${totalRules}`);
    console.log(`  Complex selectors: ${complexSelectors}`);
    
    if (complexSelectors > totalRules * 0.3) {
      console.warn('⚠️ High percentage of complex selectors - consider simplifying');
    }
  }

  private analyzeJavaScriptPerformance() {
    // Check for memory leaks
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      
      console.log('⚡ JavaScript Analysis:');
      console.log(`  Memory usage: ${memoryUsage.toFixed(1)}%`);
      
      if (memoryUsage > 70) {
        console.warn('⚠️ High memory usage - check for memory leaks');
      }
    }
    
    // Check for event listeners
    const eventListeners = this.countEventListeners();
    console.log(`  Estimated event listeners: ${eventListeners}`);
    
    if (eventListeners > 100) {
      console.warn('⚠️ Many event listeners - consider event delegation');
    }
  }

  private countEventListeners(): number {
    // This is an estimation - we can't directly count event listeners
    const elements = document.querySelectorAll('*');
    let estimatedListeners = 0;
    
    elements.forEach(el => {
      // Count elements that likely have event listeners
      if (el.tagName === 'BUTTON' || 
          el.tagName === 'A' || 
          el.tagName === 'INPUT' ||
          el.onclick ||
          el.onmouseover ||
          el.onmouseenter) {
        estimatedListeners++;
      }
    });
    
    return estimatedListeners;
  }
}

// Export singleton instance
export const performanceDebugger = PerformanceDebugger.getInstance(); 