export const testUser = {
    name: "bob", emoji: String.fromCodePoint(0x1F600), recipients: ['goose', 'mouse', 'duck'], hasCode: false 
}

export interface iCurrentUser {
  name: string;
  id: string
}

export const testCurrentUser = {
  name: 'placeholder',
  id: '0'
}

export const testGifts = [
  {
    _id: "9999",
    // _user_id: "12345",
    buyer_name: "",
    bought: false,
    description: "A back scratcher",
    link: "https://www.amazon.com/back-scratcher/s?k=back+scratcher",
  },
  {
    _id: "8888",
    // _user_id: "12345",
    buyer_name: "Alphonse",
    bought: true,
    description: "20 gallons of corn syrup",
    link: "https://www.webstaurantstore.com/foxs-light-corn-syrup-1-gallon-container/999CRNSYRPLT.html?utm_source=google&utm_medium=cpc&utm_campaign=GoogleShopping&gclid=CjwKCAiA-P-rBhBEEiwAQEXhHxbwP1ijb7bnp2Wbfds2lvxKsDumJw-uM9yjD1h49bbjrPTKY6I4-hoCb2sQAvD_BwE",
  },
];

export const testNotes = [
  {
    _id: "5555",
    // _user_id: "12345",
        // _writer_id: "11111",
      writer: 'billy',
    text: 'I bought "skydiving for dummies" for this fool.',
  },
  {
    _id: "4444",
    // _user_id: "12345",
      // _writer_id: "22222",
      writer: 'caroline',
    text: "Santa is bringing him coal.",
  },
];