#!/bin/bash

# Blog 项目启动脚本（生产模式）

echo "🚀 启动 Blog 生产环境..."

# 构建项目
echo "📦 构建项目..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 构建失败"
    exit 1
fi

# 启动生产服务器
echo "🎯 启动 Next.js 生产服务器..."
echo ""
npm run start
