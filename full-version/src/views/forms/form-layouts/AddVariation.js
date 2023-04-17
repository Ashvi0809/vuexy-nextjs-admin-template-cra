// ** Reactstrap Imports

import { Table, CardHeader, CardTitle, CardBody, Label, Input, Button, Form, Row, Col, Card } from 'reactstrap'

import { useForm } from 'react-hook-form'
// import { useParams } from 'react-router-dom'
// import TextareaCounter from '../form-elements/textarea/TextareaCounter'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useState, useEffect } from 'react'

const AddVariation = () => {
  // const uId = useParams().id
  const [getOne, setGetOne] = useState({})
  console.log(getOne?.id, '----------')
  const {
    reset,
    // control,
    register,
    handleSubmit
    // formState: { errors }
  } = useForm({ mode: 'onChange' })
  const { ref: refName, ...restName } = register('name')

  //Get Api
  const [category, setCategoy] = useState([])

  const getCategory = async () => {
    try {
      return await axios.get('http://localhost:5005/api/v6/getVariation').then(res => {
        setCategoy(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategory()
  }, [])
  const createCategory = async data => {
    console.log('-----', data)
    return await axios.post('http://localhost:5005/api/v6/addVariation', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  const addUpdatedData = async (data, id) => {
    return axios.put(`http://localhost:5005/api/v6/${id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const submit = rawData => {
    console.log(rawData)
    const formData = {
      name: rawData.name
    }
    console.log('formData', formData)
    //api
    if (getOne?.id !== undefined) {
      addUpdatedData(formData, getOne?.id)
        .then(res => {
          toast.success('Category updated Successfully.')
          console.log('--------', res.data)
          getCategory()
        })
        .catch(err => {
          toast.error(err.response?.data?.message || 'updated Something went wrong!')
        })
    } else {
      createCategory(formData)
        .then(res => {
          toast.success('Category added Successfully.')
          console.log('--------', res.data)
          getCategory()
        })
        .catch(err => {
          toast.error(err.response?.data?.message || 'Something went wrong!')
        })
    }
  }

  const getOneCategory = async id => {
    try {
      return axios.get(`http://localhost:5005/api/v6/${id}`).then(res => {
        setGetOne(res.data)
      })
    } catch (err) {
      console.log(err)
    }
  }
  //Delete api

  const deleteCategory = async id => {
    try {
      return axios.delete(`http://localhost:5005/api/v6/${id}`).then(res => {
        console.log(res)
        if (res.status === 200) {
          console.log('done')
          getCategory()
        }
      })
    } catch (err) {
      console.log('error in  delete api ', err)
    }
  }
  //
  //reset
  const handleReset = () => {
    reset({
      name: ''
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h1'>
          <h2>Add Variation</h2>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(submit)}>
          <Row className='mb-1'>
            <Label sm='3' for='name'>
              <h5>Add Variation</h5>
            </Label>
            <Col sm='9'>
              <Input
                type='text'
                name='name'
                id='name'
                placeholder='name'
                {...restName}
                innerRef={refName}
                defaultValue={getOne.name}
              />
            </Col>
          </Row>
          <Row>
            <Col className='d-flex' md={{ size: 9, offset: 3 }}>
              <Button className='me-1' color='primary' type='submit' onClick={addUpdatedData}>
                Add
              </Button>
              <Button outline color='secondary' type='reset' onClick={handleReset}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
      <Row className='mt-5'>
        <Col sm='12'>
          <Card title='Basic'>
            <Table responsive>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* <tr>
                  <td>Ronald Frest</td>
                  <td>b bhjbh</td>
                </tr> */}
                {category.map(doc => {
                  return (
                    <tr>
                      <td>{doc.id}</td>
                      <td>{doc.name}</td>
                      <td>
                        <Button className='me-1' color='primary' type='reset' onClick={() => getOneCategory(doc.id)}>
                          EDIT
                        </Button>
                        <Button color='primary' type='submit' onClick={() => deleteCategory(doc.id)}>
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Card>
  )
}
export default AddVariation
