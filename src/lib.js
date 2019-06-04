import { GraphQLClient } from 'graphql-request'
import * as _inputs from './inputs';
import chalk from 'chalk'

let success = true;
const verbose = true;
const inputs = _inputs.default;
const warningMsg = `Key must be unique within this namespace on this resource`;
const warningType = chalk.bold(`⚠️  WARNING`);
const errorType = chalk.bold(`🚨  ERROR`);
const updateMetafieldStorefrontVisibility = `
  mutation($input: MetafieldStorefrontVisibilityInput!) {
    metafieldStorefrontVisibilityCreate(input: $input) {
      metafieldStorefrontVisibility {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

async function main() {
	// https://{apikey}:{password}@{hostname}/admin/api/{version}/{resource}.json
  const endpoint = `https://09bd634137e3b9a24d7051a11a9081d9:e8fc9979477c62182f97f148c62aa215@new-dev-sandbox.myshopify.com/admin/api/2019-07/graphql.json`
  const graphQLClient = new GraphQLClient(endpoint)
  const timeStart = Date.now();
 
  for (let input of inputs) {
    const client = await graphQLClient.request(updateMetafieldStorefrontVisibility, { input })

    if (client.metafieldStorefrontVisibilityCreate.userErrors[0]) {
      const msg = client.metafieldStorefrontVisibilityCreate.userErrors[0];
      const field = chalk.bold.blue(`{${msg.field[1]}: ${input[msg.field[1]]}}`)
      if (verbose) {
        if (msg.message === warningMsg) {
          console.warn(`${warningType}\n${field}\n${JSON.stringify(msg)}\n`)
        } else {
          success = false;
          console.error(`${errorType}\n${field}\n${JSON.stringify(msg)}\n`)
        }
      }
    }
  }

  const timeEnd = Date.now();
  const time = (timeEnd - timeStart) / 1000;
  const timeMsg = `⏱  Done in ${time} seconds\n`;

  if (success) {
    console.log(`\n${chalk.bold('✅  All storefront visibility metafields were added successfully')}\n`)
    console.log(`${timeMsg}`)
  } else {
    console.error(`\n${chalk.red('🛑  There was an error during adding storefront visibility metafileds')}\n`)
    console.log(`${timeMsg}`)
  }
}

main().catch(error => console.error(error))
