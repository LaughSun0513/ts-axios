import { AxiosRequestConfig } from './types'
import { bulidURL } from './helpers/url'
import xhr from './xhr'

function axios(config: AxiosRequestConfig): void {
  let { url, params } = config
  url = bulidURL(url, params)
  console.log('newURL', url)
  xhr(config)
}
export default axios
