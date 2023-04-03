#!/usr/bin/env node
import { program } from 'commander';
import pageLoader from '../src/pageLoader.js';

program
  .name('page-loader')
  .argument('<url>')
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .action((link, options) => {
    pageLoader(link, options.output)
      .then((filepath) => console.log(`Page was successfully downloaded into ${filepath}`))
      .catch((err) => {
        console.error(err.message);
        process.exit(1);
      });
  })
  .parse(process.argv);
