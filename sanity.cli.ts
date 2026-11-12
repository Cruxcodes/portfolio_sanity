import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'jnblf1cm',
    dataset: 'production'
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    enabled: true,
    path: '../portfolio_revamp/src/**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: '../portfolio_revamp/src/sanity/types.ts',
    overloadClientMethods: true,
  },
})
