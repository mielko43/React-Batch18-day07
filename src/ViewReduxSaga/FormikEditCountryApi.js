import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { EditCountryRequest, GetOneCountryRequest } from '../redux-saga/Action/CountryAction'

export default function FormikEditCountryApi(props) {
    const dispatch = useDispatch()
    const { country } = useSelector(state => state.countryStated)
    useEffect(() => {
        dispatch(GetOneCountryRequest(props.id))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            countryId: country.countryId,
            countryName: country.countryName
        },
        onSubmit: async (values) => {
            let payload = new FormData();
            payload.append('countryName', values.countryName)
            payload.append('countryId', values.countryId)

            dispatch(EditCountryRequest(payload))
            props.closeAdd();
            window.alert('Data Successfully Updated')
            props.onRefresh();
        }
    })
    return (
        <div>
            <label class="block text-sm font-medium text-gray-700">Country Name : </label>
            <input
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                type="text"
                name="countryName"
                id="CountryName"
                value={formik.values.countryName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="countryName"
                onInvalid={formik.validateField}
            />
            {formik.touched.countryName && formik.errors.countryName ? <span className="mt-2 text-sm text-red-600">{formik.errors.countryName}</span> : null}
            <div>
                <button type='submit' className="cursor-pointer inline-flex justify-center py-2 px-2 shadow-sm text-sm font-medium rounded-md text-indigo-500 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={formik.handleSubmit}> Simpan </button>
                <button className="cursor-pointer inline-flex justify-center py-2 px-2 shadow-sm text-sm font-medium rounded-md text-indigo-500 hover:text-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => props.setDisplay(false)}> Cancel </button>
            </div>
        </div>
    )
}
