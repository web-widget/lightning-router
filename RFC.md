# RFC: ⚡ Lightning Router - 挑战性能极限的世界级 Web 标准路由库

## 概述

本 RFC 提出一个雄心勃勃的计划：基于现有的 find-my-way 路由库创建 **Lightning Router** ⚡ - 一个全新的世界级 Web 标准路由库。find-my-way 已经是当前世界上最快的 JavaScript 路由库，Fastify 基于它实现了世界上最快的 JavaScript Web 框架。我们的目标是在这个基础上进一步提升 30% 的性能，这将创造一个新的性能标杆，并为 [Web Widget](https://github.com/web-widget/web-widget) 元框架提供世界级性能的底层路由支持。

**重要说明**: Lightning Router 是一个全新的项目，将采用全新的项目名称和包名（`@web-widget/lightning-router`），不会保持与 find-my-way 的接口兼容性。我们将基于 find-my-way 的优秀算法和架构，但完全重新设计 API 以适配 Web 标准和性能优化需求。

这个项目将支持多个平台运行，包括 Cloudflare Workers、Service Workers、Node.js 等环境，同时保持对 Web 标准的完全兼容。

## 🎯 项目动机与愿景

find-my-way 是当前世界上最快的 JavaScript 路由库，但其严重依赖 Node.js 特定 API，无法在 Web 标准环境中运行。本项目旨在将其重新定位为**元路由器**，通过分层架构既保持原有的性能优势，又支持多平台运行。

**主要改进方向**：平台依赖解耦、模块系统现代化（ESM）、类型安全（TypeScript）、跨平台兼容性。

**核心目标**：为 [Web Widget](https://github.com/web-widget/web-widget) 元框架提供世界级性能的底层路由支持，同时保持对现有 Node.js 生态的完全兼容。

## 🏗️ 技术方案与架构设计

### 元路由器核心理念：分层架构

基于深入的架构分析，我们决定将 find-my-way 重新定位为**元路由器**，作为底层核心，然后基于它扩展出不同的上层适配器。这样既保持了核心算法的优势，又实现了跨平台的灵活性。

```
┌─────────────────────────────────────────────────────────┐
│                   应用层适配器                            │
├─────────────────────┬───────────────────────────────────┤
│   Node.js 适配器     │     Web 标准适配器                 │
│   (现有兼容)        │     (新增功能)                      │
├─────────────────────┴───────────────────────────────────┤
│                 Find-My-Way 元路由核心                   │
│              (平台无关的路由匹配算法)                      │
└─────────────────────────────────────────────────────────┘
```

### 设计原则

**分离关注点**：核心层专注于高性能路由匹配算法（平台无关），适配层处理平台特定的 API 差异。

**最小化核心改动**：保持 Radix 树、约束系统等核心算法不变，只抽象出平台特定的部分。

**渐进式升级**：现有 Node.js 代码零改动，新项目可选择 Web 标准模式。

### 技术栈现代化

将项目从 CommonJS + JavaScript 迁移到 ESM + TypeScript，要求 Node.js >= 18 以获得原生 Web API 支持。核心改动包括模块系统迁移、HTTP 对象标准化、TypeScript 严格模式集成。

## 📋 实施计划与执行策略

### 当前实施状态

**已完成**：Node.js 依赖清理、ESM 迁移，所有测试用例通过（484/484）。

**重新设计**：TypeScript 迁移策略调整为渐进式迁移。

**待开始**：lib 目录 TypeScript 化、Web 标准 API 重构、元路由器架构重构。

### 实施原则

小步快跑（每个变更 200-300 行以内）、测试驱动、可回滚。前三阶段保持功能兼容，第四阶段进行架构重构。

### 阶段三：TypeScript 渐进式迁移（重新设计）

#### 3.1 渐进式迁移策略
- [ ] 采用渐进式迁移：`lib/*.js` → `lib/*.ts`（非严格模式）
- [ ] 保持现有测试和构建流程的连续性
- [ ] 逐步提升 TypeScript 严格程度
- [ ] 避免一次性大规模重构的风险

#### 3.2 第一阶段：lib 目录 TypeScript 化
- [ ] 使用 `git mv *.js *.ts` 重命名 lib 目录下的所有文件
- [ ] 配置 `tsconfig.json` 为非严格模式（`"strict": false`）
- [ ] 添加基础的 JSDoc 注释和类型注解
- [ ] 确保所有现有测试继续通过
- [ ] 运行类型检查，记录和修复基础错误

#### 3.3 第二阶段：类型系统逐步完善
- [ ] 逐步启用 TypeScript 严格模式选项
- [ ] 为核心模块添加完整的类型定义
- [ ] 创建 `lib/types/index.ts` 定义基础类型
- [ ] 保持向后兼容性，确保零破坏性变更

#### 3.4 核心类型系统
- [ ] 为 `lib/node.ts` 添加完整类型
- [ ] 为 `lib/handler-storage.ts` 添加完整类型
- [ ] 为 `lib/constrainer.ts` 添加完整类型
- [ ] 为 `lib/strategies/` 目录添加类型定义

#### 3.5 主路由类型
- [ ] 为 `lib/index.js` 对应的 TypeScript 版本添加完整类型
- [ ] 为路由注册方法添加类型
- [ ] 为路由查找方法添加类型
- [ ] 为测试用例添加类型定义

#### 3.6 第三阶段：目录结构重构
- [ ] 在类型系统稳定后，重构到 `src/` 目录结构
- [ ] 保持所有类型定义和功能完整性
- [ ] 更新构建配置和导入路径
- [ ] 验证重构后的功能正确性

### 阶段四：Web 标准 API 重构（待开始）

#### 4.1 原生 Web API 支持
- [ ] 创建 `web.js` 作为 Web API 版本的入口
- [ ] 重构签名，以符合 Web 的使用方式
- [ ] 支持原生 Request/Response 对象
- [ ] 更新接口定义支持原生 Web API

#### 4.2 核心逻辑重构
- [ ] 更新 `lookup` 方法签名，传入原生 Request 对象
- [ ] 更新 `Handler` 接口签名，返回原生 Response 对象
- [ ] 更新约束策略使用原生 Request 对象
- [ ] 更新约束推导逻辑

#### 4.3 测试环境适配
- [ ] 更新现有测试用例使用原生 Web API
- [ ] 添加原生 Web API 兼容性测试
- [ ] 配置多环境测试
- [ ] 运行完整测试套件

### 阶段五：元路由器架构重构（待开始）

#### 5.1 性能基准建立
- [ ] 运行现有性能基准测试
- [ ] 记录关键性能指标
- [ ] 分析性能瓶颈
- [ ] 分析中间件 vs 处理器路由的使用模式

#### 5.2 元路由器核心重构
- [ ] 识别并抽象 Node.js 特定的部分（req/res 对象）
- [ ] 设计平台无关的 `RouteContext` 接口
- [ ] 创建 `UniversalHandler` 类型定义
- [ ] 将现有路由匹配逻辑改为使用平台无关接口
- [ ] 实现 `MetaRouter` 核心类
- [ ] 保持所有现有算法优化（Radix树、约束系统等）

#### 5.3 适配器实现
**Node.js 适配器**：
- [ ] 实现 `NodeRouterAdapter` 类
- [ ] 保持现有 API 完全兼容
- [ ] 包装 Node.js handler 为 UniversalHandler
- [ ] 运行所有现有测试，确保零破坏性变更

**Web 标准适配器**：
- [ ] 实现 `WebRouterAdapter` 类
- [ ] 支持中间件链执行模式
- [ ] 实现智能路径选择优化
- [ ] 添加 Web 标准适配器的专门测试

#### 5.4 性能验证和优化
- [ ] 对比重构前后的性能数据
- [ ] 验证 Node.js 适配器性能无退化
- [ ] 测试 Web 适配器的中间件链性能
- [ ] 分析中间件链执行开销
- [ ] 探索上下文对象复用策略
- [ ] 研究编译时优化可能性

### 检查点说明

每个主要步骤完成后都有 **Code Review 检查点**，确保：
- 代码质量符合标准
- 所有相关测试通过
- 性能无明显退化
- 功能完整性得到验证

## 🔧 技术细节与实现方案

### 文件结构规划

基于元路由器架构的新文件结构：

```
find-my-way/
├── core/                  # 元路由核心（平台无关）
│   ├── meta-router.ts     # 元路由器主类
│   ├── radix-tree.ts      # Radix 树实现
│   ├── constrainer.ts     # 约束系统
│   ├── handler-storage.ts # 处理器存储
│   └── types.ts           # 核心类型定义
├── adapters/              # 平台适配器
│   ├── node.ts           # Node.js 适配器
│   ├── web.ts            # Web 标准适配器
│   ├── deno.ts           # Deno 适配器（未来）
│   └── cloudflare.ts     # Cloudflare Workers 适配器（未来）
├── strategies/            # 约束策略
│   ├── http-method.ts     # HTTP 方法策略
│   ├── host.ts           # 主机策略
│   └── version.ts        # 版本策略
├── utils/                 # 工具函数
│   ├── url-sanitizer.ts   # URL 处理工具
│   ├── querystring.ts     # 查询字符串处理
│   └── assertions.ts      # 断言工具
├── index.ts              # 默认导出（Node.js 适配器）
└── web.ts                # Web 标准导出
```

### 迁移策略

采用渐进式迁移：基础设施建设（ESM、Web API、TypeScript）→ 元路由器架构重构（内部重构、适配器实现、性能验证）→ 生态扩展。

要求 Node.js >= 18 以获得原生 Web API 支持，确保跨平台兼容性。

### 核心接口设计

#### 元路由器核心接口 - 平台无关

```typescript
/**
 * 元路由器核心接口 - 完全平台无关
 */
interface MetaRouter {
  /**
   * 注册路由处理器
   * @param method HTTP 方法
   * @param path 路径模式  
   * @param handler 平台无关的处理器
   * @param options 路由选项
   */
  register(
    method: string | string[],
    path: string, 
    handler: UniversalHandler,
    options?: RouteOptions
  ): void;

  /**
   * 查找匹配的路由
   * @param method HTTP 方法
   * @param path 请求路径
   * @param context 查找上下文
   * @returns 匹配结果或 null
   */
  lookup(
    method: string,
    path: string,
    context?: LookupContext
  ): RouteMatch | null;

  /**
   * 执行路由处理器
   * @param match 路由匹配结果
   * @param executor 平台特定的执行器
   * @returns 执行结果
   */
  execute<T>(
    match: RouteMatch,
    executor: RouteExecutor<T>
  ): T;
}

/**
 * 平台无关的处理器接口
 */
type UniversalHandler = (context: RouteContext) => any;

/**
 * 路由上下文 - 包含所有路由信息，但不包含平台特定对象
 */
interface RouteContext {
  method: string;
  path: string;
  params: Record<string, string>;
  searchParams: Record<string, string>;
  store?: any;
  constraints?: Record<string, any>;
  // 平台特定数据通过泛型扩展
  platform?: any;
}

/**
 * 路由执行器 - 平台适配器实现
 */
interface RouteExecutor<T> {
  (handler: UniversalHandler, context: RouteContext): T;
}
```

#### 关键改动点

**当前签名的问题：**
```typescript
// 当前：强依赖 Node.js 类型
handler(req: IncomingMessage, res: ServerResponse, params, store, searchParams)
lookup(req: IncomingMessage, res: ServerResponse, ctx?, done?)
```

**元路由签名：**
```typescript
// 改为：平台无关
handler(context: RouteContext)
lookup(method: string, path: string, context?: LookupContext)
```

#### 适配器架构

**1. Node.js 适配器（保持现有兼容性）**

```typescript
class NodeRouterAdapter {
  constructor(private metaRouter: MetaRouter) {}

  // 保持现有签名不变
  on(method: string, path: string, handler: NodeHandler, store?: any) {
    // 将 Node.js handler 包装为 UniversalHandler
    const universalHandler = (context: RouteContext) => {
      const { req, res } = context.platform;
      return handler(req, res, context.params, context.store, context.searchParams);
    };
    
    this.metaRouter.register(method, path, universalHandler, { store });
  }

  lookup(req: IncomingMessage, res: ServerResponse, ctx?: any, done?: Function) {
    // 使用元路由器查找并执行
    // ...实现细节
  }
}
```

**2. Web 标准适配器（支持中间件）**

```typescript
class WebRouterAdapter {
  constructor(private metaRouter: MetaRouter) {}

  // 新的中间件 API
  use(path: string, middleware: MiddlewareHandler) {
    // 中间件注册逻辑
  }

  on(method: string, path: string, handler: MiddlewareHandler, options?: RouteOptions) {
    // 将中间件风格 handler 包装为 UniversalHandler
    const universalHandler = (context: RouteContext) => {
      return handler(context, () => Promise.resolve(new Response('', { status: 404 })));
    };
    
    this.metaRouter.register(method, path, universalHandler, options);
  }

  async lookup(request: Request, initialContext?: any): Promise<Response> {
    // 使用元路由器查找，构建中间件链并执行
    // ...实现细节
  }
}
```

#### 包结构设计

```
find-my-way/
├── core/                 # 元路由核心
│   ├── meta-router.js
│   ├── radix-tree.js
│   └── constrainer.js
├── adapters/
│   ├── node.js          # Node.js 适配器
│   ├── web.js           # Web 标准适配器
│   ├── deno.js          # Deno 适配器
│   └── cloudflare.js    # Cloudflare Workers 适配器
├── index.js             # 默认导出 Node.js 适配器（兼容性）
└── web.js               # 导出 Web 适配器
```

**使用方式：**
```typescript
// 现有项目（无变化）
import FindMyWay from 'find-my-way';

// Web 标准项目
import { WebRouter } from 'find-my-way/web';

// 自定义适配器
import { MetaRouter } from 'find-my-way/core';
```



#### 约束系统优化

基于现有的 `constrainer.js` 和 `handler-storage.js` 分析：

-   **位图优化**: 当前使用位图进行约束匹配，可以进一步优化
-   **编译时优化**: 利用 TypeScript 编译时信息优化约束匹配
-   **策略缓存**: 为常用约束策略提供缓存机制

## 🎯 成功标准

**功能完整性**：所有现有功能正常工作，通过所有单元测试，支持目标平台。

**代码质量**：TypeScript 严格模式无错误，完整的 API 文档，代码质量检查通过。

**性能基准**：Node.js 适配器保持原有性能，Web 适配器性能影响可控。

## 质量保证

每个提交运行类型检查、单元测试和代码质量检查。每个阶段进行 Code Review 和功能验证。

## 关键技术决策

**分阶段策略**：前三阶段保持算法兼容，第四阶段重新设计 API 以优化性能和 Web 标准兼容。

**核心优势保留**：Radix 树路径匹配算法、灵活的约束策略机制、高效的位图匹配算法。

**重构重点**：Node.js 依赖替换、测试框架迁移到 Vitest、模块系统 ESM 化、TypeScript 严格模式。

**性能研究**：评估中间件链对路由性能的影响、分析适配器模式的性能成本、验证现有优化算法的兼容性。

## 🔄 渐进式 TypeScript 迁移实施计划

### 迁移策略概述

基于对当前实施挑战的深入分析，我们决定采用**渐进式迁移策略**，避免一次性大规模重构的风险。这个策略的核心是：**先让代码跑起来，再逐步提升质量**。

### 第一阶段：lib 目录 TypeScript 化

#### 1.1 准备工作
```bash
# 备份当前状态
git stash

# 创建迁移分支
git checkout -b feature/progressive-typescript-migration
```

#### 1.2 配置非严格模式 TypeScript
```json
// tsconfig.json 临时配置
{
  "compilerOptions": {
    "strict": false,                    // 关键：非严格模式
    "noImplicitAny": false,            // 允许隐式 any
    "noImplicitReturns": false,        // 允许隐式返回
    "noUnusedLocals": false,           // 允许未使用的局部变量
    "noUnusedParameters": false,       // 允许未使用的参数
    "exactOptionalPropertyTypes": false, // 放宽可选属性类型
    "noUncheckedIndexedAccess": false,  // 放宽索引访问检查
    "include": ["lib/**/*", "index.js"], // 包含 lib 目录和主入口
    "outDir": "./dist",
    "rootDir": "."
  }
}
```

#### 1.3 渐进式文件重命名
```bash
# 按模块重要性顺序重命名
cd lib

# 1. 工具函数（风险最低）
git mv assertions.js assertions.ts
git mv null-object.js null-object.ts
git mv http-methods.js http-methods.ts

# 2. 策略模块
cd strategies
git mv http-method.js http-method.ts
git mv accept-host.js accept-host.ts
git mv accept-version.js accept-version.ts
cd ..

# 3. 核心模块（风险较高）
git mv url-sanitizer.js url-sanitizer.ts
git mv querystring.js querystring.ts
git mv pretty-print.js pretty-print.ts
git mv constrainer.js constrainer.ts
git mv handler-storage.js handler-storage.ts
git mv node.js node.ts

cd ..
git mv index.js index.ts
```

#### 1.4 基础类型注解添加
```typescript
// lib/types/index.ts
export interface RouteOptions {
  version?: string;
  host?: string;
  store?: any;
  constraints?: Record<string, any>;
}

export interface RouteMatch {
  handler: Function;
  params: Record<string, string>;
  store?: any;
  searchParams?: Record<string, string>;
}

// 逐步添加更多类型定义...
```

### 第二阶段：类型系统逐步完善

#### 2.1 启用基础类型检查
```json
// 逐步启用 TypeScript 选项
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": true,           // 启用：禁止隐式 any
    "strictNullChecks": true,        // 启用：严格的 null 检查
    "strictFunctionTypes": true,     // 启用：严格的函数类型
    // 其他选项保持关闭状态
  }
}
```

#### 2.2 核心模块类型完善
```typescript
// lib/node.ts
export interface NodeHandler {
  (req: IncomingMessage, res: ServerResponse, params: Record<string, string>, store?: any, searchParams?: Record<string, string>): void;
}

export interface NodeRouter {
  on(method: string | string[], path: string, handler: NodeHandler, store?: any): void;
  lookup(req: IncomingMessage, res: ServerResponse, ctx?: any, done?: Function): void;
  // ... 其他方法
}
```

### 第三阶段：目录结构重构

#### 3.1 重构时机
- 所有 lib 模块类型稳定
- 测试覆盖率保持 100%
- 性能基准无退化
- 类型错误数量可控（< 50 个）

#### 3.2 重构步骤
```bash
# 1. 创建新的 src 目录结构
mkdir -p src/{core,strategies,utils,types,adapters}

# 2. 移动文件到新结构
git mv lib/core/* src/core/
git mv lib/strategies/* src/strategies/
git mv lib/utils/* src/utils/
git mv lib/types/* src/types/

# 3. 更新导入路径
# 使用 sed 或 IDE 批量替换
```

### 质量保证措施

#### 4.1 每个阶段的检查点
- **功能完整性**：所有测试通过
- **类型安全**：TypeScript 编译成功
- **性能基准**：无性能退化
- **向后兼容**：现有 API 完全兼容

#### 4.2 回滚策略
```bash
# 如果某个阶段出现问题，快速回滚
git reset --hard HEAD~1
git checkout main
git branch -D feature/progressive-typescript-migration
```

### 预期收益

1. **降低风险**：避免一次性大规模重构
2. **保持连续性**：测试和构建流程不中断
3. **渐进式改进**：类型安全逐步提升
4. **快速反馈**：每个小步骤都能验证
5. **团队学习**：逐步熟悉 TypeScript 最佳实践

### 时间估算

- **第一阶段**：1-2 周（lib 目录 TypeScript 化）
- **第二阶段**：2-3 周（类型系统完善）
- **第三阶段**：1-2 周（目录重构）
- **总计**：4-7 周（相比原方案的 8-12 周，节省 30-40% 时间）

这个渐进式迁移策略完全符合 RFC 中"小步快跑"的原则，将大大降低项目风险，提高成功率。
