#项目初始化安装
***
## 1、安装所需要的依赖
```
npm install

```

## 2、运行指令
```
npm run dev

```

## 3、开发
输入网址：<br>
   http://localhost:3000/
   http://localhost:3000/index.html
   http://localhost:3000/list.html
   http://localhost:3000/about.html

## 4、编译打包
```
npm run build

```

## 5、知识点总结

### 1.CssSprites与Base64编码　　


#### 使用CssSprites合并为一张大图：

	页面具有多种风格，需要换肤功能，可使用CssSprites
	网站已经趋于完美，不会再三天两头的改动（例如button大小、颜色等）
	使用时无需重复图形内容
	没有base64编码成本，降低图片更新的维护难度。（但注意Sprites同时修改css和图片某些时候可能造成负担）

#### 使用base64直接把图片编码成字符串写入CSS文件：

	无额外请求
	对于极小或者极简单图片
	可以被gzip。（通过gzip对base64数据的压缩能力通常和图片文件差不多或者更强）
	降低css维护难度
	可像单独图片一样使用，比如背景图片重复使用等
	没有跨域问题，无需考虑缓存、文件头或者cookies问题
   
 
### 2.

## 6.问题
	1. CssSprites未解决  gulp 或者是 sprite-loader 在此项目下使用方案都未能解决

