import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  Navbar,
  Row,
} from "react-bootstrap";
import "./Home.css";

import IPage from "../interfaces/IPage";

import UnitCard from "../components/UnitCard";
import { UnitService } from "../services/UnitService";
import { checkQueryType, issetOrEmpty } from "../helpers/General";

import { PageInfoType } from "../types/PageInfoType";
import { UnitCardType } from "../types/UnitCardType";

type Query = {
  value: string;
};

const defaultQuery = {
  value: "",
};

const defaultPageInfo: PageInfoType = {
  number: 0,
  size: 0,
  totalElements: 0,
  totalPages: 0,
  firstPage: "",
  previousPage: "",
  lastPage: "",
  currentPage: "",
  nextPage: "",
};

const defaultUnitCards: Array<UnitCardType> = [
  {
    name: "",
    organizationNumber: "",
    description: "",
    link: "",
    bankrupt: false,
  },
];

const Home: React.FunctionComponent<IPage> = (props) => {
  const [query, setQuery] = useState(defaultQuery);
  const [pageInfo, setPageInfo] = useState(defaultPageInfo);
  const [unitCards, setUnitCards] = useState(defaultUnitCards);

  function onQueryChange<P extends keyof Query>(prop: P, value: Query[P]) {
    setQuery({ ...query, [prop]: value });
  }

  useEffect(() => {
    async function getData() {
      const unitService: UnitService = new UnitService();
      const queryType = checkQueryType(query.value);
      if (queryType === "number") {
        if (query.value.length > 9) {
          setPageInfo(defaultPageInfo);
          setUnitCards(defaultUnitCards);
          alert(
            "Invalid organization number. Organization number is 9 digit long."
          );
        }

        if (query.value.length < 9) {
          setPageInfo(defaultPageInfo);
          setUnitCards(defaultUnitCards);
        }

        if (query.value.length === 9) {
          const data = await unitService.fetchUnit(query.value, queryType);
          const pageInfo = data.pageInfo;
          const cardArr = data.cardArr;
          if (cardArr.length) {
            setPageInfo(pageInfo);
            setUnitCards(cardArr);
          }
        }
      }

      if (queryType === "name") {
        if (query.value.length > 2) {
          const data = await unitService.fetchUnit(query.value, queryType);
          if (typeof data !== "undefined") {
            if (typeof data.pageInfo !== "undefined" && data.cardArr.length) {
              setPageInfo(data.pageInfo);
              setUnitCards(data.cardArr);
            }
          } else {
            setPageInfo(defaultPageInfo);
            setUnitCards(defaultUnitCards);
          }
        }
      }

      if (queryType === undefined) {
        setPageInfo(defaultPageInfo);
        setUnitCards(defaultUnitCards);
      }
    }
    getData();
  }, [query]);

  async function paginate(e: React.MouseEvent<Element, MouseEvent>) {
    e.preventDefault();
    const url = String(e.currentTarget.getAttribute("fetch-url"));
    const unitService: UnitService = new UnitService();
    const data = await unitService.paginate(url);
    const page = data.page;
    const links = data._links;
    const pageInfo: PageInfoType = {
      number: page.number,
      size: page.size,
      totalElements: page.totalElements,
      totalPages: page.totalPages,
      firstPage: issetOrEmpty(links.first, ""),
      lastPage: issetOrEmpty(links.last, ""),
      currentPage: links.self.href,
      nextPage: issetOrEmpty(links.next, ""),
      previousPage: issetOrEmpty(links.prev, ""),
    };
    setPageInfo(pageInfo);
    if (data._embedded !== undefined) {
      const cards = data._embedded.enheter;
      const cardArr: Array<UnitCardType> = new Array<UnitCardType>();
      cards.forEach((el: any) => {
        const tmp: UnitCardType = {
          name: el.navn,
          organizationNumber: el.organisasjonsnummer,
          description: el.organisasjonsform.beskrivelse,
          bankrupt: el.konkurs,
          link: el._links.self.href,
        };
        cardArr.push(tmp);
      });
      setUnitCards(cardArr);
    }
  }
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Search</Navbar.Brand>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  className="query-input"
                  onChange={(e) => {
                    onQueryChange("value", e.target.value);
                  }}
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>
        {unitCards.length
          ? unitCards.map((value, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <UnitCard {...value}></UnitCard>
                  </Col>
                </Row>
              );
            })
          : ""}
        <Row className="pagination">
          <Col>
            <Button
              disabled={pageInfo.firstPage === "" ? true : false}
              fetch-url={pageInfo.firstPage}
              block
              onClick={paginate}
            >
              First
            </Button>
          </Col>
          <Col>
            <Button
              disabled={pageInfo.previousPage === "" ? true : false}
              fetch-url={pageInfo.previousPage}
              block
              onClick={paginate}
            >
              Previous
            </Button>
          </Col>
          <Col>
            <Button
              disabled={pageInfo.nextPage === "" ? true : false}
              fetch-url={pageInfo.nextPage}
              block
              onClick={paginate}
            >
              Next
            </Button>
          </Col>
          <Col>
            <Button
              disabled={pageInfo.lastPage === "" ? true : false}
              fetch-url={pageInfo.lastPage}
              block
              onClick={paginate}
            >
              Last
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
