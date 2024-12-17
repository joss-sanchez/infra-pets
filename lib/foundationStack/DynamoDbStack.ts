import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';

export class DynamoDbFoundationsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const foundationsTable = new dynamodb.Table(this, 'AlegraFoundationsTable', {
      tableName: 'alegra-back-pets-test-foundations',
      partitionKey: { name: 'foundationId', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    foundationsTable.addGlobalSecondaryIndex({
      indexName: 'foundationId-index',
      partitionKey: { name: 'foundationId', type: dynamodb.AttributeType.STRING },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    new cdk.CfnOutput(this, 'AlegraFoundationsTableName', {
      value: foundationsTable.tableName,
      exportName: 'AlegraFoundationsTableName',
    });

  }
}
