const request = async (url: string, method = 'GET', body: null | string = null, headers = {}) => {
  try {
    const response = await fetch(url, { method, body, headers });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так');
    }

    return data;
  } catch (e) {
    console.log(e.message);
    throw e;
  }
};

export default request;
