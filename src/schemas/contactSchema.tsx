import * as yup from "yup";

const errorMessages = {
  required: {
    standard: "Please, this field must be filled.",
    address: "Please, enter a valid CEP to fill this field automatically, it is required.",
  },
  email: "Please, enter a valid email format.",
  birthday: {
    type: "Please, enter a valid date format (DD/MM/YYYY).",
    min: "Please, enter a date greater than 01/01/1900.",
    max: "Please, enter a date from today or less.",
  },
  cep: "Please, enter a valid CEP format (xxxxx-xxx).",
  number: {
    type: "Please, this field must be filled with a number.",
    min: "Please, the number must be higher than 0.",
  },
  complement: "Please, use a maximum of 50 characters.",
};

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required(errorMessages.required.standard),
  email: yup
    .string()
    .email(errorMessages.email)
    .required(errorMessages.required.standard),
  birthday: yup
    .date()
    .typeError(errorMessages.birthday.type)
    .min(new Date("01/01/1900"), errorMessages.birthday.min)
    .max(new Date(), errorMessages.birthday.max)
    .required(),
  cep: yup
    .string()
    .matches(/^\d{5}-\d{3}$/, errorMessages.cep)
    .required(),
  street: yup
    .string()
    .required(errorMessages.required.address),
  number: yup
    .number()
    .typeError(errorMessages.number.type)
    .min(1, errorMessages.number.min)
    .required(errorMessages.required.standard),
  complement: yup
    .string()
    .max(50, errorMessages.complement),
  city: yup
    .string()
    .required(errorMessages.required.address),
  state: yup
    .string()
    .required(errorMessages.required.address),
});
