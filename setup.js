const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Create project directory
const projectDir = path.join(__dirname, 'airbnb-clone');
if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir, { recursive: true });
}

// Change to project directory
process.chdir(projectDir);

// Create package.json
const packageJson = {
  name: "airbnb-clone",
  version: "0.1.0",
  private: true,
  scripts: {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install next@latest react@latest react-dom@latest eslint@latest eslint-config-next@latest typescript@latest @types/react@latest @types/node@latest @types/react-dom@latest tailwindcss@latest postcss@latest autoprefixer@latest', { stdio: 'inherit' });

// Initialize Next.js configuration
console.log('Setting up Next.js configuration...');
fs.writeFileSync('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'a0.muscache.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
`);

// Create tsconfig.json
fs.writeFileSync('tsconfig.json', `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
`);

// Create Tailwind configuration
fs.writeFileSync('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#FF5A5F',
        'airbnb-pink': '#FF385C',
        'airbnb-dark-gray': '#222222',
        'airbnb-light-gray': '#717171',
      },
      fontFamily: {
        sans: ['Circular', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
`);

// Create PostCSS config
fs.writeFileSync('postcss.config.js', `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);

// Create app directory structure
const appDir = path.join(projectDir, 'app');
fs.mkdirSync(appDir, { recursive: true });

// Create global CSS file
fs.writeFileSync(path.join(appDir, 'globals.css'), `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-airbnb-pink text-white px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all;
  }
  
  .card-shadow {
    @apply shadow-md hover:shadow-xl transition-shadow duration-200;
  }
}
`);

// Create layout.tsx
fs.writeFileSync(path.join(appDir, 'layout.tsx'), `import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Airbnb Clone - Vacation Homes & Condo Rentals',
  description: 'Find vacation rentals, cabins, beach houses, unique homes and experiences around the world - all made possible by hosts on Airbnb.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
`);

// Create page.tsx
fs.writeFileSync(path.join(appDir, 'page.tsx'), `export default function Home() {
  return (
    <main className="min-h-screen">
      <h1 className="text-3xl font-bold text-airbnb-pink p-4">
        Airbnb Clone - Coming Soon
      </h1>
    </main>
  );
}
`);

console.log('Next.js project with Tailwind CSS has been set up successfully!');
console.log('You can now run:');
console.log('  cd airbnb-clone');
console.log('  npm run dev'); 