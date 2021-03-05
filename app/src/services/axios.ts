const request = async (url: string, method = 'GET', body: null | string, headers = {}) => {
  try {
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (e) {
    console.error(e.message);
    throw e;
  }
};

export default request;
