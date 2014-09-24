
[![Build Status](https://travis-ci.org/Dakuan/nattr.svg?branch=master)](https://travis-ci.org/Dakuan/nattr)
<br/>
<img src="http://i.giphy.com/7jrdqPHSJ603C.gif" height="100px"/>



Nattr
======

A chat application that interlaces social media feeds.

## Installation

### Dependencies

Currently there is nothing other than Javascript in this application so our depenecy list is rather short:
* nodejs

### Getting started
Once node is installed, all we need are the dependencies and the gulp CLI
```sh
$ npm install
$ npm install gulp -g
```

## Development

### Private config

You will need to add a `secret.json` file to the [config folder](https://github.com/Dakuan/nattr/tree/master/app/server/config). The `secret.json` file contains twitter api tokens and secrets that you will need. It should look like:

```json
{
    "twitter_consumer_key": "KEY",
    "twitter_consumer_secret": "KEY_SECRET",
    "twitter_token": "TOKEN",
    "twitter_token_secret": "TOKEN_SECRET"
}

```

Please note tat `secret.json` is excluded from the repository via the `.gitignore` file. This is a good thing. If you wish to commit it anyway, either remove the [entry](https://github.com/Dakuan/nattr/blob/master/.gitignore#L2) in the `.gitignore` or rename the file to `local.json`.

### Run gulp development tools

Gulp will compile ReactJS components, css and what not as well as recompiling the right things when files change. It will also run your tests and nag you when they go wrong.

```sh
$ gulp
```

### Run gulp dev server

Running the development server in the same gulp processs as the watchers was often a pain with previous projects, so this time we will run it in a new tab and process. It doesn't really do much beyond restarting itself when files change.

```sh
# in a new tab...
$ gulp server
```

## Production

### Production config

As per the local development settings, you will need to add the twitter tokens and keys. You can do this in a JSON config file with the same name as `NODE_ENV` eg `production.json` or as command line arguments or env variables (this is what I do on Heroku). See the [nconf docs](https://github.com/flatiron/nconf) for more information.

### Asset compilation

We don't want to be running gulp on Heroku, so we use the npm postinstall hook to do a final production version of our css and js. Heroku will do this all by itself. It's really important that the destination folders exist, see the [build folder readme](https://github.com/dakuan/nattr/tree/master/build) for more details.
