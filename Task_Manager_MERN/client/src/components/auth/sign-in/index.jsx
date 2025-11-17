import { useForm } from "react-hook-form";
import CommonForm from "@/components/common-form";
import { signInFormControls } from "@/config";
import { useNavigate } from "react-router-dom";
import { callLoginUserApi } from "@/services";
import { toast } from "sonner";

function SignIn() {
  const formData = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  async function handleSubmit(getData) {
    try {
      const data = await callLoginUserApi(getData);

      if (data?.success) {
        toast.success("Login successful");
        navigate("/tasks/list");
      } else {
        toast.error(data?.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="w-full">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl animate-fadeIn">

        <h2 className="text-2xl font-bold text-white text-center mb-4 drop-shadow-md">
          Sign In
        </h2>

        <p className="text-white/70 text-center mb-6 text-sm">
          Enter your credentials to continue
        </p>

        <CommonForm
          btnText="Sign In"
          form={formData}
          formControls={signInFormControls}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default SignIn;
