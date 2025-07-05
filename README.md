
# Hexlet: "Page Loader"

[![hexlet-check](https://github.com/dead-duke/hexlet-javascript-3-page-loader/actions/workflows/hexlet-check.yml/badge.svg?branch=main)](https://github.com/dead-duke/hexlet-javascript-3-page-loader/actions/workflows/hexlet-check.yml)
[![Node CI](https://github.com/dead-duke/hexlet-javascript-3-page-loader/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/dead-duke/hexlet-javascript-3-page-loader/actions/workflows/nodejs.yml)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=dead-duke_hexlet-javascript-3-page-loader&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=dead-duke_hexlet-javascript-3-page-loader)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=dead-duke_hexlet-javascript-3-page-loader&metric=bugs)](https://sonarcloud.io/summary/new_code?id=dead-duke_hexlet-javascript-3-page-loader)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=dead-duke_hexlet-javascript-3-page-loader&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=dead-duke_hexlet-javascript-3-page-loader)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=dead-duke_hexlet-javascript-3-page-loader&metric=coverage)](https://sonarcloud.io/summary/new_code?id=dead-duke_hexlet-javascript-3-page-loader)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=dead-duke_hexlet-javascript-3-page-loader&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=dead-duke_hexlet-javascript-3-page-loader)

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
