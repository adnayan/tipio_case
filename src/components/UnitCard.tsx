import React from "react";
import { Card } from "react-bootstrap";

type UnitCardProps = {
  name: string;
  organizationNumber: string;
  description: string;
  bankrupt: boolean;
  link: string;
};

function UnitCard(props: UnitCardProps) {
  let render = false;
  if (props.link !== "") {
    render = true;
  }
  return (
    <>
      {render ? (
        <Card>
          <Card.Body>
            <Card.Title>Entity name: {props.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Organization number: {props.organizationNumber}
            </Card.Subtitle>
            <Card.Text>Description: {props.description}</Card.Text>
            <Card.Text>
              Bankruptcy Status: {props.bankrupt ? "Yes" : "No"}
            </Card.Text>
            <Card.Link href={"/detail/" + props.organizationNumber}>
              Detail
            </Card.Link>
            <Card.Link href={props.link} target="_blank">
              Data Source
            </Card.Link>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export default UnitCard;
