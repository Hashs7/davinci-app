exports.generateMatrice = (size) => {
    let matrice = [];
    for (let i = 1; Number(size) > i; i++) {
        matrice.push([0])
    }

    matrice.forEach(el => {
        for (let i = 1; Number(size) > i; i++) {
            el.push(0)
        }
    });

    return matrice;
}

const generateNumber = (min = 0, max = 1) => {
    return Math.floor(Math.random() * max) + min;
};

exports.addBlocks = (matrice) => {
    matrice[0][4] = "start";
    const length = matrice.length - 1;
    const pos = generateNumber(0, length);
    matrice[length][pos] = "end";
    return matrice;
};