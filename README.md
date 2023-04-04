
# Hexlet: "Page Loader"

[![Actions Status](https://github.com/deus-ex-m/js-async-project-4/workflows/hexlet-check/badge.svg)](https://github.com/deus-ex-m/js-async-project-4/actions)
[![Node CI](https://github.com/deus-ex-m/js-async-project-4/actions/workflows/nodejs.yml/badge.svg)](https://github.com/deus-ex-m/js-async-project-4/actions/workflows/nodejs.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/c54e05a84c02ad89c4d8/maintainability)](https://codeclimate.com/github/deus-ex-m/js-async-project-4/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c54e05a84c02ad89c4d8/test_coverage)](https://codeclimate.com/github/deus-ex-m/js-async-project-4/test_coverage)

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

* Download only main page
[![asciicast](https://asciinema.org/a/573421.svg)](https://asciinema.org/a/573421)
* Download main page and images
[![asciicast](https://asciinema.org/a/573430.svg)](https://asciinema.org/a/573430)
* Download main page and all other content
[![asciicast](https://asciinema.org/a/573431.svg)](https://asciinema.org/a/573431)
* Debug output
[![asciicast](https://asciinema.org/a/573432.svg)](https://asciinema.org/a/573432)
* Errors
[![asciicast](https://asciinema.org/a/573433.svg)](https://asciinema.org/a/573433)
* Download with progress bar
[![asciicast](https://asciinema.org/a/573434.svg)](https://asciinema.org/a/573434)