#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { AliasStack } from '../lib/shared-network-demo-stack'

const app = new cdk.App()

const network_account_id = '600000000000'
var env = ''

if (process.env.CDK_DEFAULT_ACCOUNT === '500000000000') {
  console.log('dev-account')
  env = 'dev'
}
if (process.env.CDK_DEFAULT_ACCOUNT === '400000000000') {
  console.log('qa-account')
  env = 'qa'
}
if (process.env.CDK_DEFAULT_ACCOUNT === '300000000000') {
  console.log('prod-account')
  env = 'prod'
}

new AliasStack(app, `${env}Stack`, {
  env: { account: network_account_id, region: 'us-east-1' },
  env_name: env
})
