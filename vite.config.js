import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    plugins: [
      // Vue3单文件组件支持
      vue(),
      // mock数据支持
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        supportTs: false,
      }),
      Components({
        dts: false,
        // 组件按需自动导入
        resolvers: [NaiveUiResolver()],
      }),
      // API自动导入
      AutoImport({
        dts: false,
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          // presets
          'vue',
          'vue-router',
          'pinia',
          {
            '@vueuse/core': ['get'],
            'vue-logger-plugin': ['useLogger'],
            'naive-ui': ['useMessage'],
            lodash: ['_'],
            axios: [['default', 'axios']],
            dayjs: [['default', 'dayjs']],
          },
        ],
        eslintrc: {
          enabled: false,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
    ],
  }
}
