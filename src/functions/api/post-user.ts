'use strict';

import { v4 as uuidv4 } from 'uuid';

import Logger from '../../lib/logger';
import httpResponse from '../../lib/http-response';
import User from '../../util/db/user';

const user = new User(process.env.tableName || '');
const logger = new Logger({
  level: process.env.LOG_LEVEL,
  namespace: 'Lambda-Get-User'
});

const handler: AWSLambda.Handler = async (event: AWSLambda.APIGatewayEvent) => {
  logger.input(event);

  let response = httpResponse.Forbidden();

  const { email, handle } = JSON.parse(event.body || '');
  const userID = uuidv4();

  try {
    await user.save(handle, email, userID);

    response = httpResponse.Success();
  } catch (error) {
    logger.error(error);
  }

  logger.output(response);
  return response;
};

export default handler;
