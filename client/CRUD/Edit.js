import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from 'react-icons/fa';


export default function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/employe/${id}`);
            const { name, salary, age  } = response.data;
            setName(name);
            setSalary(salary);
            setAge(age);
        } catch (error) {
            console.error("Error fetching user:", error.message);
        }
    };

    const updateEmploye = async (e) => {
        e.preventDefault();
        const updateEmploye = { name, salary, age };
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/employe/${id}`, updateEmploye);
            console.log(response.data.message);
            navigate("/");
        } catch (error) {
            console.error("Error updating user:", error.message);
        }
    };

    return (
        <form onSubmit={updateEmploye}>
            <center>
                <table>
                    <tr>
                        <td><b>Name</b></td>
                        <td>
                            : <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} className="my-3"/>
                        </td>
                    </tr>
                    <tr>
                        <td><b>Salary</b></td>
                        <td>
                            : <input type="text" name="salary" value={salary} onChange={(e)=>{setSalary(e.target.value)}} className="my-3"/>
                        </td>
                    </tr>
                    <tr>
                        <td><b>Age</b></td>
                        <td>
                            : <input type="text" name="age" value={age} onChange={(e)=>{setAge(e.target.value)}} className="my-3"/>
                            <button className="btn btn-secondary mx-2"><FaEdit/> Update</button>
                        </td>
                    </tr>
                </table>
            </center>
        </form>
    );
}