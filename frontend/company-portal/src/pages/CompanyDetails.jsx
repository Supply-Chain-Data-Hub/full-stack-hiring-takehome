import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ViewMap from "../components/ViewMap";
import DistanceChart from "../components/DistanceChart";
import TableView from "../components/TableView";
import { Button } from "react-bootstrap";
import { ToastContext } from "../context/ToastContext";

const CompanyDetails = () => {
  const { companyId } = useParams();
  const [companyDetails, setCompanyDetails] = useState(null);
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();
  const { setToast } = useContext(ToastContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}companies/${companyId}/`
        );
        const data = await response?.json();
        setCompanyDetails(data);
      } catch (e) {
        setToast({
          message: "Something went wrong. Please try again later",
          variant: "error",
        });
      }
    })();
    (async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_BACKEND_ENDPOINT_URL
          }companies/${companyId}/locations/`
        );
        const data = await response?.json();
        setLocations(data);
      } catch (e) {
        setToast({
          message: "Something went wrong. Please try again later",
          variant: "error",
        });
      }
    })();
  }, []);

  const backToList = () => {
    navigate("/");
  };

  return (
    <div className="company-details mt-5">
      <Button className="mb-4" variant="dark" onClick={backToList}>
        Back to List
      </Button>

      {companyDetails != null && (
        <div>
          <h3 className="text-success">{companyDetails?.name}</h3>
          <p className="mb-4">Address: {companyDetails?.address}</p>
        </div>
      )}
      {locations?.length > 0 && (
        <>
          <TableView
            locations={locations}
            mainLatitude={parseFloat(companyDetails?.latitude)}
            mainLongitude={parseFloat(companyDetails?.longitude)}
          />
          <ViewMap
            locations={locations}
            mainLatitude={parseFloat(companyDetails?.latitude)}
            mainLongitude={parseFloat(companyDetails?.longitude)}
          />
          <DistanceChart
            locations={locations}
            mainLatitude={parseFloat(companyDetails?.latitude)}
            mainLongitude={parseFloat(companyDetails?.longitude)}
          />
        </>
      )}
    </div>
  );
};

export default CompanyDetails;
