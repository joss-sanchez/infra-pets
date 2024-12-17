import * as cdk from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';

export class SnsPetsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new sns.Topic(this, 'PetAdoptionTopic', {
      displayName: 'Pet Adoption Notifications',
    });


  }
}