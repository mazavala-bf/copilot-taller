# Copilot Taller — Frontend

React (Vite) frontend for the JWT authentication demo. Built with the Stripe-inspired design system from `DESIGN.md`.

## Prerequisites

- Node.js 18+
- Backend running on port 8000

## Installation

```bash
npm install
```

## Running

```bash
npm run dev
```

Opens at **http://localhost:5173**

## Building

```bash
npm run build
```

## Credentials

| Field    | Value    |
|----------|----------|
| Username | `admin`  |
| Password | `admin123` |

## Notes

- The backend must be running on `http://localhost:8000` before starting the frontend.
- Tokens are stored in `sessionStorage` and cleared on logout or tab close.
