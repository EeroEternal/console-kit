# Module Boundaries & Crate Architecture

本文档定义系统模块边界、数据流方向及跨模块交互铁律。

## 1. 核心铁律

1. **单向依赖流**：只能由上层（Server / App）依赖下层（Domain / Storage），禁止循环依赖。
2. **禁止跨模块直接读写私有表**：所有跨模块数据交互必须通过领域提供的 Service / Repository 接口或明确的数据契约完成。
3. **变更原子性**：破坏性接口变更必须提供向后兼容层或统一版本升级方案。
