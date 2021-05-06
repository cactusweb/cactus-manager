export interface Owner {
    id: string,
    description: string,
    email: string,

    links: [
      {
        link: string,
        name: string
      }
    ],

    name: string,
    region: string,
    kick: true,
    primaryColor: string,
    siteUrl: string,

    settings: {
      discord: {
        id: string,
        roles: [
          {
            id: string,
            name: string
          }
        ]
      },

    yooKassa: {
        currency: string,
        secretKey: string,
        shopId: string
      }
    },

    type: string,

    uploads: {
      avatar: string,
      background: string
    }
}
