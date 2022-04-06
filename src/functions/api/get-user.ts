'use strict';

import Logger from '../../lib/logger';
import validation from '../../lib/validation';
import httpResponse from '../../lib/http-response';
import User from '../../util/db/user';

const user = new User(process.env.tableName || '');
const logger = new Logger({
  level: process.env.LOG_LEVEL,
  namespace: 'Lambda-Get-User'
});

const handler: AWSLambda.Handler = async (event: AWSLambda.APIGatewayEvent) => {
  logger.input(event);

  const userHandle = event.pathParameters?.id || '';

  let response = httpResponse.NotFound();

  if (!validation.isUserIdFormat(userHandle)) {
    logger.error('UserId validation failed');
  } else {
    try {
      const userData = await user.get(userHandle);

      if (userData) {
        response = httpResponse.Success(userData);
      }
    } catch (error) {
      logger.error(error);
    }
  }

  logger.output(response);
  return response;
};

export default handler;
