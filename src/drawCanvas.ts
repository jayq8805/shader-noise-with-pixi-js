import GradientShader from './glsl/test.frag'
import NoiseShader from './glsl/fractal.frag'
import * as PIXI from 'pixi.js'
import { addStats, Stats } from 'pixi-stats'
import img from './image.png'
import { UPDATE_PRIORITY } from 'pixi.js'
import { AdvancedBloomFilter, KawaseBlurFilter } from 'pixi-filters'

export default class DrawCanvas{
  public Canvas: HTMLCanvasElement
  private width: number
  private height: number
  private Renderer: PIXI.AbstractRenderer
  private App: PIXI.Application
  private container: PIXI.Container
  private Background: PIXI.Sprite
  private Noise: PIXI.Sprite

  constructor (
    canvas: HTMLCanvasElement
  ){
    //事前に必要なものを定義しましょう。
    this.Canvas = canvas
    this.width = window.innerWidth
    this.height = window.innerHeight
    // 軽量化のため、Rendererのみ使うという手もありますが、今回はApplication Classを使います。
    this.App = new PIXI.Application({
      width: this.width,
      height: this.height,
      view: this.Canvas,
      antialias: true,
      backgroundColor: 0x000000,
      backgroundAlpha: 0
    })

    this.App.ticker.maxFPS = 60

    const stats = addStats(document, this.App)

    this.container = new PIXI.Container()
    this.Background = new PIXI.Sprite()
    this.Noise = new PIXI.Sprite()
    
    //Shaderの定義
    var uniforms = {
      u_resolution : new PIXI.Point(this.width, this.height),
      u_time : 0,
    }

    const ShaderFilter = new PIXI.Filter('', GradientShader, uniforms)
    const NoiseFilter = new PIXI.Filter('', NoiseShader, uniforms)

    this.Background.width = this.width
    this.Background.height = this.height
    this.Background.filters=[ShaderFilter]
    this.container.addChild(this.Background)

    this.Noise.width = this.width
    this.Noise.height = this.height
    this.container.addChild(this.Noise)

    const Bloom = new AdvancedBloomFilter()
    const kawaseBlur = new KawaseBlurFilter()
    kawaseBlur.blur = 8
    kawaseBlur.quality = 6
    kawaseBlur.pixelSize = [0, 10]

    this.Noise.filters=[NoiseFilter, kawaseBlur]
    
    this.App.stage.addChild(this.container)
    this.App.ticker.add(stats.update, stats, UPDATE_PRIORITY.UTILITY)
    
    this.App.ticker.add((delta) => {
      ShaderFilter.uniforms.u_time += 0.03 * delta;
    })

    window.addEventListener('resize', this.Resize)
  }

  public Resize = () => {
    this.width = this.Canvas.width
    this.height = this.Canvas.height
  }
  
}