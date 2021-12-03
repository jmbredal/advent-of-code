export function solve(data) {
  const bitArrays = data.reduce((bitArrays, line) => {
    Array.from(line).forEach((digit, index) => {
      if (bitArrays[index]) {
        bitArrays[index].push(digit);
      } else {
        bitArrays[index] = [digit];
      }
    });

    return bitArrays;
  }, []);

  const mostCommonBitArray = getMostCommonBit(bitArrays);
  const leastBitArray = mostCommonBitArray.map(b => b === 1 ? 0 : 1);

  const gammaRate = parseInt(mostCommonBitArray.join(''), 2);
  const epsilonRate = parseInt(leastBitArray.join(''), 2);

  const powerConsumption = gammaRate * epsilonRate;
  return powerConsumption;
}

function getMostCommonBit(bitArrays) {
  return bitArrays.reduce((finalBitArray, bitArray, index) => {
    const oneCount = bitArray.filter(bit => bit === '1').length;
    finalBitArray[index] = oneCount > bitArray.length - oneCount ? 1 : 0;
    return finalBitArray;
  }, []);
}

export function solve2(data) {
}