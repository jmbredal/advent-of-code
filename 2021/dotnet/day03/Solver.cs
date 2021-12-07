using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Day03
{
    public class Day03Solver
    {
        public List<string> TestData { get; set; }
        public List<string> RealData { get; set; }

        public Day03Solver()
        {
            TestData = ParseFile("day03/testdata");
            RealData = ParseFile("day03/input");

            SolveTask1(TestData);
            SolveTask1(RealData);
            SolveTask2(TestData);
            SolveTask2(RealData);
        }

        public static List<string> ParseFile(string filename)
        {
            return File.ReadAllLines(filename).ToList();
        }

        public void SolveTask1(List<string> data)
        {
            var gammaRate = FindGammaRate(data);
            var epsilonRate = FindEpsilonRate(data);
            var solution = gammaRate * epsilonRate;
            Console.WriteLine("Task 1: {0}", solution);
        }

        public void SolveTask2(List<string> data)
        {
            var oxygenGeneratorRating = FindOxygenGeneratorRating(data);
            var scrubberRating = FindScrubberRating(data);
            Console.WriteLine("Task 2: {0}", oxygenGeneratorRating * scrubberRating);
        }

        private int FindOxygenGeneratorRating(List<string> data)
        {
            var bitSize = data[0].Length;
            var bitList = new List<string>(data);
            for (var i = 0; i < bitSize; i++)
            {
                var bit = FindMostCommonBit(bitList, i);
                bitList = bitList.Where(bitString => bitString[i] == bit).ToList();
                if (bitList.Count == 1) {
                    break;
                }
            }
            return Convert.ToInt32(bitList[0], 2);
        }

        private int FindScrubberRating(List<string> data)
        {
            var bitSize = data[0].Length;
            var bitList = new List<string>(data);
            for (var i = 0; i < bitSize; i++)
            {
                var bit = FindLeastCommonBit(bitList, i);
                bitList = bitList.Where(bitString => bitString[i] == bit).ToList();
                if (bitList.Count == 1) {
                    break;
                }
            }
            return Convert.ToInt32(bitList[0], 2);
        }

        private int FindGammaRate(List<string> data)
        {
            var mostCommonBits = FindMostCommonBits(data);
            return Convert.ToInt32(new string(mostCommonBits), 2);
        }

        private int FindEpsilonRate(List<string> data)
        {
            var mostCommonBits = FindMostCommonBits(data);
            var leastCommonBits = mostCommonBits.Select(b => b == '1' ? '0': '1').ToArray();
            return Convert.ToInt32(new string(leastCommonBits), 2);
        }

        private char[] FindMostCommonBits(List<string> bitStrings)
        {
            var mostCommonBits = new List<char>();
            for (var i = 0; i < bitStrings[0].Count(); i++)
            {
                var mostCommonBit = FindMostCommonBit(bitStrings, i);
                mostCommonBits.Add(mostCommonBit);
            }
            return mostCommonBits.ToArray();
        }

        private char FindMostCommonBit(List<string> bitStrings, int position)
        {
            var bits = bitStrings.Select(bitString => bitString[position]);
            var oneCount = bits.Count(c => c == '1');
            var zeroCount = bits.Count(c => c == '0');
            return oneCount >= zeroCount ? '1' : '0';
        }

        private char FindLeastCommonBit(List<string> bitStrings, int position)
        {
            var mostCommonBits = FindMostCommonBit(bitStrings, position);
            return mostCommonBits == '1' ? '0' : '1';
        }
    }
}
