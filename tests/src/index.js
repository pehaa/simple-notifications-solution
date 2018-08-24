import Notifications from './../../src/index.js'

const defaults = {
    animationInName: 'slidein',
    animationOutSelf: 'slideout 1s',
    animationOutClose: 'fadeout 1s',
    closeButtonSelector: '.delete',
    closeSelfOnClick: true,
    gap: 8,
    delayFunction: (i) => 3 + 2*i,
    topTransition: 'top .75s ease-in-out'
}
const config = {
    closeSelfOnClick: false,
    animationInName: 'slideout',
    animationOutSelf: 'slidein 1s',
    animationOutClose: 'fadeout 1s',
    closeButtonSelector: '.close-me',
    gap: 12,
    delayFunction: (i) => 3*i+4,
    topTransition: 'top 1s ease-in',
    fakeProperty: 'haha'
}
const innerHTML = `<p id="p1" class="notification is-danger" role="alert">Errors happen. And it happened again.<button class="delete" type="button" aria-label="button"></button></p>
  <p id="p2" data-close="self" class="notification is-info" role="alert">You've just found what you were looking for!</p>
  <p id="p3" class="notification is-success" role="alert">You rock! Don't forget it! <button class="delete" type="button" aria-label="button"></button></p>
  <p id="p4" data-close="self" class="notification is-warning" role="alert">Weather warnings for strong winds and rain!</p>
  <p id="p5" data-close="self" class="notifications is-warning" role="alert">Weather warnings for strong winds and rain!</p>
  <div id="div1" data-close="self" class="notification is-warning" role="alert">Weather warnings for strong winds and rain!</div>`

describe('Instance should be', () => {
    let notifs = new Notifications()
    it('defined', () => {
        expect( notifs ).toBeDefined()
    })
})

describe('Initial values should be', () => {
    let notifs = new Notifications()
    Object.keys(defaults).forEach( (el) => {
        if (el !== 'delayFunction') {
            it(`for ${el} - ${defaults[el]}`, () => {
                expect(notifs.options[el]).toEqual(defaults[el])
            })
        } else {
            it( 'for delayFunction - (i) => 3 + 2*i, checked for 0',  () => {
                expect(notifs.options.delayFunction(0)).toEqual(3)
            })
            it( 'for delayFunction - (i) => 3 + 2*i, checked for 1', () => {
                expect(notifs.options.delayFunction(1)).toEqual(5)
            })
        }
    })
})

describe('Initial values should be ', () => {
    let notifs = new Notifications('p', config)
    Object.keys(config).forEach( (el) => {
        if (el === 'fakeProperty') {
            it(`overridden for ${el} - ${config[el]}`, () => {
                expect(notifs.options[el]).not.toBeDefined()
            })
        } else if (el !== 'delayFunction' ) {
            it(`overridden for ${el} - ${config[el]}`, () => {
                expect(notifs.options[el]).toEqual(config[el])
            })
        }
    })
    it( 'overridden for delayFunction - function(t){return 3*t+4}', () => {
        expect(notifs.options.delayFunction(1)).toEqual(7)
    })
    it( 'overridden for delayFunction - function(t){return 3*t+4}', () => {
        expect(notifs.options.delayFunction(0)).toEqual(4)
    })
})

describe('The extendDefaults function should', () => {
    it('be called on creating instance', () => {
        spyOn(Notifications.prototype, 'extendDefaults')
        let notifs = new Notifications()
        expect(notifs.extendDefaults).toHaveBeenCalled()
    })
})

describe('The extendDefaults function should', () => {
    let notifs
    beforeEach( function() {
        spyOn( Notifications.prototype, 'extendDefaults').and.callThrough()
        notifs = new Notifications()
        notifs.extendDefaults(config)
    })
    Object.keys(config).forEach( function(el) {
        if (el !== 'fakeProperty') {
            it(`override the this.options.${el} value`, () => {
                expect(notifs.options[el]).toEqual(config[el])
            })
        } else {
            it('not add the options key that does not exist', () => {
                expect(notifs.options[el]).not.toBeDefined()
            })
        }
    })
})

