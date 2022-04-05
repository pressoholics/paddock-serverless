/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import AWS from 'aws-sdk';

let dynamoDBClient = new AWS.DynamoDB.DocumentClient();
if (process.env.ENABLE_OFFLINE_DYNAMO) {
  dynamoDBClient = new AWS.DynamoDB.DocumentClient({
    region: process.env.DYNAMODB_REGION,
    endpoint: process.env.DYNAMODB_ENDPOINT,
    accessKeyId: 'DEFAULT_ACCESS_KEY',
    secretAccessKey: 'DEFAULT_SECRET'
  });
}

class DynamoDBClient {
  table: string;

  constructor(table: string) {
    if (!table) {
      throw Error('Invalid DynamoDB Table Name');
    }
    this.table = table;
  }

  /**
   * Save an Item on DynamoDB
   */
  save(item: any, table = this.table) {
    const params = {
      TableName: table,
      Item: item
    };

    return dynamoDBClient.put(params).promise();
  }

  /**
   * Find by Key comparison
   */
  find(where: any, strongConsistentRead = false, table = this.table) {
    const params = {
      TableName: table,
      Key: where,
      ConsistentRead: strongConsistentRead
    };

    return dynamoDBClient.get(params).promise();
  }

  /**
   * Execute a Raw Select Query on DynamoTable.
   * You must inform the KeyConditionExpression
   * and ExpressionAttributeNames
   */
  query(where: any, strongConsistentRead = false, table = this.table) {
    where.TableName = table;
    where.ConsistentRead = strongConsistentRead;

    return dynamoDBClient.query(where).promise();
  }

  /**
   * Execute a DynamoDB Scan
   * Eventually Consistent
   */
  scan(params: any, table = this.table) {
    params.TableName = table;
    return dynamoDBClient.scan(params).promise();
  }

  /**
   * Update item identified by Key
   */
  update(params: any, table = this.table) {
    params.TableName = table;
    params.ReturnValues = 'ALL_NEW';
    return dynamoDBClient.update(params).promise();
  }

  /**
   * Remove a row from DynamoDB based on Key comparison
   */
  removeRow(key: any, table = this.table) {
    const params = {
      TableName: table,
      Key: key,
      ReturnValues: 'ALL_OLD'
    };

    return dynamoDBClient.delete(params).promise();
  }
}

export default DynamoDBClient;
