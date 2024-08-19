# `TextEffect` Class

The `TextEffect` class is a utility for applying animated hover and scroll effects to HTML text elements. It supports creating visual effects on text based on user interactions such as hover and scroll.

## Installation

To use the `TextEffect` class, include the JavaScript file containing the class definition in your project.

1. **Link the effect css file**
    ```html
    <link rel="stylesheet" href="path/to/file/effect.css">
2. **Save the Class to a File**

   Save the `TextEffect` class to a file, e.g., `TextEffect.js`.

2. **Import the Class**

   Import the class into your project where needed:

   ```javascript
   import TextEffect from './TextEffect.js';
## Usage

### Creating an Instance

To use the `TextEffect` class, first, create an instance of the class. Here's a simple example:

    ```javascript
    const textEffect = new TextEffect();


## Applying Hover Effects

To apply a hover effect to an element using the `TextEffect` class, you can use the `inHover` method. 
Here s how you can do it:

    ```javascript
    // Select the element to apply the hover effect
    const text1 = document.querySelector("h1");

    // Apply the hover effect using the inHover method
    textEffect.inHover(text1, {
        hover: true,                // Enable hover effect (default: true)
        transitionSeconds: 0.3,    // Duration of the transition effect in seconds (default: 0.5)
        top: true,                 // Apply effect to the top of the element (default: false)
        delaySeconds: 0.015        // Delay before the effect starts in seconds (default: 0.025)
    });


## Applying Scroll Effects

To apply a scroll effect to an HTML element using the `TextEffect` class, use the `inScroll` method. Here's an example of how to do it:

```javascript
// Select the element to apply the scroll effect
const text2 = document.querySelector("h2");

// Apply the scroll effect using the inScroll method
textEffect.inScroll(text2, {
  isActiveInMiddle: false,   // Activate effect when the element is in the middle of the viewport (default: false)
  isList: false,             // Indicates if the effect applies to a list of elements (default: false)
  transitionSeconds: 0.5,    // Duration of the transition effect in seconds (default: 0.5)
  top: true,                 // Apply effect to the top of the element (default: false)
  delaySeconds: 0.035        // Delay before the effect starts in seconds (default: 0.025)
});