describe('The init method should', () => {
    let notifs
    beforeEach( () => {
        spyOn( Notifications.prototype, 'onload')
        spyOn( Notifications.prototype, 'onStartHandler')
        notifs = new Notifications()
        notifs.init()
    })
    it('call the onload method', () => {
        expect( notifs.onload ).toHaveBeenCalled()
    })
    it('set the animationstart listener on the document', () => {
        document.dispatchEvent(new Event('animationstart'))
        expect(notifs.onStartHandler).toHaveBeenCalled()
    })
})

describe('The onload method should', () => {
    let notifs
    beforeEach( () => {
        notifs = new Notifications()
    })
    it('call the setTopPositions method', () => {
        spyOn( Notifications.prototype, 'setTopPositions')
        notifs.onload()
        expect(notifs.setTopPositions).toHaveBeenCalled()
    })
    it('call the this.allNotifications', () => {
        spyOn( Notifications.prototype, 'allNotifications').and.returnValue([])
        notifs.onload()
        expect(notifs.allNotifications).toHaveBeenCalled()
    })
    it('call the setNotification method for each notificaton', () => {
        const nots = ['#notif1', '#notif2', '#notif3']
        spyOn( Notifications.prototype, 'allNotifications').and.returnValue(nots)
        spyOn( Notifications.prototype, 'setTopPositions')
        spyOn( Notifications.prototype, 'setNotification')
        notifs.onload()
        expect(notifs.setNotification).toHaveBeenCalled()
        expect(notifs.setNotification.calls.count()).toEqual(nots.length)
        expect(notifs.setNotification.calls.allArgs()).toEqual([['#notif1','0.5s'],['#notif2','1.5s'],['#notif3','2.5s']])
    })
    it('not call the setNotification if there is no notifications', () => {
        let nots = []
        spyOn( Notifications.prototype, 'allNotifications').and.returnValue(nots)
        spyOn( Notifications.prototype, 'setTopPositions')
        spyOn( Notifications.prototype, 'setNotification')
        notifs.onload()
        expect(notifs.setNotification).not.toHaveBeenCalled()
    })
})

describe('the allNotifications method should', () => {
    let notifs
    beforeEach( function() {
        document.body.innerHTML = innerHTML
        notifs = new Notifications('p.notification')
        notifs.init()
    })
    it('return an array', () => {
        expect(notifs.allNotifications() instanceof Array).toBeTruthy()
    })
    it('of length 4', () => {
        expect(notifs.allNotifications().length).toEqual(4)
    })
    it('contain the p.notifications', () => {
        const p1 = document.getElementById('p1')
        const p2 = document.getElementById('p2')
        const p3 = document.getElementById('p3')
        const p4 = document.getElementById('p4')
        const p5 = document.getElementById('p5')
        const div1 = document.getElementById('div1')
        expect(notifs.allNotifications().indexOf(p1)).toEqual(0)
        expect(notifs.allNotifications().indexOf(p2)).toEqual(1)
        expect(notifs.allNotifications().indexOf(p3)).toEqual(2)
        expect(notifs.allNotifications().indexOf(p4)).toEqual(3)
        expect(notifs.allNotifications().indexOf(div1)).toEqual(-1)
        expect(notifs.allNotifications().indexOf(p5)).toEqual(-1)
    })
})

describe('the setNotification method should', () => {
    let notifs, el
    beforeEach( () => {
        document.body.innerHTML = innerHTML
        notifs = new Notifications('.notification')
        notifs.options.topTransition = 'top 0.75s ease-in-out 0s'
        spyOn(Notifications.prototype, 'setListeners')
        notifs.setNotification(notifs.allNotifications()[0], '0.5s')
        el = notifs.allNotifications()[0]
    })
    it('set attribute data-notification to active', () => {
        expect(el.getAttribute('data-notification')).toEqual('active')
    })
    it('set animation delay to 0.5s', () => {
        expect(getComputedStyle(el)['animation-delay']).toEqual('0.5s')
    })
    it('set top transition style to options.topTransition', () => {
        expect(getComputedStyle(el)['transition']).toEqual(notifs.options.topTransition)
    })
    it('call setListeners method', () => {
        expect(notifs.setListeners).toHaveBeenCalled()
        expect(notifs.setListeners).toHaveBeenCalledWith(el)
    })
})
describe('the setNotification method should', () => {
    it('skip setting delay if not specified', () => {
        document.body.innerHTML = innerHTML
        let notifs = new Notifications('.notification')
        notifs.options.topTransition = 'top 0.75s ease-in-out 0s'
        spyOn(Notifications.prototype, 'setListeners')
        let el = notifs.allNotifications()[0]
        el.style.animationDelay = '-123s'
        notifs.setNotification(el)
        expect(getComputedStyle(el)['animation-delay']).toEqual('-123s')
    })
})

