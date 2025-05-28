import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://193.53.127.202:8080";
const API_BASE_URL_CONTENT = "http://193.53.127.202:8083";

const makeRequest = async ( method, url, dto, headers = { 'Content-Type': 'application/json' }, service = "auth" ) => {
  try {
    let url_base;
    switch (service) {
      case 'auth':
        url_base = API_BASE_URL;
        break;
      case 'content':
        url_base = API_BASE_URL_CONTENT;
        break;
      default:
        url_base = API_BASE_URL;
        break;
    }
    console.log({
      method,
      url: `${url_base}${url}`,
      data: dto,
      headers,
    });

    const response = await axios({
      method,
      url: `${url_base}${url}`,
      data: dto,
      headers,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Request failed with status code: ${response.status}`);
    }
  } catch (error) {
    if (error.response) {
      console.error('API Response Error:', error.response);
      const errorMessage = error.response.data?.message ||
          error.response.data?.error ||
          'An error occurred';

      switch (error.response.status) {
        case 400:
          throw new Error(`Bad Request: ${errorMessage}`);
        case 401:
          throw new Error(`Unauthorized: ${errorMessage}`);
        case 403:
          throw new Error(`Forbidden: ${errorMessage}`);
        case 404:
          throw new Error(`Not Found: ${errorMessage}`);
        case 409:
          throw new Error(`Conflict: ${errorMessage}`);
        case 500:
          throw new Error(`Internal Server Error: ${errorMessage}`);
        default:
          throw new Error(`API Error: ${error.response.status} - ${errorMessage}`);
      }
    }
    throw error;
  }
};

export default makeRequest;
