# Jumper challenge

## Setup

Make sure you have `node` and `yarn` installed.

Makefile is the entry point for all commands and it runs commands for both frontend and backend.

Frontend app is accessible at `http://localhost:3000`.<br>
Backend app is accessible at `http://localhost:8080`.

Install dependencies:

```sh
make install
```

That command automatically copies .env.template to .env in backend. Make sure to fill in the required values before you start the server, especially ETHERSCAN_API.

Run development server:

```sh
make dev
```

Run build:

```sh
make build
```

Run production server:

```sh
make start
```

Make sure `.env` file in backend is setup correctly.

---

## Comments

I have used wagmi with rainbow-kit for wallet connection. Authoriziation aka login with signature is done in a wagmi/next.js way utilizing sessions on the backend.<br>If account should be persistent i would lean towards MongoDB with users collection.<br>
I assumed user does not have to be authorized in order to fetch tokens, so these are available for any connected wallet. Etherscan API is used for fetching token data. .env require `ETHERSCAN_API_KEY` to be set, if not -- frontend with throw an alert in bottom right corner (in case of any other error too).<br>
I chose (mostly for fun) IndexedDB for data storage for the leaderboard. I have used `dexie` library for this purpose which wraps browser build-in functions with react hooks.<br><br>
The missing part in the task are tests for endpoints utilizing req.session. Seems that there is no feasible way with `vitest` to mock session object. In real world scenario i would probably consider other testing suites. I will continue working on it in the meantime.<br>