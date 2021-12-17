import { readLines } from '../common.js';

class Packet {
  constructor(generator) {
    this.generator = generator;

    // Get packet version
    this.version = this.toInt(this.getBits(3));
    this.typeId = this.toInt(this.getBits(3));

    if (this.typeId === 4) {
      this.parseLiteral();
    } else {
      this.parseOperator();
    }
  }

  getBits(count) {
    const bits = [];
    for (let index = 0; index < count; index++) {
      bits.push(this.generator.next().value);
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
    let isLastGroup = false;
    const groups = [];
    while (!isLastGroup) {
      const group = this.getBits(5);
      groups.push(group.slice(1));
      if (+group[0] === 0) { isLastGroup = true; }
    }

    this.value = this.toInt(groups.join(''));
    console.log('literal value', this.value);
  }

  parseOperator() {
    this.lengthTypeId = +this.getBits(1);

    if (this.lengthTypeId === 0) {
      if (this.restBits.length >= 15) {
        this.subPacketLengthBits = this.restBits.slice(1, 16);
        this.subPacketLength = parseInt(this.subPacketLengthBits, 2);
        this.subPacketsBits = this.restBits.slice(16);

        if (this.subPacketsBits.length >= this.subPacketLength) {
          this.subPackets = this.subPacketsBits.slice(0, this.subPacketLength);
          if (this.subPackets.length === this.subPacketLength) {
            // parse new packets with this.subPackets
            this.isDone = true;
            return this;
          }
        }
      }
      // TODO - how to split subpackets?
    }

    if (this.lengthTypeId === 1) {
      this.subPacketCountBits = this.restBits.slice(1, 12);
      this.subPacketCount = parseInt(this.subPacketCountBits, 2);
      this.subPacketsBits = this.restBits.slice(12);
      // todo - consider subPacketCount?
      this.subPackets = this.subPacketsBits.match(/.{11}/g);
      if (this.subPackets && this.subPackets.length === this.subPacketCount) {
        this.isDone = true;
        return this;
      }
    }
  }

  parseSubPackets() {
    if (this.lengthTypeId === 1) {
      console.log('parseSubPackets');
      const packets = this.subPackets.map(bits => new Packet(bits).parse());
      console.log(packets);
    }
    if (this.lengthTypeId === 0) {
      const packet = new Packet(this.subPackets).parse();
      console.log(packet);
    }
  }
}

solve('testdata');

export function solve(filename) {
  const lines = readLines(filename);
  // const hex = lines[0];
  const hex = 'D2FE280';
  // const hex = 'EE00D40C823060';
  // const hex = '38006F45291200';
  // const hex = '8A004A801A8002F478';


  const bits = (parseInt(hex, 16).toString(2)).padStart(4 * hex.length, '0');
  console.log(bits);
  const packet = new Packet(bitGenerator(bits));
  console.log(packet);
}

export function solve2(filename) {
  const lines = readLines(filename);
}

function* bitGenerator(bits) {
  let index = 0;
  
  while(true) {
    yield bits[index];
    index++;
  }
}