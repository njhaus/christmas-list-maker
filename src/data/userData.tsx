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

export interface iGift {
  id: string;
  description: string;
  link: string;
  bought?: boolean,
  buyer_name?: string,
}

export interface iNote {
  id: string;
  written_by: string;
  description: string;
}

export interface iEditUser {
  name: string;
  gifts: iGift[];
}

export interface iViewUser {
  name: string;
  gifts: iGift[];
  notes: iNote[];
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
    id: "0",
    written_by: 'billy',
    description: 'I bought "skydiving for dummies" for this fool.',
  },
  {
    id: "1",
      written_by: 'caroline',
    description: "Santa is bringing him coal.",
  },
];


export const testEditUser = {
  name: "placeholder",
  gifts: [
    {
      id: "0",
      description: "placeholder",
      link: "https://www.cnn.com/interactive/2019/06/us/dad-joke-generator-trnd/",
    },
  ],
};

export const testViewUser = {
  name: "placeholder",
  gifts: [
    {
      id: "0",
      description: "placeholder",
      link: "https://www.cnn.com/interactive/2019/06/us/dad-joke-generator-trnd/",
      bought: true,
      buyer_name: "",
    },
  ],
  notes: testNotes,
};