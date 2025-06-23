import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { BeatLoader } from "react-spinners";
import Error from "./error";
import { useState } from "react";
import * as Yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { login } from "@/db/apiAuth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

// -------------------------------------------

  const Login = () => {
    const [errors, setError] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");

    const handleInputChange = (e) => {
      const {name,value} = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    const {loading, error, fn: fnLogin, data} = useFetch(login, formData);
    const {fetchUser} = UrlState();



    useEffect(() => {
        if (error === null && data) {
          fetchUser();
          navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [error, data]);
    



    const handleLogin = async () => {
     setError([]);
     try{
        const schema = Yup.object().shape({
          email: Yup.string().email("Invalid email address").required("Email is required"),
          password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")
        });

        await schema.validate(formData, { abortEarly: false });
        await fnLogin();
      //  console.log("Form data is valid:", formData);

     } catch(err){
        const newErrors = [];
       if(err instanceof Yup.ValidationError){
        err.inner.forEach((errors) => {
            newErrors[errors.path] = errors.message;
        });
        setError(newErrors);
       }
     }
    };


  return (
    <div>
        <Card>

            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login as Existing User</CardDescription>
                
            </CardHeader>

            <CardContent className="space-y-2">
                        <div className="space-y-1">
                            <Input name="email" type="email" placeholder="Email" onChange={handleInputChange} />
                            {errors.email && <Error message={errors.email} />}
                        </div>
                        <div className="space-y-1">
                            <Input name="password" type="password" placeholder="Password" onChange={handleInputChange}/>
                            {errors.password && <Error message={errors.password} />}
                        </div>
            </CardContent>

            <CardFooter>
                <Button onClick={handleLogin}> {loading? <BeatLoader size={7} color="#000000" /> : "Login"} </Button>
            </CardFooter>

        </Card>
    </div>
  )
}

export default Login;