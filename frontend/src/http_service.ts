const httpPost = async <ResponseData>(url = '', data = {}): Promise<ResponseData> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

const httpGet = async <ResponseData>(path = '', token = ''): Promise<ResponseData> => {
  const response = await fetch(path, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  });

  return response.json();
};
