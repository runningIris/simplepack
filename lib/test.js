const { getAST, getDependencies, transform } = require('./parser');
const path = require('path');

console.log(
    transform(
        getAST(
            path.join(__dirname, '../src/index.js')
        )
    )
);
