function onLoad() {
  document.getElementById('send').addEventListener('click', sendRequest);
  loadApiUrl();
}

async function loadApiUrl() {
  try {
    const response = await fetch('api_url', {
      method: 'GET',
    });

    const data = await response.json();
    document.getElementById('api-url').value = data.url;
    document.getElementById('username').value = data.user;
    document.getElementById('password').value = data.pass;
  } catch (e) {
    console.warn(e);
  }
}

async function sendRequest() {
  const url = document.getElementById('api-url').value;
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept-type': 'application/json',
        authorization: `Basic ${btoa(`${user}:${pass}`)}`,
      },
    });

    if (response.status >= 300) {
      setResponse();
      setError(await response.text());
      return;
    }

    setResponse(JSON.stringify(await response.json(), null, 2));
    setError();
  } catch (e) {
    setResponse();
    setError(e.toString());
  }
}

function setError(error) {
  const element = document.getElementById('err');
  const elementDiv = document.getElementById('err-div');

  if (!error) {
    elementDiv.classList.add('hidden');
    return;
  }

  element.innerHTML = error;
  elementDiv.classList.remove('hidden');
}

function setResponse(response) {
  const element = document.getElementById('response');
  const elementDiv = document.getElementById('response-div');

  if (!response) {
    elementDiv.classList.add('hidden');
    return;
  }

  element.innerHTML = response;
  elementDiv.classList.remove('hidden');
}
