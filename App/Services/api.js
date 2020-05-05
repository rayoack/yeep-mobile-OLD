import axios from 'axios'
import BaseURL from '../Config/BaseURL'
// import { store } from '../redux/store'

export const API = {

  getUriForProvider(provider) {
    switch (provider) {
      case 'facebook':
        return `${BaseURL.api}/auth/facebook`
      
      case 'google':
        return `${BaseURL.api}/auth/google_oauth2`

      case 'apple':
        return `${BaseURL.api}/auth/apple`
      
      default:
        return null
    }
  },

  extractAccessTokenHeaders(headers) {
    return {
      'access-token': headers['access-token'],
      'client': headers.client,
      'uid': headers.uid,
      'expiry': headers.expiry,
      'token-type': 'Bearer'
    }
  },

  extractAccessTokenFromUser(user) {
    return {
      'access-token': user.auth_token,
      'client': user.client_id,
      'uid': user.uid, 
      'expiry': user.expiry,
      'token-type': 'Bearer'
    }
  },

  get(path, params = {}, customHeaders = {}) {
    return this.makeRequest(path, params, customHeaders, 'get')
  },

  post(path, params = {}, customHeaders = {}) {
    return this.makeRequest(path, params, customHeaders, 'post')
  },

  put(path, params = {}, customHeaders = {}) {
    return this.makeRequest(path, params, customHeaders, 'put')
  },

  delete(path, params = {}, customHeaders = {}) {
    return this.makeRequest(path, params, customHeaders, 'delete')
  },

  // getAuthHeaders() {
  //   return store.getState().auth.token || {}
  // },

  makeRequest(path, params, customHeaders, method) {

    // const externalRequest = path.includes('https') || path.includes('http')

    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'X-Client': 'mobile',
        ...customHeaders
      }
    }
    
    // if (!externalRequest) {
    //   const authHeaders = this.getAuthHeaders()
    //   axiosConfig.baseURL = BaseURL.api
    //   axiosConfig.headers = {...axiosConfig.headers, ...authHeaders }
    // }

    axiosConfig.baseURL = BaseURL.api
    
    const AXIOS_REQUEST = axios.create(axiosConfig)

    switch (method) {
      case 'get':
        return AXIOS_REQUEST.get(path, {params}).then(response => {
          return response
        })

      case 'post':
        return AXIOS_REQUEST.post(path, params).then(response => {
          return response
        })

      case 'put':
        return AXIOS_REQUEST.put(path, params).then(response => {
          return response
        })

      case 'delete':
        return AXIOS_REQUEST.delete(path, params).then(response => {
          return response
        })

      default:
        return new Promise((resolve, _) => {
          resolve(null)
        })
    }
  }
}

export default API
