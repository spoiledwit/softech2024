import BookerDetails from "@/components/Checkout/BookerDetailsForm";

const CheckoutPage = () => {
  return (
    <div
      className={`min-h-screen pt-10 px-8 md:px-16 mt-20 flex flex-col md:flex-row md:gap-10 justify-start `}
    >
      <div className="w-full max-w-[600px]">
        <h1 className="text-3xl font-medium">Billing Details</h1>
        <div className="mt-4 w-full">
          <BookerDetails />
        </div>
      </div>
      <div className="mt-6 md:mt-20 border h-fit p-6">
        <h2>Payment Methods to be added in here</h2>
      </div>
    </div>
  );
};

export default CheckoutPage;
