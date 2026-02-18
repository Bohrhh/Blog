# Springs and Bounces in Native CSS

The `linear()` timing function is a game-changer; it allows us to model physics-based motion right in vanilla CSS!

## Understanding linear()

The linear() function allows you to create custom easing that mimics physics-based animations.

```css
.card {
  animation: bounce 0.5s linear(0, 0.5, 0.5, 1.2, 1);
}
```

## Browser Support

This feature is now supported in all major browsers.

## Conclusion

Go forth and animate!
