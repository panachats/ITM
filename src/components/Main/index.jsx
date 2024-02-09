
import { useState, useEffect } from "react"
import Axios from 'axios'
import DataTable from "react-data-table-component"

export default function Table() {

  useEffect(() => {
    getTest()
  }, [])

  const [test, setTest] = useState([])
  const getTest = async () => {
    Axios.get('https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8').then((response) => {
      setTest(response.data)
    }).catch(error => {
      console.error('Error fetching test:', error)
    })
  }
  
  const [record, setRecord] = useState([])

  useEffect(() => {
    setRecord(test);
  }, [test]);

  function handleFilter(event) {
    try {
      const newData = test.filter(test => {
        return test.name.toLowerCase().includes(event.target.value.toLowerCase())
      });
      setRecord(newData);
      console.log(newData)
    } catch (error) {
      console.error('Error in handleFilter:', error);
    }
  }
  

  const columns = [
    {
      name: 'name',
      selector: test => test.name,
      sortable: true
    },
    {
      name: 'city',
      selector:  test => test.city,
      sortable: true
    }

  ]

  return (
    <div className="container mx-auto">
      <div><input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" onChange={handleFilter} /></div>
      <DataTable columns={columns}
        data={record} selectableRows fixedHeader pagination>
      </DataTable>
    </div>
  )

};



