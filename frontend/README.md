# HyperLocal Delivery - Frontend

Frontend application for the HyperLocal Delivery MVP built with React, Redux Toolkit, and Tailwind CSS.

## Tech Stack

- **React** - UI library
- **Redux Toolkit + Redux Thunk** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling (mobile-first)
- **Axios** - HTTP client

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5001/api
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── common/       # Common components (Button, Input, Card, etc.)
│   ├── auth/         # Authentication components
│   ├── location/     # Location-related components
│   ├── merchant/     # Merchant-related components
│   ├── product/      # Product-related components
│   ├── cart/         # Cart components
│   └── order/        # Order components
├── pages/            # Page components (routes)
├── store/            # Redux store configuration
│   └── slices/       # Redux slices
├── services/         # API services
├── hooks/            # Custom React hooks
└── utils/            # Utility functions
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (not recommended)

## Development Notes

- The app uses **mobile-first** design approach
- Redux slices are added gradually as features are built
- API calls are centralized in the `services/api.js` file
- All styling uses Tailwind CSS utility classes
