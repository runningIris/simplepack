const { getAST, getDependencies, transform } = require('./parser');
const path = require('path');
const fs = require('fs');

module.exports = class Compiler {
    constructor(options) {
        const { entry, output } = options;
        this.entry = entry;
        this.output = output;
        this.modules = [];
    }
    run() {
        const entryModule = this.buildModule(this.entry, true);
        this.modules.push(entryModule);
        this.modules.map(_module => {
            _module.dependencies.map(dep => {
                console.log(dep);
                this.modules.push(this.buildModule(dep, false));
            });
        })

        // console.log(this.modules);
        this.emitFiles();
    }
    buildModule(fileName, isEntry) {
        const ast = getAST(isEntry ? fileName : path.join(process.cwd(), './src', fileName));
        return {
            fileName,
            dependencies: getDependencies(ast),
            source: transform(ast)
        };
    }
    emitFiles() {
        const outputPath = path.join(this.output.path, this.output.filename);
        const modules = this.modules.reduce((accum, _module) => {
            return accum + `
            "${_module.fileName}": function(require, module, exports) {
                ${_module.source}
            },`
        }, '');
        const bundle = `(function(modules) {
            function require(filename) {
                var fn = modules[filename];
                var module = {
                    exports: {}
                };
                fn(require, module, module.exports);
                return module.exports;
            }
            require("${ this.entry }")
        })({${modules}})`;

        console.log(bundle);

        fs.writeFileSync(outputPath, bundle, 'utf-8');
    }
}
