import { ReqMap } from "../tools/interfaces/req-map";
import { SearchParam } from "../tools/interfaces/search-param";
import { SortParams } from "../tools/interfaces/sort-params";

export const Requests: ReqMap  = {
    getLicenses: { url: '/license', method: 'GET' },
    deleteLicense: { url: '/license/:param', method: 'DELETE' },
    renewLicense: { url: '/license/:param/renew', method: 'GET' },
    postLicense: { url: '/license', method: 'POST' },
    putLicense: { url: '/license/:param', method: 'PUT' },


    resetRefPoints: { url: '/referral', method: 'DELETE' },
    changeRefPoints: { url: '/referral/:param', method: 'PUT' }
}

export const searchLicenseKeys: string[][] = [
    [ 'key' ], 
    [ 'user', 'full_name'],
    [ 'user', 'discord_id' ],
    [ 'payment', 'email' ],
    [ 'payment', 'last_4' ],
    [ 'expires_in' ],
    [ 'create_at' ],
    [ 'payment', 'customer_id' ]
  ]

export const filterLicenseParams = [
  {key: 'type', status: false, str: 'renewal'},
  {key: 'type', status: false, str: 'lifetime'},
  {key: 'type', status: false, str: 'trial'},
  {key: 'type', status: false, str: 'trial-renewal'},
]

export const nicknameSort: SortParams = {
    keys: ['user', 'full_name'],
    type: 'string',
}

export const renewDateSort: SortParams = {
    keys: ['expires_in'],
    type: 'number'
}

export const refScoreSort: SortParams = {
  keys: ['referral', 'score'],
  type: 'number'
}