#!/bin/bash
set -e

#### Deploying to AWS ####
npm run deploy:${SLS_STAGE}
