# Nest, Mongo, Vue simple client-server app with JWT auth

### Prerequisites
1. You should have MongoDB installed and running
2. You should have node and npm installed

## Server setup

### Installation

```bash
$ cd kino-man-server
```

```bash
$ npm i
```

Create a new file `.env` and paste content from env-example into it

### Running the app

```bash
$ npm run start
```

### Available REST API endpoints
1. POST, auth/login
2. POST, auth/register
3. GET, time/now, requires JWT auth bearer token

## Client setup

### Installation

```bash
$ cd kino-man-client
```

```bash
$ npm i
```

Create a new file `.env` and paste content from env-example into it

### Running the app

```bash
$ npm run dev
```

You can also build the project and run index.html file from dist folder
