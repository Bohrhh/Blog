# The Height Enigma

One of the most perplexing things in CSS is the behaviour of percentage-based heights.

## The Mystery

Sometimes, setting `height: 100%` has no effect Understanding at all!

## the Rule

For percentage height to work, the parent must have an explicit height.

```css
.parent {
  height: 200px; /* Required! */
}

.child {
  height: 50%; /* Now works */
}
```

## Solutions

1. Use explicit heights
2. Use Viewport units
3. Use flexbox/grid

## Conclusion

Now you understand!
