import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, errors, splat } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  if (message instanceof Error) {
    return `[${timestamp}] ${level}: ${message.stack || message.message}`;
  }
  return `[${timestamp}] ${level}: ${stack || message}`;
});

export const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    splat(),
    process.env.NODE_ENV !== 'production' ? colorize({ level: true }) : format.uncolorize(),
    logFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        splat(),
        logFormat
      )
    }),
    new transports.File({
      filename: 'logs/combined.log',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        splat(),
        logFormat
      )
    })
  ]
});

