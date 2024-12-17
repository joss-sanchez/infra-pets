import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class BucketStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    new s3.Bucket(this, 'LayersBucketPets', {
      removalPolicy: RemovalPolicy.DESTROY,
      bucketName: 'layers-bucket-pets'
    });

    new s3.Bucket(this, 'BodyBucketPets', {
      removalPolicy: RemovalPolicy.DESTROY,
      bucketName: 'body-bucket-pets'
    });
  }
}