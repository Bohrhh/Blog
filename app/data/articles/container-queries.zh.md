# 容器查询详解

容器查询扩展了可实现设计的领域，赋予我们全新的超能力。

## 什么是容器查询？

与响应视口的媒体查询不同，容器查询响应其父容器。

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

## 结论

今天就开始使用容器查询吧！
