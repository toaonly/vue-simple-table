import { mount } from '@vue/test-utils'
import DNTest from '../index.vue'

describe('DNTest', () => {
  test('render A * 2 === doubleA', () => {
    const wrapper = mount(DNTest)
    wrapper.setProps({ tv: 1 })
    const A = +wrapper.find('.a').text()
    const doubleA = +wrapper.find('.double-a').text()

    expect(A * 2).toEqual(doubleA)
  })
})
