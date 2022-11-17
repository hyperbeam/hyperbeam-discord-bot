# Hyperbeam Discord Bot

A bot to integrate the Hyperbeam API with Discord.

## Setup

- Run `npm install` to install all dependencies

## Configuration

- Get your `HYPERBEAM_API_KEY` from <https://hyperbeam.dev> and store it in the `.env` file in the project root folder.
- Create a [Discord application](https://discord.com/developers/applications) and enable a bot user for the account.
- Get your `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` and `DISCORD_BOT_TOKEN` from there and add it to the `.env` file.
- Optionally, store a server ID as `DISCORD_DEVELOPMENT_GUILD_ID` to register guild commands instead of global commands for quicker development.
- Copy the `DISCORD_CLIENT_ID` value to the `VITE_CLIENT_ID` env variable as well.
- Define the `VITE_CLIENT_PORT` and the `API_SERVER_PORT` for serving the frontend client and the backend server respectively.
- Set the `VITE_CLIENT_URL` to the URL that the frontend client is served at. (ex: `https://localhost:4000`)
- Add the `VITE_CLIENT_URL` to the OAuth2 redirect URI list in your Discord application settings.
- Set the `DATABASE_URL` to the relative path to the SQLite db (relative to the prisma schema file)

## Development notes

- Update typings with `npm run envtypes` after modifying the `.env` file structure
- Generate migration files with `npm run db:migrate` and commit them after changing the database schema
- Lint and fix issues before committing with `npm run lint:fix`

## Scripts

### Deploying

- `npm start`
  Builds and starts a PM2 instance with both the bot/API and the frontend client processes
- `npm run bot`
  Builds and starts the bot and the API server
- `npm run client`
  Builds and starts the frontend client server

### Building/Compiling

- `npm run bot:build`
  Builds the bot to the `dist/bot` folder
- `npm run client:build`
  Builds the frontend client to the `dist/client` folder

### Development

- `npm run bot:dev`
  Launches the bot in development mode and hot-reloads on file changes
- `npm run client:dev`
  Launches the frontend client server without typechecking
- `npm run lint` (or `lint:fix`)
  Lints (and optionally fixes) code style, formatting and linting errors with the ESLint config
- `npm run envtypes`
  Generates typings from the `.env` file for typedefs in code

## Managing the database

- `npx prisma db push`
  Push current schema onto the database and generate a new client
- `npx prisma generate`
  Generate a new database client
- `npx prisma studio`
  Browse through database contents in your browser

## Recommended VSCode plugins

- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
