import { Houston, ConsoleTransport, LogLevel, Format, TimePrefix } from "https://x.nest.land/Houston@1.0.8/mod.ts"
import chalk from "https://deno.land/x/chalk_deno@v4.1.1-deno/source/index.js"

export function createLogger(options = {}) {
    const colors = {
        [LogLevel.Info]: chalk.blue,
        [LogLevel.Error]: chalk.red,
        [LogLevel.Warning]: chalk.yellow,
        [LogLevel.Success]: chalk.magenta
    }

    const transports = [
        new ConsoleTransport({
            level: options.consoleLevel || [LogLevel.Info, LogLevel.Error, LogLevel.Warning, LogLevel.Success],
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
