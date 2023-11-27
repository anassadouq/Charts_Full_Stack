import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DonutChart from "../DonutChart";
import BarChart from "../BarChart";
import LineChart from "../LineChart";
import { BiAddToQueue } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';

export default function Liste() {
    const [employes, setEmploye] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/employe")
        .then(response => {
            setEmploye(response.data);
        })
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/employe/${id}`)
        .then(response => {
            console.log(response.data.message);
            window.location.reload();

            // If deletion is successful, update the state to reflect the changes
            setEmploye(prevEmploye => prevEmploye.filter(employe => employe.id !== id));
        })
    };

    return (
        <div>
            <div className="container row">
                <div className="col">
                    <DonutChart/>
                </div>
                <div className="col"> 
                    <LineChart/>
                </div>
                <div className="col"> 
                    <BarChart/>
                </div>
            </div>
            <Link to='/create'>
                <button className="btn btn-warning mx-2 my-4"><BiAddToQueue/> Add</button>
            </Link>
            <table width="100%" style={{"textAlign":"center"}}>
                <thead>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </thead>
                {employes.map((employe,key) => (
                    <tbody key={key}>
                        <td>{employe.name}</td>
                        <td>{employe.age} years</td>
                        <td>{employe.salary} DH</td>
                        <td>
                        <Link to={`/edit/${employe.id}`} >
                            <button className="btn btn-secondary mx-1"><FaEdit/> Update</button>
                        </Link>
                            <button onClick={() => handleDelete(employe.id)} className="btn btn-danger">
                                <RiDeleteBin5Line/> Delete
                            </button>
                        </td>
                    </tbody>
                ))}
            </table>
        </div>
    );
}