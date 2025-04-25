# kh-region

vue3+el-select 区划地址选择组件， 动态配置级联关系。可以自定义初始区划，支持搜索。可以自定义级联和搜索接口

<img alt="kh-region.gif" src="https://github.com/liang5460/kh-region/blob/main/kh-region.gif" >

## 安装

```bash
  npm i kh-region


  全局注册
  import khRegion from 'kh-region';
  app.use(khRegion);

  局部注册
  import khRegion from 'kh-region';
  export default {
    components: {
      khRegion,
    },
  };


```

## 使用示例

1、在crud中使用 ：(本身不依赖第三方组件,只作在表格中演示)

```vue
<template>
  <avue-crud ref="crud" v-model="form" :option="crudOption" :data="tableData">
    <template #areaName-form="{ disabled, size, column }">
      <kh-region
        :option="column"
        :size="size"
        :disabled="disabled"
        v-model="form.areaName"
        v-model:areaCode="form.areaCode"
      />
    </template>
  </avue-crud>
</template>

<script>
//引入khUpload组件
import khRegion from 'kh-region';

export default {
  components: {
    khRegion,
  },
  data() {
    return {
      form: {},
      tableData: [
        {
          id: 'x11',
          name: '张三',
          sex: '1',
          areaName: '四川省/成都市/锦江区',
          areaCode: '51,5101,510104',
        },
        {
          id: 'x12',
          name: '李四',
          sex: '2',
          areaName: '四川省/绵阳市/经开区',
          areaCode: '51,5107,510714',
        },
      ],
      crudOption: {
        align: 'center',
        menuAlign: 'center',
        column: [
          {
            label: '姓名',
            prop: 'name',
          },
          {
            label: '性别',
            prop: 'sex',
            type: 'select',
            dicData: [
              {
                label: '男',
                value: '1',
              },
              {
                label: '女',
                value: '2',
              },
            ],
          },
          {
            label: '行政区划',
            prop: 'areaName',
            width: '300',
            span: 24,
            props: {
              label: 'name',
              value: 'code',
            },
            dicUrl: '/api/blade-system/region/select',
            searchUrl: '/api/blade-system/region/lazy-list?name=',
            dicQuery: {
              code: '00',
            },
            areaKey: ['province', 'city', 'district'],
            rules: [
              {
                required: true,
                message: '请选择行政区划',
                trigger: 'blur',
              },
            ],
          },
          {
            label: '行政区划code',
            prop: 'areaCode',
            display: false,
            hide: true,
          },
        ],
      },
    };
  },
  methods: {},
};
</script>
```

2、单独使用，不依赖其他组件

```vue
<template>
  <kh-region :option="options" size="large" v-model="obj.name"  v-model:areaCode="obj.code">
</template>

<script>
//引入khUpload组件
import khRegion from 'kh-region';

export default {
  components: {
    khRegion,
  },
  data() {
    return {
      obj: {
        code: '51,5101,510104,510104011,510104011007',
        name: '四川省/成都市/锦江区/沙河街道/双桂路社区',
      },
      options: {
        dicUrl: "/api/blade-system/region/select",
        level: 5,
        areaSpan: 4,
        dicQuery: {
          code: '00',
          aa: '11'
        },
        searchUrl: '/api/blade-system/region/lazy-list?name=',
        areaKey: ['province', 'city', 'district', 'town', 'village'],
        props: {
          label: 'name',
          value: 'code'
        },
      },
  },
  methods: {},
};
</script>
```

## 属性文档

### `Props`

| 参数   | 说明   | 类型   | 默认值 |
| ------ | ------ | ------ | ------ |
| option | 配置项 | Object | {}     |

##### `option`

| 参数 | 说明 | 类型 | 可选值 |

        dicUrl: "/api/blade-system/region/select", //接口地址 ，必传

        level: '3',//暂时没用，非必传

        areaSpan:4, //默认4 ，下拉框，栅格占据的列数

        dicQuery: {
          code: '00' //第一级code值; 必传'code'
          aa:'11'//还可以附加其它参数
        },

        areaKey: ['province', 'city', 'district'],//键名可以任意，级联关系，从左到右 ， 必传

        emptyStyle: ["请选择省份", "请选择城市", "请选择县（区）"],//非必要参数

        areaSearch:true,//是否开启搜索，默认true，非必传

        dicFormatter: (res)=>{return res.data.data} //数据字典接口url返回数据格式化方法

        dicMethod:'get'    //接口请求方式

        dicHeaders:{token:'112233' }     //接口url携带头部参数


        props: {  //非必传
          label: 'name',
          value: 'code'
        },

      }
