import {request} from './request'

//banner 轮播图 
export function getBannerData(type){
	return request({
		url:'/banner',
		params: {
			type
		}
	})
}
//调用此接口 , 可获取推荐歌单 
export function recommendedSonglist(limit){
	return request({
		url:'/personalized',
    params: {
      limit
    }
	})
}

//调用此接口 , 该接口用于获取给用户的每日推荐数据 
export function recommendedData(cookie,limit){
	return request({
		url:'/recommend/songs',
		params: {
			cookie,
		}
	})
}
