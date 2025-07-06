// Performance debugging utilities
export class PerformanceDebugger {
  private static instance: PerformanceDebugger;
  private frameTimeHistory: number[] = [];
  private lastFrameTime = performance.now();
  private isDebugging = false;
  private isDevelopment = process.env.NODE_ENV === 'development';

  // Add optimization tracking
  private optimizationMetrics = {
    beforeOptimization: {
      avgFPS: 0,
      minFPS: 0,
      maxFPS: 0,
      complexElements: 0,
      animationCount: 0,
    },
    afterOptimization: {
      avgFPS: 0,
      minFPS: 0,
      maxFPS: 0,
      complexElements: 0,
      animationCount: 0,
    },
  };

  static getInstance(): PerformanceDebugger {
    if (!PerformanceDebugger.instance) {
      PerformanceDebugger.instance = new PerformanceDebugger();
    }
    return PerformanceDebugger.instance;
  }

  startFrameTimeTracking() {
    if (!this.isDevelopment || this.isDebugging) return;

    this.isDebugging = true;
    this.frameTimeHistory = [];
    this.lastFrameTime = performance.now();

    if (this.isDevelopment) {
      console.log('🎯 Frame time tracking started');
    }
    this.trackFrameTime();
  }

  stopFrameTimeTracking() {
    if (!this.isDevelopment) return;

    this.isDebugging = false;
    if (this.isDevelopment) {
      console.log('⏹️ Frame time tracking stopped');
    }

    if (this.frameTimeHistory.length > 0) {
      const avgFrameTime =
        this.frameTimeHistory.reduce((a, b) => a + b, 0) /
        this.frameTimeHistory.length;
      const maxFrameTime = Math.max(...this.frameTimeHistory);
      const minFrameTime = Math.min(...this.frameTimeHistory);

      if (this.isDevelopment) {
        console.log('📊 Frame Time Analysis:');
        console.log(`  Average: ${avgFrameTime.toFixed(2)}ms`);
        console.log(`  Maximum: ${maxFrameTime.toFixed(2)}ms`);
        console.log(`  Minimum: ${minFrameTime.toFixed(2)}ms`);
        console.log(
          `  FPS Range: ${(1000 / maxFrameTime).toFixed(1)} - ${(1000 / minFrameTime).toFixed(1)} FPS`
        );
      }
    }
  }

  private trackFrameTime() {
    if (!this.isDevelopment || !this.isDebugging) return;

    const currentTime = performance.now();
    const frameTime = currentTime - this.lastFrameTime;
    this.frameTimeHistory.push(frameTime);

    // Keep only last 300 measurements (5 seconds at 60fps)
    if (this.frameTimeHistory.length > 300) {
      this.frameTimeHistory.shift();
    }

    // Log slow frames
    if (frameTime > 33 && this.isDevelopment) {
      // More than 30fps threshold
      console.warn(
        `🐌 Slow frame detected: ${frameTime.toFixed(2)}ms (${(1000 / frameTime).toFixed(1)} FPS)`
      );
      this.analyzeSlowFrame();
    }

    this.lastFrameTime = currentTime;
    requestAnimationFrame(() => this.trackFrameTime());
  }

  private analyzeSlowFrame() {
    if (!this.isDevelopment) return;

    console.group('🔍 Slow Frame Analysis');

    // Check for layout thrashing
    const layoutMetrics = this.getLayoutMetrics();
    console.log('📐 Layout metrics:', layoutMetrics);

    // Check for memory pressure
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage =
        (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
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
      return (
        styles.transform !== 'none' ||
        styles.filter !== 'none' ||
        styles.backdropFilter !== 'none' ||
        styles.boxShadow !== 'none'
      );
    }).length;

    const end = performance.now();

