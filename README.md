![Travis (.org)](https://img.shields.io/travis/pehaa/simple-notifications-solution.svg?style=for-the-badge)
![Codecov](https://img.shields.io/codecov/c/github/pehaa/simple-notifications-solution.svg?style=for-the-badge)

# Simple Notifications

## A simple solution for notifications.

It provides a simple notifications system with two kinds of possible behavior.

Some notifications should close themselves without any action from the user. Some require clicking on the close button. All closed notifications should be removed from the DOM. The notifications may be on the page when it loads or may be added at any other moment.

It does not use any JavaScript library. The demo uses BULMA css framework.

## How?

The script uses the animationstart listener for the dynamically added notifications.

In your css you need to set the "in" for your notification, and define the keyframes for the "out" animation.

## Installation

```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="dist/Notifications.css">
  <style>
    /* override styles here */
  </style>
</head>
<body>
  <p class="notification" data-close="self">Self-closing notification</p>
  <p class="notification" data-close="self">This one needs user's action. <button class="delete" aria-label="close"></button></p>
  <!-- Bottom of body -->
  <script src="dist/Notifications.js"></script>
</body>
```

#### npm:
```bash
npm install simple-notifications-solution
```


