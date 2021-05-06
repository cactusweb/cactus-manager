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
    primary_color: string,
    site_url: string,

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

    yoo_kassa: {
        currency: string,
        secret_key: string,
        shop_id: string
      }
    },

    type: string,

    uploads: {
      avatar: string,
      background: string
    }
}
