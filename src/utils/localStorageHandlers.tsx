import Contact from "../interfaces/Contact";

function getContactList(): Contact[] {
  return JSON.parse(localStorage.getItem("contacts") || "null");
}

function getContact(id: string): Contact {
  const contactList = getContactList();

  return contactList.filter((contact) => contact.id === id)[0];
}

function setContactList(contactList: Contact[]): void {
  localStorage.setItem("contacts", JSON.stringify(contactList));
}

function updateContactList(currentList: Contact[], newContact: Contact): void {
  localStorage.setItem("contacts", JSON.stringify([...currentList, newContact]));
}

function updateContact(id: string, newContact: Contact): void {
  const contactList: Contact[] = getContactList();

  const arrayWithoutContact = contactList.filter(
    (contact) => contact.id !== id
  );

  updateContactList(arrayWithoutContact, newContact);
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

export {
  getContactList,
  getContact,
  setContactList,
  updateContactList,
  updateContact,
  sortContactList,
};
