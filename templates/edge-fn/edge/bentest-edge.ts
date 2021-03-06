'use strict';

import Logger from '../../lib/logger';
import httpResponse from '../../lib/http-response';

const handler: AWSLambda.Handler = async (event: AWSLambda.APIGatewayEvent) => {
  logger.input(event);

  const userHandle = event.pathParameters?.id || '';

  const response = httpResponse.NotFound();

  logger.output(response);
  return response;
};

export default handler;
