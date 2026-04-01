# CSS Subgrid 带来的全新布局方式

Subgrid 是近年来最受期待的 CSS 功能之一。它允许子元素继承父网格的轨道大小，创造出强大的布局可能性。

## 什么是 Subgrid？

当你创建一个 CSS Grid 布局时，默认情况下网格项只参与网格的列或行轨道。有了 subgrid，子元素可以与父网格的轨道对齐。

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

## 浏览器支持

Subgrid 现在已被所有主流浏览器支持，可以安全地在生产环境中使用。

## 结论

Subgrid 为基于组件的设计系统开辟了新的可能性。从今天开始使用它吧！
