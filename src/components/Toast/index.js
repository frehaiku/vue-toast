import './index.css'
import template from './template.html'

let entireShift = {
  scale: {
    common: {},
    before: {
      transform: 'scale(0)'
    },
    after: {
      transform: 'scale(1)'
    }
  },

  opacity: {
    common: {},
    before: {
      display: 'none',
      opacity: 0
    },
    after: {
      display: 'block',
      opacity: 1
    }
  }
}

const posShift = {
  'bottom middle': {
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)'
  },

  'top middle': {
    top: '10%',
    left: '50%',
    transform: 'translateX(-50%)'
  },
}

export default {
  template: template,
  props: {

    /**
     *  toast content
     */
    message: {
      type: String,
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
      default: function () {
        return {
          onHide: function () {
          },
          onShow: function () {
          }
        }
      }
    }
  },
  /**
   *  Toast inline style
   */
  computed: {
    toaststyle () {
      return Object.assign({}, this.styleHandler(this.show))
    }
  },

  data () {
    return {
      show: false
    }
  },

  methods: {
    styleHandler (isShow) {
      const posConf = this.position,
        animateConf = this.animate

      let config = entireShift[animateConf]
      config.common = posShift[posConf]

      function _concatAttr(needAttr, goalAttr, obj) {

        for (var need in obj[needAttr]) {
          const nonceNeed = obj[needAttr][need]
          const goal = obj[goalAttr]
          const nonceGoal = goal[need]
          if (need === 'transform' &&
            need in goal) {
            console.log(`${nonceGoal} ${nonceNeed}`)
            // remove extra same property
            obj[goalAttr][need] = `${nonceGoal} ${nonceNeed}`.replace(/\b([^\s]+)\s+\1/, '$1')
            console.log(obj[goalAttr][need])

          } else {
            obj[goalAttr][need] = nonceNeed
          }
        }
      }

      const goalAttr = isShow ? 'after' : 'before'
      _concatAttr(
        'common',
        goalAttr,
        config
      )

      return config[goalAttr]
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

  destroyed () {
    this._clearTime()
  }
}