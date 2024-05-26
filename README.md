# Jumper challenge

## Setup

Make sure you have `node` and `yarn` installed.

Makefile is the entry point for all commands.

Frontend app is accessible at `http://localhost:3000`.<br>
Backend app is accessible at `http://localhost:8080`.

Install dependencies:

```sh
make install
```

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
I assumed user does not have to be authorized in order to fetch tokens, so these are available for any connected wallet. Etherscan API is used for fetching token data. .env require `ETHERSCAN_API_KEY` to be set, if not -- frontend with throw an alert in bottom right corner (in case of any other error too).
<br><br>
That being said, i struggled with tests for session. For some reason mocking session did not work as expected with vitest, i tried multiple methods like mocking `express-session` and the `req.session` as a middleware.