describe('the isSelfClosing method should', () => {
    let notifs, el
    beforeEach( function() {
        notifs = new Notifications('.notification')
        el = document.createElement('p')
    })
    it('return true if data-close attribute is self', () => {
        el.setAttribute('data-close','self')
        expect( notifs.isSelfClosing(el) ).toBeTruthy()
    })
    it('and false otherwise', () => {
        expect( notifs.isSelfClosing(el) ).toBeFalsy()
        el.setAttribute('data-close','something')
        expect( notifs.isSelfClosing(el) ).toBeFalsy()
    })
})

describe('the needsActivation method should', () => {
    let notifs, el
    beforeEach( function() {
        el = document.createElement('p')
        notifs = new Notifications('p')
    })
    it('return false if data-notification attribute is active', () => {
        el.setAttribute('data-notification','active')
        expect( notifs.needsActivation(el) ).toBeFalsy()
    })
    it('or if it is not a notification', () => {
        spyOn(Notifications.prototype, 'isNotification').and.returnValue(false)
        expect( notifs.needsActivation(el) ).toBeFalsy()
    })
    it('and true otherwise', () => {
        spyOn(Notifications.prototype, 'isNotification').and.returnValue(true)
        expect( notifs.needsActivation(el) ).toBeTruthy()
        el.setAttribute('data-notification','something')
        expect( notifs.needsActivation(el) ).toBeTruthy()
    })
})

describe('the isNotification method should', () => {
    let el, notifs
    beforeEach( () => {
        el = document.createElement('p')
        spyOn(Notifications.prototype, 'allNotifications').and.returnValue([el,'sth', 'sth'])
        notifs = new Notifications('p')
    })
    it('return true if element is in allNotifications array', () => {
        notifs = new Notifications('p')
        expect(notifs.isNotification(el)).toBeTruthy()
    })
    it('return false otherwise', () => {
        const el1 = document.createElement('p')
        expect(notifs.isNotification(el1)).toBeFalsy()
    })
})

describe('the onStartHandler method should', () => {
    let notifs
    it('call the needsActivation method (check if the event target needs Activation)', () => {
        spyOn( Notifications.prototype, 'needsActivation' )
        const el = document.createElement('p')
        document.querySelector('body').appendChild(el)
        const e = new Event('animationstart')
        el.dispatchEvent(e)
        notifs = new Notifications('p')
        notifs.onStartHandler(e)
        expect(notifs.needsActivation).toHaveBeenCalled()
        expect(notifs.needsActivation).toHaveBeenCalledWith(el)
    })
    it('call the setTopPositions if the event target needs activation', () => {
        spyOn( Notifications.prototype, 'needsActivation' ).and.returnValue(true)
        spyOn( Notifications.prototype, 'setTopPositions' )
        const el = document.createElement('p')
        document.querySelector('body').appendChild(el)
        const e = new Event('animationstart')
        el.dispatchEvent(e)
        notifs = new Notifications('p')
        notifs.onStartHandler(e)
        expect(notifs.setTopPositions).toHaveBeenCalled()
    })
    it('call the setNotification if the event target needs activation', () => {
        spyOn( Notifications.prototype, 'needsActivation' ).and.returnValue(true)
        spyOn( Notifications.prototype, 'setNotification' )
        const el = document.createElement('p')
        document.querySelector('body').appendChild(el)
        const e = new Event('animationstart')
        el.dispatchEvent(e)
        notifs = new Notifications('p')
        notifs.onStartHandler(e)
        expect(notifs.setNotification).toHaveBeenCalled()
        expect(notifs.setNotification).toHaveBeenCalledWith(el)
    })
})


