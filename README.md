# securitize-eth-wallets-dash

## Description
This is a monorepository for an Ethereum wallets dashboard that allows users to manage their wallets and view their balances in both euros and dollars. The project consists in a monorepository of a modular backend implemented with NestJS that serves a frontend built with ReactJS, both utilizing TypeScript.
## Prerequisites
Before getting started, ensure you have the following prerequisites:

Docker installed and properly configured. 
Node.js and npm (Node Package Manager) installed. 

## Getting Started
To use this project, follow the steps below:

Clone the repository to your local machine.

## Step 1: Launch the PostgreSQL database using Docker Compose:


```bash
docker-compose up
```
This will start the PostgreSQL database server required for the application.

## Step 2: Install the project dependencies:

```bash
npm install
```
## Step 3: Test the application in development mode:

```bash
npm run dev
```
This command will start the development server, and you can access the application at http://localhost:3000.

## Step 4 (Optional): For the production version, build the application and start the server:

```bash
npm run build
npm run start
```
This will build and run the application in production mode.
