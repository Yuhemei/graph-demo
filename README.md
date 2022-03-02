# umi project

## 环境

node14.15.4+umi3.4.2+react17.x+antd4.x

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 命令行工具

1. `umi g page pageName/index --typescript --less`  

## Mock

### mock添加步骤

1. /mock 下任意文件暴漏模拟数据以及接口  
2. @/util 定义请求方法
3. @/service 创建请求
4. @/models 对请求来的结果进行预处理，通过connect使组件与model层（数据预处理层）建立连接