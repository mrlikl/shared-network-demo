import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as route53 from 'aws-cdk-lib/aws-route53'

export class AliasStack extends cdk.Stack {
  constructor (scope: Construct, id: string, props?: AliasStackProps) {
    super(scope, id, props)

    const zone = route53.HostedZone.fromHostedZoneAttributes(
      this,
      'ImportedZone',
      {
        hostedZoneId: 'hosted-zone-id',
        zoneName: 'murali.com'
      }
    )

    var ip = ''
    if (props?.env_name === 'prod') {
      ip = '192.0.2.146'
    } else if (props?.env_name === 'prod') {
      ip = '192.0.2.147'
    } else if (props?.env_name === 'prod') {
      ip = '192.0.2.148'
    }

    new route53.ARecord(this, 'AliasRecord', {
      zone,
      target: route53.RecordTarget.fromIpAddresses(ip)
    })
  }
}

export interface AliasStackProps extends cdk.StackProps {
  env_name: string
}
