# 🌐 Gin Admin Web

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Vue](https://img.shields.io/badge/Vue-3.5.21-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue.svg)](https://www.typescriptlang.org/)
[![Element Plus](https://img.shields.io/badge/Element%20Plus-2.11.2-409EFF.svg)](https://element-plus.org/)

一个基于 Vue 3 + TypeScript + Element Plus 的现代化、高性能前端管理系统模板，完美适配 [Gin Admin](https://github.com/the-yex/gin-admin) 后端。

**[English](#english-version) | 简体中文**

</div>

---

## 📖 项目简介

Gin Admin Web 是一个开箱即用的企业级前端管理系统模板，专为 [Gin Admin](https://github.com/the-yex/gin-admin) 后端量身打造。本项目改造自优秀的开源项目 [Art Design Pro](https://github.com/Daymychen/art-design-pro)，在此基础上进行了深度定制和优化。

### ✨ 核心特性

- 🎯 **权限联动** - 前端菜单和按钮权限自动根据后端 RBAC 权限组控制
- 🚀 **开箱即用** - 克隆即可运行，无需额外复杂配置
- 💎 **现代化设计** - 流畅的交互动画，专注于用户体验和视觉设计
- 🧩 **丰富组件** - 内置高质量数据展示、表单等组件，满足不同业务场景
- ⚡ **高效开发** - 内置实用 API，如 `useTable`、`ArtForm` 等，显著提升开发效率
- 📱 **响应式设计** - 完美支持多种设备和屏幕尺寸
- 🌍 **国际化支持** - 内置 i18n 支持，轻松实现多语言切换
- 🎨 **主题定制** - 支持深色模式和主题自定义

## 🛠️ 技术栈

### 核心框架
- **[Vue 3](https://vuejs.org/)** - 渐进式 JavaScript 框架
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript 的超集，提供类型安全
- **[Vite](https://vitejs.dev/)** - 下一代前端构建工具
- **[Element Plus](https://element-plus.org/)** - 基于 Vue 3 的组件库
- **[Tailwind CSS](https://tailwindcss.com/)** - 实用优先的 CSS 框架

### 路由与状态管理
- **[Vue Router](https://router.vuejs.org/)** - 官方路由管理器
- **[Pinia](https://pinia.vuejs.org/)** - 新一代状态管理库

### 工具库
- **[Axios](https://axios-http.com/)** - HTTP 客户端
- **[VueUse](https://vueuse.org/)** - 组合式 API 工具集
- **[ECharts](https://echarts.apache.org/)** - 数据可视化图表库
- **[@iconify/vue](https://iconify.design/)** - 图标解决方案

### 代码规范
- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript 代码检查工具
- **[Prettier](https://prettier.io/)** - 代码格式化工具
- **[Stylelint](https://stylelint.io/)** - CSS/SCSS 代码检查工具
- **[Husky](https://typicode.github.io/husky/)** - Git hooks 工具
- **[Commitizen](https://github.com/commitizen/cz-cli)** - 规范化 Git 提交

## 📦 安装与运行

### 环境要求

- **Node.js**: >= 20.19.0
- **pnpm**: >= 8.8.0

### 快速开始

```bash
# 克隆项目
git clone https://github.com/the-yex/gin-admin-web.git
cd gin-admin-web

# 安装依赖
pnpm install

# 如果 pnpm install 失败，尝试使用以下命令
pnpm install --ignore-scripts

# 启动本地开发环境
pnpm dev

# 构建生产环境
pnpm build

# 预览构建产物
pnpm serve
```

### 代码规范检查

```bash
# ESLint 检查
pnpm lint

# ESLint 自动修复
pnpm fix

# Prettier 格式化
pnpm lint:prettier

# Stylelint 检查并修复
pnpm lint:stylelint

# Git 提交（使用 Commitizen）
pnpm commit
```

## 📁 项目结构

```
gin-admin-web/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口定义
│   ├── assets/            # 静态资源（图片、样式等）
│   ├── components/        # 公共组件
│   ├── config/            # 配置文件
│   ├── directives/        # 自定义指令
│   ├── enums/             # 枚举定义
│   ├── hooks/             # 组合式 API
│   ├── locales/           # 国际化语言包
│   ├── mock/              # Mock 数据
│   ├── plugins/           # 插件配置
│   ├── router/            # 路由配置
│   ├── store/             # 状态管理
│   ├── types/             # TypeScript 类型定义
│   ├── utils/             # 工具函数
│   ├── views/             # 页面组件
│   ├── App.vue            # 根组件
│   └── main.ts            # 入口文件
├── .env                   # 环境变量
├── .env.development       # 开发环境变量
├── .env.production        # 生产环境变量
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript 配置
├── vite.config.ts         # Vite 配置
└── README.md              # 项目说明
```

## 🎯 核心功能

### RBAC 权限系统集成

本项目完美适配 Gin Admin 后端的 RBAC（基于角色的访问控制）权限系统：

- ✅ **动态路由** - 根据用户角色动态生成路由
- ✅ **菜单权限** - 自动控制菜单显示和隐藏
- ✅ **按钮权限** - 细粒度控制页面内按钮的显示
- ✅ **接口权限** - 自动携带认证信息，处理权限异常

### 完整功能模块

- 👤 **用户管理** - 用户增删改查、状态管理
- 👥 **角色管理** - 角色配置、权限分配
- 🔐 **权限管理** - 菜单权限、按钮权限配置
- 📊 **数据看板** - 数据可视化展示
- 📝 **表单管理** - 复杂表单处理
- 📋 **表格管理** - 数据表格展示和操作

## 🎨 配套后端项目

### [🚀 Gin Admin](https://github.com/the-yex/gin-admin)

**技术栈**: Go + Gin + GORM + Redis + JWT

**核心特性**:
- ✅ 企业级 RBAC 权限系统，支持动态路由和权限验证
- ✅ 革命性的路由自动注册机制，告别手动配置路由
- ✅ 完整的用户认证和授权流程（JWT）
- ✅ 强大的中间件生态（CORS、日志、限流等）
- ✅ 开箱即用的 Docker 部署方案

**快速开始**:
```bash
# 克隆后端项目
git clone https://github.com/the-yex/gin-admin.git
cd gin-admin

# 使用 Docker Compose 启动（推荐）
docker-compose up -d

# 或本地运行
make run
```

前后端配合使用，即可获得完整的企业级后台管理系统！🚀

## 🌐 浏览器兼容性

支持现代主流浏览器，包括 Chrome、Safari、Firefox 等。

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| --- | --- | --- | --- |
| Chrome ≥ 87 | Firefox ≥ 78 | Safari ≥ 14 | Edge ≥ 88 |

## 🤝 贡献指南

我们诚挚欢迎和感谢每一位贡献者的支持！无论你有新的想法、功能建议，还是代码优化，都可以通过以下方式参与：

1. **Fork** 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 **Pull Request**

你的每一次贡献，都让这个项目更进一步！快来加入我们的开源社区吧！

## 🙏 致谢

本项目基于以下优秀的开源项目改造而来，在此表示衷心感谢：

- [**Art Design Pro**](https://github.com/Daymychen/art-design-pro) - 感谢原作者提供的优秀前端模板基础
- [**Gin Admin**](https://github.com/the-yex/gin-admin) - 配套的后端管理系统
- [**Vue.js 生态系统**](https://vuejs.org/) - 强大的前端框架及其生态
- [**Element Plus**](https://element-plus.org/) - 优秀的组件库

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源许可协议。

---

<div align="center">

Made with ❤️ by [the-yex](https://github.com/the-yex)

如果这个项目对你有帮助，请给我们一个 ⭐️ Star！

</div>

---

## English Version

# 🌐 Gin Admin Web

<div align="center">

A modern, high-performance frontend admin system template based on Vue 3 + TypeScript + Element Plus, perfectly matched with [Gin Admin](https://github.com/the-yex/gin-admin) backend.

</div>

---

## 📖 Introduction

Gin Admin Web is an out-of-the-box enterprise-level frontend admin system template, specifically designed for the [Gin Admin](https://github.com/the-yex/gin-admin) backend. This project is adapted from the excellent open-source project [Art Design Pro](https://github.com/Daymychen/art-design-pro), with deep customization and optimization.

### ✨ Core Features

- 🎯 **Permission Integration** - Frontend menu and button permissions automatically controlled by backend RBAC permission groups
- 🚀 **Out of the Box** - Clone and run, no complex configuration required
- 💎 **Modern Design** - Smooth interactive animations, focused on user experience and visual design
- 🧩 **Rich Components** - Built-in high-quality components for data display, forms, etc., meeting different business scenarios
- ⚡ **Efficient Development** - Built-in utility APIs like `useTable`, `ArtForm`, etc., significantly improving development efficiency
- 📱 **Responsive Design** - Perfect support for various devices and screen sizes
- 🌍 **i18n Support** - Built-in internationalization support for easy multi-language switching
- 🎨 **Theme Customization** - Support for dark mode and theme customization

## 🛠️ Tech Stack

### Core Framework
- **[Vue 3](https://vuejs.org/)** - Progressive JavaScript Framework
- **[TypeScript](https://www.typescriptlang.org/)** - Typed superset of JavaScript
- **[Vite](https://vitejs.dev/)** - Next generation frontend tooling
- **[Element Plus](https://element-plus.org/)** - Vue 3 Component Library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework

### Routing & State Management
- **[Vue Router](https://router.vuejs.org/)** - Official Router
- **[Pinia](https://pinia.vuejs.org/)** - Modern State Management

### Utilities
- **[Axios](https://axios-http.com/)** - HTTP Client
- **[VueUse](https://vueuse.org/)** - Collection of Composition API utilities
- **[ECharts](https://echarts.apache.org/)** - Data Visualization
- **[@iconify/vue](https://iconify.design/)** - Icon Solution

### Code Quality
- **[ESLint](https://eslint.org/)** - Linting Utility
- **[Prettier](https://prettier.io/)** - Code Formatter
- **[Stylelint](https://stylelint.io/)** - CSS Linter
- **[Husky](https://typicode.github.io/husky/)** - Git Hooks
- **[Commitizen](https://github.com/commitizen/cz-cli)** - Standardized Commits

## 📦 Installation & Usage

### Requirements

- **Node.js**: >= 20.19.0
- **pnpm**: >= 8.8.0

### Quick Start

```bash
# Clone the repository
git clone https://github.com/the-yex/gin-admin-web.git
cd gin-admin-web

# Install dependencies
pnpm install

# If pnpm install fails, try this command
pnpm install --ignore-scripts

# Start local development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm serve
```

### Code Quality Checks

```bash
# ESLint check
pnpm lint

# ESLint auto-fix
pnpm fix

# Prettier formatting
pnpm lint:prettier

# Stylelint check and fix
pnpm lint:stylelint

# Git commit (using Commitizen)
pnpm commit
```

## 📁 Project Structure

```
gin-admin-web/
├── public/                 # Static assets
├── src/
│   ├── api/               # API definitions
│   ├── assets/            # Assets (images, styles, etc.)
│   ├── components/        # Shared components
│   ├── config/            # Configuration files
│   ├── directives/        # Custom directives
│   ├── enums/             # Enumerations
│   ├── hooks/             # Composition API hooks
│   ├── locales/           # i18n language files
│   ├── mock/              # Mock data
│   ├── plugins/           # Plugin configurations
│   ├── router/            # Router configuration
│   ├── store/             # State management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── views/             # Page components
│   ├── App.vue            # Root component
│   └── main.ts            # Entry file
├── .env                   # Environment variables
├── .env.development       # Development environment
├── .env.production        # Production environment
├── index.html             # HTML template
├── package.json           # Project configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # Project documentation
```

## 🎯 Core Features

### RBAC Permission System Integration

This project perfectly integrates with Gin Admin's RBAC (Role-Based Access Control) permission system:

- ✅ **Dynamic Routing** - Dynamically generate routes based on user roles
- ✅ **Menu Permissions** - Automatically control menu visibility
- ✅ **Button Permissions** - Fine-grained control of button visibility
- ✅ **API Permissions** - Automatically handle authentication and permission exceptions

### Complete Feature Modules

- 👤 **User Management** - CRUD operations and status management
- 👥 **Role Management** - Role configuration and permission assignment
- 🔐 **Permission Management** - Menu and button permission configuration
- 📊 **Dashboard** - Data visualization
- 📝 **Form Management** - Complex form handling
- 📋 **Table Management** - Data table display and operations

## 🎨 Companion Backend Project

### [🚀 Gin Admin](https://github.com/the-yex/gin-admin)

**Tech Stack**: Go + Gin + GORM + Redis + JWT

**Core Features**:
- ✅ Enterprise-level RBAC permission system with dynamic routing
- ✅ Revolutionary automatic route registration mechanism
- ✅ Complete user authentication and authorization flow (JWT)
- ✅ Powerful middleware ecosystem (CORS, logging, rate limiting, etc.)
- ✅ Out-of-the-box Docker deployment solution

**Quick Start**:
```bash
# Clone the backend project
git clone https://github.com/the-yex/gin-admin.git
cd gin-admin

# Start with Docker Compose (recommended)
docker-compose up -d

# Or run locally
make run
```

Use both frontend and backend together to get a complete enterprise-level admin system! 🚀

## 🌐 Browser Compatibility

Supports modern mainstream browsers including Chrome, Safari, Firefox, etc.

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png) |
| --- | --- | --- | --- |
| Chrome ≥ 87 | Firefox ≥ 78 | Safari ≥ 14 | Edge ≥ 88 |

## 🤝 Contributing

We sincerely welcome and appreciate the support of every contributor! Whether you have new ideas, feature suggestions, or code optimizations, you can participate in the following ways:

1. **Fork** this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Submit a **Pull Request**

Every contribution you make takes this project one step further! Join our open-source community!

## 🙏 Acknowledgments

This project is adapted from the following excellent open-source projects. We express our sincere thanks:

- [**Art Design Pro**](https://github.com/Daymychen/art-design-pro) - Thanks to the original author for the excellent frontend template foundation
- [**Gin Admin**](https://github.com/the-yex/gin-admin) - Companion backend admin system
- [**Vue.js Ecosystem**](https://vuejs.org/) - Powerful frontend framework and ecosystem
- [**Element Plus**](https://element-plus.org/) - Excellent component library

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Made with ❤️ by [the-yex](https://github.com/the-yex)

If this project helps you, please give us a ⭐️ Star!

</div>
