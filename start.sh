#!/bin/bash

# Blog 项目启动脚本（生产模式）

# 解析参数
BACKGROUND=false
PORT=3000

while [[ $# -gt 0 ]]; do
    case $1 in
        -k|--kill)
            echo "🔪 关闭后台服务..."
            fuser -k $PORT/tcp 2>/dev/null
            lsof -ti:$PORT | xargs kill -9 2>/dev/null
            echo "✅ 端口 $PORT 已释放"
            exit 0
            ;;
        -b|--background)
            BACKGROUND=true
            shift
            ;;
        -p|--port)
            PORT="$2"
            shift 2
            ;;
        -h|--help)
            echo "用法: ./start.sh [选项]"
            echo ""
            echo "选项:"
            echo "  -k, --kill         关闭后台服务"
            echo "  -b, --background    后台运行"
            echo "  -p, --port <端口>  指定端口 (默认: 3000)"
            echo "  -h, --help         显示帮助"
            exit 0
            ;;
        *)
            echo "未知选项: $1"
            exit 1
            ;;
    esac
done

echo "🚀 启动 Blog 生产环境..."
echo "📦 端口: $PORT"

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

if [ "$BACKGROUND" = true ]; then
    echo "🔄 后台运行模式..."
    nohup npm run start -- -p $PORT > blog.log 2>&1 &
    echo "✅ 服务已在后台启动 (PID: $!)"
    echo "📝 日志文件: blog.log"
else
    npm run start -- -p $PORT
fi
