// import CallToActions from "../../../components/common/CallToActions";
import Header1 from "../../components/UserNavbar/Header1.jsx";
// import DefaultFooter from "../../../components/footer/default";
import StepperBooking from "../../components/StepperBooking/StepperBooking.jsx";
const BookingPage = () => {
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header1 />
      {/* End Header 1 */}

      <section className="pt-40 layout-pb-md">
        <div className="container">
          <StepperBooking />
        </div>
        {/* End container */}
      </section>
      {/* End stepper */}

      {/* <CallToActions />
      <DefaultFooter /> */}
    </>
  );
};

export default BookingPage;
