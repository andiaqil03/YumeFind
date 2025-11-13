# Anime Search App

A modern, responsive anime search application built with React, TypeScript, and Redux. Search for anime using the Jikan API and view detailed information about your favorite shows.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository or extract the project files
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:4000`

### Build for Production

```bash
npm run build
```

## 📋 Features

### Core Functionality

- **Instant Search**: Real-time search with 250ms debouncing to optimize API calls
- **Request Cancellation**: Automatically cancels in-flight requests when the user continues typing
- **Server-side Pagination**: Efficient pagination handled by the API
- **Two-Page Navigation**: 
  - Search page with results grid
  - Detail page with comprehensive anime information
- **Redux State Management**: Centralized state management for search and anime details
- **TypeScript**: Fully typed codebase with minimal use of `any` types

### User Experience

- **Skeleton Loaders**: Smooth loading states while fetching data
- **Empty States**: Helpful messaging when no results are found or search is empty
- **Error Handling**: Graceful error handling for network failures, rate limiting, and invalid responses
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Modern UI**: Beautiful gradient backgrounds and smooth transitions

## 🛠️ Tech Stack

- **React 19** - UI library with hooks only (no class components)
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Jikan API** - Free anime database API (no authentication required)

## 📁 Project Structure

```
anime-search-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AnimeCard.tsx    # Anime card component for search results
│   │   ├── Pagination.tsx   # Pagination controls
│   │   ├── SearchBar.tsx    # Search input with debouncing
│   │   └── SkeletonLoader.tsx # Loading skeleton
│   ├── pages/               # Page components
│   │   ├── SearchPage.tsx   # Main search page
│   │   └── DetailPage.tsx   # Anime detail page
│   ├── services/            # API services
│   │   └── api.ts           # Jikan API integration
│   ├── store/               # Redux store configuration
│   │   ├── store.ts         # Store setup
│   │   ├── hooks.ts         # Typed Redux hooks
│   │   └── slices/          # Redux slices
│   │       ├── searchSlice.ts      # Search state management
│   │       └── animeDetailSlice.ts # Anime detail state management
│   ├── types/               # TypeScript type definitions
│   │   └── anime.ts         # Anime data types
│   ├── App.tsx              # Main app component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles with Tailwind
├── package.json
├── vite.config.ts           # Vite configuration (port 4000)
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md
```

## 🎯 Implementation Details

### Instant Search with Debouncing

The search bar implements instant search with a 250ms debounce interval:

- User input triggers a debounced API call after 250ms of inactivity
- Previous API requests are automatically cancelled when new input is detected
- This prevents excessive API calls while maintaining a responsive feel

### State Management

Redux Toolkit is used for state management with two main slices:

1. **Search Slice**: Manages search query, results, pagination, and loading states
2. **Anime Detail Slice**: Manages individual anime detail data

### Error Handling

The application handles various error scenarios:

- Network failures
- API rate limiting (429 errors)
- Invalid API responses
- Not found errors (404)
- Request cancellation (expected behavior, handled silently)

### Race Condition Handling

Request cancellation ensures that only the latest search request's results are displayed, preventing race conditions where older requests might overwrite newer results.

## 🎨 Bonus Implementation

The following bonus features have been implemented to enhance the user experience and demonstrate technical excellence:

### User Experience Enhancements

1. **Creative UI with "Wow" Factor**
   - Beautiful gradient backgrounds (blue to indigo)
   - Smooth hover effects and transitions
   - Modern card-based design with shadow effects
   - Color-coded stat badges on detail page

2. **Skeleton Loaders**
   - Animated skeleton loaders displayed during data fetching
   - Provides visual feedback that content is loading

3. **Empty State and No Results Handling**
   - Friendly empty state when no search has been performed
   - Helpful messaging when search returns no results
   - Emoji icons for visual appeal

4. **Mobile Responsiveness**
   - Fully responsive grid layout (1 column on mobile, up to 5 on desktop)
   - Touch-friendly buttons and interactive elements
   - Optimized spacing and typography for all screen sizes

5. **Additional UX Features**
   - Smooth scroll to top on pagination
   - Image error handling with fallback placeholders
   - Loading states that prevent multiple simultaneous requests
   - Back navigation button on detail page

### Technical Excellence

1. **Proper Error Handling**
   - Comprehensive error handling for network failures
   - Rate limiting detection and user-friendly error messages
   - Invalid API response handling
   - 404 error handling for non-existent anime

2. **Race Condition Handling**
   - Request cancellation prevents race conditions
   - AbortController implementation for in-flight request cancellation
   - Silent handling of cancelled requests (expected behavior)

3. **Code Quality**
   - Clean, well-organized code structure
   - Reusable components
   - Proper TypeScript typing throughout
   - Separation of concerns (API, state, UI)

## 🌐 Deployment

This project is configured to be easily deployed to any static hosting service:

### Recommended: Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure redirects: All routes should redirect to `index.html` for client-side routing

### Other Options

- **Vercel**: Connect your repository or deploy the `dist` folder
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **Render**: Deploy as a static site

### Important Notes

- The app runs on port 4000 in development
- No environment variables are required
- The app works immediately after `npm install` and `npm run dev`

## 📝 API Information

This app uses the [Jikan API](https://docs.api.jikan.moe/) - a free, open-source API for MyAnimeList data. No authentication is required.

- Base URL: `https://api.jikan.moe/v4`
- Rate Limit: 3 requests per second, 60 requests per minute
- Endpoints Used:
  - `GET /anime` - Search anime
  - `GET /anime/{id}/full` - Get anime details

## 🧪 Testing

To test the application:

1. Start the dev server: `npm run dev`
2. Navigate to `http://localhost:4000`
3. Try searching for popular anime like "Naruto", "One Piece", or "Attack on Titan"
4. Click on any anime card to view details
5. Test pagination with searches that return many results
6. Test the instant search by typing quickly

## 📄 License

This project is created for a job application assessment.

## 👤 Author

Created as part of a technical assessment for a React developer position.
