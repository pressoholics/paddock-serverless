import DynamoDBClient from '../services/dynamodb';
import Logger from '../lib/logger';

const logger = new Logger({
  level: process.env.LOG_LEVEL,
  namespace: 'ORM-User'
});

class User {
  private dynamoDBClient: DynamoDBClient;

  constructor(userTable: string) {
    if (!userTable) {
      throw Error('Invalid Table Name');
    }
    this.dynamoDBClient = new DynamoDBClient(userTable);
  }

  async get(userHandle: string): Promise<AWS.DynamoDB.ItemList | null> {
    let dynamoDBQueryResult: AWS.DynamoDB.QueryOutput;

    try {
      const dynamoDBQuery = {
        KeyConditionExpression: 'userHandle = :userHandle',
        ExpressionAttributeValues: {
          ':userHandle': userHandle
        }
      };

      dynamoDBQueryResult = await this.dynamoDBClient.query(dynamoDBQuery, true);

      if (
        dynamoDBQueryResult.Count &&
        dynamoDBQueryResult.Count > 0 &&
        dynamoDBQueryResult.Items &&
        dynamoDBQueryResult.Items.length > 0
      ) {
        logger.debug('User fetched', dynamoDBQueryResult.Items);
        return dynamoDBQueryResult.Items;
      }
    } catch (error) {
      logger.error('Retrieving user from User Table failed', error);
      throw new Error(error);
    }

    logger.debug('No user found');
    return null;
  }

  async save(handle: string, email: string, userID: string): Promise<any> {
    const data = {
      userHandle: handle,
      sortKey: `${handle}#PROFILE#${userID}`,
      userID: userID,
      email: email
    };

    return this.dynamoDBClient.save(data);
  }
}

export default User;
