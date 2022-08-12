import {request} from './request'


// 调用此接口 邮箱登录 
export function userLogin(phone,password){
	return request({
		url:'/login/cellphone',
		params: {
			phone,
			password
		},
	})
}

export function loginStatus(){
	return request({
		url:'/login/status',	
	})
}

export function loginLogout(){
	return request({
		url:'/login/logout',	
	})
}

//获取用户详情
export function userDetail(uid){
	return request({
		url:'/user/detail',	
		params: {
			uid
		}
	})
}

//获取歌单详情
export function songListDetail(id,limit){
	return request({
		url:'/playlist/track/all',	
		params: {
			id,
			limit
		}
	})
}

//获取歌单详情动态
export function dynamic(id){
	return request({
		url:'/playlist/detail/dynamic',	
		params: {
			id,
		}
	})
}

//获取歌曲url
export function player(id){
	return request({
		url:'/song/url',	
		params: {
			id,
		}
	})
}
//调用此接口 ,该接口用于获取歌曲对应的详情信息，需要根据歌曲的 id 获取 
export function songDetail(ids){
	return request({
		url:'/song/detail',
		params: {
			ids
		}
	})
}

export function getLyricData(id){
	return request({
		url:'/lyric',	
		params: {
			id
		}
	})
}
// //调用此接口 手机号登录 
// // export function getRecommend(){
// // 	return request({
// // 		url:'/login/cellphone'
// // 	})
// // }

// //调用此接口 , 获取用户播放记录 
// export function getRecommend(){
// 	return request({
// 		url:'/user/record'
// 	})
// }

// //调用此接口 , 该接口用于获取导航标签对应的视频列表数据
// export function getRecommend(){
// 	return request({
// 		url:'/video/group'
// 	})
// }



// //调用此接口 , 获取用户播放记录 
// export function getRecommend(){
// 	return request({
// 		url:'/user/record'
// 	})
// }

// //调用此接口 , 该接口用于获取视频导航标签列表数据 
// export function getRecommend(){
// 	return request({
// 		url:'/video/group/list'
// 	})
// }
// //调用此接口 , 该接口用于获取导航标签对应的视频列表数据
// export function getRecommend(){
// 	return request({
// 		url:'/video/group'
// 	})
// }


// //调用此接口 , 该接口用于获取歌曲的播放地址，需要根据歌曲的 id 获取
// export function getRecommend(){
// 	return request({
// 		url:'/song/url'
// 	})
// }
// //调用此接口 , 该接口用于获取默认搜索关键字显示在搜索框中
// export function getRecommend(){
// 	return request({
// 		url:'/search/default'
// 	})
// }
// //调用此接口 , 该接口用于获取热搜数据
// export function getRecommend(){
// 	return request({
// 		url:'/search/hot/detail'
// 	})
// }

//该接口用于根据用户输入的内容进行模糊匹配搜索
export function search(keywords,limit){
	return request({
		url:'/search',
		params: {
			keywords,
			limit
		}
	})
}


