import { program } from 'commander';
import pageLoader from '../src/loader.js';

program
  .name('page-loader')
  .argument('<url>')
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', `output dir (default: "${process.cwd()}")`, process.cwd())
  .action(async (url, options) => {
    console.log(await pageLoader(options.output, url));
  })
  .parse();
