import React from 'react'
import {Navigate,useRoutes} from 'react-router-dom'
import Dashboard from './Layout/Dashboard'
import RegionViewApi from './ViewApi/RegionViewApi'
import FormikRegionViewApi from './ViewApi/FormikRegionViewApi'
import FormikRegionViewApiRedux from './ViewReduxSaga/FormikRegionViewApi'
import FormikCountryViewApi from './ViewApi/FormikCountryViewApi'
import FormikCountryViewApiRedux from './ViewReduxSaga/FormikCountryViewApi'

export default function Routes() {
  return useRoutes([
    {
        path: '/',
        element :<Dashboard/>,
        children:[
            {path:'region', element:<RegionViewApi/>},
            {path:'regionformik', element:<FormikRegionViewApi/>},
            {path:'regionredux',element:<FormikRegionViewApiRedux/>},
            {path:'countryformik', element:<FormikCountryViewApi/>},
            {path:'countryredux',element:<FormikCountryViewApiRedux/>}
        ]
    },
    {
        path:'*', element:<Navigate to='/404' replace/>
    }
  ])
}
