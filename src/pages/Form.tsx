import { useForm, SubmitHandler } from "react-hook-form";
import Contact from "../interfaces/Contact";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Contact>();

  return (
    <form>
      <input defaultValue="" {...register("name")} />
      <br />
      <input defaultValue="" {...register("email", { required: true })} />
    </form>
  );
}
