import { Provider } from 'oidc-provider';
import { hasProxy, issuer, port } from './config';
import { allowedDuplicateParameters, grantType, parameters, tokenExchangeHandler } from './tokenExchange';

const oidc = new Provider(issuer(), {
  clients: [
    {
      client_id: 'wirepact',
      client_secret: 'secret',
      redirect_uris: ['https://localhost'],
      response_types: ['code'],
      grant_types: ['authorization_code', 'client_credentials', grantType],
      token_endpoint_auth_method: 'client_secret_basic',
    },
    {
      client_id: 'wirepact-pkce',
      client_secret: 'secret',
      redirect_uris: ['https://localhost'],
      response_types: ['code'],
      grant_types: ['authorization_code', 'client_credentials', grantType],
      token_endpoint_auth_method: 'none',
    },
  ],
  extraClientMetadata: {
    // Dont validate redirect uris.
    properties: ['redirect_uris'],
    validator() {},
  },
  pkce: {
    required: (_: any, { clientId }: any) => clientId === 'wirepact-pkce',
    methods: ['S256'],
  },
  features: {
    introspection: {
      enabled: true,
    },
    userinfo: {
      enabled: true,
    },
    clientCredentials: {
      enabled: true,
    },
  },
});

oidc.registerGrantType(grantType, tokenExchangeHandler, parameters, allowedDuplicateParameters);

// Allow all redirect uris.
oidc.Client.prototype.redirectUriAllowed = () => true;
oidc.proxy = hasProxy();
oidc.listen(port(), () => console.log(`OIDC provider listening on port ${port()}.`));
