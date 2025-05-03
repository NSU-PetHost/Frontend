import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://84.237.52.214:4020";

const makeRequest = async ( method, url, dto, headers = { 'Content-Type': 'application/json' } ) => {
  try {
    console.log({
      method,
      url: `${API_BASE_URL}${url}`,
      data: dto,
      headers,
    });
    const response = await axios({
      method,
      url: `${API_BASE_URL}${url}`,
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
      switch (error.response.status) {
        case 400:
          throw new Error(`Bad Request: ${error.response.data?.message || 'Invalid data sent'}`);
        case 401:
          throw new Error(`Unauthorized: ${error.response.data?.message || 'Authentication required'}`);
        case 403:
          throw new Error(`Forbidden: ${error.response.data?.message || 'You do not have permission'}`);
        case 404:
          throw new Error(`Not Found: ${error.response.data?.message || 'Requested resource not found'}`);
        case 409:
          throw new Error(`Conflict: ${error.response.data?.message || 'Conflict with existing resource'}`);
        case 500:
          throw new Error(`Internal Server Error: ${error.response.data?.message || 'Server error, please try again later'}`);
        default:
          throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'An error occurred'}`);
      }
    }
  }
};

export default makeRequest;
