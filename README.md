
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
* `page-loader -o [dir]` launch with user directory to save