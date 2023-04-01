import { program } from 'commander';
import pageLoader from '../src/pageLoader.js';

program
  .name('page-loader')
  .argument('<url>')
  .description('Page loader utility')
  .version('1.0.0')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .option('-b, --progressBar [name]', 'progress bar name: default | silent', 'default')
  .action((link, options) => {
    pageLoader(options.output, link, options.progressBar)
      .then((result) => console.log(result))
      .catch((err) => {
        console.error(err.message);
        process.exit(1);
      });
  })
  .parse(process.argv);
