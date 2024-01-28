import { createLogger, format } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const { combine, timestamp, printf } = format

const logFormat = printf(
  ({ level, message, timestamp: timestampParameter }) => {
    return `${timestampParameter} [${level.toUpperCase()}] [${
      process.env.ENVIRONMENT
    }]: ${message}`
  },
)

const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '21d',
    }),
  ],
})

export default logger
