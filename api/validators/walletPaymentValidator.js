import {body} from 'express-validator';


const BookingValidator = [
    body('userInfo.id').isMongoId(),
    body('roomInfo._id').isMongoId(),
    body('hotelInfo.name').isString().trim().notEmpty(),
    body('checkInDate').isISO8601().toDate(),
    body('checkOutDate').isISO8601().toDate(),
    body('paymentStatus').isString().trim().notEmpty(),
    body('bookingStatus').isString().trim().notEmpty(),
    body('totalAmount').isNumeric(),
  ];
  
export default BookingValidator