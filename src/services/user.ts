// 请求接口文档
import request from '@/utils/request'

export async function queryCurrent():Promise<any> {
    return request('/api/users')
}