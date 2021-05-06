# React Class And Hook Pattern Practice

This repository is clone from [the `frontend-masters` branch](https://github.com/kentcdodds/advanced-react-patterns-v2/tree/frontend-masters), then follow the courses to implement each practice by react hook. 
## System Requirements

* [git][git] v2.14.1 or greater
* [NodeJS][node] v8.9.4 or greater
* [npm][npm] v5.6.0 or greater

All of these must be available in your `PATH`. To verify things are set up
properly, you can run this:

```
git --version
node --version
npm --version
```

If you have trouble with any of these, learn more about the PATH environment
variable and how to fix it here for [windows][win-path] or
[mac/linux][mac-path].

## Running the app

To get the app up and running (and really see if it worked), run:

```shell
npm start
```

This should start up your browser. If you're familiar, this is a standard
[react-scripts](https://github.com/facebook/create-react-app) application.

You can also open
[the deployment of the app on Netlify](https://advanced-react-patterns.netlify.com/).

## Running the tests

```shell
npm test
```

This will start [Jest](http://facebook.github.io/jest) in watch mode. Read the
output and play around with it.

**Your goal will be to go into each test, swap the final version for the
exercise version in the import, and make the tests pass**

## Helpful Emoji 🐨 💰 💯

Each exercise has comments in it to help you get through the exercise.
**Kody the Koala Bear** and **Marty the Money Bag** are here to help you.
**Kody** 🐨 will tell you when there's something specific you should do, and
**Marty** 💰 will give you specific tips along the way. Should you finish
early, **Hannah the Hundred Points Symbol** 💯 will give you some additional
challenges that you can try!

## Troubleshooting

<details>

<summary>"npm run setup" command not working</summary>

Here's what the setup script does. If it fails, try doing each of these things
individually yourself:

```
# verify your environment will work with the project
node ./scripts/verify

# install dependencies
npm install

# verify the project is ready to run
npm run build
npm run test:coverage
```

If any of those scripts fail, please try to work out what went wrong by the
error message you get. If you still can't work it out, feel free to
[open an issue][issue] with _all_ the output from that script. I will try to
help if I can.

</details>

## License

This material is available for private, non-commercial use under the
[GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). 