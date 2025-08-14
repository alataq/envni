# Envni

**Envni** is a lightweight, unified CLI and module for getting system and runtime information. It works seamlessly across different JavaScript runtimes, including **Bun** and **Node.js**, providing essential details about your system's memory, CPU, and the current execution environment.

## Features

* **Cross-Runtime Compatibility**: Automatically detects and provides information for both Bun and Node.js.
* **Comprehensive Info**: Get detailed metrics on runtime, memory usage, and CPU performance.
* **Zero Dependencies**: The core functionality of this tool relies only on built-in Node.js APIs, so there are no external dependencies to manage.
* **Clean Output**: Presents information in a clean, human-readable format directly in your terminal.
* **Module and CLI**: Available both as a CLI for easy terminal use and as a module for embedding system info functionality in your JavaScript projects.

## Installation

To install **Envni** globally and use it as a command-line tool, run the following command:

```
npm install -g envni
```

If you want to use it as a module, you can install it via npm as well:

```
npm install envni
```

## Usage

Once installed, you can use the `envni` command directly from your terminal or import it into your JavaScript code.

### Using as a CLI

#### Get All System Information

To get a complete overview of your system's runtime, memory, and CPU, use the `info` command.

```
envni info
```

#### Example Output:

```
🌐 System Information

📊 Runtime:
  › node

💾 Memory:
  › Total: 8.00 GB
  › Used:  4.00 GB
  › Free:  4.00 GB

🧠 CPU:
  › Model: Intel(R) Core(TM) i5-9300H CPU @ 2.40GHz
  › Cores: 8
  › Speed: 3999 MHz
  › Load Average (1m, 5m, 15m): 1.47, 1.42, 1.22
```

***

#### Get Memory Information

To view only the memory details, use the `memory` command.

```
envni memory
```

#### Example Output:

```
💾 Memory:
  › Total: 8.00 GB
  › Used:  4.00 GB
  › Free:  4.00 GB
```

***

#### Get CPU Information

To view only the CPU details, use the `cpu` command.

```
envni cpu
```

#### Example Output:

```
🧠 CPU:
  › Model: Intel(R) Core(TM) i5-9300H CPU @ 2.40GHz
  › Cores: 8
  › Speed: 3999 MHz
  › Load Average (1m, 5m, 15m): 1.47, 1.42, 1.22
```

### Using as a Module

To use **Envni** in your JavaScript project, import it and access its methods to get system info.

#### Example:

```javascript
import systemInfo from 'envni';

// Get memory information
const memory = systemInfo.memory;
console.log(`Memory - Total: ${memory.total / 1024 / 1024 / 1024} GB, Used: ${memory.used / 1024 / 1024 / 1024} GB, Free: ${memory.free / 1024 / 1024 / 1024} GB`);

// Get CPU information
const cpu = systemInfo.cpu;
console.log(`CPU - Model: ${cpu.model}, Cores: ${cpu.cores}, Speed: ${cpu.speed} MHz`);
```

#### Example Output:

```
Memory - Total: 8.00 GB, Used: 4.00 GB, Free: 4.00 GB
CPU - Model: Intel(R) Core(TM) i5-9300H CPU @ 2.40GHz, Cores: 8, Speed: 3999 MHz
```

## How It Works

**Envni** detects the current runtime by checking for global objects specific to each environment (`Bun` for Bun, `process` for Node.js). It then uses the built-in `os` module to access low-level system information, which is consistently available across both runtimes. The output is formatted directly using ANSI escape codes for coloring, ensuring a fast and lightweight user experience without any external dependencies.

### The `SystemInfo` Class

The core of the module is the `SystemInfo` class, which provides two main properties: `memory` and `cpu`.

1. **`memory`**: Returns an object containing the total, used, and free memory in bytes.
2. **`cpu`**: Returns an object with detailed CPU information, including:
   - `model`: The CPU model.
   - `speed`: The CPU speed in MHz.
   - `cores`: The number of CPU cores.
   - `usage`: The CPU usage.
   - `times`: An object detailing the CPU times (user, sys, idle, etc.).
   - `loadAvg`: The load averages for the system (1m, 5m, 15m).

## Contributing

If you find a bug or have an idea for an improvement, feel free to open an issue or submit a pull request on GitHub.

## License

This project is licensed under the MIT License.
