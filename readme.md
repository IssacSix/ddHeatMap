# ddHeatMap

*绘制热力图小工具*



## 功能

帮你实现热力图的绘制 👍



## API

**HeatMap：父类**

| API              | 说明         |
| ---------------- | ------------ |
| HeatMap.create() | 创建唯一实例 |



**heatMap：实例**

| API                  | 参数格式                       | 是否可为空 | 说明                    |
| -------------------- | ------------------------------ | ---------- | ----------------------- |
| heatMap.setData()    | object<br>{data: { yourData }} | 是         | 填入数据                |
| heatMap.addData()    | array<br>[{ x,y,value }]       | 是         | 增加原点数              |
| heatMap.clearMap()   | /                              | 是         | 清空 map                |
| heatMap.repaintMap() | /                              | 是         | 重绘，缓存历史所有 data |



## Quick start

1. 下载包

   ```
   npm install ddHeatMap -S
   ```

2. 引入

   ```
   const HeatMap = require('ddHeatMap')
   ```

3. 在你的文件中，创建画布

   tip: 因为考虑一般情况下只需要一个map，因此本方法采用单例模式，创建唯一原型，直接调用 HeatMap 上的静态方法 create，传入你所需要的参数，创建你的 heatmap 吧

   ```js
   const heatmap = HeatMap.create({
   	container: document.getElementById('xxx'),
   	max: 100 || max, // 你所需要展示的数字的最大值
   	min: 10 || min, // 你所需要展示的数字的最小值
     radius: 40, // 圆半径
     gradientConfig, // 渐变色带
     width: 800, // 画布宽
     height: 800, // 画布高
   })
   ```

4. 现在，你已经创建了map，但是没有看到彩色的圆圈，因为还未传入data，提供以下测试数据：

   ```js
   heatmap.setData({data: {
   	x: 47,
     y: 80,
     value: 25
   }, {
     x: 143,
     y: 130,
     value: 97
   }, {
     x: 52,
     y: 33,
     value: 71
   }, {
     x: 62,
     y: 70,
     value: 63
   }, {
     x: 463,
     y: 95,
     value: 97
   }, {
     x: 590,
     y: 437,
     value: 34
   }, {
     x: 171,
     y: 254,
     value: 20
   }})
   ```

5. 刷新一下浏览器，就能看到下图所示：

![热力图](https://raw.githubusercontent.com/IssacSix/gitImags/master/20191114/heat.png)