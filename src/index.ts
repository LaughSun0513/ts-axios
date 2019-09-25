import { AxiosRequestConfig } from './types'
import { bulidURL } from './helpers/url'
import xhr from './xhr'
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  const newURL = bulidURL(url, params)
  console.log(newURL)
  return (config.url = newURL)
}
function axios(config: AxiosRequestConfig): void {
  transformURL(config)
  xhr(config)
}
export default axios
