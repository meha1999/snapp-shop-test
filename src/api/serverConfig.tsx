import Axios from 'axios'
import qs from 'qs';

const apiInstance = Axios.create({
    baseURL: 'http://localhost:3004',
    timeout: 60000,
    headers: {
      'Accept-Language': 'fa',
    },
    paramsSerializer(params) {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });

  export default apiInstance
  