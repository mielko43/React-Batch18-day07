import React, { useState, useEffect } from 'react'
import CountryApi from '../api/CountryApi'
import FormikAddCountryApi from './FormikAddCountryApi'
import FormikEditCountryApi from './FormikEditCountryApi'

export default function FormikCountryViewApi() {
  const [country, setCountry] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [id, setId] = useState()

  const [display, setDisplay] = useState(false)
  const [displayEdit, setDisplayEdit] = useState(false)

  useEffect(() => {
    CountryApi.list().then(data => {
      setCountry(data)
    })
    setRefresh(false)
  }, [refresh])

  const onDelete = async (id) => {
    CountryApi.Delete(id).then(() => {
      setRefresh(true)
      window.alert('Data Successfully Delete')
    })
  }
  const onClick = (id) => {
    setDisplayEdit(true)
    setId(id)
  }
  return (
    <div>
      {
        displayEdit ?
          <FormikEditCountryApi
            id={id}
            setDisplay={setDisplayEdit}
            closeAdd={() => setDisplayEdit(false)}
            onRefresh={() => setRefresh(true)}
          />
          :
          display ?
            <FormikAddCountryApi
            setDisplay={setDisplay}
            closeAdd={() => setDisplay(false)}
            onRefresh={() => setRefresh(true)}
            />
            :
            <>
              <h2>List Country</h2>
              <button onClick={() => setDisplay(true)}>Add Country</button>
              <table>
                <th>Country ID</th>
                <th>Country Name</th>
                <th>Action</th>
                <tbody>
                  {
                    country && country.map(coun => (
                      <tr key={coun.country_id}>
                        <td>{coun.countryId}</td>
                        <td>{coun.countryName}</td>
                        <td>
                          <button onClick={() => onDelete(coun.countryId)}>Delete Country</button>
                          <button onClick={() => onClick(coun.countryId)}>Edit Country</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </>
      }
    </div>
  )
}
