# Brand New Layouts with CSS Subgrid

Subgrid is one of the most exciting CSS features to land in recent years. It allows child elements to inherit their parent grid's track sizing, creating powerful layout possibilities.

## What is Subgrid?

When you create a CSS Grid layout, by default the grid items only participate in the grid's column or row tracks. With subgrid, child elements can align with the parent grid's tracks.

```css
.parent {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.child {
  display: grid;
  grid-column: span 3;
  grid-template-columns: subgrid;
}
```

```python
import os
import json
```

## Browser Support

Subgrid is now supported in all major browsers, making it safe to use in production.

## Conclusion

Subgrid opens up new possibilities for component-based design systems. Start using it today!
