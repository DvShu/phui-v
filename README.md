# phui-v

基于 `vue3` 的 `UI` 组件库。

## 自动引入

使用 [Vite](https://cn.vitejs.dev/) + [unplugin-vue-components](https://www.npmjs.com/package/unplugin-vue-components) + [phui-vue-resolver](https://www.npmjs.com/package/phui-vue-resolver) 搭配实现

在 `vite.config.ts` 中添加如下代码：

```javascript
import Components from 'unplugin-vue-components/vite'
import PhuiResolver from 'phui-vue-resolver'

export default defineConfig({
  ...
  plugins: [
    ...
    Components({
      dts: './src/components.d.ts',
      resolvers: [PhuiResolver()],
    })
  ]
})
```

### 文档地址

[phui-v wiki](https://gitee.com/towardly/phui-v/wikis/Home)
