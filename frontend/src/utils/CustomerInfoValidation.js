export function CustomerInfoValidation(name,email,mobile,address,locality,pincode,state,country) {
    const errors = {
      name: "",
      email: "",
      address: "",
      locality:"",
      mobile:"",
      pincode:"",
      state:"",
      country:""
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

    if (!address.trim()) {
        errors.name = "Name is required.";
      }
  
    
  
    return errors;
  }
  
  export function isEmailValid(email) {
    const emailRegex = /^\S+@\S+\.\S+/;
    return emailRegex.test(email);
  }
  