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
    price: string,

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
      },
      primary_color: string,
      kick: true,
      site_url: string,
    },

    type: string,

    uploads: {
      avatar: string,
      background: string
    }
}
