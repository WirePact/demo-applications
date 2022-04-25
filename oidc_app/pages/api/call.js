import { HttpProxyAgent } from 'http-proxy-agent';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method not allowed. Only POST.');
    return;
  }

  const url = req.body.apiUrl?.trim();
  if (!url) {
    res.status(400).send('api url must not be empty.');
    return;
  }

  const { accessToken } = await getSession({ req });
  if (!accessToken) {
    res.status(400).send('no access token present in session.');
    return;
  }

  const options = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (process.env.HTTP_PROXY) {
    console.log(`Set HTTP_Proxy "${process.env.HTTP_PROXY}".`);
    options.agent = new HttpProxyAgent(process.env.HTTP_PROXY);
  }

  console.log(`Sending request to ${url}.`);

  const apiResult = await fetch(url, options);

  if (apiResult.status >= 300) {
    res.status(400).json({ status: apiResult.status, text: apiResult.statusText });
    return;
  }

  res.status(200).json(await apiResult.json());
}
