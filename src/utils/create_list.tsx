
export const makeList = (names: string[], num: number) => {
  // Set up object with people's names and a list of those to buy for
  const output: {name: string, recipients: string[]}[] = names.map((name) => ({
    name: name,
    recipients: [],
  }));
  // Ensures random number cannot be the same twice
  const usedNumbers: number[] = [];
  // Random number will never be 0, so filter array will always shift by at least 1
  const getRandomStart = () => {
    let randNum = 0;
    while (randNum === 0 || usedNumbers.includes(randNum)) {
      randNum = Math.floor(Math.random() * (names.length - 1) + 1);
    }
    usedNumbers.push(randNum);
    return randNum;
  };
  // Create a different shifted array (shifted by random number) for as many poeple each person is buying gifts for
  for (let i = 0; i < num; i++) {
    const randomStart = getRandomStart();
    const fillerArray: string[] = [
      ...names.slice(randomStart),
      ...names.slice(0, randomStart),
    ];
    //   Give one name to each person, based on the shifted array
    for (let j = 0; j < names.length; j++) {
      output[j].recipients.push(fillerArray[j]);
    }
  }
  return output;
};
// const list = makeList(names, num);

