import winston from "winston"

type LogLevel = "info" | "error" | "warn" | "debug"

type BotLoggerOptions = {
    logFiles?: boolean
    consoleLevel?: LogLevel
    fileLevel?: LogLevel
    filePath?: string
    fileFrequency?: string
}

export default function createLogger(
    options?: winston.LoggerOptions & BotLoggerOptions
): winston.Logger
