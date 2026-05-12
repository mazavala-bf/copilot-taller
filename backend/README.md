# JWT Authentication API

A **FastAPI** web service that implements JSON Web Token (JWT) authentication, managed with **Poetry** and ready to deploy with **Docker**.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Running with Docker (recommended)](#running-with-docker-recommended)
  - [Running locally with Poetry](#running-locally-with-poetry)
- [Usage Examples](#usage-examples)
- [Configuration](#configuration)

---

## Features

- **Login endpoint** – validates credentials and returns a signed JWT access token (300 s TTL) plus a refresh token (3600 s TTL).
- **Refresh endpoint** – exchanges a valid refresh token for a new token pair.
- **Health check** endpoint for container orchestration.
- Interactive API docs available via Swagger UI (`/docs`) and ReDoc (`/redoc`).

---

## Project Structure

```
backend/
├── app/
│   ├── main.py          # FastAPI application factory & router registration
│   └── auth/
│       ├── router.py    # /auth/login and /auth/refresh endpoints
│       ├── schemas.py   # Pydantic request / response models
│       └── utils.py     # JWT creation, verification, and password helpers
├── pyproject.toml       # Poetry project metadata & dependencies
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## Endpoints

| Method | Path            | Description                                      |
|--------|-----------------|--------------------------------------------------|
| POST   | `/auth/login`   | Authenticate and receive a JWT token pair        |
| POST   | `/auth/refresh` | Refresh an expired access token                  |
| GET    | `/health`       | Health check                                     |
| GET    | `/docs`         | Swagger UI (interactive documentation)           |
| GET    | `/redoc`        | ReDoc documentation                              |

### POST `/auth/login`

**Request body (JSON):**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**

```json
{
  "access_token": "<JWT>",
  "refresh_token": "<JWT>",
  "token_type": "bearer"
}
```

### POST `/auth/refresh`

**Request body (JSON):**

```json
{
  "refresh_token": "<refresh JWT obtained from /auth/login>"
}
```

**Response:** same structure as `/auth/login`.

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) ≥ 24 and [Docker Compose](https://docs.docker.com/compose/) ≥ 2 (for Docker deployment)
- **or** [Python](https://www.python.org/) ≥ 3.11 and [Poetry](https://python-poetry.org/) ≥ 1.8 (for local development)

---

### Running with Docker (recommended)

```bash
# From the backend/ directory
docker compose up --build
```

The API will be available at **http://localhost:8000**.

To stop:

```bash
docker compose down
```

---

### Running locally with Poetry

```bash
# From the backend/ directory

# Install dependencies
poetry install

# Start the development server
poetry run uvicorn app.main:app --reload --port 8000
```

The API will be available at **http://localhost:8000**.

---

## Usage Examples

### Login

```bash
curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}' | jq .
```

Expected response:

```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "bearer"
}
```

### Refresh Token

```bash
REFRESH_TOKEN="<refresh_token from login response>"

curl -s -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\": \"$REFRESH_TOKEN\"}" | jq .
```

---

## Configuration

The following settings can be controlled via **environment variables**:

| Variable                        | Default value                          | Description                    |
|---------------------------------|----------------------------------------|--------------------------------|
| `SECRET_KEY`                    | `super-secret-key-change-in-production` | HMAC signing key               |

Internal defaults (in `app/auth/utils.py`) that can be adjusted at the source level:

| Constant                        | Default value | Description                    |
|---------------------------------|---------------|--------------------------------|
| `ALGORITHM`                     | `HS256`       | JWT signing algorithm          |
| `ACCESS_TOKEN_EXPIRE_SECONDS`   | `300`         | Access token TTL (seconds)     |
| `REFRESH_TOKEN_EXPIRE_SECONDS`  | `3600`        | Refresh token TTL (seconds)    |

> ⚠️ **Important:** Always set `SECRET_KEY` to a long, random value before deploying to production.
> Example: `export SECRET_KEY=$(openssl rand -hex 32)`
