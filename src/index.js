const path = require("path")
const chalk = require("chalk")
const winston = require("winston")
const DailyRotateFile = require("winston-daily-rotate-file")

/**
 * @typedef {"info" | "error" | "warn" | "debug"} LogLevel
 */

/**
 * @typedef BotLoggerOptions
 * @property {boolean?} logFiles
 * @property {LogLevel?} consoleLevel
 * @property {LogLevel?} fileLevel
 * @property {string?} filePath
 * @property {string?} fileFrequency
 */

// thanks winston devs for not exposing the Logger class 👍
/** @param {(winston.LoggerOptions & BotLoggerOptions)?} options */
module.exports = function createLogger(options) {
    const colors = {
        info: chalk.blueBright,
        error: chalk.redBright,
        warn: chalk.yellowBright,
        debug: chalk.magentaBright
    }

    const transports = [
        new winston.transports.Console({
            level: options.consoleLevel || "info",
            format: winston.format.combine(
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                winston.format.printf(info => {
                    /** @type {chalk.Chalk} */
                    const color = colors[info.level]
                    const timestamp = chalk.gray(`[${info.timestamp}]`)
                    const level = color(info.level.toUpperCase() + ":")
                    const indent = info.level.length === 4 ? "  " : " "
                    // prettier-ignore
                    const scope = chalk.gray(info.message.match(/^(\[.+\]) /)?.[1] || "")
                    const message = info.message.replace(/^\[.+\] +/, "")
                    const space = scope ? " " : ""

                    return timestamp + " " + level + indent + scope + space + message
                })
            )
        })
    ]

    if (options.logFiles !== false) {
        transports.push(
            new DailyRotateFile({
                level: options.fileLevel || "debug",
                format: winston.format.combine(
                    winston.format.timestamp({ format: "HH:mm:ss" }),
                    winston.format.printf(info => {
                        const level = info.level.toUpperCase()
                        return `[${info.timestamp}] ${level}: ${info.message}`
                    })
                ),
                filename: path.join(options.filePath, "/../logs/%DATE%.log"),
                datePattern: "YYYY-MM-DD",
                frequency: options.fileFrequency || "24h"
            })
        )
    }

    return winston.createLogger({ transports, ...options })
}
