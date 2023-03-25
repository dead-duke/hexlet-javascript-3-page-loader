import { program } from 'commander';
import pageLoader from '../src/loader.js';

program
  .name('page-loader')
  .argument('<url>')
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', `output dir (default: "${process.cwd()}")`, process.cwd())
  .action((url, options) => {
    pageLoader(options.output, url).then((result) => console.log(result));
  })
  .parse();
