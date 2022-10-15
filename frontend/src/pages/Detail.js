import {useParams} from "react-router-dom";
import {Table, Dropdown} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {leaseData} from "../data.js";
import axios from 'axios';
import styled from "styled-components";


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

    function aptDropdown() {
        return (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Studio
            </Dropdown.Toggle>
      
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">1 bedroom</Dropdown.Item>
              <Dropdown.Item href="#/action-1">2 bedrooms</Dropdown.Item>
              <Dropdown.Item href="#/action-1">3 bedrooms</Dropdown.Item>
              <Dropdown.Item href="#/action-1">4+ bedrooms</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Studio</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        );
    }
    const AptInfo = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    `;

    const RecentData = styled.div`
        padding: 20px;
    `;

    return(
        <div>
            <AptInfo>
                <h1>Collegetown Center</h1>
                {aptDropdown()}
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