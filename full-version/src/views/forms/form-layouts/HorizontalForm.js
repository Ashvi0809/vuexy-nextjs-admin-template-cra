// ** Third Party Components
import toast from 'react-hot-toast'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

// ** Custom Components
import { selectThemeColors } from '@utils'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Button, Label, Input, Form, Col, Row } from 'reactstrap'
import { useEffect, useState } from 'react'
// import { useState } from 'react'

const AddProduct = () => {
  // const [data, setData] = useState(null)
  // const [buttonStatus, setButtonStatus] = useState(false)
  // ** Hooks
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onSubmit = rawData => {
    const option = []
    const pro_var = []
    rawData.variationOptionName.map(i => {
      option.push(i.value)
    })

    rawData.variationName.map(i => {
      pro_var.push(i.value)
    })
    console.log('temp-------', option)

    // setButtonStatus(true)
    const formData = new FormData()
    formData.append('title', rawData.title)
    formData.append('price', rawData.price)
    formData.append('category_id', rawData.categoryName.value)
    formData.append('variation_id', JSON.stringify(pro_var))
    formData.append('variationOption_id', JSON.stringify(option))
    formData.append('short_description', rawData.short_description)
    formData.append('long_description', rawData.long_description)
    formData.append('image', rawData.image[0])
    console.log('rawData-----', rawData)

    const createProduct = async data => {
      console.log('-----', data)
      return await axios.post('http://localhost:5005/api/v5/addProduct', data, {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        }
      })
    }
    window.location.href.endsWith('add')
    createProduct(formData)
      .then(res => {
        toast.success('Banner added Successfully.')
        console.log('--------', res.data.data)
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Something went wrong!')
      })
    // console.log('34567876----', data)
  }
  // setData(data)

  const { ref: refTitle, ...restTitle } = register('title')
  const { ref: refPrice, ...restPrice } = register('price')
  const { ref: refShortDescription, ...restShortDescription } = register('short_description')
  const { ref: refLongDescription, ...restLongDescription } = register('long_description')
  const { ref: refImage, ...restImage } = register('image')

  const [categoryData, setCategoryData] = useState([])

  const getCategoryData = async () => {
    return await axios
      .get('http://localhost:5005/api/v2/getCategory', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        const options = []
        res.data.map(row => {
          options.push({ value: row.id, label: row.category_name })
        })
        setCategoryData(options)
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Something went wrong!')
      })
  }

  useEffect(() => {
    getCategoryData()
    if (!window.location.href.endsWith('add')) {
    }
  }, [])

  const [variationData, setVariationData] = useState([])

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
        setVariationData(options)
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Something went wrong!')
      })
  }

  useEffect(() => {
    getVariationData()
    if (!window.location.href.endsWith('add')) {
    }
  }, [])

  const [variationOptionData, setVariationOptionData] = useState([])

  const getVariationOptionData = async () => {
    return await axios
      .get('http://localhost:5005/api/v7/getVariation_option', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        const options = []
        res.data.map(row => {
          options.push({ value: row.id, label: row.value })
        })
        setVariationOptionData(options)
      })
      .catch(err => {
        toast.error(err.response?.data?.message || 'Something went wrong!')
      })
  }

  useEffect(() => {
    getVariationOptionData()
    if (!window.location.href.endsWith('add')) {
    }
  }, [])

  const handleReset = () => {
    reset({
      emailBasic: '',
      firstNameBasic: '',
      lastNameBasic: '',
      ReactSelect: ''
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle tag='h4'>Add Product</CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md='6' sm='12' className='mb-1'>
              <Label>Title</Label>
              <Input
                id='title'
                name='title'
                type='text'
                placeholder='Title'
                invalid={errors.title && true}
                {...restTitle}
                innerRef={refTitle}
              />
              {errors && errors.title && <FormFeedback>{errors.title.message}</FormFeedback>}
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label>Price</Label>
              <Input
                id='price'
                name='price'
                type='text'
                placeholder='Price'
                invalid={errors.price && true}
                {...restPrice}
                innerRef={refPrice}
              />
              {errors && errors.price && <FormFeedback>{errors.price.message}</FormFeedback>}
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label>Category Name</Label>
              <Controller
                id='categoryName'
                control={control}
                name='categoryName'
                render={({ field }) => (
                  <Select
                    isClearable
                    classNamePrefix='select'
                    placeholder={'Select Category'}
                    options={categoryData}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid':
                        errors.categoryName?.message ||
                        errors.categoryName?.label.message ||
                        errors.categoryName?.value.message
                    })}
                    {...field}
                  />
                )}
              />

              {errors && errors.categoryName && (
                <FormFeedback>
                  {errors.categoryName?.message ||
                    errors.categoryName?.label.message ||
                    errors.categoryName?.value.message}
                </FormFeedback>
              )}
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label>Variation</Label>
              <Controller
                id='variationName'
                control={control}
                name='variationName'
                render={({ field }) => (
                  <Select
                    isClearable
                    classNamePrefix='select'
                    placeholder={'Select Variation'}
                    isMulti
                    options={variationData}
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

            <Col md='6' sm='12' className='mb-1'>
              <Label>Variation Option</Label>
              <Controller
                id='variationOptionName'
                control={control}
                name='variationOptionName'
                render={({ field }) => (
                  <Select
                    isClearable
                    classNamePrefix='select'
                    placeholder={'Select Variation'}
                    isMulti
                    options={variationOptionData}
                    theme={selectThemeColors}
                    className={classnames('react-select', {
                      'is-invalid':
                        errors.variationOptionName?.message ||
                        errors.variationOptionName?.label.message ||
                        errors.variationOptionName?.value.message
                    })}
                    {...field}
                  />
                )}
              />

              {errors && errors.variationOptionName && (
                <FormFeedback>
                  {errors.variationOptionName?.message ||
                    errors.variationOptionName?.label.message ||
                    errors.variationOptionName?.value.message}
                </FormFeedback>
              )}
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label className='form-label' for='inputFile'>
                Simple File Input
              </Label>
              <Input
                type='file'
                id='inputFile'
                name='fileInput'
                invalid={errors.name && true}
                {...restImage}
                innerRef={refImage}
              />
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label>Short Discription</Label>
              <Input
                id='shortDescription'
                name='shortDescription'
                type='textarea'
                placeholder='ShortDescription'
                invalid={errors.shortDescription && true}
                {...restShortDescription}
                innerRef={refShortDescription}
              />
              {errors && errors.shortDescription && <FormFeedback>{errors.shortDescription.message}</FormFeedback>}
            </Col>
            <Col md='6' sm='12' className='mb-1'>
              <Label>Long Discription</Label>
              <Input
                id='longDescription'
                name='longDescription'
                type='textarea'
                placeholder='LongDiscription'
                invalid={errors.longDescription && true}
                {...restLongDescription}
                innerRef={refLongDescription}
              />
              {errors && errors.longDescription && <FormFeedback>{errors.longDescription.message}</FormFeedback>}
            </Col>
          </Row>

          <div className='d-flex'>
            <Button className='me-1' color='primary' type='submit'>
              Submit
            </Button>
            <Button outline color='secondary' type='reset' onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  )
}

export default AddProduct
