import request from '@/http/http'

export const a=(query)=>{return request({url:'/api/v1/shopdining/getDiningNum',method:'post',data:query})}