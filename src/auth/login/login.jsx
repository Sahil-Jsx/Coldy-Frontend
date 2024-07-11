import React from "react";
import Components from "../../components/components";
import { useForm } from "react-hook-form";
import logo from "../../assets/imgs/cider (2).png";
import { login } from "../../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submitData = (inputdata, e) => {
    e.preventDefault();
    setLoading(true);
    login(inputdata)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        setLoading(false);
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem("tokenExpiration", expirationTime);
        toast.success("Login Successfully !");
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.error);
        toast.error(err.response.data.error);
      });
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-background">
        <Components.Card className="p-7">
          <div className="flex justify-center">
            <img src={logo} className="h-20" />
          </div>
          <div className="py-5">
            {/* welsome label */}
            <div>
              <span className="font-medium text-2xl flex justify-start">
                Welcome Back
              </span>
            </div>
            {/* sign up tag linbe */}
            <div className="mt-3 flex justify-start">
              <p className="text-dull">Sign in to continue</p>
            </div>
            {/* login fields */}
            <form onSubmit={handleSubmit(submitData)}>
              <div className="mt-5">
                {/* username */}
                <div>
                  <Components.TextField
                    className="w-full"
                    size="small"
                    type="text"
                    name="username"
                    id="username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                    placeholder="username"
                    InputProps={{
                      startAdornment: (
                        <Components.InputAdornment position="start">
                          <Components.Icons.PersonRounded />
                        </Components.InputAdornment>
                      ),
                    }}
                  />
                  {errors.email && (
                    <div className="flex justify-start text-red-500 text-sm mt-1">
                      <span>{errors?.email?.message}</span>
                    </div>
                  )}
                </div>
                {/* password */}
                <div className="mt-5">
                  <Components.TextField
                    className="w-full"
                    size="small"
                    name="password"
                    id="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    type="password"
                    placeholder="Password"
                    InputProps={{
                      startAdornment: (
                        <Components.InputAdornment position="start">
                          <Components.Icons.LockRounded />
                        </Components.InputAdornment>
                      ),
                    }}
                  />
                  {errors.password && (
                    <div className="flex justify-start text-red-500 text-sm mt-1">
                      <span>{errors?.password?.message}</span>
                    </div>
                  )}
                </div>
                {/* login button */}
                <div className="mt-5">
                  <Components.LoadingButton
                    color="error"
                    className="w-full"
                    type="submit"
                    loading={loading}
                    loadingPosition="center"
                    // startIcon={<SaveIcon />}
                    variant="contained"
                  >
                    <span>Login</span>
                  </Components.LoadingButton>
                </div>
              </div>
            </form>
          </div>
        </Components.Card>
      </section>
    </>
  );
};

export default Login;
