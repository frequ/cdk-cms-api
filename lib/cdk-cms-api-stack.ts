import * as cdk from "aws-cdk-lib";
import {
  ApiKey,
  ApiKeySourceType,
  Cors,
  LambdaIntegration,
  RestApi,
  UsagePlan,
} from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class CdkCmsApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // API Gateway
    const api = new RestApi(this, "CMSRestAPI", {
      restApiName: "CMSRestAPI",
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      apiKeySourceType: ApiKeySourceType.HEADER,
    });

    // API Key
    const apiKey = new ApiKey(this, "ApiKey");

    // Usage plan
    const usagePlan = new UsagePlan(this, "UsagePlan", {
      name: "Usage Plan",
      apiStages: [
        {
          api,
          stage: api.deploymentStage,
        },
      ],
    });

    usagePlan.addApiKey(apiKey);

    // Lambda
    const CMSLambda = new NodejsFunction(this, "CMSLambda", {
      entry: "lambda/index.ts",
      handler: "handler",
    });

    // Connect Lambda function to API Gateway
    const integration = new LambdaIntegration(CMSLambda);

    // Define API Gateway methods
    api.root.addMethod("GET", integration, {
      apiKeyRequired: true,
    });

    // Output API Key
    new cdk.CfnOutput(this, "API Key ID", {
      value: apiKey.keyId,
    });
  }
}
