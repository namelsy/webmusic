const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
		resolve: {
			alias: {
				'assets': '@/assets',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views'
			}
		},
		plugins: [
			ComponentsPlugin({
				resolvers: [VantResolver()],
			}),
		],
		devServer: {
			proxy: {
				'^/api': {
					target: 'http://cloud-music.pl-fe.cn',
					pathRewrite:{'^/api': ''},
					ws: true,
					changeOrigin: true
				}
			}
		}
	},
	
})
