import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

    const devData: Record<string, any> = {};
    if (process.env.NODE_ENV === 'development') {
      if (Object.keys(req.body).length) devData.body = req.body;
      if (Object.keys(req.query).length) devData.query = req.query;
    }

    if (res.statusCode >= 500) {
      logger.error(logMessage, devData);
    } else if (res.statusCode >= 400) {
      logger.warn(logMessage, devData);
    } else {
      logger.info(logMessage, devData);
    }
  });

  next();
};
