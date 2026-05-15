/**
 * Vercel Speed Insights initialization for static HTML site
 * This file imports and initializes the Speed Insights tracking
 */
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectSpeedInsights({
      debug: false
    });
  });
} else {
  // DOM is already ready
  injectSpeedInsights({
    debug: false
  });
}
