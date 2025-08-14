#!/usr/bin/env bun

import SystemInfo from './index';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

const packagePath = resolve(__dirname, '../package.json');
const { version } = JSON.parse(readFileSync(packagePath, 'utf8'));

function showHelp() {
  console.log(`
${colors.bright}Usage:${colors.reset} ${colors.cyan}envni [command]${colors.reset}

${colors.bright}Commands:${colors.reset}
  ${colors.yellow}info${colors.reset}       Get all available system information.
  ${colors.yellow}memory${colors.reset}     Get system memory information.
  ${colors.yellow}cpu${colors.reset}        Get system CPU information.
  
${colors.bright}Options:${colors.reset}
  ${colors.blue}--help, -h${colors.reset}     Show this help message.
  ${colors.blue}--version, -v${colors.reset}  Show the version number.
`);
}

function showVersion() {
  console.log(version);
}

function formatMemoryOutput() {
  const memory = SystemInfo.memory;
  const toGB = (bytes: number) => (bytes / (1024 ** 3)).toFixed(2);
  
  if (!memory || memory.total === 0) {
    console.log(`${colors.bright}${colors.yellow}💾 Memory:${colors.reset}\n  › ${colors.red}Could not retrieve memory information.${colors.reset}`);
    return;
  }
  
  console.log(`
${colors.bright}${colors.yellow}💾 Memory:${colors.reset}
  › Total: ${colors.cyan}${toGB(memory.total)} GB${colors.reset}
  › Used:  ${colors.red}${toGB(memory.used)} GB${colors.reset}
  › Free:  ${colors.green}${toGB(memory.free)} GB${colors.reset}
`);
}

function formatCpuOutput() {
  const cpu = SystemInfo.cpu;

  if (!cpu || cpu.cores === 0) {
    console.log(`${colors.bright}${colors.yellow}🧠 CPU:${colors.reset}\n  › ${colors.red}Could not retrieve CPU information.${colors.reset}`);
    return;
  }

  console.log(`
${colors.bright}${colors.yellow}🧠 CPU:${colors.reset}
  › Model: ${colors.cyan}${cpu.model}${colors.reset}
  › Cores: ${colors.cyan}${cpu.cores}${colors.reset}
  › Speed: ${colors.cyan}${cpu.speed} MHz${colors.reset}
  › Load Average (1m, 5m, 15m): ${colors.cyan}${cpu.times.loadAvg.join(', ')}${colors.reset}
`);
}

const command = process.argv[2];

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  showHelp();
} else if (process.argv.includes('--version') || process.argv.includes('-v')) {
  showVersion();
} else {
  switch (command) {
    case 'info':
      console.log(`\n${colors.bright}${colors.blue}🌐 System Information${colors.reset}`);
      console.log(`\n${colors.bright}${colors.yellow}📊 Runtime:${colors.reset}\n  › ${colors.green}${SystemInfo.runtime}${colors.reset}`);
      formatMemoryOutput();
      formatCpuOutput();
      break;
    case 'memory':
      formatMemoryOutput();
      break;
    case 'cpu':
      formatCpuOutput();
      break;
    case undefined:
      showHelp();
      break;
    default:
      console.error(`${colors.bright}${colors.red}Error:${colors.reset} Unknown command "${command}"`);
      showHelp();
      break;
  }
}