describe('the setTopPositions method', () => {
    let notifs
    beforeEach( () => {
        document.body.innerHTML = `<p class="notification is-danger" role="alert"></p>
      <p data-close="self" class="notification is-info" role="alert"></p>
      <p class="notification is-success" role="alert"></p>
      <p data-close="self" class="notification is-warning" role="alert"></p>
      <div data-close="self" class="notification is-warning" role="alert"></div>
      <p data-close="self" class="notifications is-warning" role="alert"></p>`
        notifs = new Notifications('p.notification')
    })
    it('should set top style attribute', () => {
        notifs.setTopPositions()
        notifs.allNotifications().forEach((el, i) => {
            expect(getComputedStyle(el).top).toEqual(`${(notifs.options.gap*(i+1))}px`)
        })
        notifs.allNotifications().forEach((el) => {
            el.style.height = '20px'
        })
        notifs.setTopPositions()
        notifs.allNotifications().forEach((el, i) => {
            expect(parseInt(getComputedStyle(el).top)).toEqual(20*i+8*(i+1))
        })
    })
    it('call the addExitAnimation on elements that needs resume', () => {
        spyOn(Notifications.prototype, 'needsResume').and.callFake( function( el ){
            return notifs.allNotifications().indexOf(el) < 2
        })
        spyOn(Notifications.prototype, 'addExitAnimation')
        notifs.setTopPositions()
        expect( notifs.addExitAnimation).toHaveBeenCalled()
        expect( notifs.addExitAnimation).toHaveBeenCalledWith(notifs.allNotifications()[0])
        expect( notifs.addExitAnimation).toHaveBeenCalledWith(notifs.allNotifications()[1])
        expect( notifs.addExitAnimation).not.toHaveBeenCalledWith(notifs.allNotifications()[2])
    })
})

describe('the inView method should', () => {
    let notifs = new Notifications('p')
    const h = window.innerHeight
    let el
    beforeEach( function() {
        el = document.createElement('p')
        document.querySelector('body').appendChild(el)
    })
    it('return false if an element is not visible', () => {
        el.style.top = `${h+40}px`
        expect(notifs.inView(el)).toBeFalsy()
    })
    it('and true otherwise', () => {
        el.style.top = 0
        expect(notifs.inView(el)).toBeTruthy()
    })
})

describe('the isPaused method should', () => {
    let notifs = new Notifications('p')
    let el
    beforeEach( function() {
        el = document.createElement('p')
        document.querySelector('body').appendChild(el)
    })
    it('return true if an element has attribute data-paused true', () => {
        el.setAttribute('data-paused', true)
        expect(notifs.isPaused(el)).toBeTruthy()
    })
    it('and false otherwise', () => {
        expect(notifs.isPaused(el)).toBeFalsy()
        el.setAttribute('data-paused', 'sth')
        expect(notifs.isPaused(el)).toBeFalsy()
    })
})

