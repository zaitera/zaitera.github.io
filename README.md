# Intro Website

A personal introduction website built with React, TypeScript, and Vite. Optimized for static hosting on GitHub Pages.

## Development

To run the development server locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To build the static site:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## GitHub Pages Deployment

### Simple Deployment with npm

1. Push your code to a GitHub repository
2. Run the deploy command:

```bash
# Install dependencies (if not already done)
npm install

# Build and deploy to GitHub Pages
npm run deploy
```

This will automatically:
- Build your site
- Create/update the `gh-pages` branch
- Deploy to GitHub Pages

Your site will be available at: `https://yourusername.github.io/repository-name`

### First Time Setup

If this is your first deployment, you may need to:

1. Go to your GitHub repository
2. Navigate to Settings > Pages
3. Set Source to "Deploy from a branch"
4. Select `gh-pages` branch and `/ (root)` folder
5. Click Save

## Project Structure

```
├── client/                 # React application source
│   ├── src/               # React components and logic
│   │   ├── components/    # React components
│   │   ├── data/          # JSON data files
│   │   └── ...
│   └── public/            # Static assets
├── attached_assets/       # Additional assets
└── dist/                  # Built static files (generated)
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible UI components
- **Framer Motion** - Animations

## Customization

1. Update the JSON files in `client/src/data/` to customize your content
2. Replace assets in `client/public/` and `attached_assets/` with your own
3. Modify components in `client/src/components/` to change the layout and design
4. To use your own Google Analytics ID, update the hardcoded value in:
   - `client/index.html` (lines 10 and 16)
   - `client/src/App.tsx` (line 36)

## Deployment to Other Platforms

This static site can be deployed to any static hosting service:

- **Netlify**: Drag and drop the `dist` folder or connect your GitHub repo
- **Vercel**: Import your GitHub project 
- **Surge.sh**: Run `npm run build && surge dist/`
- **Any web server**: Upload the `dist` folder contents

## License

MIT