    return {
      totalElements,
      complexElements,
      layoutTime: end - start,
    };
  }

  private detectLongTasks() {
    if (!this.isDevelopment) return;

    // This is a simplified version - in a real implementation you'd use PerformanceObserver
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
    if (!this.isDevelopment) return;

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
    if (!this.isDevelopment) return;

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
    const maxDepth = Math.max(
      ...Array.from(elements).map(el => {
        let depth = 0;
        let parent = el.parentElement;
        while (parent) {
          depth++;
          parent = parent.parentElement;
        }
        return depth;
      })
    );

    console.log(`  Maximum nesting depth: ${maxDepth}`);

    if (totalElements > 1000) {
      console.warn(
        '⚠️ Large DOM tree detected - consider virtualizing or simplifying'
      );
    }

    if (maxDepth > 15) {
      console.warn(
        '⚠️ Deep DOM nesting detected - consider flattening structure'
      );
    }
  }

  private analyzeCSSComplexity() {
    if (!this.isDevelopment) return;

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
            if (
              selector.includes(' ') ||
              selector.includes(':') ||
              selector.includes('[')
            ) {
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
      console.warn(
        '⚠️ High percentage of complex selectors - consider simplifying'
      );
    }
  }

  private analyzeJavaScriptPerformance() {
    if (!this.isDevelopment) return;

    // Check for memory leaks
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      const memoryUsage =
        (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;

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
      if (
        el.tagName === 'BUTTON' ||
        el.tagName === 'A' ||
        el.tagName === 'INPUT' ||
        (el instanceof HTMLElement &&
          (typeof el.onclick === 'function' ||
            typeof el.onmouseover === 'function' ||
            typeof el.onmouseenter === 'function'))
      ) {
        estimatedListeners++;
      }
    });

    return estimatedListeners;
  }

  // Method to capture baseline metrics
  captureBaselineMetrics() {
    if (!this.isDevelopment) return;

    const frames = this.frameTimeHistory.slice(-100); // Last 100 frames
    if (frames.length === 0) return;

    const fps = frames.map(frameTime => 1000 / frameTime);
    const complexElements = this.getComplexElementCount();
    const animationCount = this.getActiveAnimationCount();

    this.optimizationMetrics.beforeOptimization = {
      avgFPS: Math.round(fps.reduce((a, b) => a + b, 0) / fps.length),
      minFPS: Math.round(Math.min(...fps)),
      maxFPS: Math.round(Math.max(...fps)),
      complexElements,
      animationCount,
    };

    if (this.isDevelopment) {
      console.log(
        '📊 Baseline metrics captured:',
        this.optimizationMetrics.beforeOptimization
      );
    }
  }

  // Method to capture optimized metrics
  captureOptimizedMetrics() {
    if (!this.isDevelopment) return;

    const frames = this.frameTimeHistory.slice(-100); // Last 100 frames
    if (frames.length === 0) return;

    const fps = frames.map(frameTime => 1000 / frameTime);
    const complexElements = this.getComplexElementCount();
    const animationCount = this.getActiveAnimationCount();

    this.optimizationMetrics.afterOptimization = {
      avgFPS: Math.round(fps.reduce((a, b) => a + b, 0) / fps.length),
      minFPS: Math.round(Math.min(...fps)),
      maxFPS: Math.round(Math.max(...fps)),
      complexElements,
      animationCount,
    };

    if (this.isDevelopment) {
      console.log(
        '📊 Optimized metrics captured:',
        this.optimizationMetrics.afterOptimization
      );
    }
    this.compareOptimizations();
  }

  // Method to compare before/after optimization
  compareOptimizations() {
    if (!this.isDevelopment) return;

    const before = this.optimizationMetrics.beforeOptimization;
    const after = this.optimizationMetrics.afterOptimization;

    if (before.avgFPS === 0) {
      console.warn('⚠️ No baseline metrics available for comparison');
      return;
    }

    const improvements = {
      avgFPSImprovement: after.avgFPS - before.avgFPS,
      minFPSImprovement: after.minFPS - before.minFPS,
      maxFPSImprovement: after.maxFPS - before.maxFPS,
      complexElementsReduction: before.complexElements - after.complexElements,
      animationReduction: before.animationCount - after.animationCount,
    };

    console.group('🚀 Performance Optimization Results');
    console.log('📈 FPS Improvements:');
    console.log(
      `  Average FPS: ${before.avgFPS} → ${after.avgFPS} (${improvements.avgFPSImprovement > 0 ? '+' : ''}${improvements.avgFPSImprovement})`
    );
    console.log(
      `  Minimum FPS: ${before.minFPS} → ${after.minFPS} (${improvements.minFPSImprovement > 0 ? '+' : ''}${improvements.minFPSImprovement})`
    );
    console.log(
      `  Maximum FPS: ${before.maxFPS} → ${after.maxFPS} (${improvements.maxFPSImprovement > 0 ? '+' : ''}${improvements.maxFPSImprovement})`
    );

    console.log('🎯 Element Optimizations:');
    console.log(
      `  Complex Elements: ${before.complexElements} → ${after.complexElements} (${improvements.complexElementsReduction > 0 ? '-' : '+'}${Math.abs(improvements.complexElementsReduction)})`
    );
    console.log(
      `  Active Animations: ${before.animationCount} → ${after.animationCount} (${improvements.animationReduction > 0 ? '-' : '+'}${Math.abs(improvements.animationReduction)})`
    );

    console.log('💡 Performance Score:');
    const performanceScore = this.calculatePerformanceScore(after);
    console.log(`  Overall Score: ${performanceScore}/100`);

    if (improvements.avgFPSImprovement > 10) {
      console.log(
        '🎉 Excellent optimization! Significant FPS improvement detected.'
      );
    } else if (improvements.avgFPSImprovement > 5) {
      console.log('✅ Good optimization! Notable FPS improvement.');
    } else if (improvements.avgFPSImprovement > 0) {
      console.log('👍 Minor improvement detected.');
    } else {
      console.log(
        '⚠️ No significant improvement detected. Consider additional optimizations.'
      );
    }

    console.groupEnd();
  }

  // Calculate overall performance score
  private calculatePerformanceScore(
    metrics: typeof this.optimizationMetrics.afterOptimization
  ): number {
    let score = 0;

    // FPS score (40 points max)
    if (metrics.avgFPS >= 55) score += 40;
    else if (metrics.avgFPS >= 45) score += 30;
    else if (metrics.avgFPS >= 30) score += 20;
    else if (metrics.avgFPS >= 20) score += 10;

    // Consistency score (30 points max)
    const fpsVariance = metrics.maxFPS - metrics.minFPS;
    if (fpsVariance <= 10) score += 30;
    else if (fpsVariance <= 20) score += 20;
    else if (fpsVariance <= 30) score += 10;

    // Complexity score (30 points max)
    if (metrics.complexElements <= 10) score += 30;
    else if (metrics.complexElements <= 20) score += 20;
    else if (metrics.complexElements <= 30) score += 10;

    return Math.min(100, score);
  }

  private getComplexElementCount(): number {
    const elements = document.querySelectorAll('*');
    let complexCount = 0;

    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (
        styles.transform !== 'none' ||
        styles.filter !== 'none' ||
        styles.backdropFilter !== 'none' ||
        styles.boxShadow !== 'none' ||
        styles.opacity !== '1'
      ) {
        complexCount++;
      }
    });

    return complexCount;
  }

  private getActiveAnimationCount(): number {
    // Count GSAP animations
    const gsapAnimations = gsap.globalTimeline.getChildren().length;

    // Count CSS animations
    const elements = document.querySelectorAll('*');
    let cssAnimations = 0;

    elements.forEach(el => {
      const styles = window.getComputedStyle(el);
      if (styles.animationName !== 'none') {
        cssAnimations++;
      }
    });

    return gsapAnimations + cssAnimations;
  }
}

// Export singleton instance
export const performanceDebugger = PerformanceDebugger.getInstance();
