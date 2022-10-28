import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'
import { AddCountryRequest } from '../redux-saga/Action/CountryAction'

export default function FormikAddCountryApi(props) {
    const dispatch = useDispatch()
    const validationSchema = Yup.object().shape({
        countryName: Yup.string('Enter Country Name').required('Country Name is Required')
    })
    const formik = useFormik({
        initialValues: {
            countryName: undefined,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            let payload = new FormData();
            payload.append('countryName', values.countryName)

            dispatch(AddCountryRequest(payload))
            props.closeAdd()
            window.alert('Data Successfully Insert')
            props.onRefresh()
        }
    })
    return (
        <div>
            <label class="block text-sm font-medium text-gray-700">Country Name : </label>
            <input
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                type="text"
                name="countryName"
                id="countryName"
                value={formik.values.countryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="countryName"
                onInvalid={formik.validateField}
            />
            {formik.touched.countryName && formik.errors.countryName ? <span className="mt-2 text-sm text-red-600">{formik.errors.CountryName}</span> : null}
            <div>
                <button type='submit' className="cursor-pointer inline-flex justify-center py-2 px-2 shadow-sm text-sm font-medium rounded-md text-indigo-500 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={formik.handleSubmit}> Simpan </button>
                <button className="cursor-pointer inline-flex justify-center py-2 px-2 shadow-sm text-sm font-medium rounded-md text-indigo-500 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => props.setDisplay(false)}> Cancel </button>
            </div>
        </div>
    )
}