describe('the needsResume method should', () => {
    let notifs
    beforeEach( () => {
        notifs = new Notifications()
    })
    it('return false if inView is false and isPaused is false', () => {
        spyOn(Notifications.prototype, 'inView').and.returnValue(false)
        spyOn(Notifications.prototype, 'isPaused').and.returnValue(false)
        expect(notifs.needsResume()).toBeFalsy()
    })
    it('return false if inView is false and isPaused is true', () => {
        spyOn(Notifications.prototype, 'inView').and.returnValue(false)
        spyOn(Notifications.prototype, 'isPaused').and.returnValue(true)
        expect(notifs.needsResume()).toBeFalsy()
    })
    it('return false if inView is true and is Paused returns false', () => {
        spyOn(Notifications.prototype, 'inView').and.returnValue(true)
        spyOn(Notifications.prototype, 'isPaused').and.returnValue(false)

        expect(notifs.needsResume()).toBeFalsy()
    })
    it('return true if both inView and isPaused are true', () => {
        spyOn(Notifications.prototype, 'isPaused').and.returnValue(true)
        spyOn(Notifications.prototype, 'inView').and.returnValue(true)
        expect(notifs.needsResume()).toBeTruthy()
    })
})
describe('the setListeners method should', () => {
    let notifs
    it('add animationend listener to the element', () => {
        notifs = new Notifications('p')
        const el = document.createElement('p')
        document.querySelector('body').appendChild(el)
        const animationend = new Event('animationend')
        spyOn( Notifications.prototype, 'removeMe')
        notifs.setListeners(el)
        el.dispatchEvent(animationend)
        expect(notifs.removeMe).toHaveBeenCalled()
        expect(notifs.removeMe).toHaveBeenCalledWith(animationend)
    })
    it('add click listener to the element if self-closing', () => {
        const el = document.createElement('p')
        el.setAttribute('data-close', 'self')
        document.querySelector('body').appendChild(el)
        const click = new Event('click')
        spyOn( Notifications.prototype, 'close')
        notifs = new Notifications('p')
        notifs.setListeners(el)
        el.dispatchEvent(click)
        expect(notifs.close).toHaveBeenCalled()
        expect(notifs.close).toHaveBeenCalledWith(click)
    })
    it('not add click listener to the element if not self-closing', () => {
        const el = document.createElement('p')
        document.querySelector('body').appendChild(el)
        const click = new Event('click')
        spyOn( Notifications.prototype, 'close')
        notifs = new Notifications('p')
        notifs.setListeners(el)
        el.dispatchEvent(click)
        expect(notifs.close).not.toHaveBeenCalled()
    })
    it('not add click listener to the element if self-closing but disabled by option', () => {
        const el = document.createElement('p')
        el.setAttribute('data-close', 'self')
        document.querySelector('body').appendChild(el)
        const click = new Event('click')
        spyOn( Notifications.prototype, 'close')
        notifs = new Notifications('p', {closeSelfOnClick: false})
        notifs.setListeners(el)
        el.dispatchEvent(click)
        expect(notifs.close).not.toHaveBeenCalled()
    })
    it('add click listener to the delete button', () => {
        const el = document.createElement('p')
        const button = document.createElement('button')
        button.classList.add('delete')
        el.appendChild(button)
        document.querySelector('body').appendChild(el)
        const click = new Event('click')
        spyOn( Notifications.prototype, 'close')
        notifs = new Notifications('p')
        notifs.setListeners(el)
        button.dispatchEvent(click)

        expect(notifs.close).toHaveBeenCalled()
        expect(notifs.close).toHaveBeenCalledWith(click)
    })
})

describe('the close method should', () => {
    let notifs
    it('add animation to the element if is notification', () => {
        let el = document.createElement('p')
        el.setAttribute('data-close', 'self')
        document.querySelector('body').appendChild(el)
        notifs = new Notifications('p')
        notifs.setListeners(el)
        let click = new Event('click')
        el.dispatchEvent(click)
        expect(getComputedStyle(el).animation).toContain(notifs.options.animationOutClose)
    })
    it('add animation to the element parent if is delete button', () => {
        let el = document.createElement('p')
        document.querySelector('body').appendChild(el)
        let button = document.createElement('button')
        button.classList.add('delete')
        el.appendChild(button)
        notifs = new Notifications('p')
        notifs.setListeners(el)
        let click = new Event('click')
        button.dispatchEvent(click)
        expect(getComputedStyle(el).animation).toContain(notifs.options.animationOutClose)
    })
    it('add animation to the element parent if is delete button', () => {
        let el = document.createElement('p')
        document.querySelector('body').appendChild(el)
        let button = document.createElement('button')
        button.classList.add('delete')
        let icon = document.createElement('i')
        button.appendChild(icon)
        el.appendChild(button)
        notifs = new Notifications('p')
        notifs.setListeners(el)
        let click = new Event('click', {bubbles:true} )
        icon.dispatchEvent(click)
        expect(getComputedStyle(el).animation).toContain(notifs.options.animationOutClose)
    })
})

