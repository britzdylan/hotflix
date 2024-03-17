import { createApp } from 'vue'

export function withSetup(hook: any) {
  let result: any

  const app = createApp({
    setup() {
      result = hook()
      return () => {}
    }
  })

  app.mount(document.createElement('div'))

  return [result, app]
}
