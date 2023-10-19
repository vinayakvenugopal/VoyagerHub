export const isStringEmptyOrWhitespace = (str) => {
    return str.trim() === "";
  };
  
  export const isHotelDetailsFormValid = (name, desc, address, city) => {
    const errors = {
      name: isStringEmptyOrWhitespace(name) ? 'Name is required' : '',
      desc: isStringEmptyOrWhitespace(desc) ? 'Description is required' : '',
      address: isStringEmptyOrWhitespace(address) ? 'Address is required' : '',
      city: isStringEmptyOrWhitespace(city) ? 'City is required' : '',
    };
  
    const isValid = Object.values(errors).every((error) => error === '');
  
    return { isValid, errors };
  };
  