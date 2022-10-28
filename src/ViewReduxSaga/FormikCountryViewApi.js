import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetCountryRequest, DelCountryRequest } from '../redux-saga/Action/CountryAction'
import FormikAddCountryApi from './FormikAddCountryApi'
import FormikEditCountryApi from './FormikEditCountryApi'
import Header from '../Component/Header'

export default function FormikRegionViewApi() {
  const dispatch = useDispatch()
  const [refresh, setRefresh] = useState(false)
  const [id, setId] = useState()
  const [display, setDisplay] = useState(false)
  const [displayEdit, setDisplayEdit] = useState(false)
  const { countries } = useSelector(state => state.countryStated)
  useEffect(() => {
    dispatch(GetCountryRequest())
  }, [])

  const onDelete = async (id) => {
    dispatch(DelCountryRequest(id))
  }
  const onClick = (id) => {
    setDisplayEdit(true)
    setId(id)
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            <Header name={'Country'} setDisplay={setDisplay}/>
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-auto ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Country ID</th>
                    <th scope="col" className="px-6 py-3">Country Name</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="overscroll-auto md:overscroll-contain">
                  {
                    countries && countries.map(coun => (
                      <tr key={coun.country_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td scope="row" className="px-6 py-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">{coun.countryId}</td>
                        <td className="px-6 py-2">{coun.countryName}</td>
                        <td>
                          <td className='flex w-max gap-4'>
                            <button type="button" className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-500 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" onClick={() => onDelete(coun.countryId)}>Delete Country</button>
                          </td>
                          <button type="button" className="middle none font-sans font-bold center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-500 text-white shadow-md shadow-red-500/20 hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" onClick={() => onClick(coun.countryId)}>Edit Country</button>
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
