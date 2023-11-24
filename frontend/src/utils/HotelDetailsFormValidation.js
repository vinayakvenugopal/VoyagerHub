export const isStringEmptyOrWhitespace = (str) => {
    return str.trim() === "";
  };
  
  export const isHotelDetailsFormValid = (name, desc, address, city,starRating) => {
    const errors = {
      name: isStringEmptyOrWhitespace(name) ? 'Name is required' : '',
      desc: isStringEmptyOrWhitespace(desc) ? 'Description is required' : '',
      address: isStringEmptyOrWhitespace(address) ? 'Address is required' : '',
      city: isStringEmptyOrWhitespace(city) ? 'City is required' : '',
      starRating : starRating <= 0||starRating >= 6 ? 'Star should be between 1 and 5' : '',
    };
  
    const isValid = Object.values(errors).every((error) => error === '');
  
    return { isValid, errors };
  };
  