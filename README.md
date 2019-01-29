aws-layer-pack -- a tool for creating AWS Layers
=
A CLI tool for packaging project dependencies into a zip that can be deployed as a Layer on AWS Lambda.

## About
AWS Lambda now allows for common code to be packaged and deployed as layers. This not only allows code to be shared between multiple Lambda functions, but also provides a way to write and test code in Lambda without having to publish dependencies with every change. 

The `aws-layer-pack` is a command line tool that makes creating the file used for AWS Layer deployment easy for nodejs projects. The tool packages all of the production dependencies listed in the projects package.json into a properly formatted zip that can then be uploaded to AWS Lambda.

## Installing
`npm i -g aws-layer-pack`

## Creating AWS Layer package
 - Run `aws-layer-pack` on the command line at the root of a node project. 
 - Upload the created `layer.zip` file to AWS as a Layer.
 
## IMPORTANT
 - `npm` must be on the path for this tool to work properly.
 
## References
 - [AWS Lambda](https://aws.amazon.com/lambda/)
 - [Layers in Lambda](https://aws.amazon.com/blogs/aws/new-for-aws-lambda-use-any-programming-language-and-share-common-components/)
 - [Lambda Layer Doc](https://docs.aws.amazon.com/lambda/latest/dg/configuration-layers.html)
 
 