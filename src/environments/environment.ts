// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://test-api.cactusweb.io/api/v2/owner',
  siteDome: 'http://localhost:4200',
  currency: ['USD', 'RUB', 'EUR'],
  dsBotInvite: 'https://discord.com/api/oauth2/authorize?client_id=840111496947826708&permissions=8&redirect_uri=https%3A%2F%2Ftest-api.cactusweb.io%2Fapi%2Fv2%2Fuser%2Fauth%2Ftoken&scope=bot',
  primaryOwnerColor: '#5D9BF3',

  customization: {
    ryodan: {
      id: '64d8bad99a9ad3b0b4c9190e',
      apiUrl: 'https://external.ryodancrypto.com/api/v1/admin'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
