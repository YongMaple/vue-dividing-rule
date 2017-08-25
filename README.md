### Vue刻度尺组件

![](http://okmneu7zl.bkt.clouddn.com/WX20170825-135711@2x.png)

##### 安装

```bash
npm install --save vue-dividing-rule
```

##### 参数

参数名 | 类型 |  缺省值 | 可选值 | 说明
---|---|---|---|---
min | Number | 0 | | 可选的最小值
max | Number | 150 | | 可选的最大值
interval | Number | 10 | | 每个大区间的间隔
color | String | '#f00' | | 指针的颜色
value | Number | 传入的最小值 | 在最小值与最大值之间的值 | 初始值

##### 示例

基本使用

```
<template>
...
    <vue-dividing-rule v-model="value"></vue-dividing-rule>
...
</template>
<script>
import VueDividingRule from 'vue-dividing-rule'
export default {
    data() {
        return {
            value: 20
        }
    },
    components: {
        VueDividingRule
    }
}
```

传入配置参数

```
<vue-dividing-rule
    v-model="value"
    :min="50"
    :max="120"
    :interval="5"
    color="blue"
    ></vue-dividing-rule>
```
