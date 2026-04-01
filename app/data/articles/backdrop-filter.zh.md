# 使用 `backdrop-filter` 实现高级毛玻璃效果

玻璃质感标题已经成为"酷炫创业公司" UI 工具包的核心部分。

## 基础知识

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}
```

## 专业技巧

添加微妙的边框以增加深度！

```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

## 结论

创造美丽的玻璃效果吧！
