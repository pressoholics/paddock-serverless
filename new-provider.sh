#!/bin/bash

# $1 = $sgWizardProviderKey, $2 = $microProviderName, $3 = $sgWizardProviderCloudFormationKey
runProviderSgGenerator()
{

    # maybe run cloudformation template generator for Provider
    sg cloudformation-provider-$1 $2

    # update serverless.yml with any cloud formation yml templates related to micro Provider
    node cloudformation-templates/serverless-yaml-update.js provider-$1

}

echo -e "\nSelect Provider Cloudformation Template (eg 1 for S3):
\n1. S3 Bucket
2. S3 Deployment Bucket
3. Application Load Balancer
4. HTTP Api
0. None
"
read providerSelection

if [ $providerSelection = "0" ]; then
    exit
fi

case $providerSelection in
    "1")
        echo -e "\nEnter slugified bucket name (my-custom-bucket-name):"
        read providerName

        if [ -z $providerName ]; then
            echo "Invalid bucket name"
            exit
        fi

        runProviderSgGenerator 's3' $providerName
    ;;
    "2")
        
    ;;
    "3")

        
    ;;
    "0")
        exit
    ;;
esac

exit