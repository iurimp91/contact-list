/* eslint-disable no-console */
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Contact from "../interfaces/Contact";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required()
});

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(schema),
  });

  function formSubmitHandler(data: Contact): void {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <input defaultValue="" {...register("name")} />
      <br />
      <input defaultValue="" {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      <br />
      <input type="submit" />
    </form>
  );
}
