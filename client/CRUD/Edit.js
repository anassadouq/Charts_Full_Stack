import React, { useState ,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";

export default function Edit() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name,setName] = useState('')
    const [salary, setSalary] = useState('')
    const [age, setAge] = useState('')

    useEffect(()=>{
        fetchEmploye();
    },[])

    const fetchEmploye = async() =>{
        await axios.get(`http://127.0.0.1:8000/api/employe/${id}`)
        .then(({ data }) => {
            const { name, salary, age } = data.employe
            setName(name)
            setSalary(salary)
            setAge(age)
        }).catch(({ response: {data} }) => {
            console.log(data.message)
        })
    }

    const updateEmploye = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('_method', 'PATCH')
        formData.append('name', name)
        formData.append('salary', salary)
        formData.append('age', age)

        await axios.post(`http://127.0.0.1:8000/api/employe/` + id, formData)
        .then(({ data }) => {
            console.log(data.message)
            navigate('/')
        }).catch(({ response }) => {
            if (response.status == 422) {
                console.log(response.data.errors)
            } else {
                console.log(response.data.message)
            }
        })
    }

    return (
        <center>
            <div className="center-container">
                <form onSubmit={updateEmploye} className="custom-form">
                    <table>
                        <tr>
                            <td>
                                <b>name</b>
                            </td>
                            <td>
                                <input type="text" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control my-4"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>salary</b>
                            </td>
                            <td>
                                <input type="text" name="salary" value={salary} onChange={(e)=>{setSalary(e.target.value)}} className="form-control my-4"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <b>Age</b>
                            </td>
                            <td>
                                <input type="text" name="age" value={age} onChange={(e)=>{setAge(e.target.value)}} className="my-4 mx-1"/>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>
                                <button className="form-control btn btn-secondary">Update</button>
                            </td>
                        </tr>
                    </table>                           
                </form>
            </div>
        </center>
    )
}