describe('the removeMe method should', () => {
    let notifs, el
    beforeEach( function() {
        el = document.createElement('p')
        el.setAttribute('id', 'id1')
        document.querySelector('body').appendChild(el)
        spyOn(Notifications.prototype, 'setListeners').and.callFake( (el) => {
            el.addEventListener('animationend', (e) => { notifs.removeMe(e) })
        })
    })
    afterEach( function() {
        document.querySelector('body').innerHTML = ''
    })
    it('remove the element from the DOM if the animation is animationOutClose and call the setTopPositions method', () => {
        notifs = new Notifications('p')
        let animationend = new AnimationEvent('animationend', {animationName: 'fadeout'})
        spyOn(Notifications.prototype, 'setTopPositions')
        notifs.setListeners(el)
        el.dispatchEvent(animationend)
        expect(document.getElementById('id1')).toEqual(null)
        expect(notifs.setTopPositions).toHaveBeenCalled()
    })
    it('remove the element from the DOM if the animation is animationOutSelf and call the setTopPositions method', () => {
        notifs = new Notifications('p')
        let animationend = new AnimationEvent('animationend', {animationName: 'slideout'})
        spyOn(Notifications.prototype, 'setTopPositions')
        notifs.setListeners(el)
        el.dispatchEvent(animationend)
        expect(document.getElementById('id1')).toEqual(null)
        expect(notifs.setTopPositions).toHaveBeenCalled()
    })
    it('remove the element from the DOM if the animation animationOutSelf and call the setTopPositions method', () => {
        notifs = new Notifications('p')
        let animationend = new AnimationEvent('animationend', {animationName: 'slideout'})
        spyOn(Notifications.prototype, 'setTopPositions')
        notifs.setListeners(el)
        el.dispatchEvent(animationend)
        expect(document.getElementById('id1')).toEqual(null)
        expect(notifs.setTopPositions).toHaveBeenCalled()
    })

    it('not remove the element from the DOM if the animation is animationInName" ', () => {
        notifs = new Notifications('p')
        let animationend = new AnimationEvent('animationend', {animationName: 'slidein'})
        spyOn(Notifications.prototype, 'addExitAnimation')
        notifs.setListeners(el)
        el.dispatchEvent(animationend)
        expect(document.getElementById('id1')).toEqual(el)
        expect(notifs.addExitAnimation).not.toHaveBeenCalled()
    })

    it('do none of these if the animation is somethingelse" ', () => {
        notifs = new Notifications('p')
        let animationend = new AnimationEvent('animationend', {animationName: 'sth'})
        spyOn(Notifications.prototype, 'addExitAnimation')
        spyOn(Notifications.prototype, 'setTopPositions')
        notifs.setListeners(el)
        el.dispatchEvent(animationend)
        expect(document.getElementById('id1')).toEqual(el)
        expect(notifs.addExitAnimation).not.toHaveBeenCalled()
        expect(notifs.setTopPositions).not.toHaveBeenCalled()
    })

    it('not remove the element from the DOM if the animation is animationInName and call the addExitAnimation method" ', () => {
        el.setAttribute('id', 'id2')
        el.setAttribute('data-close', 'self')
        notifs = new Notifications('p')
        let animationend = new AnimationEvent('animationend', {animationName: notifs.options.animationInName})
        spyOn(Notifications.prototype, 'addExitAnimation')
        notifs.setListeners(el)
        el.dispatchEvent(animationend)
        expect(document.getElementById('id2')).toEqual(el)
        expect(notifs.addExitAnimation).toHaveBeenCalled()
        expect(notifs.addExitAnimation).toHaveBeenCalledWith(el)
    })
})

describe('the addExitAnimation method should', () => {
    let notifs
    it('call the inView method', () => {
        spyOn(Notifications.prototype, 'inView')
        let el = document.createElement('p')
        notifs = new Notifications('p')
        notifs.addExitAnimation(el)
        expect(notifs.inView).toHaveBeenCalled()
        expect(notifs.inView).toHaveBeenCalledWith(el)
    })
    it('if not inview set attribute data-paused true', () => {
        spyOn(Notifications.prototype, 'inView').and.returnValue(false)
        let el = document.createElement('p')
        notifs = new Notifications('p')
        notifs.addExitAnimation(el)
        expect(el.getAttribute('data-paused')).toEqual('true')
    })
    it('if inview set attribute data-paused false and add animationOutSelf animation', () => {
        spyOn(Notifications.prototype, 'inView').and.returnValue(true)
        let el = document.createElement('p')
        document.querySelector('body').appendChild(el)
        notifs = new Notifications('p')
        notifs.addExitAnimation(el)
        expect(el.getAttribute('data-paused')).toEqual('false')
        expect(getComputedStyle(el).animation).toContain(notifs.options.animationOutSelf)
    })
    it('if inview set delays depending on the order in allNotifications', () => {
        spyOn(Notifications.prototype, 'inView').and.returnValue(true)
        document.body.innerHTML = innerHTML
        notifs = new Notifications('p.notification')
        notifs.allNotifications().forEach((element, i) => {
            notifs.addExitAnimation(element)
            expect(getComputedStyle(element).animationDelay).toEqual(`${notifs.options.delayFunction(i)}s`)
        })
    })
})
