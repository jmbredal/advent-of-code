export function solve(data) {
  const bitArrays = createBitArrays(data);
  const mostCommonBitsArray = getMostCommonBits(bitArrays);
  const leastBitArray = xor(mostCommonBitsArray);

  const gammaRate = parseInt(mostCommonBitsArray.join(''), 2);
  const epsilonRate = parseInt(leastBitArray.join(''), 2);

  const powerConsumption = gammaRate * epsilonRate;
  return powerConsumption;
}


export function solve2(data) {
  const oxygenGeneratorRating = parseInt(getRemainingBitstring(data, false), 2);
  const co2ScrubberRating = parseInt(getRemainingBitstring(data), 2);

  return oxygenGeneratorRating * co2ScrubberRating;
}

function getRemainingBitstring(data, filterByLeastCommon=true) {
  let lines = data.slice();
  const bitSize = lines[0].length;
  for (let i = 0; i < bitSize; i++) {
    let commonBits = getMostCommonBits(createBitArrays(lines));
    if (filterByLeastCommon) {
      commonBits = xor(commonBits);
    }

    lines = lines.filter(line => +line[i] === commonBits[i]);
    if (lines.length <= 1) {
      break;
    }
  }

  return lines[0];
}

function xor(array) {
  return array.map(b => b === 1 ? 0 : 1);
}

function createBitArrays(data) {
  // Create an array containing arrays with the vertical bits
  return data.reduce((bitArrays, line) => {
    Array.from(line).forEach((digit, index) => {
      if (bitArrays[index]) {
        bitArrays[index].push(digit);
      } else {
        bitArrays[index] = [digit];
      }
    });

    return bitArrays;
  }, []);
}

function getMostCommonBits(bitArrays) {
  return bitArrays.reduce((finalBitArray, bitArray, index) => {
    const oneCount = bitArray.filter(bit => bit === '1').length;
    finalBitArray[index] = oneCount >= bitArray.length - oneCount ? 1 : 0;
    return finalBitArray;
  }, []);
}
