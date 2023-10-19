export const isStringEmptyOrWhitespace = (str) => {
    return str.trim() === "";
  };
  
  export const isAddRoomFormValid = (type, desc, area, occupancy,noOfRooms,price) => {
    const errors = {
      type: isStringEmptyOrWhitespace(type) ? 'Name is required' : '',
      desc: isStringEmptyOrWhitespace(desc) ? 'Description is required' : '',
      area: area <= 0 ?  'Area Should be greater than 1':'',
      occupancy : occupancy <= 0 ?  'Area Should be greater than 0':'',
      noOfRooms : noOfRooms <= 0 ?  'No of rooms Should be greater than 0':'',
      price : price <= 0 ?  'Price Should be greater than 0':'',


    };
  
    const isValid = Object.values(errors).every((error) => error === '');
  
    return { isValid, errors };
  };
  