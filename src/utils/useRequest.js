import { ResponseCode } from '@/config/requestEnum'
import router from '@/router'
import useLogger from '@/utils/useLogger'

const logger = useLogger('request')

const request = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 1000 * 60,
  withCredentials: true,
})

request.interceptors.request.use(
  (config) => {
    logger.info(`url: ${config.url}`)
    config.params && logger.info('params: ', config.params)
    config.data && logger.info('data: ', config.data)
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)
request.interceptors.response.use(
  (response) => {
    const code = response.data.code
    if (code === ResponseCode.SUCCESS_CODE) {
      logger.info('response: ', response.data)
      return response.data
    } else if (code === ResponseCode.NOAUTH_CODE) {
      router.replace({
        path: '/no-permission',
        query: {
          redirect: router.currentRoute.value.fullPath,
        },
      })
    }
    const error = new Error(response.data.msg)
    logger.error('error: ', error)
    return Promise.reject(error)
  },
  (error) => {
    Promise.reject(error)
  },
)

export default request
