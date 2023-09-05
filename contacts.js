const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf-8");
  const parsedData = await JSON.parse(data);
  return parsedData;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();

  const foundData = data.filter((element) => element.id === contactId);
  if (!foundData.length) {
    return null;
  }
  return foundData[0];
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();
  const index = data.findIndex((element) => element.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = await data.filter(
    (element) => element.id === contactId
  );

  const dataToWrite = await data.filter((element) => element.id !== contactId);
  const stringifiedData = [JSON.stringify(dataToWrite)];
  fs.writeFile(contactsPath, stringifiedData);

  return deletedContact[0];
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const data = await listContacts();
  const newContact = { id: nanoid(), ...conactData };
  console.log(newContact);
  data.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
