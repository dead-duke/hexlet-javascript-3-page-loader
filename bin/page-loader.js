#!/usr/bin/env node
import { program } from 'commander';
import pageLoader from '../src/pageLoader.js';

program
  .name('page-loader')
  .argument('<url>')
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .action((link) => {
    pageLoader(link, program.output)
      .then((result) => console.log(result))
      .catch((err) => {
        throw err;
      });
  })
  .parse(process.argv);
