import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import useState from '../useState'

function getDummyComponent() {
  return defineComponent({
    name: 'Dummy',
    
    setup() {
      const [count, setCount] = useState<number>(0)
      
      return {
        count,
        setCount
      }
    },

    template: `
      <div>
        <div>Count : {{count}}</div>
        <button @click="setCount(count + 1)">Increase Count</button>
      </div>
    `
  })
}

describe('useState', () => {
  it('useState 동작 확인 - Number Type', async () => {
    const wrapper = mount(getDummyComponent())

    wrapper.find('button').trigger('click')
    wrapper.find('button').trigger('click')

    await nextTick()

    expect(wrapper.vm.count).toBe(2)
  })
})
