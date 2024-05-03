import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setRentList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer"

const RentList = () => {
  const [loading, setLoading] = useState(true);
  const userId = useSelector((state) => state.user._id);
  const rentList = useSelector((state) => state.user.rentList);

  const dispatch = useDispatch()

  const getRentList = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/rents`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setRentList(data));
      setLoading(false);
    }catch (err) {
      console.log("Fetch all rents failed", err.message)
    }
  };

  useEffect(() => {
    getRentList();
  }, []);
  console.log(rentList);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">Your Rent List</h1>
      <div className="list">
        {rentList?.map(({ listingId, hostId, startDate, endDate, totalPrice, booking=true,customerId }) => (
          <div key={listingId._id}>
          <p><b>Customer Email ID: {customerId.email}</b></p>
          <p>Start Date: {startDate}</p>
          <p>End Date: {endDate}</p>
          <p>Total price: ${totalPrice}</p>
        <br></br>
          <ListingCard
            listingId={listingId._id}
            creator={hostId._id}
            listingPhotoPaths={listingId.listingPhotoPaths}
            city={listingId.city}
            province={listingId.province}
            country={listingId.country}
            category={listingId.category}
            startDate={startDate}
            endDate={endDate}
            totalPrice={totalPrice}
            booking={booking}
          />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default RentList;
