const names = [
  "nick",
  "raman",
  "pritpal",
  "komal",
  "suhail",
  "aman",
  "prab",
  "nav",
  "dipreet",
  "gerry",
  "jasroop",
  "sukhman",
];

const num = 3;

const makeList = (names, num) => {
  // Set up bject with people's names and
  const output = names.map((name) => ({
    name: name,
    buyFor: [],
  }));
  // Ensures random number cannot be the same twice
  const usedNumbers = [];
  // Random number will never be 0, so filter array will always shift by at least 1
  const getRandomStart = () => {
    randNum = 0;
    while (randNum === 0 || usedNumbers.includes(randNum)) {
      randNum = Math.floor(Math.random() * (names.length - 1) + 1);
    }
    usedNumbers.push(randNum);
    return randNum;
  };
  // Create a different shfted array (shifted by random number) for as many poeple each person is buying gifts for
  for (let i = 0; i < num; i++) {
    const randomStart = getRandomStart();
    const fillerArray = [
      ...names.slice(randomStart),
      ...names.slice(0, randomStart),
    ];
    //   Give one name to each person, based on the shifted array
    for (let j = 0; j < names.length; j++) {
      console.log(j);
      console.log(fillerArray[j]);
      output[j].buyFor.push(fillerArray[j]);
    }
  }
  return output;
};
const list = makeList(names, num);

console.log("LIST");
console.log(list);
