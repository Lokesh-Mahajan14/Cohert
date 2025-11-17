import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import CommonButton from "@/components/common-button";
import { useState } from "react";

function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-5">

      {/* Auth Card */}
      <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-[430px] border border-white/20 animate-fadeIn">

        {/* Title */}
        <h3 className="text-4xl font-extrabold text-white text-center drop-shadow-md">
          Task Manager
        </h3>
        <p className="text-center text-white/80 mt-2 text-lg">
          {isLoginView ? "Welcome Back 👋" : "Create your account 🚀"}
        </p>

        {/* Form */}
        <div className="mt-8">
          {isLoginView ? <SignIn /> : <SignUp />}
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-[1px] bg-white/30" />
          <span className="px-3 text-white/70 text-sm">
            OR
          </span>
          <div className="flex-grow h-[1px] bg-white/30" />
        </div>

        {/* Switch View Button */}
        <div className="mt-5 flex justify-center">
          <CommonButton
            type={"button"}
            onClick={() => setIsLoginView(!isLoginView)}
            buttonText={isLoginView ? "Switch to Sign Up" : "Switch to Sign In"}
          />
        </div>


      </div>
    </div>
  );
}

export default AuthPage;
