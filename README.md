This is my first k6 project - for learning purposes only

# Requirements

- k6 version 1.0 or newer

# Installation

1. Install k6 - go to [Grafana k6 installation page](https://grafana.com/docs/k6/latest/set-up/install-k6/) and perform necessary steps to install k6 on your system.
2. Run `npm install`

# Test application

The goal of the project is to test performance of [GAD](https://github.com/jaktestowac/gad-gui-api-demo) application installed on localhost (port 3000)

# Running tests written in Typescript

`dotenv` is required to run tests (to be based on .env file with secrets). To run test use command

```powershell
npx dotenv -- k6 run .\tests\get-messenger-unread.auth.test.ts
```
