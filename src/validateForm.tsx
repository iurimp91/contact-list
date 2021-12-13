import joi from "joi";
import Contact from "./interfaces/Contact";

export default function validateForm(contactData: Contact) {
  const contactSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().regex(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required(),
    birthday: joi.date().max("now").required(),
    cep: joi.string().length(9).regex(/^\d{5}-\d{3}$/).required(),
    street: joi.string().required(),
    number: joi.number().min(1).required(),
    complement: joi.string(),
    city: joi.string().required(),
    state: joi.string().required(),
  });
}