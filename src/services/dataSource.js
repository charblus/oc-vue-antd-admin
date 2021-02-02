import {GOODS, GOODS_COLUMNS, USER_UNIT} from './api'
import {METHOD, request} from '@/utils/request'

export async function goodsList(params) {
  return request(GOODS, METHOD.GET, params)
}

export async function goodsColumns() {
  return request(GOODS_COLUMNS, METHOD.GET)
}

export async function allUserUnit(params) {
  return request(USER_UNIT, METHOD.POST, params)
}

export default {goodsList, goodsColumns, allUserUnit}