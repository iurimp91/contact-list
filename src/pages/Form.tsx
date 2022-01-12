/* eslint-disable no-console */
import { useForm, SubmitHandler } from "react-hook-form";
import Contact from "../interfaces/Contact";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Contact>();

  function formSubmitHandler(data: Contact): void {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <input defaultValue="" {...register("name")} />
      <br />
      <input defaultValue="" {...register("email", { required: true })} />
      {errors.email && <span>This field is required</span>}
      <br />
      <input type="submit" />
    </form>
  );
}
