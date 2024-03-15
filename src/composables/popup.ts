import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

export function usePopup() {
  const route = useRoute()
  const router = useRouter()
  const popup = computed(() => route.query.popup as string | undefined)
  const showPopup = (t: string) =>
    router.replace({
      path: route.path,
      query: { ...route.query, popup: t }
    })

  const closePopup = () =>
    router.replace({
      path: route.path,
      query: { ...route.query, popup: undefined }
    })
  return { popup, showPopup, closePopup }
}
