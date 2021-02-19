import { DeepReadonly, readonly, Ref, ref } from 'vue'

type SetState<T> = (newState: T) => void

export default function useState<T>(
  initialState?: T | (() => T)
): [DeepReadonly<Ref<T>>, SetState<T>] {
  const state = ref() as Ref<T>
  const setState: SetState<T> = newState => {
    state.value = newState
  }

  if (typeof initialState === 'function') {
    setState((initialState as Function)())
  } else {
    if(initialState !== null && initialState !== undefined) {
      setState(initialState)
    }
  }

  return [readonly(state), setState]
}
