import dayjs from "dayjs";

const RecentBooking = ({data}) => {
console.log(data);
    return (
      <div className="overflow-scroll scroll-bar-1 pt-30">
        <table className="table-2 col-12">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Hotel</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0,5).map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {item.userInfo.name}
                </td>
                <td className="fw-500">{item.hotelInfo.name}</td>
                <td>
                  {item.totalAmount}
                </td>
                <td> {item.bookingStatus}</td>
                <td> {dayjs(item.bookingDate).format("DD/MM/YYYY")}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default RecentBooking;
  