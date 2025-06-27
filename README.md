The goal of the project is to test performance of [GAD](https://github.com/jaktestowac/gad-gui-api-demo) application installed on localhost (port 3000).

Test project is written in **TypeScript**.

# Requirements

k6 version 1.0 or newer

# Installation

1. Install k6 - go to [Grafana k6 installation page](https://grafana.com/docs/k6/latest/set-up/install-k6/) and perform necessary steps to install k6 on your system.
2. Run `npm install`

# Writing tests

The tests are based on basic structure of k6 tests with the 3 main parts:

1. Setting options

The options are imported from [options.ts](./src/options.ts) file. To set options you have to specify one of the predefined scenarios. To set up new scenario, extend the [OptionsType](./src/enums.ts) enum and specify needed options in the `chooseOption` function

2. Performing setup

In the setup test the headers are prepared. Headers are put in every test. It is possible to perform test with or without authorization based on set `AuthorizationType` option.

3. Running test

The main test is performed as `default function`

As for now, I don't perform the teardown step.

# Running tests written in Typescript

`dotenv` is required to run tests (to be based on .env file with secrets). To run test use command

```powershell
npx dotenv -- k6 run .\tests\get-messenger-unread.auth.test.ts
```
