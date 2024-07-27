import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import "../styles/CompanyList.css";
import { ToastContext } from "../context/ToastContext";

const CompanyList = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setToast } = useContext(ToastContext);

  useEffect(() => {
    (async () => {
      try{
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_ENDPOINT_URL}companies/`
        );
        const data = await response?.json();
        setCompaniesData(data);
      } catch(err) {
        setToast({
          message: "Something went wrong. Please try again later",
          variant: "error"
        })
      }
    })();
  }, []);

  const filteredCompanies = companiesData?.length ? companiesData?.filter((company) =>
    company?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  ) : [];

  return (
    <div className="company-list">
      <div className="company-list__search">
        <input
          type="text"
          placeholder="Search companies by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="company-list__input"
        />
      </div>
      <Row xs={1} md={2} lg={4} className="g-4 h-100">
        {filteredCompanies?.length > 0 ? (
          filteredCompanies?.map((item) => {
            return (
              <Col key={item?.company_id} className="d-flex">
                <Card className="w-100 company-list__card border-0">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      <Link to={`/company-details/${item?.company_id}`}>
                        {item?.name}
                      </Link>
                    </Card.Title>
                    <Card.Text className="flex-grow-1">{item?.address}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <h2 className="text-center w-100">No companies found.</h2>
        )}
      </Row>
    </div>
  );
};

export default CompanyList;
