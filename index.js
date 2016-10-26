#!/usr/bin/env node

const meow = require('meow');
const validurl = require('valid-url').is_web_uri;
const crawl = require('./lib/crawl');

const cli = meow(`
    Usage
      $ backstop-crawl <url>

    Options
      --ignore-robots, -i  Ignore the sites robots.txt

    Examples
      $ backstop-crawl http://localhost
`, {
    alias: {
        i: 'ignore-robots',
    },
});

if (cli.input.length) {
    if (validurl(cli.input[0])) {
        crawl(cli.input[0], cli.flags);
    } else {
        console.error(`Error: "${cli.input[0]}" isn't a valid URL`);
        process.exit(1);
    }
}

cli.showHelp();