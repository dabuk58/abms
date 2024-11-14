export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: '5c741f76-f8a9-423f-9919-4feb00689a2f',
      authority:
        'https://login.microsoftonline.com/cfbde96d-e669-42b4-ac96-c1529e36d3df',
    },
  },
  apiConfig: {
    scopes: ['user.read'],
    uri: 'http://localhost:4200',
  },
  homePath: 'http://localhost:4200',
};
