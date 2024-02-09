// import React from 'react';
import axios from 'axios';
import React, { useState, useEffect } from "react";

export default function FFFF() {
    useEffect(() => {
        getJson()
    }, [])

    const [gets, setGetJson] = useState([])
    const getJson = async () => {
        try {
            const response = await axios.get("http://192.168.37.172:80/data")
            setGetJson(response.data)
            console.log(response.data)
        } catch {
            console.error('Error GET Data:', error);
        }
    }

    return (
        <div>
        <div className="container mx-auto overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            map
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {gets.map((get, index) => {
                        return (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {get.id}
                                </th>
                                <td className="px-6 py-4">
                                    {get.name}
                                </td>
                                <td className="px-6 py-4">
                                    {get.map}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        <a href={gets[1].map}>map</a>
        </div>
    );
}
