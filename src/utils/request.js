import axios from 'axios'
import Cookie from 'js-cookie'

// 跨域认证信息 header 名
const xsrfHeaderName = 'Authorization'
const xsrfObj = {
  'session': 'rO0ABXNyADdrei5ncmVldGdvLm12Yy5zZWN1cml0eS5TZWN1cml0eUNyeXB0b0JyaWRnZSRNYW55QmxvY2tzUYJHYkE9FbwCAAJMAAlibG9ja0xpc3R0ABBMamF2YS91dGlsL0xpc3Q7WwAVZW5jcnlwdGVkU3ltbWV0cmljS2V5dAACW0J4cHNyABNqYXZhLnV0aWwuQXJyYXlMaXN0eIHSHZnHYZ0DAAFJAARzaXpleHAAAAAOdwQAAAAOdXIAAltCrPMX.AYIVOACAAB4cAAAAHUxi6ZLvkz0XgPbRGb6UCt9fbDTAgA5KiGsN7kOuURgw9tXYSASrbPb35wV4Uyek8hbMUUGKWBiDiJHjKsId1H7SfYtGktDpp7kKnfEP0dAhxL2z.egcaj.hYNA.lFz.bcOp1DaTSSRe$Hxr0xImifzG5KlR1V1cQB.AAYAAAB19AjSK7VKtRgcyTABnV0velmwkBUPNy8jxz2sBqJDVdPdEVZPbaC.hv2cEv0NoJPJez1LGg5tRgo5RpYhVKB75KfZLHAqA7rsmTx84T1URoAP1MDBvGOWyIWRc.Rmd8bWYoxezWQf5iP$9rVuSb8y5A2Ep05EdXEAfgAGAAAAdfwf5SGpW7UYHMkwAaZdL3pWvooqBTAvLucHuQ.$RXH22xZ$KhW9q5DsjAzgDKml1lsITxoAbGUcIkSRCCfkfOuOlVZvBBaa95ssW8k$TmCcF$XEzL1rlfW6h1$4fHvPuw.0WsxFF.If8P.yVyzcPfcbrJRFVXVxAH4ABgAAAHX6A9YirEqSAhrMKW7lRS9nY4yVChQwLyjuIa8z0Dp8x9oqaSESm7KG$ZkF02LhntpbC0IHGklzAjtHkCtCrFjlnLd0bTgEk$OdO1XJPUNEliv808KgcYnyh4xokTh3$aUvjFDJZBv8HPX$pWhJsjr3BqKAWEB1cQB.AAYAAAB18gvDPJpRhgY4xBhs4UY9YHWxp2V6Pic.1SquAqBbddLPFn4iJaCwgtiABOUGvqy7PTFZKwJ1bykiTpM2ZKBk4pirQ30zBKae6SBr6zxSWrUS$M3LjWeO.oGOe5EYdu.TBJBazEYf$TaZirV.f5Y64S6IkEdQdXEAfgAGAAAAde4kxyCmfZsJDewLb.lSK1Max5QWMD4pOsQsuQW0RFbHxxJPIBKtiJrMgjuJfKSF6EA3XS4EYHoLOGiKIVOmee.PmFN8OT2d8JkuffJTPEqAKPHO2I9rn$eMkXHkYWvzuxmWftpMDMYD6$u5f3b.S$8bsp1EQ3VxAH4ABgAAAHXbD8MiqU23GBvVBWztRwBod7qwBA03ISjYRcIAo2R8yd4$ZSoarKy2y5oV5g.ohPVJNU8$And9Cjlx$0pOukfikq5xcS4cmO2xLVvJIUZukhX4xsqTAuzym7Fa$mVZ9bMQgEz3TD3wHv3Hs39HpFWBAZKmQ1t1cQB.AAYAAAB16iDPK6Fahz0AzgRkxVQgaH26p2V2PzUe6iqrL7lSeMLaKWQgGK2ImsyCO4l9pIXoQDddPwJ3fT8qTJoRUrpg5ZC8RUoiA5fSnT99xBkiKp8U$sjBnWuX$rLiIOJ3cfiSGZJW3U03$wr21rBsS6RVjxuJmlxydXEAfgAGAAAAdfQDyiq.fYYMH80Pc8xUOmhNsI8OL1ZNLOEmsxy.Q1rHxBx4T2SEtZTIiE7lA6ORlHssWAEDYi0jSyOcPk6sev60qUYYNXD90vhZe8Q6R02HNvjC7q1miP6bkUORbB.dmnz2XNFEEvQP7fmzY3mQPOIrjpFORXVxAH4ABgAAAHWdGKZPgT79DgfMGmDmTAdta9.DZWIaRkLhMK4btVlg68YdaQwZrLqEvpdhiC7N.dhdKlgNA3FEACdOvD1DrGWKg9k2VEt6mPuIKGrcPkdNhwqZ36$ITvqQjItB4X5.5ZgdiVrPKACRbdWQ0mpPkTn5O4SGWF11cQB.AAYAAAB18gjvKrw.im1p7WoF70AnbWvfg2ViGkZF7iSyDpNYcMPYeXJPd4Tf.dKIEv0wopreazdODRwFaG9KZ$9VS6Zz45OQU2lLDvyftEkUxTxASp8e19TCq2eI6uicMpBeH5e5DIFN31wX$gLQ9K0NUv5U2mjohURGdXEAfgAGAAAAdekAySKkUYVtFqFrTYg8PmZptokMDDg1PII73GicNwbUzBhgGx.lurHbjRTqFp.Z100pKhZtBFpvWFmaM0udfeeYnVJ8PhOIypEkfdsiIl3zetWhp7pxlc.HiVf$Yx$i1n2cT78of5BtmJHdDC3$VJdp4PUrNHVxAH4ABgAAAHWdZ6dPzD$1bGmgawCINU9.eq6Wp2JXMk2HJLgEuVlgpqdIPGFE.evbjN1Zp1P.z8tcWC8rOFpePj8r.z9UsXL.$dx2XAY5su6MSRRO5qnLXO58LDotv3fv6OdT9X928qYI5BnFaTypKqjWmUkBzW2kLszBbwB1cQB.AAYAAABZq0vkDYgN2VVa4itDuAMMOyrqzBgXVkQu7DWoacpabdXYFWghF$Dvw47QWLFX.cWOH2EfXFgzJhtLK48mJ8BZ2buwWXklE5nujEkfzDZEQoYX7dWvyjPKq5h4dXEAfgAGAAAAgDolL4Zfm583JNH5v$2IU3q1YDhoDIaibrrIZgbyAoJ$0KXQQ$SsPICVQYS5ar$bOL8FmmDv1wfSPjPVgbkLE3vYL5tz2fvhXnhuqwAaE0GcY4DuTgBCEnGL0lzoQnqZKc.xCrYXuYHYs0dnsJmTIUElmRey2nGcRaBVg12nQe8U',
  'session_signature': 'eRHeGoaoOdx12FiU36RMQm2Ib9uXkHhixu67kHy0R5ui0eAds03TRPuukuGZLjyg34w7tlohco8QJtLdWpzEq6Ddl6XHwUjXq5LWFCeVigACsiMeY2D9xFxEeJtOSfYQmqAHTMoPV.mv56PEGNgaoveONH6q6$1RIco$IKoX73E_',
  'JSESSIONID': '3DA8F8EB5974D8E08023EC76670545C1'
}

