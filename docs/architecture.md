# Architecture & Domain Boundary

本文档定义系统的分层架构模型、核心组件边界与数据流转规则。

## 1. 架构总览

```text
[ Client / Admin Console ]
           │
           ▼
[ Axum HTTP / WS Transport Layer ]
           │
           ▼
[ Domain Layer / Dispatcher / Service Logic ]
           │
           ▼
[ Storage Layer (Sqlx / Cache) ]
```

## 2. 分层与调用规则

1. **Transport Layer (`src/server.rs`)**：
   - 负责路由装配、中间件挂载（CORS、Trace、Auth）、HTTP 请求与响应格式解析。
   - 严格禁止在 Transport 层编写业务存储与核心逻辑。
2. **Domain Service Layer**：
   - 包含系统的业务实体、状态流转与核心调度算法。
3. **Storage Layer**：
   - 使用 `sqlx` 进行类型安全的异步 SQL 交互。
   - 数据表变更统一由 `migrations/NNN_*.sql` 驱动。

## 3. 插件优先原则

所有针对特定业务的个性化定制（如鉴权头装饰、特定厂商协议兼容、日志脱敏等）必须作为独立的中间件或插件实现，严禁在核心数据面硬编码私有分支。
