import { useState } from "react";
import Table from 'react-bootstrap/Table'

const TableView = ({ locations, mainLatitude, mainLongitude }) => {
  const [sortKey, setSortKey] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  
  const sortedLocations = [...locations].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };


  const checkIsMain = (currLatitude, currLongitude) => {
    if(currLatitude === mainLatitude && currLongitude === mainLongitude) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <h3 className="text-dark text- mb-2">Locations List</h3>
      <Table bordered responsive striped className="mb-5">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("address")}>Address</th>
            <th onClick={() => handleSort("latitude")}>Latitude</th>
            <th onClick={() => handleSort("longitude")}>Longitude</th>
          </tr>
        </thead>
        <tbody>
          {sortedLocations?.map((location) => (
            <tr
              key={location.location_id}
            >
              <td>{checkIsMain(parseFloat(location.latitude), parseFloat(location.longitude)) ? 
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png" style={{ width: '12px', height: '20px' }} /> : 
                <img src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png" style={{ width: '12px', height: '20px' }}  />}
                {`  ${location.name}`} 
              </td>
              <td>{location.address}</td>
              <td>{location.latitude}</td>
              <td>{location.longitude}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableView;
