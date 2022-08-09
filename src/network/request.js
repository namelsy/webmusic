import axios from 'axios'
axios.defaults.withCredentials = true; //加上这句
export function request(config){
	const instance = axios.create({
		baseURL: 'http://cloud-music.pl-fe.cn',
		timeout: 5000
	})
instance.defaults.withCredentials=true;
	return instance(config)
}
// export function request2(config){
// 	const instance = axios.create({
// 		baseURL: 'http://openapi.music.163.com',
// 		timeout: 5000
// 	})
// 	return instance(config)
// }