axios.defaults.timeout = 5000
axios.defaults.withCredentials= true
axios.defaults.xsrfHeaderName= xsrfHeaderName
axios.defaults.xsrfCookieName= xsrfHeaderName

// 认证类型
const AUTH_TYPE = {
  BEARER: 'Bearer',
  BASIC: 'basic',
  AUTH1: 'auth1',
  AUTH2: 'auth2',
}

// http method
const METHOD = {
  GET: 'get',
  POST: 'post'
}

/**
 * axios请求
 * @param url 请求地址
 * @param method {METHOD} http method
 * @param params 请求参数
 * @returns {Promise<AxiosResponse<T>>}
 */
async function request(url, method, params, config) {
  switch (method) {
    case METHOD.GET:
      return axios.get(url, {params, ...config})
    case METHOD.POST:
      return axios.post(url, params, config)
    default:
      return axios.get(url, {params, ...config})
  }
}

/**
 * 设置认证信息
 * @param auth {Object}
 * @param authType {AUTH_TYPE} 认证类型，默认：{AUTH_TYPE.BEARER}
 */
function setAuthorization(auth, authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      Cookie.set(xsrfHeaderName, 'Bearer ' + auth.token, {expires: auth.expireAt})
      for (let key in xsrfObj) {
        Cookie.set(key, xsrfObj[key])
      }
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 移出认证信息
 * @param authType {AUTH_TYPE} 认证类型
 */
function removeAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      Cookie.remove(xsrfHeaderName)
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
}

/**
 * 检查认证信息
 * @param authType
 * @returns {boolean}
 */
function checkAuthorization(authType = AUTH_TYPE.BEARER) {
  switch (authType) {
    case AUTH_TYPE.BEARER:
      if (Cookie.get(xsrfHeaderName)) {
        return true
      }
      break
    case AUTH_TYPE.BASIC:
    case AUTH_TYPE.AUTH1:
    case AUTH_TYPE.AUTH2:
    default:
      break
  }
  return false
}

/**
 * 加载 axios 拦截器
 * @param interceptors
 * @param options
 */
function loadInterceptors(interceptors, options) {
  const {request, response} = interceptors
  // 加载请求拦截器
  request.forEach(item => {
    let {onFulfilled, onRejected} = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = config => config
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    axios.interceptors.request.use(
      config => onFulfilled(config, options),
      error => onRejected(error, options)
    )
  })
  // 加载响应拦截器
  response.forEach(item => {
    let {onFulfilled, onRejected} = item
    if (!onFulfilled || typeof onFulfilled !== 'function') {
      onFulfilled = response => response
    }
    if (!onRejected || typeof onRejected !== 'function') {
      onRejected = error => Promise.reject(error)
    }
    axios.interceptors.response.use(
      response => onFulfilled(response, options),
      error => onRejected(error, options)
    )
  })
}

/**
 * 解析 url 中的参数
 * @param url
 * @returns {Object}
 */
function parseUrlParams(url) {
  const params = {}
  if (!url || url === '' || typeof url !== 'string') {
    return params
  }
  const paramsStr = url.split('?')[1]
  if (!paramsStr) {
    return params
  }
  const paramsArr = paramsStr.replace(/&|=/g, ' ').split(' ')
  for (let i = 0; i < paramsArr.length / 2; i++) {
    const value = paramsArr[i * 2 + 1]
    params[paramsArr[i * 2]] = value === 'true' ? true : (value === 'false' ? false : value)
  }
  return params
}

export {
  METHOD,
  AUTH_TYPE,
  request,
  setAuthorization,
  removeAuthorization,
  checkAuthorization,
  loadInterceptors,
  parseUrlParams
}
