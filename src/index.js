import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'
import Pagination from 'react-bootstrap-4-pagination'
import {
  SplitButton,
  Dropdown,
  ButtonGroup,
  Row,
  Col,
  Container
} from 'react-bootstrap'

const paginate = (data, currentPage, numberOfRecords) => {
  let paginatedData = []
  const startPosition = currentPage * numberOfRecords
  for (
    let i = startPosition;
    i < startPosition + numberOfRecords && i < data.length;
    i++
  ) {
    paginatedData.push(data[i])
  }
  return paginatedData
}
function PaginationTable({
  dataSet,
  searchData,
  tableData,
  handleItemClick,
  itemClickRedirect,
  itemsPerPage
}) {
  const [dataList, setDataList] = useState(dataSet) // ful of data passed in.
  const [filteredDataList, setFilteredDataList] = useState([]) // list og items that meet seacrh criteria
  const [searchCriteria, setSearchCriteria] = useState(searchData[0]) // Search by
  const [searchCriteriaValue, setSearchCriteriaValue] = useState('')
  const [paginationData, setPaginationData] = useState([]) // Items to  be displayed on screen depending on how many per page
  const [total, setTotal] = useState(0) // Sum of total items listed on screen
  const [current, setCurrent] = useState(0) // Displaying value of 1st item member on screen (ie 1 of 5)
  const [currentPage, setCurrentPage] = useState(0) // Current page of pagination
  const [numberOfItemsPerPage, setNumberOfStaffPerPage] = useState(
    Number(itemsPerPage)
  ) // How many items to display per screen (pagination)
  let history = useHistory()

  const changeNumberOfItemsPerPage = (e) => {
    setNumberOfStaffPerPage(Number(e.target.value))

    setScreen(
      filteredDataList.length > 0 ? filteredDataList : dataList,
      filteredDataList.length > 0 ? true : false,
      Number(e.target.value)
    )
  }
  // load data and set screen and pagination.
  const loadData = () => {
    setDataList(dataSet)
    setScreen(dataSet, false, numberOfItemsPerPage)
  }

  const setScreen = (data, isFiltered, number) => {
    setFilteredDataList(isFiltered ? data : [])
    setTotal(data.length)
    setCurrent(data.length > 0 ? 1 : 0)
    setCurrentPage(0)
    setPaginationData(paginate(data, 0, number))
  }

  const getFilteredItems = (criteria) => {
    return dataList.filter((item) => {
      if (
        String(item[searchCriteria.key])
          .toLowerCase()
          .includes(criteria.toLowerCase())
      )
        return item
      return ''
    })
  }
  // Return List of items that meet search criteria
  const searchForItem = (e) => {
    setSearchCriteriaValue(e.target.value)
    if (e.target.value === '') {
      setScreen(dataList, false, numberOfItemsPerPage)
      return
    }
    setScreen(getFilteredItems(e.target.value), true, numberOfItemsPerPage)
  }

  useEffect(() => {
    loadData()
    console.log('useeffect')
  }, [dataSet])

  let paginationConfig = {
    totalPages:
      numberOfItemsPerPage > 0 ? Math.ceil(total / numberOfItemsPerPage) : 0,
    currentPage: currentPage + 1,
    showMax: 20,
    prevNext: true,
    activeBgColor: 'dogerblue',
    activeBorderColor: 'dogerblue',
    color: 'dodgerblue',
    onClick: function (page) {
      if (page !== currentPage + 1) {
        setCurrentPage(page - 1)
        setPaginationData(
          paginate(
            filteredDataList.length > 0 ? filteredDataList : dataList,
            page - 1,
            numberOfItemsPerPage
          )
        )
        setCurrent(page === 1 ? 1 : (page - 1) * numberOfItemsPerPage + 1)
      }
    }
  }
  return (
    <Container fluid sm='12' md='12' lg='12' xl='12'>
      <Row>
        {/* <Col size="12" sm="4" md="4" lg="2" xl="2"></Col> */}
        <Col size='12' sm='12' md='12' lg='12' xl='12'>
          <Row>
            <Col sm='12' md='12' lg='12'>
              <div className={'pagination-list-search'}>
                <div className={'pagination-space-evenly'}>
                  <input
                    type='text'
                    name='search'
                    placeholder='Search by ...'
                    onChange={searchForItem}
                    value={searchCriteriaValue}
                  />
                  {[SplitButton].map((DropdownType, idx) => (
                    <DropdownType
                      as={ButtonGroup}
                      key={idx}
                      id={`dropdown-button-drop-${idx}`}
                      size='sm'
                      title={searchCriteria.label}
                    >
                      {searchData.map((criteria, index) => (
                        <Dropdown.Item
                          key={index}
                          onClick={(e) => {
                            setSearchCriteria(criteria)
                            setSearchCriteriaValue('')
                            setScreen(dataList, false, numberOfItemsPerPage)
                          }}
                          eventKey={index}
                        >
                          {criteria.label}
                        </Dropdown.Item>
                      ))}
                    </DropdownType>
                  ))}
                </div>
                <div className='pagination-space-evenly'>
                  <label>Items per page</label>
                  <input
                    type='number'
                    name='numberOfItemsPerPage'
                    onChange={changeNumberOfItemsPerPage}
                    value={numberOfItemsPerPage}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <table
                style={{ wordBreak: 'break-all' }}
                className='table table-bordered table-hover'
              >
                <thead>
                  <tr>
                    {tableData.map((data, index) => (
                      <th key={index}>{data.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginationData.map((item, index) => (
                    <tr
                      onClick={() => {
                        if (handleItemClick)
                          history.push(itemClickRedirect, item)
                      }}
                      key={index}
                    >
                      {tableData.map((data, index) => (
                        <td key={index}>{item[data.key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>

          <Pagination className='pagination' {...paginationConfig} />
          <div className='pagination-results'>
            <label>
              {numberOfItemsPerPage > 0 ? `${current} of ${total}` : '0 of 0'}
            </label>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default PaginationTable
