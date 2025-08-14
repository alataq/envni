import os from "node:os";
import process from "node:process";


interface MemoryInfo {
    total: number,
    free: number,
    used: number
}

interface CpuStats {
    user: number;
    nice: number;
    sys: number;
    idle: number;
    irq: number;
    loadAvg: number[];
}

interface CpuInfo {
    model: string;
    speed: number;
    cores: number;
    usage: number;
    times: CpuStats;
}

class SystemInfo {
  public readonly runtime: "bun" | "node" | "unknown";

  constructor() {
    if (typeof Bun !== "undefined") {
      this.runtime = "bun";
    } else if (typeof process !== "undefined" && typeof process.versions?.node !== "undefined") {
      this.runtime = "node";
    } else {
      this.runtime = "unknown";
    }
  }

  public get memory(): MemoryInfo {
    let total: number;
    let free: number;

    switch (this.runtime) {
      case "bun":
      case "node":
        total = os.totalmem();
        free = os.freemem();
        break;
      default:
        return { total: 0, free: 0, used: 0 };
    }

    const used = total - free;
    return {
      total,
      free,
      used
    };
  }

  public get cpu(): CpuInfo {
    if (this.runtime === "unknown") {
      return {
        model: "unknown",
        speed: 0,
        cores: 0,
        usage: 0,
        times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0, loadAvg: [0, 0, 0] }
      };
    }

    const cpus = os.cpus();
    const cpu = cpus[0];
    const loadAvg = os.loadavg();

    const times = cpus.reduce((acc, current) => {
      acc.user += current.times.user;
      acc.nice += current.times.nice;
      acc.sys += current.times.sys;
      acc.idle += current.times.idle;
      acc.irq += current.times.irq;
      return acc;
    }, { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 });

    return {
      model: (cpu as os.CpuInfo).model,
      speed: (cpu as os.CpuInfo).speed,
      cores: cpus.length,
      usage: process.cpuUsage().system,
      times: {
        user: times.user,
        nice: times.nice,
        sys: times.sys,
        idle: times.idle,
        irq: times.irq,
        loadAvg
      }
    };
  }
}

export default new SystemInfo();