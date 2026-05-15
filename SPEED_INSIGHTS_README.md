# Vercel Speed Insights Integration

This project now includes Vercel Speed Insights for monitoring web performance metrics.

## What is Speed Insights?

Vercel Speed Insights automatically tracks Core Web Vitals and other performance metrics for your website, providing valuable insights into:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Input Delay (FID)
- Interaction to Next Paint (INP)

## Implementation Details

### Package Installed
- `@vercel/speed-insights@^2.0.0` - The official Vercel Speed Insights package

### Files Added/Modified

**New Files:**
- `src/speed-insights.js` - Source file that initializes Speed Insights
- `dist/speed-insights.min.js` - Bundled and minified Speed Insights script (1.8 KB)
- `.gitignore` - Excludes node_modules from version control
- `package.json` - Added dependencies and build scripts

**Modified Files:**
- `index.html` - Added Speed Insights script tag
- `about.html` - Added Speed Insights script tag
- `products.html` - Added Speed Insights script tag

### How It Works

1. **Build Process**: The `src/speed-insights.js` file imports the Speed Insights library and initializes it
2. **Bundling**: esbuild bundles and minifies the code into `dist/speed-insights.min.js`
3. **Loading**: Each HTML page includes the bundled script before the closing `</body>` tag
4. **Tracking**: Speed Insights automatically tracks performance metrics and sends them to Vercel

### Build Commands

```bash
# Build the Speed Insights bundle
npm run build:speed-insights

# Or simply
npm run build
```

### Deployment Requirements

1. **Enable Speed Insights in Vercel Dashboard**:
   - Go to your project in the Vercel Dashboard
   - Navigate to the Speed Insights section
   - Click "Enable" to activate Speed Insights for your project

2. **Deploy**: 
   - Deploy your site to Vercel
   - The Speed Insights script will automatically connect to Vercel's tracking infrastructure at `/_vercel/speed-insights/*`

3. **View Data**:
   - After deployment and user visits, performance metrics will appear in the Vercel Dashboard
   - Data is collected from real users in production (not in development mode)

### Configuration

The Speed Insights is initialized with `debug: false` in production. To customize the configuration, edit `src/speed-insights.js`:

```javascript
injectSpeedInsights({
  debug: false,          // Set to true for debug logging
  sampleRate: 1,         // Fraction of events to send (1 = 100%)
  // beforeSend: (event) => event  // Middleware to modify events
});
```

### Important Notes

- Speed Insights does NOT track data in development mode
- The script is deferred and won't block page rendering
- All data is sent to Vercel's infrastructure automatically when deployed
- The `dist/` folder is committed to version control as it contains the production bundle needed for deployment

## Support

For more information, visit:
- [Vercel Speed Insights Documentation](https://vercel.com/docs/speed-insights)
- [Speed Insights Quickstart](https://vercel.com/docs/speed-insights/quickstart)
