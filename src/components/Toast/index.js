import './index.css'
import template from './template.html'

let defaultOpt = {
  onHide: function () {},
  onShow: function () {}
}

export default {
  template: template,
  props: {

    /**
     *  toast content
     */
    message: {
      type: String,
      twoWay: true
    },

    /**
     *  'bottom middle'|'top middle'
     */
    position: {
      type: String,
      default: 'bottom middle'
    },

    /**
     *  disappear time
     */
    sustain: {
      type: Number,
      default: 2000
    },

    /**
     * 'opacity' | 'scale'
     */
    animate: {
      type: String,
      default: 'scale'
    },

    options: {
      type: Object,
      coerce (val) {
        return Object.assign({}, defaultOpt, val)
      }
    }
  },
  /**
   *  Toast inline style
   */
  computed: {
    toaststyle () {
      let defaultCss = {
        left: '50%'
      }
      const self = this
      return Object.assign({}, self.styleHandler(self.show, self.animate, self.position), defaultCss)
    }
  },

  data () {
    return {
      show: false
    }
  },

  methods: {
    styleHandler (show, an, pos) {
      let scaleConf = show ? 1 : 0
      // When it is not no-object,the second item of the array is used as the string to be added
      let transform = (an === 'scale')
        ? [`scale(${scaleConf})`, 'transform: translateX(-50%)']
        : {opacity: scaleConf, transform: 'translateX(-50%)'}
      let posConf = (pos === 'bottom middle')
        ? {bottom: '10%'}
        : {top: '10%'}

      // To deal with the scale add to transition
      let transformObj = {}

      const toStr = Object.prototype.toString
      if (toStr.call(transform) === '[object Array]') {
        let link = `${transform[1]} ${transform[0]}`.split(':')
        transformObj[link[0]] = link[1]
      } else {
        transformObj = Object.assign({}, transform)
      }

      return Object.assign({}, transformObj, posConf)
    },
    showMessage (txt = '') {
      this.options.onShow()

      txt ? (this.message = txt) : null
      this.show = true
      this._disappear()
    },

    _disappear () {
      this._clearTime()
      // Plus the transtion's duration to extend the disappearance of the time
      let duration = document.defaultView.getComputedStyle(this.$el, null)
        .getPropertyValue('transition-duration')

      this.timeRemain = setTimeout(() => {
        this.options.onHide()

        this.show = false
      }, this.sustain + parseFloat(duration) * 1000)
    },

    _clearTime () {
      if (this.timeRemain) {
        clearTimeout(this.timeRemain)
      }
    }
  },

  detached () {
    this._clearTime()
  }
}
