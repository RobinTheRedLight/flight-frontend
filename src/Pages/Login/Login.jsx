import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await login(loginInfo).unwrap();
      if (result) {
        dispatch(setUser({ user: result.data, token: result.token }));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(from, { replace: true });
      }
    } catch (error) {
      const errorMessage =
        error?.data?.errorSources[0]?.message || "An error occurred";
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-nunito">
      <div className="max-w-md w-full p-8 rounded-xl shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold">Login</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-6">
            <label className="block font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              defaultValue="robinmitra789@gmail.com"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full mt-2 px-4 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-8">
            <label className="block font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              defaultValue="123456"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
              className={`w-full mt-2 px-4 py-3 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button className="btn btn-primary w-full text-lg">Sign in</button>

          <p className="text-sm text-center mt-6">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
