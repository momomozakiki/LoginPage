import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";

const SignUp: React.FC = () => {
  return (
    <div>
      <form>
        {/* Input field for the username */}
        <Input type="text" placeholder="Username" />
        {/* Input field for the email */}
        <Input type="email" placeholder="Email" />
        {/* Input field for the password */}
        <Input type="password" placeholder="Password" />
        {/* Button to submit the signup form */}
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
