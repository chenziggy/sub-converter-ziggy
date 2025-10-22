FROM node:22-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml (如果存在)
COPY package*.json pnpm-lock.yaml* ./

# 安装依赖
RUN pnpm install

# 复制源代码
COPY . .

# 如果有构建步骤，在这里执行构建
# RUN pnpm build

FROM node:22-alpine

WORKDIR /app

# 安装 pnpm 和 nodemon
RUN npm install -g pnpm nodemon

# 从构建阶段复制必要文件
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/package.json ./

# 暴露端口
EXPOSE 25502

# 启动应用
CMD ["nodemon", "src/app.js"]