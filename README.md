# Simplepack -- 简易版 Webpack

极客时间 demo

- 将 ES6 语法转换为 ES5 语法
    - 通过 babylon 生成 AST
    - 通过 babel-core 将 AST 重新生成源码（ES5）
- 分析模块之间的依赖关系
    - babel-traverse 的 ImportDeclaration 方法获取依赖属性
- 获取到所有的依赖模块并生成模块代码
- 组装代码并生成打包文件
