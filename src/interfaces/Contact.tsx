export default interface Contact {
  id: string;
  name: string;
  email: string;
  birthday: Date | null;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
}
