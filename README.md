# Toy Robot

Toy Robot is a Node.js CLI app which takes commands in text format and moves an imaginary robot within an area. The position of the robot will be reported in the console.

## How to use this app

### Install all dependencies

```bash
npm install
```

### Add a file with the commands

You can use the existing commands in **commands.txt** in the root of the app or replace the commands in that file with the ones you create.

### Start the app

```bash
npm start
```

Then you can see the output in the console.

## How to run tests

```bash
npm test
```

Testing coverage is shown at the end of the testing. You can also see the testing reports by opening the file in `./coverage/lcov-report/index.html`

## Decisions and assumptions

- Certain texts are regarded as formatting text and they are checked first and printed in the console, such as `a) -----------`, `1) -----------`, `-----------`;
- Either invalid commands or valid commands are discarded (not printed in the console), if the robot has not been placed on the table;
- After the robot has been placed on the table, any following invalid command will be ignored, but it will be printed in the console with some extra information;
- After the robot has been placed on the table, any following command that will move the robot off table will be ignored, but it will be printed in the console with some extra information.

## Solutions overview

1. This app is built with Typescript which provides compile time type check during development;
2. It uses Node.js `readline` package to read text line by line from the provided txt file, so that we do not need to load all contents in the file at once which will have trouble in dealing with a very large file (If you want to keep your robot very very very busy);
3. It uses regular expression to parse the command text to determine which command should be used;
4. It uses strategy design pattern, so that we can avoid lots of if/else statements and make the code as clean as possible;
5. Jest is used for unit testing and almost 100% code coverage.
