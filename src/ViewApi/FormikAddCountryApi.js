import React, { useState } from 'react'
import { useFormik } from 'formik'
import CountryApi from '../api/CountryApi'

export default function FormikAddCountryApi(props) {
    const formik = useFormik({
        initialValues:{
            countryName:undefined
        },
        onSubmit:async(values)=>{
            let payload = new FormData();
            payload.append('countryName',values.countryName)

            await CountryApi.Create(payload)
            .then(()=>{
                props.closeAdd();
                window.alert('Data Successfully Insert')
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
