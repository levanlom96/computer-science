# React Router SASS App

A modern React TypeScript application built with Vite, featuring React Router DOM for navigation and SASS for styling.

## Features

- ⚡ **Vite** - Lightning fast build tool and development server
- ⚛️ **React 18** - Latest React with TypeScript support
- 🧭 **React Router DOM** - Client-side routing for single-page application
- 🎨 **SASS** - Advanced CSS preprocessing with variables, nesting, and mixins
- 📱 **Responsive Design** - Mobile-first responsive layout
- 🎯 **TypeScript** - Type-safe development experience
- 🏗️ **Modern Project Structure** - Clean and scalable architecture

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navigation.tsx   # Main navigation component
│   └── Navigation.scss  # Navigation styles
├── pages/               # Page components
│   ├── Home.tsx        # Home page
│   ├── Home.scss       # Home page styles
│   ├── About.tsx       # About page
│   ├── About.scss      # About page styles
│   ├── Contact.tsx     # Contact page
│   └── Contact.scss    # Contact page styles
├── App.tsx             # Main App component
├── App.scss            # App-level styles
├── main.tsx            # Application entry point
└── index.scss          # Global styles and CSS variables
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd react-router-sass-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Technologies Used

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **SASS** - CSS preprocessor
- **ESLint** - Code linting

## Features Showcase

### Routing
- **Home** (`/`) - Landing page with feature showcase
- **About** (`/about`) - Information about the project
- **Contact** (`/contact`) - Contact form with form handling

### SASS Features
- CSS custom properties (variables) for theming
- Nested selectors for organized styling
- Media queries for responsive design
- Hover effects and transitions
- Component-scoped styling

### TypeScript Integration
- Type-safe component props
- Interface definitions for form data
- Event handler typing
- React Router DOM types

## Styling Architecture

The project uses a modern SASS architecture with:
- **Global styles** in `index.scss` with CSS custom properties
- **Component-scoped styles** for each component
- **Responsive design** with mobile-first approach
- **Dark mode support** through CSS custom properties
- **Consistent design tokens** for colors, spacing, and typography

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).