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

### Automatic Deployment with GitHub Actions

1. Push your code to a GitHub repository
2. Go to your repository Settings > Pages
3. Select "GitHub Actions" as the source
4. The `.github/workflows/deploy.yml` file is already configured for automatic deployment
5. Push changes to the main branch to trigger automatic deployment

### Manual Deployment

Alternatively, you can build locally and push to the `gh-pages` branch:

```bash
# Build the site
npm run build

# Deploy to GitHub Pages (requires gh-pages package)
npm install -g gh-pages
gh-pages -d dist
```

## Project Structure

```
├── client/                 # React application source
│   ├── src/               # React components and logic
│   │   ├── components/    # React components
│   │   ├── data/          # JSON data files
│   │   └── ...
│   └── public/            # Static assets
├── attached_assets/       # Additional assets
├── .github/workflows/     # GitHub Actions for deployment
└── dist/                  # Built static files (generated)
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Radix UI** - Accessible UI components
- **Framer Motion** - Animations

## Configuration

### Google Analytics (Optional)

1. Copy `.env.example` to `.env.local`
2. Add your Google Analytics Measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

## Customization

1. Update the JSON files in `client/src/data/` to customize your content
2. Replace assets in `client/public/` and `attached_assets/` with your own
3. Modify components in `client/src/components/` to change the layout and design

## Deployment to Other Platforms

This static site can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import your GitHub project for seamless deployment
- **GitHub Pages**: Use the included GitHub Actions workflow
- **Surge.sh**: Run `npm run build && surge dist/`

## License

MIT