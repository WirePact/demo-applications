import { useSession } from 'next-auth/react';
import getConfig from 'next/config';
import { useState } from 'react';

const apiUrl = '/api/call';

const Home = () => {
  const { publicRuntimeConfig } = getConfig();
  const [url, setUrl] = useState(publicRuntimeConfig.API_URL);
  const [response, setResponse] = useState('');
  const [callErr, setCallErr] = useState(null);
  const { data: session } = useSession();

  async function callApi() {
    try {
      setCallErr(null);
      const res = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({
          apiUrl: url,
        }),
        headers: {
          'content-type': 'application/json',
        },
      });

      if (res.status >= 300) {
        setResponse(null);
        setCallErr(await res.text());
        return;
      }

      const j = await res.json();
      setResponse(JSON.stringify(j, null, 2));
    } catch (e) {
      setResponse(null);
      setCallErr(e.toString());
    }
  }

  return (
    <>
      <h1 className="text-xl font-bold mb-8">Hello there and welcome to the OIDC demo app.</h1>
      <p className="mb-8">
        Here you can set the API url that you want to call. On submit, the application will call the API with the current{' '}
        <code>access token</code> that is saved in the user session. It should be prefilled with the value of the{' '}
        <code>API_URL</code> environment variable.
      </p>
      <div className="text-center mb-16">
        <div className="inline-block w-1/2 border border-blue-200 rounded p-4 text-center">
          <input
            className="mb-4 rounded w-full px-4 py-2 bg-blue-100 border-b border-b-blue-500"
            placeholder="API Url (e.g. http://localhost:3000/api)"
            value={url}
            onChange={({ currentTarget: { value } }) => setUrl(value)}
          />
          <button className="rounded px-4 py-2 bg-blue-300 hover:bg-blue-500 transition-colors" onClick={callApi}>
            Send Request
          </button>
        </div>
      </div>
      {response && (
        <div className="text-center mb-16">
          <div className="w-2/3 p-4 text-left border border-green-500 inline-block rounded">
            <code className="whitespace-pre">{response}</code>
          </div>
        </div>
      )}
      {callErr && (
        <div className="text-center mb-16">
          <div className="w-2/3 p-4 border border-red-500 inline-block rounded">
            <code>{callErr}</code>
          </div>
        </div>
      )}
      {session && (
        <div className="text-center mb-16">
          <div className="w-2/3 p-4 border border-gray-500 inline-block rounded">
            <code>Access Token: {session.accessToken}</code>
          </div>
        </div>
      )}
    </>
  );
};

Home.getInitialProps = () => ({});

export default Home;
