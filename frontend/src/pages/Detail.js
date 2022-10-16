import { useParams } from "react-router-dom";
import { Table, Dropdown, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
// import {leaseData} from "../data.js";
import axios from "axios";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";
import ReactApexChart from "react-apexcharts";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function Detail(props) {
  const [leaseArray, setLeaseArray] = useState([]);
  const [leaseData, setLeaseData] = useState({});
  let { apt } = useParams();
  let { type } = useParams();
  console.log(apt, type);

  const url = `http://localhost:8000/apartments/get_apartment_detail/?id=${apt}&flat_type=${type}`;
  // const leaseDataData = leaseData.lease_data;
  console.log(url);

  const getData = async () => {
    const { data } = await axios.get(url);
    console.log(data);
    setLeaseData(data);
    setLeaseArray(data.lease_data);
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //     axios.get(url,
  //              ).then((res)=>{ console.log("@@", res.data);
  //              setLeaseData(res.data);
  //             });
  // }, [url, apt, type])
  // console.log(leaseData);

  const series = [
    {
      name: "Average Price",
      data: [
        leaseData.three_year_data,
        leaseData.two_year_data,
        leaseData.one_year_data,
        leaseData.current_price_data,
      ],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
    },
    title: {
      text: "Price",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["2020-2021", "2021-2022", "2022-2023", "2023-2024"],
    },
  };

  function renderInput(input, index) {
    return (
      <tr key={index}>
        <td></td>
        <td>{input.contract_date}</td>
        <td>{input.lease_term}</td>
        <td>{input.lease_type}</td>
        <td>{input.price}</td>
      </tr>
    );
  }

  function displayHousingDetails() {
    return (
      <div>
        <Card style={{ width: "18rem" }}>
          <Card.Header>Housing Info</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>{leaseData.laundry}</ListGroup.Item>
            <ListGroup.Item>{leaseData.gym ? "Gym" : "No gym"}</ListGroup.Item>
            <ListGroup.Item>
              {leaseData.free_electicity
                ? "Free Electricity"
                : "Paid Electicity"}
            </ListGroup.Item>
            <ListGroup.Item>
              {leaseData.free_wifi_router ? "Free Wifi" : "Paid Wifi"}
            </ListGroup.Item>
            <ListGroup.Item>Collegetown </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    );
  }

  function aptDropdown() {
    console.log(type);
    const roomType =
      type == 0
        ? "Studio"
        : type == 1
        ? "1 bed"
        : type == 2
        ? "2 beds"
        : type == 3
        ? "3 beds"
        : type == 4
        ? "4 beds"
        : "5+ beds";
    return (
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {roomType}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-0">Studio</Dropdown.Item>
          <Dropdown.Item href="#/action-1">1 bed</Dropdown.Item>
          <Dropdown.Item href="#/action-2">2 beds</Dropdown.Item>
          <Dropdown.Item href="#/action-3">3 beds</Dropdown.Item>
          <Dropdown.Item href="#/action-4">4 beds</Dropdown.Item>
          <Dropdown.Item href="#/action-5">5+ beds</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  function showRating(count, rating) {
    return (
      <div>
        <StarRatingComponent
          name="rate"
          editing={false}
          renderStarIcon={() => <span>⭐️</span>}
          starCount={rating}
          value={rating}
        />
        <p>{count} reviews</p>
      </div>
    );
  }

  const AptInfo = styled.div``;
  const GeneralInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
  `;

  const RecentData = styled.div`
    padding: 20px;
  `;

  const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 16px;
  `;

  const DetailInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 20px;
  `;
  return (
    <div>
      <AptInfo>
        <GeneralInfo>
          <InfoBox>
            <h1>{leaseData.name}</h1>
            <h3>{leaseData.address}</h3>
          </InfoBox>
          <InfoBox>
            {showRating(leaseData.number_of_reviews, leaseData.rating)}
            {aptDropdown()}
          </InfoBox>
        </GeneralInfo>
        <DetailInfo>
          <div>
            <ReactApexChart
              options={options}
              series={series}
              type="line"
              height={350}
              width={1100}
            />
            <p>Max price: $1740, Min price: $1580</p>
          </div>
          {displayHousingDetails()}
        </DetailInfo>
      </AptInfo>

      <RecentData>
        <h2>Recent Lease Data</h2>
        <div style={{ textAlign: "right" }}>
          <Button size="sm" href="/add">
            Add Yours
          </Button>
        </div>
        <Table className="batch-table" stripped condensed hover>
          <thead>
            <th></th>
            <th>Contract Date</th>
            <th>Lease Term</th>
            <th>Lease Type</th>
            <th>Price</th>
          </thead>
          <tbody>{leaseArray.map(renderInput)}</tbody>
        </Table>
      </RecentData>
    </div>
  );
}

export default Detail;
