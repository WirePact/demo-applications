import { errors, KoaContextWithOIDC } from 'oidc-provider';
export const grantType = 'urn:ietf:params:oauth:grant-type:token-exchange';
export const parameters = [
  'audience',
  'resource',
  'scope',
  'requested_subject',
  'requested_token_type',
  'subject_token',
  'subject_token_type',
  'actor_token',
  'actor_token_type',
];
export const allowedDuplicateParameters = ['audience', 'resource'];

export async function tokenExchangeHandler(ctx: KoaContextWithOIDC, next: () => Promise<void>) {
  // ctx.oidc.params holds the parsed parameters
  // ctx.oidc.client has the authenticated client
  // your grant implementation
  // see /lib/actions/grants for references on how to instantiate and issue tokens

  // This is by no means a valid implementation of the requesting subject.
  if (ctx.oidc.params?.requested_token_type !== 'urn:ietf:params:oauth:token-type:access_token') {
    throw new errors.InvalidRequest('Access token must be requested.');
  }

  const targetId = ctx.oidc.params.requested_subject;
  if (!targetId) {
    throw new errors.InvalidRequest('Subject must be set.');
  }

  // just create an access token and return it.
  const grant = new ctx.oidc.provider.Grant({
    accountId: targetId as string,
    clientId: ctx.oidc.client!.clientId,
  });
  const grantId = await grant.save();
  const at = new ctx.oidc.provider.AccessToken({
    accountId: targetId as string,
    client: ctx.oidc.client!,
    scope: 'openid',
    grantId,
    gty: 'token_exchange',
  });

  ctx.oidc.entity('Grant', grant);
  ctx.oidc.entity('AccessToken', at);
  const accessToken = await at.save();

  ctx.body = {
    access_token: accessToken,
    expires_in: at.expiration,
    scope: at.scope,
    token_type: at.tokenType,
  };

  await next();
}
