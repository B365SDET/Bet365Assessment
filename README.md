# Intro
Welcome to the assessment! 

This assessment is designed to test your knowledge on debugging failing test cases, automation best practices, and using Playwright. 

The code in this repo consists of a set of tests that makes assertions against the `https://automationexercise.com/`, which is a site designed to practice automation testing. You will fix broken tests and create a new E2E test.

You have 1 hour to complete the assessment. Before starting the assessment, please read over the prequisities, technologies used, and set up your machine to be able to run these tests. Spend some time to get familiar with the code. When you are ready to start the assessment,
create a `git branch` to begin the [problems](/ASSESSMENT.md). Remember to **start your 1 hour timer**.

While you may feel pressure to complete all the problems, you do not have to complete everything! Complete as much as you can within the allotted time frame. Regardless of where you are at (working code or not), please commit all your code to the branch.

## [REQUIRED] Prerequisites

```
nvm
node v24.11.0
VSCode
git
Google Chrome
```

### [OPTIONAL] Installing NVM and Node
```shell
# Installing NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Installing and using Node v24.11.0
nvm install v24.11.0
nvm use v24.11.0
```

### [OPTIONAL] Installing VSCode
```shell
https://code.visualstudio.com/download
```
NOTE: You may also use your IDE of choice if VSCode is not your preference


### Git
```shell
https://git-scm.com/install/

```

# Assessment
View the problems at [ASSESSMENT.md](./ASSESSMENT.md)

## Running the tests
The commands below are bundled as npm scripts. The API tests run once; the E2E tests run on Chromium and Firefox.
```shell
# Runs all the tests
npm run test 

# Runs just the API tests
npm run test:api

# Runs just the E2E tests (Chromium and Firefox)
npm run test:e2e

# Run the E2E tests with an interactive browser (Chromium)
npm run test:e2e:ui
```

# Rules
1. Clone this repo
2. Check out a git branch with your name first name + last initial
3. Push this branch up to the same repository
    * Regardless of how many problems you have completed, push up the branch at the end of the 1 hour period
4. Email a link to your branch to the recruiter in contact

NOTE: Your branch **will be deleted** at the end of the interview process
