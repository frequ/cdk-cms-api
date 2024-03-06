# CDK CMS API

## Builds a stack with

- API Gateway with API Key and Usage plan
- Lambda with root route and GET method

## After deployment

- Get API Key using `aws apigateway get-api-key --api-key API_KEY_ID --include-value`

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
