#!/bin/bash

# $1 = $sgWizardServiceKey, $2 = $microServiceName, $3 = $sgWizardServiceCloudFormationKey
runServiceSgGenerator()
{

    # maybe run cloudformation template generator for service
    if [ $3 != "false" ]; then
        sg cloudformation-$3 $2
    fi

    # run sg generator for service
    if [ $1 != "false" ]; then
        sg $1 $2
    fi

    # update serverless.yml with any cloud formation yml templates related to micro service
    node cloudformation-templates/serverless-yaml-update.js $1

}

echo -e "\nSelect Micro Service Template (eg 1 for API):
\n1. API
2. DB Stack
3. API & DB Stack
0. None
"
read microServiceSelection

if [ $microServiceSelection = "0" ]; then
    exit
fi

echo -e "\nEnter micro service name, used in template for filenames and variables (eg {{name}}TableName):"
read microServiceName

if [ -z $microServiceName ]; then
    echo "Invalid service name"
    exit
fi

#TODO: fix this Hack to temp install js-yaml and lodash
npm install js-yaml
npm install lodash

sgWizardServiceKey=false
sgWizardServiceCloudFormationKey=false

case $microServiceSelection in
    "1")
        sgWizardServiceKey='api-fn'
        sgWizardServiceCloudFormationKey='api-fn'

        runServiceSgGenerator $sgWizardServiceKey $microServiceName $sgWizardServiceCloudFormationKey
    ;;
    "2")
        sgWizardServiceKey='db-stack'
        sgWizardServiceCloudFormationKey='db-stack'

        runServiceSgGenerator $sgWizardServiceKey $microServiceName $sgWizardServiceCloudFormationKey

        sls dynamodb install
    ;;
    "3")

        # Generate API function templates
        sgWizardServiceKey='api-fn'
        sgWizardServiceCloudFormationKey='api-fn'

        runServiceSgGenerator $sgWizardServiceKey $microServiceName $sgWizardServiceCloudFormationKey

        # Generate DB stack templates
        sgWizardServiceKey='db-stack'
        sgWizardServiceCloudFormationKey='db-stack'

        runServiceSgGenerator $sgWizardServiceKey $microServiceName $sgWizardServiceCloudFormationKey

        sls dynamodb install
    ;;
    "0")
        exit
    ;;
esac

#TODO: fix this Hack to temp install js-yaml and lodash
npm uninstall js-yaml
npm uninstall lodash

exit