
# Hexlet: "Page Loader"

[![hexlet-check](https://github.com/grim-vagabond/hexlet-javascript-3-page-loader/actions/workflows/hexlet-check.yml/badge.svg?branch=main)](https://github.com/grim-vagabond/hexlet-javascript-3-page-loader/actions/workflows/hexlet-check.yml)
[![Node CI](https://github.com/grim-vagabond/hexlet-javascript-3-page-loader/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/grim-vagabond/hexlet-javascript-3-page-loader/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/f2a8818a84348698a384/maintainability)](https://codeclimate.com/github/grim-vagabond/hexlet-javascript-3-page-loader/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/f2a8818a84348698a384/test_coverage)](https://codeclimate.com/github/grim-vagabond/hexlet-javascript-3-page-loader/test_coverage)

CLI application to download webpage to local storage. The result of the work is a directory with webpage and content for webpage. The default download directory is the directory where the application runs.

## Requirements

* Node.js
* Make

## Installation and launch

* `make install` install
* `page-loader -h` information about application
* `page-loader <url>` default launch
* `page-loader -o [dir] <url>` launch with user directory to save

## Work examples

* [Download only main page](https://asciinema.org/a/573421)
* [Download main page and images](https://asciinema.org/a/573430)
* [Download main page and all other content](https://asciinema.org/a/573431)
* [Debug output](https://asciinema.org/a/573432)
* [Errors](https://asciinema.org/a/573433)
* [Download with progress bar](https://asciinema.org/a/573434)
