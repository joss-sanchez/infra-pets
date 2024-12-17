#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InfraPetsStack } from '../lib/infra-pets-stack';
import { AcmStack } from '../lib/acmStack';
import { BucketStack } from '../lib/bucketStack';
import { ApiStack } from '../lib/apiStack';
import { DynamoDbFoundationsStack } from '../lib/foundationStack/DynamoDbStack';
import { DynamoDbPetsStack } from '../lib/petStack/DynamoDbStack';
import { SnsPetsStack } from '../lib/petStack/SnsStack';

const { CDK_DEFAULT_ACCOUNT } = process.env;

/**
 * Configuration
 */
const PROD_ACCOUNT = '-'
const isProduction = CDK_DEFAULT_ACCOUNT === PROD_ACCOUNT;
const domainName = 'alegra.com';
const apiSubDomainName = 'joss-training';
const hostedZoneId = 'Z08550371LSRDHZQNR9OM';
const envEU = { region: 'us-east-1', account: CDK_DEFAULT_ACCOUNT };

const app = new cdk.App();
new InfraPetsStack(app, 'InfraPetsStack', {});

new AcmStack(app, 'acm', { env: envEU, domainName, hostedZoneId });
new BucketStack(app, 'bucket', {});
new ApiStack(app, 'api', {});

new DynamoDbFoundationsStack(app, 'dynamoDbFoundations', {});
new DynamoDbPetsStack(app, 'dynamoDbPets', {});
new SnsPetsStack(app, 'notificationPets', {});