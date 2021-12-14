import Contact from "../interfaces/Contact";

function getContactList(): Contact[] {
  return JSON.parse(localStorage.getItem("contacts") || "null");
}

function sortContactList(contactList: Contact[]): void {
  contactList.sort((a: Contact, b: Contact) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

export { getContactList, sortContactList };