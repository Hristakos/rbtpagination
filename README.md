# rbtpagination

> React Bootstrap form with search and pagination

[![NPM](https://img.shields.io/npm/v/rbtpagination.svg)](https://www.npmjs.com/package/rbtpagination) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save rbtpagination
```

## Dependencies

react-bootstrap
react-bootstrap-4-pagination
react-router-dom

## Usage

```jsx
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
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' }
]
// Here you can specify which keys of dataset you want to display and label is
// The table column heading. Gives flexibilty not to add all items from data.

const tableData = [
  { label: 'Name', key: 'name' },
  { label: 'Email', key: 'email' },
  { label: 'Street Address', key: 'address' }
]

// Handle item click allow you to make each row clickable and itemClickRedirect is the route
// you want to go to like an edit screen and the data for the item will be passed accross.

// Items per page default values to paginate
const App = () => {
  return (
    <PaginationTable
      dataSet={data}
      searchData={searchBy}
      tableData={tableData}
      handleItemClick={false}
      itemClickRedirect={''}
      itemsPerPage={10}
    />
  )
}

export default App
```

## License

MIT © [Hristakos](https://github.com/Hristakos)
