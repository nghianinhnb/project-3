import { join } from 'path'
import { format as sqlFormat } from 'sql-formatter'
import { createLogger, format, transports } from 'winston'
import { FileTransportOptions } from 'winston/lib/winston/transports'

import { omit } from '../shared/utils'
import constants from '../shared/constants'


const label = process.env.HOSTNAME + ':' + process.env.PORT


const consoleLogFormat = format.printf(info => {
    let additionalInfos = JSON.stringify(getAdditionalInfo(info), removeCyclicValues(), 2)

    if (additionalInfos === undefined || additionalInfos === '{}') additionalInfos = ''
    else additionalInfos = ' ' + additionalInfos

    if (info.sql) {
        additionalInfos += '\n' + sqlFormat(info.sql, {
            language: 'sql',
            tabWidth: 2
        })
    }

    return `[${info.label}] ${info.timestamp} ${info.level}: ${info.message}${additionalInfos}`
})


const fileLoggerOptions: FileTransportOptions = {
    filename: join(constants.LOG_PATH, constants.LOG_FILE_NAME),
    handleExceptions: true,
    format: format.combine(
        format.timestamp(),
        format.printf(info => {
            return JSON.stringify(info, removeCyclicValues())
        }),
    )
}

fileLoggerOptions.maxsize = 12 * 1024 * 1024    // 12MB
fileLoggerOptions.maxFiles = 20

function buildLogger() {
    return createLogger({
        level: 'info',
        format: format.combine(
            format.label({ label }),
            format.splat(),
        ),
        transports: [
            new transports.File(fileLoggerOptions),
            new transports.Console({
                handleExceptions: true,
                format: format.combine(
                    format.timestamp({
                        format: 'YYYY-MM-DD HH:mm:ss.SSS'
                    }),
                    format.colorize(),
                    consoleLogFormat,
                ),
            })
        ],
        exitOnError: true,
    })
}


const logger = buildLogger()


// -----------------------------------------------------------


export {
    logger,
}


// ------------------------------------------------------------


/**
 * It removes cyclic values from objects, and replaces them with a string
 * @returns A function that takes two arguments, key and value.
 */
function removeCyclicValues () {
    const seen = new WeakSet()

    // Thanks: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value#Examples
    return (key: string, value: any) => {
        if (key === 'cert') return 'Replaced by logger to avoid large log message'

        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) return
            seen.add(value)
        }

        if (value instanceof Set) {
            return Array.from(value)
        }

        if (value instanceof Map) {
            return Array.from(value.entries())
        }

        if (value instanceof Error) {
            const error: any = {}
            Object.getOwnPropertyNames(value).forEach(key => { error[key] = value[key as keyof Error] })
            return error
        }

        return value
    }
}


/**
 * It takes an object and returns a new object with the specified keys omitted
 * @param {any} info - The object that contains the log information.
 * @returns the info object with the toOmit properties removed.
 */
function getAdditionalInfo (info: any) {
    const toOmit = [ 'label', 'timestamp', 'level', 'message', 'sql', 'tags' ]
    return omit(info, toOmit)
}
