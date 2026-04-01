# 部分关键帧

CSS 关键帧动画比大多数开发者想象的要强大得多。

## 问题所在

传统的关键帧可能很僵硬，难以定制。

## 解决方案

创造性地使用百分比来创建动态动画！

```css
@keyframes slideIn {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
}
```

## 结论

你的关键帧升级了！
