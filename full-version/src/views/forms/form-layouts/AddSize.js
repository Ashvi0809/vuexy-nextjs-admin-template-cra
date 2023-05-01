// ** Reactstrap Imports

import { Table, CardHeader, CardTitle, CardBody, Label, Input, Button, Form, Row, Col, Card } from 'reactstrap'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { selectThemeColors } from '@utils'
// import { useParams } from 'react-router-dom'
// import TextareaCounter from '../form-elements/textarea/TextareaCounter'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useState, useEffect } from 'react'

const AddOption = () => {
  // const uId = useParams().id
  const [getOne, setGetOne] = useState({})
  console.log(getOne?.id, '----------')
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange' })
  const { ref: refName, ...restName } = register('value')

  //Get Api
  const [category, setCategoy] = useState([])

  const getOption = async () => {
    try {
      return await axios.get('http://localhost:5005/api/v7/getVariation_option').then(res => {
        setCategoy(res.data)
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getOption()
  }, [])
  const createOption = async data => {
    return await axios.post('http://localhost:5005/api/v7/addVariation_option', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  const addUpdatedData = async (data, id) => {
    return axios.put(`http://localhost:5005/api/v7/${id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const submit = rawData => {
    const formData = {
      variation_id: rawData.variation_id.value,
      value: rawData.value
    }
    console.log('formData', formData)
    //api
    if (getOne?.id !== undefined) {
      addUpdatedData(formData, getOne?.id)
        .then(res => {
          toast.success('Category updated Successfully.')
          console.log('--------', res.data)
          getOption()
        })
        .catch(err => {
          toast.error(err.response?.data?.message || 'updated Something went wrong!')
        })
    } else {
      createOption(formData)
        .then(res => {
          toast.success('Category added Successfully.')
          console.log('--------', res.data)
          getOption()
        })
        .catch(err => {
          toast.error(err.response?.data?.message || 'Something went wrong!')
        })
    }
  }

  const getOneOption = async id => {
    try {
      return axios.get(`http://localhost:5005/api/v7/${id}`).then(res => {
        setGetOne(res.data)
      })
    } catch (err) {
      console.log(err)
    }
  }
  //Delete api

  const deleteOption = async id => {
    try {
      return axios.delete(`http://localhost:5005/api/v7/${id}`).then(res => {
        console.log(res)
        if (res.status === 200) {
          console.log('done')
          getOption()
        }
      })
    } catch (err) {
      console.log('error in  delete api ', err)
    }
  }
  const [variationOptionData, setVariationOptionData] = useState([])
  const getVariationData = async () => {
    return await axios
      .get('http://localhost:5005/api/v6/getVariation', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        const options = []
        res.data.map(row => {
          options.push({ value: row.id, label: row.name })
        })
        setVariationOptionData(options)
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Something went wrong!')
      })
  }
  useEffect(() => {
    getVariationData()
  }, [])
  //
  //reset
  const handleReset = () => {
    reset({
      value: ''
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h1'>
          <h2>Variation Option</h2>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(submit)}>
          <Row className='mb-1'>
            <Col sm='12' className='mb-1'>
              <Label>
                <h5>Variation</h5>
              </Label>
              <Controller
                id='variation_id'
                control={control}
                name='variation_id'
                render={({ field }) => (
                  <Select
                    isClearable
                    classNamePrefix='select'
                    placeholder={'Select Variation'}
                    options={variationOptionData}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid':
                        errors.variationName?.message ||
                        errors.variationName?.label.message ||
                        errors.variationName?.value.message
                    })}
                    {...field}
                  />
                )}
              />

              {errors && errors.variationName && (
                <FormFeedback>
                  {errors.variationName?.message ||
                    errors.variationName?.label.message ||
                    errors.variationName?.value.message}
                </FormFeedback>
              )}
            </Col>

            <Label sm='3' for='name'>
              <h5>Add Value</h5>
            </Label>
            <Col sm='12'>
              <Input
                type='text'
                name='value'
                id='value'
                placeholder='value'
                {...restName}
                innerRef={refName}
                defaultValue={getOne.value}
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
                  <th>Value</th>
                  <th>variation option</th>
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
                      <td>{doc.value}</td>
                      <td>{doc.variation_id}</td>
                      <td>
                        <Button className='me-1' color='primary' type='reset' onClick={() => getOneOption(doc.id)}>
                          EDIT
                        </Button>
                        <Button color='primary' type='submit' onClick={() => deleteOption(doc.id)}>
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
export default AddOption
