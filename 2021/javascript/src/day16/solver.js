import { range, readLines } from '../common.js';

class Packet {
  constructor(bits) {
    console.log('Creating new packet');

    // Get packet version
    this.version = this.toInt(this.getBits(3));
    this.typeId = this.toInt(this.getBits(3));

    this.subPackets = [];

    if (this.typeId === 4) {
      this.parseLiteral();
    } else {
      this.parseOperator();
    }
  }

  getBits(count) {
    const bits = [];
    for (let index = 0; index < count; index++) {
      const { value, done } = this.generator.next();
      if (done) throw new Error();
      bits.push(value);
    }
    return bits.join('');
  }

  toInt(bits) {
    return parseInt(bits, 2);
  }

  parse() {
    if (this.bits.length > 6) {
      this.versionBits = this.bits.slice(0, 3);
      this.version = parseInt(this.versionBits, 2);

      this.typeIdBits = this.bits.slice(3, 6);
      this.typeNum = parseInt(this.typeIdBits, 2);
      this.type = this.typeNum === 4 ? 'literal' : 'operator';
    }

    if (this.bits.length > 8) {
      this.restBits = this.bits.slice(6);

      const map = {
        'literal': this.parseLiteral.bind(this),
        'operator': this.parseOperator.bind(this),
      }

      console.log('parsing', this.bits, this.type, this.restBits);

      return map[this.type]();
    }
  }

  parseLiteral() {
    console.log('parseLiteral');
    let isLastGroup = false;
    const groups = [];
    while (!isLastGroup) {
      const group = this.getBits(5);
      groups.push(group.slice(1));
      if (+group[0] === 0) { isLastGroup = true; }
    }

    this.value = this.toInt(groups.join(''));
    return this;
  }

  parseOperator() {
    this.lengthTypeId = +this.getBits(1);
    console.log('parseOperator', this.lengthTypeId);

    // If the length type ID is 0, then the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
    if (this.lengthTypeId === 0) {
      this.subPacketLength = this.toInt(this.getBits(15));
      this.subPacketsBits = this.getBits(this.subPacketLength);
      while (true) {
        try {
          this.subPackets.push(new Packet(this.subGenerator));
        } catch (asd) {
          break;
        }
      }
    }

    // If the length type ID is 1, then the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.
    if (this.lengthTypeId === 1) {
      const x = this.getBits(11);
      console.log('x', x);
      this.subPacketCount = this.toInt(x);
      console.log(this.subPacketCount);
      range(this.subPacketCount).forEach(() => {
        const b = this.getBits(11);
        console.log(b);
        const g = bitGenerator(b);
        this.subPackets.push(new Packet(g));
      })
    }
  }
}

solve('testdata');

export function solve(filename) {
  const lines = readLines(filename);
  // const hex = lines[0];
  // const hex = 'D2FE280';
  // const hex = 'EE00D40C823060';
  // const hex = '38006F45291200';
  const hex = '8A004A801A8002F478';


  const bits = (parseInt(hex, 16).toString(2)).padStart(4 * hex.length, '0');
  const packet = new Packet(bits);
  console.log(packet);
}

export function solve2(filename) {
  const lines = readLines(filename);
}

function* bitGenerator(bits) {
  let index = 0;

  while (index < bits.length) {
    yield bits[index];
    index++;
  }
}