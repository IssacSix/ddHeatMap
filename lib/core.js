class HeatMap {
  constructor(config) {
    // 定义 canvas 的全局上下文
    this.mapCtx = config.container.getContext('2d')

    // define config
    this.mapConfig = JSON.parse(JSON.stringify(config, (key, value) => {
      if (key === 'container') {
        return void 0
      }
      return value
    }))
  }

  static create = function (args) {
    if (!this.instance) {
      this.instance = new HeatMap(args)
    }

    return this.instance
  }

  static getColorPaint = function (gradientConfig, width = 256, height = 1) {
    let paletteCanvas = document.createElement('canvas')
    let ctx = paletteCanvas.getContext('2d')

    // 定义彩条的尺寸
    paletteCanvas.width = width
    paletteCanvas.height = height

    // 创建一个长256px的线性渐变条
    let gradient = ctx.createLinearGradient(0, 0, width, height)
    for (const key in gradientConfig) {
      gradient.addColorStop(key, gradientConfig[key])
    }

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // 获取像素信息
    return ctx.getImageData(0, 0, width, height).data
  }

  paintPoint(data, radius = this.mapConfig.radius, max = this.mapConfig.max, min = this.mapConfig.min, gradientConfig = this.mapConfig.gradientConfig) {

    data.forEach(data => {

      const { x, y, value } = data
      const { mapCtx: ctx } = this

      // 开始画一些中心向外的灰色圆圈
      ctx.beginPath()
      let alpha = (value - min) / (max - min)
      ctx.globalAlpha = alpha > 1 ? 1 : alpha
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      let gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, 'rgba(0,0,0,1)')
      gradient.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = gradient
      ctx.closePath()

      // 填充渐变颜色
      ctx.fill()

      // 色条映射
      const paletee = HeatMap.getColorPaint(gradientConfig)
      const img = ctx.getImageData(0, 0, 800, 800)
      const imgData = img.data
      const len = imgData.length
      for (let i = 3; i < len; i += 4) {
        let alpha = imgData[i]
        let offset = alpha * 4
        if (!offset) {
          continue
        }

        // 真正映射RGB值
        imgData[i - 3] = paletee[offset]
        imgData[i - 2] = paletee[offset + 1]
        imgData[i - 1] = paletee[offset + 2]
      }
      ctx.putImageData(img, 0, 0, 0, 0, 800, 800)
    })
  }

  setData(dataConfig) {

    const {
      radius,
      gradientConfig,
      max,
      min
    } = this.mapConfig

    const { data } = dataConfig
    this.data = data

    // 先清空画布 => 再画圈
    this.clearMap()

    this.paintPoint(data, radius, max, min, gradientConfig)
  }

  addData(data) {
    this.data.push(data)
    this.paintPoint(data)
  }

  clearMap() {
    const { mapCtx: ctx, mapConfig } = this
    const { width, height } = mapConfig
    ctx.clearRect(0, 0, width, height)
  }

  repaintMap() {
    this.clearMap()
    this.setData({ data: this.data })
  }
}

module.exports = HeatMap