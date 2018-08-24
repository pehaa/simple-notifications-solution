export class Notifications {
    constructor (selector, options = {} ) {
        this.selector = selector
        this.options = {
            animationInName: 'slidein',
            animationOutSelf: 'slideout 1s',
            animationOutClose: 'fadeout 1s',
            closeButtonSelector: '.delete',
            closeSelfOnClick: true,
            gap: 8,
            delayFunction: (i) => 3 + 2*i,
            topTransition: 'top .75s ease-in-out'
        }
        this.extendDefaults(options)
    }

    extendDefaults (properties) {
        Object.keys(properties).forEach( (el) => {
            if (this.options.hasOwnProperty(el)) {
                this.options[el] = properties[el]
            }
        })
    }

    init () {
        this.onload()
        document.addEventListener('animationstart', (e) => { this.onStartHandler(e) } )
    }

    onload () {
        this.setTopPositions()
        this.allNotifications().forEach ((el, i) => {
            this.setNotification(el, `${0.5 + i}s`)
        })
    }

    isSelfClosing (el) {
        return el.getAttribute('data-close') === 'self'
    }

    onStartHandler (e) {
        if (this.needsActivation(e.target)) {
            this.setTopPositions()
            this.setNotification(e.target)
        }
    }

    allNotifications () {
        return Array.prototype.slice.call(document.querySelectorAll(this.selector))
    }

    setTopPositions () {
        let startHeight = this.options.gap
        this.allNotifications().forEach( (el) => {
            el.style.top = `${startHeight}px`
            startHeight += el.offsetHeight + this.options.gap
            if (this.needsResume(el)) {
                this.addExitAnimation(el)
            }
        })
    }

    inView (el) {
        return parseInt(getComputedStyle(el)['top']) < window.innerHeight
    }

    isPaused (el) {
        return el.getAttribute('data-paused') === 'true'
    }

    needsResume (el) {
        return this.isPaused(el) && this.inView(el)
    }

    isNotification (el) {
        return this.allNotifications().indexOf(el) > -1
    }

    needsActivation (el) {
        return el.getAttribute('data-notification') !== 'active' && this.isNotification(el)
    }

    setNotification (el, delay = false) {
        if (delay) {
            el.style.animationDelay = delay
        }
        this.setListeners(el)
        el.setAttribute('data-notification', 'active')
        el.style.transition = this.options.topTransition
    }

    setListeners (el) {
        el.addEventListener('animationend', (e) => { this.removeMe(e) })
        let willClose = el.querySelector(this.options.closeButtonSelector)
        if (this.options.closeSelfOnClick && this.isSelfClosing(el)) {
            willClose = willClose || el
        }
        if (willClose) {
            willClose.addEventListener('click', (e) => { this.close(e) })
        }
    }

    close (e) {
        const el = this.isNotification(e.currentTarget) ? e.currentTarget : e.currentTarget.parentNode
        el.style.animation = this.options.animationOutClose
    }

    removeMe (e) {
        const el = e.currentTarget
        if (this.options.animationInName === e.animationName && this.isSelfClosing(el)) {
            this.addExitAnimation(el)
        } else if (this.options.animationOutClose.split(' ').indexOf(e.animationName) > -1 || this.options.animationOutSelf.split(' ').indexOf(e.animationName) > -1) {
            el.parentNode.removeChild(el)
            this.setTopPositions()
        }
    }

    addExitAnimation (el) {
        if (this.inView(el)) {
            el.setAttribute('data-paused', false)
            const delay = this.options.delayFunction(this.allNotifications().indexOf(el), el)
            el.style.animation = this.options.animationOutSelf
            el.style.animationDelay = `${delay}s`
        } else {
            el.setAttribute('data-paused', true)
        }
    }
}
