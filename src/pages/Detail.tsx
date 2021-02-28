import React, { useEffect, useState } from "react";
import { Button, Col, Container, Navbar, Row, Table } from "react-bootstrap";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import IPage from "../interfaces/IPage";

import { DetailService } from "../services/DetailService";

const defaultDetail = {
  organizationNumber: "",
  organizationName: "",
  organizationFormDescription: "",
  registrationDate: "",
  numberOfEmployee: 0,
  country: "",
  countryCode: "",
  postCode: "",
  postOffice: "",
  address: [],
  municipality: "",
  municipalityNumber: "",
  establishedDate: "",
  institutionSectorCode: "",
  institutionSectorDescription: "",
  bankruptcy: false,
  maalform: "",
  sourceUrl: "",
};

const Detail: React.FunctionComponent<IPage & RouteComponentProps<any>> = (
  props
) => {
  const [detail, setDetail] = useState(defaultDetail);

  useEffect(() => {
    async function fetchDetail() {
      let orgNum = props.match.params.orgnum;
      if (orgNum) {
        const detailService: DetailService = new DetailService();
        const data = await detailService.fetchDetail(Number(orgNum));
        if (data !== undefined) {
          setDetail(data);
        }
      } else {
        alert("Organization number missing.");
      }
    }

    fetchDetail();
  }, [props.match.params.orgnum]);

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Detail</Navbar.Brand>
        <Link to="/">
          <Button variant="secondary">Back</Button>
        </Link>
      </Navbar>

      {detail.organizationNumber ? (
        <Container>
          <Row>
            <Col>
              <Table striped bordered>
                <tbody>
                  <tr>
                    <td>Organization Number</td>
                    <td>{detail.organizationNumber}</td>
                  </tr>
                  <tr>
                    <td>Organization Name</td>
                    <td>{detail.organizationName}</td>
                  </tr>
                  <tr>
                    <td>Organization Description</td>
                    <td>{detail.organizationFormDescription}</td>
                  </tr>
                  <tr>
                    <td>Registration Date</td>
                    <td>{detail.registrationDate}</td>
                  </tr>
                  <tr>
                    <td>Number of Employee</td>
                    <td>{detail.numberOfEmployee}</td>
                  </tr>
                  <tr>
                    <td>Country (Code)</td>
                    <td>
                      {detail.country} ({detail.countryCode})
                    </td>
                  </tr>
                  <tr>
                    <td>Post Code</td>
                    <td>{detail.postCode}</td>
                  </tr>
                  <tr>
                    <td>Post Office</td>
                    <td>{detail.postOffice}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>
                      {detail.address.map((item, index) => {
                        return item + ", ";
                      })}
                    </td>
                  </tr>
                  <tr>
                    <td>Municipality (Municipality Number)</td>
                    <td>
                      {detail.municipality} ({detail.municipalityNumber})
                    </td>
                  </tr>
                  <tr>
                    <td>Established Date</td>
                    <td>{detail.establishedDate}</td>
                  </tr>
                  <tr>
                    <td>
                      Institution Sector Description (Institution Sector Code)
                    </td>
                    <td>
                      {detail.institutionSectorDescription} (
                      {detail.institutionSectorCode})
                    </td>
                  </tr>
                  <tr>
                    <td>Bankrupt</td>
                    <td>{detail.bankruptcy ? "Yes" : "No"}</td>
                  </tr>
                  <tr>
                    <td>Maalform</td>
                    <td>{detail.maalform}</td>
                  </tr>
                </tbody>
              </Table>
              <Link to={detail.sourceUrl} target="_blank">
                Data source
              </Link>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col>Oops. Invalid organization number.</Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default withRouter(Detail);
