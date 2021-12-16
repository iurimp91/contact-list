import Contact from "../interfaces/Contact";

function getContactList(): Contact[] {
  return JSON.parse(localStorage.getItem("contacts") || "null");
}

function getContactByEmail(contactList: Contact[], email: string): Contact {
  return contactList.filter((contact) => contact.email === email)[0];
}

function setContactList(contactList: Contact[]): void {
  localStorage.setItem("contacts", JSON.stringify(contactList));
}

function updateContactList(currentList: Contact[], newContact: Contact): void {
  localStorage.setItem(
    "contacts",
    JSON.stringify([...currentList, newContact])
  );
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

export { getContactList, getContactByEmail, setContactList, updateContactList, sortContactList };
