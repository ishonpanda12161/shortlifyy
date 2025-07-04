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
import { login, signup } from "@/db/apiAuth";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "@/context";

// -------------------------------------------

const Signup = () => {
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
  
    const navigate = useNavigate();
  
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      profilepic: null,
    });
  
    const handleInputChange = (e) => {
      const {name, value, files} = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: files ? files[0] : value,
      }));
    };
  
    const {loading, error, fn: fnSignup, data} = useFetch(signup, formData);
  
    useEffect(() => {
      if (error === null && data) {
        navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ""}`);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error, loading]);
  
    const handleSignup = async () => {
      setErrors([]);
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          profilepic: Yup.mixed().required("Profile picture is required"),
        });
  
        await schema.validate(formData, {abortEarly: false});
        await fnSignup();
      } catch (error) {
        const newErrors = {};
        if (error?.inner) {
          error.inner.forEach((err) => {
            newErrors[err.path] = err.message;
          });
  
          setErrors(newErrors);
        } else {
          setErrors({api: error.message});
        }
      }
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Create a new Account
          </CardDescription>
          {error && <Error message={error?.message} />}
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Input
              name="name"
              type="text"
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
          </div>
          {errors.name && <Error message={errors.name} />}
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={handleInputChange}
            />
          </div>
          {errors.email && <Error message={errors.email} />}
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={handleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
          <div className="space-y-1">
            <input
              name="profilepic"
              type="file"
              accept="image/*"
              onChange={handleInputChange}
            />
          </div>
          {errors.profilepic && <Error message={errors.profilepic} />}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignup}>
            {loading ? (
              <BeatLoader size={10} color="#000000" />
            ) : (
              "Create Account"
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  export default Signup;