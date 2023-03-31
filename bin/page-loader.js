import { program } from 'commander';
import pageLoader from '../src/pageLoader.js';

program
  .name('page-loader')
  .argument('<url>')
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', `output dir (default: "${process.cwd()}")`, process.cwd())
  .action((link, options) => {
    pageLoader(options.output, link).then((result) => console.log(result));
  })
  .parse();
