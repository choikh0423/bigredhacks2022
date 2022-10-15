import {useParams} from "react-router-dom";
import {Table} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {leaseData} from "../data.js";
import axios from 'axios';

function Detail(props) {
    const [leaseData, setLeaseData] = useState(0);
    let {apt} = useParams();
    let {type} = useParams();
    console.log(apt, type)

    useEffect(() => {
        axios.get('/data-endpoint'
                 ).then((res)=>{console.log('@@', res.data);
                 setLeaseData(res.data);
                });
    }, [])

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
    return(
        <div>
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
        </div>
    )

    
}

export default Detail