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

### Asset compilation

We don't want to be running gulp on Heroku, so we use the npm postinstall hook to do a final production version of our css and js. Heroku will do this all by itself. It's really important that the destination folders exist, see the [build folder readme](https://github.com/dakuan/nattr/tree/master/build) for more details.