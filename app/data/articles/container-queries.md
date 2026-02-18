# Container Queries Unleashed

Container queries expand the universe of designs that can be implemented.

## What are Container Queries?

Unlike media queries that respond to the viewport, container queries respond to their parent container.

```css
.card-container {
  container-type: inline-size;
}

.card {
  display: grid;
  grid-template-columns: 1fr;
}

@container (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 1fr;
  }
}
```

## Conclusion

Start using container queries today!
