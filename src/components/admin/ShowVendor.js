import 'bootstrap/dist/css/bootstrap.css';

import {useEffect, useState} from "react";
import axios from "axios";

function ShowVendor() {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/accounts")
            .then(res => {
                console.log(res)
                setVendors(res.data);
            })
            .catch(function (err) {
                console.log(err)
            })
    }, []);

    return (
        <>

            <div className="container">
                <h2>List Vendor</h2>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Revenue</th>
                        <th>Number of houses</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        vendors.length > 0 && vendors.map((v) => {
                            return (
                                <tr>
                                    <td>{v.fullName}</td>
                                    <td>{v.phone}</td>
                                    <td></td>
                                    <td></td>
                                    <td>{v.status.name}</td>
                                    <td></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default ShowVendor;