import { Houston, ConsoleTransport, LogLevel, Format } from "https://x.nest.land/Houston@1.0.8/mod.ts"
import chalk from "https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js"

export function createLogger(options: Record<String, String> = {}) {
    const colors = {
        [LogLevel.Info]: chalk.blueBright,
        [LogLevel.Error]: chalk.redBright,
        [LogLevel.Warning]: chalk.yellowBright,
        [LogLevel.Success]: chalk.magentaBright
    }

    const transports = [
        new ConsoleTransport({
            level: options.consoleLevel || LogLevel.Info,
            format: Format.text,
            prefix: new TimePrefix()
        })
    ]

    if (options.logFiles !== false) {
        transports.push(new FileTransport({
            logFolder: options.filePath || "logs",
        }))
    }

    return new Houston(transports)
}