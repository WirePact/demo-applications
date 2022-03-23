export const issuer = () => process.env['ISSUER'] ?? `http://localhost:${port()}`;
export const hasProxy = () => process.env['PROXY'] === 'true' ?? false;
export const port = () => parseInt(process.env['PORT'] ?? '3001', 10);
