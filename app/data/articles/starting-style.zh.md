# `@starting-style` 的大坑

最近 CSS 迎来了大量精彩的新功能。@starting-style 是一个有趣的新特性。

## 什么是 @starting-style？

@starting-style 允许我们使用 CSS 过渡来实现进入动画。

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

## 常见陷阱

注意 display 过渡——它们的行为可能不如预期！

## 结论

明智地使用它吧！
