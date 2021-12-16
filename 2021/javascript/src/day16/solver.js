import { readLines } from '../common.js';

class Packet {
  constructor(hex) {
    this.hexArray = [];
    this.isDone = false;
  }

  feed(hexValue) {
    this.hexArray.push(hexValue);
    const hex = this.hexArray.join('');
    this.bits = (parseInt(hex, 16).toString(2)).padStart(4 * hex.length, '0');
    this.parse();
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
      }

      map[this.type]();
    }
  }

  parseLiteral() {
    this.valueBits = this.restBits.match(/.{5}/g);
    const x = [];
    this.valueBits.forEach(valueBit => {
      if (+valueBit[0] === 1) {
        x.push(valueBit.slice(1, 5));
      }
      if (+valueBit[0] === 0) {
        x.push(valueBit.slice(1, 5));
        this.value = parseInt(x.join(''), 2);
        this.isDone = true;
      }
    });
  }

  // this.hex = hex;

  // this.bits = (parseInt(hex, 16).toString(2)).padStart(4 * hex.length, '0');
  // this.versionBits = this.bits.slice(0, 3);
  // this.version = parseInt(this.versionBits, 2);

  // this.typeIdBits = this.bits.slice(3, 6);
  // this.typeNum = parseInt(this.typeIdBits, 2);
  // this.type = this.typeNum === 4 ? 'literal' : 'operator';

  // this.restBits = this.bits.slice(6);

  // todo: set packet size

  // if (this.type === 'literal') {
  //   this.valueBits = this.restBits.match(/.{5}/g).map(s => s.slice(1));
  //   this.value = parseInt(this.valueBits.join(''), 2);
  // }

  // if (this.type === 'operator') {
  //   this.lengthTypeId = +this.restBits[0];

  //   if (this.lengthTypeId === 0) {
  //     this.subPacketLengthBits = this.restBits.slice(1, 16);
  //     this.subPacketLength = parseInt(this.subPacketLengthBits, 2);
  //     this.subPackets = this.restBits.slice(16, 16 + this.subPacketLength);
  //     // TODO - how to split subpackets?
  //   }

  //   if (this.lengthTypeId === 1) {
  //     this.subPacketCountBits = this.restBits.slice(1, 12);
  //     this.subPacketCount = parseInt(this.subPacketCountBits, 2);
  //     this.subPacketsBits = this.restBits.slice(12);
  //     // todo - consider subPacketCount?
  //     this.subPackets = this.subPacketsBits.match(/.{11}/g);
  //   }
  // }
}

solve('testdata');

export function solve(filename) {
  const lines = readLines(filename);
  // const hex = lines[0];
  const hex = 'D2FE280';

  const packets = [];

  let packet = new Packet();
  for (const char of hex) {
    packet.feed(char);

    if (packet.isDone) {
      console.log(packet);
      packets.push(packet);
      packet = new Packet();
    }
  }


  // console.log(new Packet('D2'));
  // console.log(new Packet('D2FE28'));
  // console.log(new Packet('38006F45291200'));
  // console.log(new Packet('EE00D40C823060'));
}

export function solve2(filename) {
  const lines = readLines(filename);
}
