import CompanyList from "./pages/CompanyList";
import CompanyDetails from "./pages/CompanyDetails";
import { Route, Routes } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { ToastContext } from "./context/ToastContext";
import CustomToast from "./components/CustomToast";
import { useContext } from "react";

function App() {
  const { toast, setToast } = useContext(ToastContext);
  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand className="text-white">GCompanies</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="container">
        <Routes>
          <Route exact path="/" Component={CompanyList} />
          <Route
            exact
            path="/company-details/:companyId"
            Component={CompanyDetails}
          />
        </Routes>
      </div>
      {toast != null && (
        <CustomToast
          onClose={() => {
            setToast(null);
          }}
          message={toast?.message}
          variant={toast?.variant}
        />
      )}
    </>
  );
}

export default App;
