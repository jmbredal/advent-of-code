using AoC;
using Solvers;

namespace AoCTest
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public void SolverTest01()
        {
            var lines = new List<string> { "123", "456", "789" };
            var group = SolverUtils.GroupLines<string>(lines);

            Assert.That(group[0][0], Is.EqualTo("123"));
        }

        [Test]
        public void SolverTest02()
        {
            var lines = new List<string> { "123", "456", "789" };
            var group = SolverUtils.GroupLines<long>(lines);

            Assert.That(group[0][0], Is.EqualTo(123));
        }

        [Test]
        public void SolverTest03()
        {
            var lines = new List<string> { "123", "456", "789", "", "135" };
            var group = SolverUtils.GroupLines<long>(lines);

            Assert.That(group[1][0], Is.EqualTo(135));
        }

        [Test]
        public void Day01Test()
        {
            var solver = new Day02Solver();

            var score = solver.Score("A X");

            Assert.That(score, Is.EqualTo(4));
        }
    }
}