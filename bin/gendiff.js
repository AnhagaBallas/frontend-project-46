#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'display help for command')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')

program.parse();