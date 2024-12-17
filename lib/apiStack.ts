import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apiGw from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

     // Importa la función Lambda del proyecto Serverless Framework
    const helloLambda = lambda.Function.fromFunctionArn(
      this,
      'HelloLambda',
      'arn:aws:lambda:us-east-1:687780365190:function:back-pets-test-hello'
    );


    const api = new apiGw.RestApi(this, 'ApiPets', {
      restApiName: 'alegra-pets-api',
      deployOptions: {
        stageName: 'test'
      },
      defaultCorsPreflightOptions: {
        allowOrigins: apiGw.Cors.ALL_ORIGINS,
        allowMethods: apiGw.Cors.ALL_METHODS,
      },
    });

    api.root.addMethod('GET');

    const helloResource = api.root.addResource('hello');
    // Integrar la función Lambda con la ruta /hello
    const lambdaIntegration = new apiGw.LambdaIntegration(helloLambda);
    helloResource.addMethod('GET', lambdaIntegration);

    new cdk.CfnOutput(this, 'OutputApiEndpoint', {
      exportName: 'alegra-pets-api-url-test',
      value: api.url
    })
  }
}