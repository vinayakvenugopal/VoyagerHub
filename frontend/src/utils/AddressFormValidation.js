export const isStringEmptyOrWhitespace = (str) => {
    return str.trim() === "";
  };
  
  export const isAddressFormValid = (address, locality, pincode, state,country) => {
    const errors = {
      address: isStringEmptyOrWhitespace(address) ? 'Address is required' : '',
      locality: isStringEmptyOrWhitespace(locality) ? 'Locality is required' : '',
      pincode: isStringEmptyOrWhitespace(pincode) ? 'Pincode is required' : '',
      state: isStringEmptyOrWhitespace(state) ? 'State is required' : '',
      country: isStringEmptyOrWhitespace(country) ? 'Country is required' : '',


      
    };
  
    const isValid = Object.values(errors).every((error) => error === '');
  
    return { isValid, errors };
  };
  