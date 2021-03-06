const request = async (url: string, method = 'GET', body: null | string, headers = {}) => {
  try {
    const response = await fetch(`http://localhost:9090${url}`, { method, headers, body });
    const data = await response.json();

    if (!response.ok) {
      throw data.errors || new Error('Something went wrong');
    }

    return data;
  } catch (e) {
    console.error(e.message || 'Something went wrong');
    throw e;
  }
};

export default request;
