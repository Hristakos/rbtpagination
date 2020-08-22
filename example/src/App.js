import React from 'react'

import PaginationTable from 'rbtpagination'
import 'rbtpagination/dist/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Data to be used to populate table
const data = [
  { name: 'Peter', email: 'peter@peter.com', address: '1 Smith St' },
  { name: 'Shailesh', email: 'shailesh@shailesh.com', address: '1 Collins St' },
  { name: 'Glen', email: 'glen@glen.com', address: '1 King St' }
]

// Here you can specify what properties you want to search by
// label is what is to be displayed as option in dropdown list
const searchBy = [
  [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' }
  ]
]
// Here you can specify which keys of dataset you want to display and label is
// The table column heading

const tableData = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Street Address', key: 'address' }
]
const App = () => {
  return (
    <PaginationTable
      dataSet={data}
      searchData={searchBy}
      tableData={tableData}
      handleItemClick={false}
      itemClickRedirect={false}
      itemsPerPage={10}
    />
  )
}

export default App
