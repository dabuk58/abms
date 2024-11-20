export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '5c741f76-f8a9-423f-9919-4feb00689a2f',
      authority:
        'https://login.microsoftonline.com/cfbde96d-e669-42b4-ac96-c1529e36d3df',
    },
  },
  googleConfig: {
    clientId:
      '308042429941-ipe7qiarhledf35ude4onkd1u8msjk68.apps.googleusercontent.com',
    signInScriptUrl: 'https://accounts.google.com/gsi/client',
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'https://localhost:7163',
  },
  azureBlobStorageConfig: {
    sas: 'sp=r&st=2024-11-20T14:03:49Z&se=2025-02-28T22:03:49Z&sv=2022-11-02&sr=c&sig=w9f2iouymjqrBZgKIdlNUECy4Dl%2BJIvrzPLjKnq%2F%2FC8%3D',
  },
  homePath: 'http://localhost:4200',
};
