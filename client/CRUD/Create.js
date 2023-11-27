import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BiAddToQueue } from 'react-icons/bi';


export default function Create(){
    
    const [name,setName] = useState('')
    const [salary, setSalary] = useState('')
    const [age, setAge] = useState('')
    const navigate = useNavigate();

    const createEmploye = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name)
        formData.append('salary', salary)
        formData.append('age', age)

        try {
            await axios.post('http://127.0.0.1:8000/api/employe', formData);
            navigate("/");
          } catch (error) {
            console.error('Failed to add employee:', error);
        }   
    }

    return(
        <center>
            <form onSubmit={createEmploye}>
                <table>
                    <tr>
                        <td><b>Name</b></td>
                        <td>
                            : <input type="text" name="name" onChange={(e)=>{setName(e.target.value)}} placeholder="Write Name" className="my-3"/>
                        </td>
                    </tr>
                    <tr>
                        <td><b>Salary</b></td>
                        <td>
                            : <input type="text" name="salary" onChange={(e)=>{setSalary(e.target.value)}} placeholder="Write Salary" className="my-3"/>
                        </td>
                    </tr>
                    <tr>
                        <td><b>Age</b></td>
                        <td>
                            : <input type="text" name="age" onChange={(e)=>{setAge(e.target.value)}} placeholder="Write Age" className="my-3"/>
                            <button className="btn btn-warning mx-2"><BiAddToQueue/> Add</button>
                        </td>
                    </tr>
                </table>
            </form>
        </center>
    )
}