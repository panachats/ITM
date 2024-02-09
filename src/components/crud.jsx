import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
// const MySwal = withReactContent(Swal)
import { Helmet } from 'react-helmet';

export default function Table() {

    useEffect(() => {
        getTest()
    }, [])


    const [gets, setGet] = useState([])
    const getTest = async () => {
        try {
            const response = await axios.get('http://192.168.0.232:8000/getuser');
            setGet(response.data.profile);
        } catch (error) {
            console.error('Error GET Data:', error);
        }
    }


    const postData = async () => {
        try {
            Swal.fire({
                title: "Enter User Information",
                html: `
                    <input id="firstname" type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs"/>
                    <input id="lastname" type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
                    <input id="age" type="number" placeholder="Age" className="input input-bordered w-full max-w-xs" />
                `,
                focusConfirm: false,
                showCancelButton: true,
                preConfirm: () => {
                    const firstname = document.getElementById('firstname').value;
                    const lastname = document.getElementById('lastname').value;
                    const age = document.getElementById('age').value;
                    console.log(firstname)
                    console.log(lastname)
                    console.log(age)

                    if (!firstname || !lastname || !age) {
                        checkFormNull()
                    }
                    return { firstname, lastname, age }

                }
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const { firstname, lastname, age } = result.value;
                    console.log(result)

                    const response = await axios.post('http://192.168.0.232:8000/adduser', {
                        "firstname": firstname,
                        "lastname": lastname,
                        "age": age
                    });

                    console.log('Post successful:', response.data);
                    getTest();
                }
            });
        } catch (error) {
            console.error('Error POST Data:', error);
        }

        
    }



    const putData = async (vv) => {
        try {
            Swal.fire({
                title: 'Edit User Information',
                html: `
                <label class="form-control w-full px-16 ms-auto">

                <div class= "label"><span class="label-text">ID</span></div>
                <input id="tid" type="number" placeholder="First Name" class="input input-bordered w-full rounded-2xl" value="${vv.tid}" disabled/>
               
                <div class= "label"><span class="label-text">What is your name?</span></div>
                <input id="firstname" type="text" placeholder="First Name" class="input input-bordered w-full rounded-2xl focus:ring focus:ring-violet-300" value="${vv.firstname}">
                
                <div class= "label"><span class="label-text">What is your name?</span></div>
                <input id="lastname" type="text" placeholder="Last Name" class="input input-bordered w-full rounded-2xl" value="${vv.lastname}">


                <div class= "label"><span class="label-text">What is your name?</span></div>
                <input id="age" type="number" placeholder="Age" class="input input-bordered w-full rounded-2xl" min=0 max=99 value="${vv.age}">

                
                </label>
                    
                `,
                focusConfirm: false,
                showCancelButton: true,
                customClass: {
                    confirmButton: 'btn btn-error',
                    cancelButton: 'btn btn-error'
                },
                preConfirm: () => {
                    const tid = document.getElementById('tid').value;
                    const firstname = document.getElementById('firstname').value;
                    const lastname = document.getElementById('lastname').value;
                    const age = document.getElementById('age').value;
                    if (!firstname || !lastname || !age) {
                        checkFormNull()
                    }
                    return { tid, firstname, lastname, age };
                }
            }).then(async (result) => {

                if (result.isConfirmed) {
                    const { tid, firstname, lastname, age } = result.value;

                    const response = await axios.put('http://192.168.0.232:8000/putuser', {
                        "tid": tid,
                        "firstname": firstname,
                        "lastname": lastname,
                        "age": age
                    });
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Signed in successfully"
                    });

                    console.log('Put successful:', response.data);
                    getTest();
                }
            });
        } catch (error) {
            console.error('Error PUT Data:', error);
        }
    }


    const deleteData = async (vv) => {
        try {
            await axios.delete('http://192.168.0.232:8000/deleteuser', {
                data: {
                    tid: vv.tid,
                },
            });
            Swal.fire({
                icon: 'success',
                title: 'delete Complete',
                text: 'UserID ' + vv.tid + ' deleted',
            });
            getTest();
        } catch (error) {
            console.log('Error Delete Data:', error);
            if (error.response && error.response.status === 500) {
                const errorMessage = error.response.data.detail;
                console.log(error.response.data.detail)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An unexpected error occurred. Please try again later.',
                });
            }
        }
    }


    const checkFormNull = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Input your Field',
        })
    }






    return (
        <>
            <Helmet>
                <title>Table</title>
            </Helmet>
            <div className="container overflow-x-auto ms-auto">
                <table className="table table-sm hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gets.map((get, index) => (
                            <tr key={index}>
                                <td>{get.tid}</td>
                                <td>{get.firstname}</td>
                                <td>{get.lastname}</td>
                                <td>{get.age}</td>
                                <td>
                                    <button class="btn btn-neutral btn-xs mx-1" onClick={putData.bind(this, get)}>Edit</button>
                                    <button class="btn btn-error text-white btn-xs mx-1 sm:my-1" onClick={deleteData.bind(this, get)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <button class="btn btn-error" onClick={postData}>Add Data</button>
                </table>
            </div>
        </>
    );
}