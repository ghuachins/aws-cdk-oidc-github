import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

export class AwsCdkOidcGithubStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a IAM OIDCProvider for Github repositories
    const githubOidcProvider = new iam.OpenIdConnectProvider(this, 'GithubOidcProvider', {
      url: 'https://token.actions.githubusercontent.com',
      clientIds: [ 'sts.amazonaws.com' ],
      thumbprints: ['6938FD4D98BAB03FAADB97B34396831E3780AEA1'] // This thumbprint will change if the github certificates changes.
    });

    new CfnOutput(this, 'github-oidc-provider-arn-output', {
      value: githubOidcProvider.openIdConnectProviderArn,
      exportName: 'GITHUB_OIDC_PROVIDER_ARN'
    });


  }
}
