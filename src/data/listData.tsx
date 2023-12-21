export interface iListData {
    _id: string;
    title: string;
    users: iListUser[];
}

export interface iListUser {
  name: string;
  recipients: string[];
  emoji?: string;
  hasCode?: boolean;
}   

export const initialListData: iListData = {
    _id: "1234",
    title: "initial list",
    users: [
        { name: "bob", emoji: String.fromCodePoint(0x1F600), recipients: ['goose', 'mouse', 'duck'], hasCode: false },
        { name: "henry", emoji: String.fromCodePoint(0x1F600), recipients: ['goose', 'mouse', 'duck'], hasCode: false },
        { name: "frank", emoji: String.fromCodePoint(0x1F600), recipients: ['goose', 'mouse', 'duck'], hasCode: false },
        { name: "joe", emoji: String.fromCodePoint(0x1F600), recipients: ['goose', 'mouse', 'duck'], hasCode: false },
        { name: "patty", emoji: String.fromCodePoint(0x1F600), recipients: ['goose', 'mouse', 'duck'], hasCode: false },
        { name: "velma", emoji: String.fromCodePoint(0x1F600), recipients: ['goose', 'mouse', 'duck'], hasCode: false }]
}
