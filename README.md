<h1 align="center">
  <img alt="Gatsby" src="https://raw.githubusercontent.com/AlexanderProd/gatsby-shopify-starter/master/ressources/shopify+gatsby.png" height="60px" />
  <br/>
  gatsby-plugin-shopify-metafields
</h1>

Plugin to add Storefront Visibility Metafields via [Shopify Admin API](https://help.shopify.com/en/api/graphql-admin-api). This plugin makes `metafields` property accessable via [Shopify Storefront API](https://help.shopify.com/en/api/storefront-api/getting-started).

![](https://cdn.shopifycloud.com/help/assets/api/storefront-api/guides/metafields-51f0ff360eabec368a0fb5f7ce16f56911eb48cc1010e4a3df9850ee96e46041.png)

> You can use the Storefront API to read metafields for products and product variants. Metafields are useful for storing specialized information, such as part numbers or additional variant options. The Storefront API lets you access and use that data on the custom storefront.

More in-depth explanation can be found in [Retrieving metafields from Storefront API](https://help.shopify.com/en/api/custom-storefronts/storefront-api/guides/metafields).

## Install

```sh
yarn add gatsby-plugin-shopify-metafields
```

## How to use

```js
{
  resolve: `gatsby-plugin-shopify-metafields`,
  options: {
    // The domain name of your Shopify shop. This is required.
    // Example: 'gatsby-shopify' if your Shopify address is
    // 'gatsby-shopify.myshopify.com'.
    shopName: `gatsby-shop`,
    // An Admin API Key to your Shopify shop. This is required.
    // You can generate an access token in the "Manage private apps" section
    // of your shop's Apps settings.
    // See: https://help.shopify.com/en/api/graphql-admin-api/getting-started#authentication
    adminAPIKey: `03h7545db6f32a0dd1b0agupje551970`,
    // An Admin API Password to your Shopify shop. This is required.
    adminPassword: `47u3929dubj32489dhbbsahdjasdgjas`,
    // A list of MetafieldStorefrontVisibility records to whitelist.
    // It's a good practice to keep the list of metafields in a separate
    // 'json' file and require it in 'gatsby-config.js' to keep it concise.
    inputs: [
      {
        "namespace": "global",
        "key": "featured",
        "ownerType": "PRODUCT"
      },
      {
        "namespace": "spain",
        "key": "sale",
        "ownerType": "COLLECTION"
      },
      ...
    ],
    // Set verbose to true to display a warning or an error output.
    // This prints which MetafieldStorefrontVisibility record.
    // was already whitelisted or if there is an error
    // Defaults to true.
    verbose: true,
    // Disable plugin.
    // In most scenarios MetafieldStorefrontVisibility has to be whitelisted just once.
    // In this case you can disable this plugin and shave off couple of seconds from your build.
    // Defaults to 'true'.
    updateMetafields: true
  }
}
```

![](https://media.giphy.com/media/RiEGcNYruwMscEaTxr/source.gif)
