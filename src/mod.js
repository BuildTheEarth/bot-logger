import { Houston, ConsoleTransport, LogLevel, Format, TimePrefix, Color, FileTransport } from "https://x.nest.land/Houston@1.0.8/mod.ts"

export function createLogger(options = {}) {
    const colors = {
        [LogLevel.Info]: Color.Blue,
        [LogLevel.Error]: Color.Red,
        [LogLevel.Warning]: Color.Yellow,
        [LogLevel.Success]: Color.Magenta
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
