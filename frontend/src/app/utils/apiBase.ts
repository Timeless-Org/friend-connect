import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { API_BASE_URL } from './config'

interface BaseRequestResponse {
  data: any
}

interface BaseRequestOptions {
  params?: Record<string, any>
  customPath?: string
}

export const baseRequest = async (
  method: string,
  url: string,
  data?: Record<string, any>,
  options?: BaseRequestOptions
): Promise<BaseRequestResponse> => {
  const { params, customPath } = options || {}

  const requestConfig: AxiosRequestConfig = {
    method,
    data,
    params,
    url: customPath ? `${API_BASE_URL}${url}/${customPath}` : `${API_BASE_URL}${url}`,
    timeout: 10000,
    headers: {}
  }

  try {
    const response = await axios(requestConfig)
    return { data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError
      const errorData = axiosError.response || axiosError.request || axiosError
      console.log(`axios.isAxiosError(error): ${errorData}`)

      return Promise.reject(errorData)
    }

    console.log(`error: ${error}`)
    return Promise.reject(error)
  }
}
