# The Big Gotcha With @starting-style

CSS has been on fire lately, with tons of great new features.

## What is @starting-style?

@starting-style allows us to use CSS transitions for enter animations.

```css
.dialog {
  opacity: 0;
  transition: opacity 0.3s;
}

@starting-style {
  .dialog {
    opacity: 1;
  }
}
```

## Common Pitfalls

Be careful with display transitions - they don't work as expected!

## Conclusion

Use it wisely!
