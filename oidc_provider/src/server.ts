import { Provider } from 'oidc-provider';
import { hasProxy, issuer, port } from './config';

const oidc = new Provider(issuer(), {
  clients: [
    {
      client_id: 'wire-pact',
      client_secret: 'demo-oidc-provider',
      redirect_uris: ['https://localhost'],
      response_types: ['code'],
      grant_types: ['authorization_code'],
      token_endpoint_auth_method: 'client_secret_basic',
    },
    {
      client_id: 'wire-pact-pkce',
      client_secret: 'demo-oidc-provider',
      redirect_uris: ['https://localhost'],
      response_types: ['code'],
      grant_types: ['authorization_code'],
      token_endpoint_auth_method: 'none',
    },
  ],
  extraClientMetadata: {
    // Dont validate redirect uris.
    properties: ['redirect_uris'],
    validator() {},
  },
  pkce: {
    required: (_: any, { clientId }: any) => clientId === 'wire-pact-pkce',
    methods: ['S256'],
  },
  features: {
    introspection: {
      enabled: true,
    },
    userinfo: {
      enabled: true,
    },
  },
});

// Allow all redirect uris.
oidc.Client.prototype.redirectUriAllowed = () => true;
oidc.proxy = hasProxy();
oidc.listen(port(), () => console.log(`OIDC provider listening on port ${port()}.`));
