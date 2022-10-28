import React, { useState,useEffect } from 'react'
import { useFormik } from 'formik'
import CountryApi from '../api/CountryApi'

export default function FormikEditCountryApi(props) {
    const [country,setCountry]=useState([])
    useEffect(() => {
        CountryApi.FindOne(props.id).then(data => {
            setCountry(data)
        })
    }, [])
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            countryId:props.id,
            countryName:country.countryName,
            region:country.region
        },
        onSubmit:async(values)=>{
            let payload = new FormData();
            payload.append('countryName',values.countryName)
            payload.append('region',values.region)
            payload.append('countryId',values.countryId)

            await CountryApi.UpdateFile(payload)
            .then(()=>{
                props.closeAdd();
                window.alert('Data Successfully Updated')
                props.onRefresh();
            })
        }
    })
  return (
    <div>
        <div>
                <label>Country Name : </label>
                <input
                    type="text"
                    name="countryName"
                    id="countryName"
                    value={formik.values.countryName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="countryName"
                />
            </div>
            <div>
                <button type='submit' onClick={formik.handleSubmit}> Simpan </button>
                <button onClick={() => props.setDisplay(false)}> Cancel </button>
            </div>
    </div>
  )
}
