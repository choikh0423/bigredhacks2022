import {useParams} from "react-router-dom";
import {Table, Dropdown} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {leaseData} from "../data.js";
import axios from 'axios';
import styled from "styled-components";
import StarRatingComponent from 'react-star-rating-component';
import ReactApexChart from 'react-apexcharts'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';


function Detail(props) {
    // const [leaseData, setLeaseData] = useState(0);
    let {apt} = useParams();
    let {type} = useParams();
    console.log(apt, type)

    // useEffect(() => {
    //     axios.get('/data-endpoint/'+apt+'/'+type
    //              ).then((res)=>{console.log('@@', res.data);
    //              setLeaseData(res.data);
    //             });
    // }, [apt, type])

    const series = [{
        name: "Average Price",
        data: [1110, 1360, 1450, 1670]
    }]

    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: true
        },
        stroke: {
            curve: 'straight'
        },
        title: {
            text: 'Price',
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: ['2020-2021', '2021-2022', '2022-2023', '2023-2024']
        }
    }
        
    function renderInput(input, index) {
        return (
            <tr key={index}>
                <td></td>
                <td>{input.contractDate}</td>
                <td>{input.leaseTerm}</td>
                <td>{input.leaseType}</td>
                <td>{input.price}</td>
            </tr>
        )
    }

    function displayHousingDetails() {
        return (
          <div>
            <Card style={{ width: '18rem' }}>
                <Card.Header>Housing Info</Card.Header>
                <ListGroup variant="flush">
                <ListGroup.Item>In-Unit Laundry</ListGroup.Item>
                <ListGroup.Item>Gym</ListGroup.Item>
                <ListGroup.Item>Electricity Included</ListGroup.Item>
                <ListGroup.Item>Wifi router</ListGroup.Item>
                <ListGroup.Item>Wireless</ListGroup.Item>
                <ListGroup.Item>Collegetown </ListGroup.Item>
                </ListGroup>
            </Card>
          </div>
        );
      }

    function aptDropdown() {
        return (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Studio
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">1 bedroom</Dropdown.Item>
              <Dropdown.Item href="#/action-2">2 bedrooms</Dropdown.Item>
              <Dropdown.Item href="#/action-3">3 bedrooms</Dropdown.Item>
              <Dropdown.Item href="#/action-4">4+ bedrooms</Dropdown.Item>
              <Dropdown.Item href="#/action-5">Studio</Dropdown.Item>
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
        )
    }

    const AptInfo = styled.div`
    `;
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
    return(
        <div>
            <AptInfo>
                <GeneralInfo>
                    <InfoBox>
                        <h1>Collegetown Center</h1>
                        <h3>151 Dryden Rd.</h3>
                    </InfoBox>
                    <InfoBox>
                        {showRating(130, 4)}
                        {aptDropdown()}
                    </InfoBox>
                </GeneralInfo>
                <DetailInfo>
                    <div>
                        <ReactApexChart options={options} series={series} type="line" height={350} width={1100}/>
                        <p>Max price: $1740, Min price: $1580</p>
                    </div>
                    {displayHousingDetails()}
                </DetailInfo>
            </AptInfo>
            
            <RecentData>
                <h2 className="main-title">Recent Lease Data</h2>

                <Table className="batch-table" stripped condensed hover>
                    <thead>
                    <th></th>
                    <th>Contract Date</th>
                    <th>Lease Term</th>
                    <th>Lease Type</th>
                    <th>Price</th>
                    </thead>
                    <tbody>

                    {Object.values(leaseData).map(renderInput)}
                    </tbody>
                </Table>
            </RecentData>
        </div>
    )
}

export default Detail