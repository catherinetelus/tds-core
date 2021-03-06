import React from 'react'
import { shallow, mount, render } from 'enzyme'

import Card from '../Card'

describe('<Card />', () => {
  const doShallow = (props = {}) => shallow(<Card {...props}>Some content</Card>)
  const doMount = (props = {}) => mount(<Card {...props}>Some content</Card>)

  it('renders', () => {
    const card = render(<Card>Children</Card>)

    expect(card).toMatchSnapshot()
  })

  it('can be presented as one of the allowed variants', () => {
    let card = doMount()
    expect(card).toMatchSnapshot()

    card = doMount({ variant: 'white' })
    expect(card).toMatchSnapshot()

    card = doMount({ variant: 'lavender' })
    expect(card).toMatchSnapshot()

    card = doMount({ variant: 'grey' })
    expect(card).toMatchSnapshot()
  })

  it('passes additional attributes to the input element', () => {
    const card = doShallow({ role: 'some-role', 'data-some-value': 'some value' })

    expect(card).toHaveProp('role', 'some-role')
    expect(card).toHaveProp('data-some-value', 'some value')
  })

  it('does not allow custom CSS', () => {
    const card = doShallow({ className: 'my-custom-class', style: { color: 'hotpink' } })

    expect(card).not.toHaveProp('className', 'my-custom-class')
    expect(card).not.toHaveProp('style')
  })
})
