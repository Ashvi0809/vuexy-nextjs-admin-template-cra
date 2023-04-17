// ** React Imports
import { useState } from 'react'

// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Input, Label } from 'reactstrap'

const TextareaCounter = () => {
  // ** State
  const [value, setValue] = useState('')

  return (
    <Card>
      <CardBody>
        <div className='form-floating'>
          <Input
            name='text'
            value={value}
            type='textarea'
            id='exampleText'
            placeholder='Counter'
            style={{ minHeight: '100px' }}
            onChange={e => setValue(e.target.value)}
            className={classnames({ 'text-danger': value.length > 20 })}
          />
          <Label className='form-label' for='textarea-counter'>
            description
          </Label>
        </div>
        <span
          className={classnames('textarea-counter-value float-end', {
            'bg-danger': value.length > 20
          })}
        >
          {`${value.length}/20`}
        </span>
      </CardBody>
    </Card>
  )
}
export default TextareaCounter
