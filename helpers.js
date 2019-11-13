const constants = require('./constants');

exports.getSymbolCombination = (symbolId) => {
    const symbol = constants.SYMBOLS.find(el => el.id === Number(symbolId));
    return symbol.combination;
};
