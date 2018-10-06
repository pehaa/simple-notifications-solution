![Travis (.org)](https://img.shields.io/travis/pehaa/simple-notifications-solution.svg?style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/pehaa/simple-notifications-solution.svg?style=for-the-badge)
![Github file size](https://img.shields.io/github/size/pehaa/simple-notifications-solution/dist/Notifications.js.svg?style=for-the-badge)

# Simple Notifications Solution

## A simple solution for notifications.

It provides a simple notifications system with two kinds of possible behavior.

Some notifications should **close themselves** without any action from the user. 

Some **require clicking** on the close button. 

All closed notifications should be removed from the DOM. The notifications may be on the page when it loads or may be added at any other moment.

It does not use any JavaScript library. The demo uses [BULMA css framework](https://bulma.io).

### Demo
You can find [the demo here](https://pepsized.com/wp-content/uploads/2018/08/index.html).

## How?

The script uses the ``` animationstart``` listener for the dynamically added notifications.

## Installation

The ```dist``` folder contains the ready for production minified files: ```Notifications.js``` and ```Notifications.css```
```html
<head>
  ...
  <link rel="stylesheet" href="dist/Notifications.css">
  <style>
    /* override styles here */
  </style>
</head>
<body>
  <p class="notification" data-close="self">Self-closing notification</p>
  <p class="notification">
    This one needs user's action.
    <button class="delete" type="button">Close</button>
  </p>
  <!-- Bottom of body -->
  <script src="dist/Notifications.js"></script>
  <script>
    var notifications = new Notifications(".notification");
    notifications.init();
  </script>
</body>
```

You can also use the cdn solution
```html
<head>
  ...
  <link rel="stylesheet" href="https://unpkg.com/simple-notifications-solution/dist/Notifications.css">
  <style>
    /* override styles here */
  </style>
</head>
<body>
  <p class="notification" data-close="self">Self-closing notification</p>
  <p class="notification">
    This one needs user's action.
    <button class="delete" type="button">Close</button>
  </p>
  <!-- Bottom of body -->
  <script src="https://unpkg.com/simple-notifications-solution/dist/Notifications.js"></script>
  <script>
    var notifications = new Notifications(".notification");
    notifications.init();
  </script>
</body>
```


#### npm:
```bash
npm install simple-notifications-solution
```

## Usage:

The recommended markups for a notification are like that:

```html
<!-- self closing notification -->
<p class="notification" data-close="self">Self-closing notification</p>
<!-- or -->
<div class="notification" data-close="self">Self-closing notification</div>
<!-- notification with close button -->
<p class="notification">
  This one needs user's action.
  <button class="delete" type="button" >Close</button>
</p>
<!-- or -->
<div class="notification">
  This one needs user's action.
  <button class="delete"  type="button" aria-label="Close">Close</button>
</div>
```
You have to use the ```notification``` class since it's used in the .css file.
You need to add the ```data-close="self"``` attribute to your notification if you want it to close automatically.

To activate the notifications add the following:
```js
var notifications = new Notifications();
notifications.init();
```
You can check it on Codepen [here.](https://codepen.io/pehaa/pen/yxeoXq/)

### Customization

You can initiate Notifications with some options, the available options are:
```js
{
  // the animation-name for the 'in' animation - you will need to modify the .notification in your css accordingly
  animationInName: 'slidein',
  // the animation-name for the self-closing notifications - you will have to add the @keyframes declaration in your css
  animationOutSelf: 'slideout 1s',
  // the animation-name for animation used to remove the notification on click - you will have to add the @keyframes declaration in your css
  animationOutClose: 'fadeout 1s',
  // the selector for the closing element
  closeButtonSelector: '.delete',
  // whether you can also close the self-closing notification by clicking on it
  closeSelfOnClick: true,
  // the vertical distance from the top of the viewport
  topStartPosition: 8,
  // the vertical gap between the notifications as they appear on the screen
  gap: 8,
  // the waiting time before removing a notification, i - is the number of notifications before the current one
  delayFunction: (i) => 3 + 2*i,
  // the transition used when a notification moves up
  topTransition: 'top .75s ease-in-out'
}
```
#### Example:

```html
<style>
@keyframes scaleup {
  0% {
    transform: scale(1)
  }
  100% {
    transform: scale(3);
    opacity: 0
  }
}

@keyframes scaledown {
  0% {
    transform: scale(1)
  }
  100% {
    transform: scale(0);
    opacity: 0
  }
}
</style>
<script>
var options = {
  animationOutSelf: 'scaleup 1s',
  animationOutClose: 'scaledown 0.5s',
  delayFunction: function(i){return i+1}
}
var notifications = new Notifications(".notification", options);
notifications.init();
</script>

```
A Codepen demo is available [here.](https://codepen.io/pehaa/pen/aadymx)


```html
<style>
.notification {
  animation-name: fadein;
  animation-duration: 1s;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
<script>
var notifications = new Notifications(".notification", {animationInName: "fadein"});
notifications.init();
</script>
```
A Codepen demo is available [here.](https://codepen.io/pehaa/pen/wEMqdq)
