import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDbPetsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const petsTable = new dynamodb.Table(this, 'AlegraPetsTable', {
      tableName: 'alegra-back-pets-test-pets',
      partitionKey: { name: 'foundationId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'petId', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    petsTable.addGlobalSecondaryIndex({
      indexName: 'foundationId-index',
      partitionKey: { name: 'foundationId', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    new cdk.CfnOutput(this, 'AlegraPetsTableName', {
      value: petsTable.tableName,
      exportName: 'AlegraPetsTableName',
    });

  }
}
