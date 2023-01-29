interface RequestResponse {
  body: Record<string, any>
}

async function sendRequest( options: Record<string, any> ): Promise<RequestResponse> {
  const response = await fetch(options.uri, {
    method: options.method,
    headers: options.headers,
    body: JSON.stringify(options.body),
  })

  return response.json();
};

export default sendRequest;
