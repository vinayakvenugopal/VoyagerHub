export function registerFormValidation(name, email, password,confPassword,mobile) {
    const errors = {
      name: "",
      email: "",
      password: "",
      confPassword:"",
      mobile:""
    };
  const mobileRegex = /^\d{10}$/
    if (!name.trim()) {
      errors.name = "Name is required.";
    } else if (name.length < 3) {
      errors.name = "Name should be at least 3 characters long";
    }
    if (/\d/.test(name)){
        errors.name = "Name should not contain numbers";
    }
  
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!isEmailValid(email)) {
      errors.email = "Invalid email format.";
    }
    if(!mobileRegex.test(mobile)){
      errors.mobile = "Invalid Mobile Number.";

    }
  
    if (!password.trim()) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long.";
    }
    if(password!==confPassword){
        errors.confPassword = "Password and Confirm Password not matching.";
    }
  
    return errors;
  }
  
  export function isEmailValid(email) {
    const emailRegex = /^\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
  