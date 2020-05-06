const Compiler = require('./compiler');
const options = require('../simplepack.config.js');

const compiler = new Compiler(options);

compiler.run();
