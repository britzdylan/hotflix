import type { IShowDetailed } from '@/types'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShowsStore } from '../stores/shows'
import { usePopup } from '@/composables/popup'
import { parseShowQueryStringToNumber, parseRouteParamsToNumber } from '@/utils/helpers'

export function useShowDetails() {
  const { popup } = usePopup()
  const router = useRouter()
  const route = useRoute()
  const { getShowById } = useShowsStore()

  const isLoading = ref(true) // test
  const showDetails = ref<IShowDetailed | null>(null) // test

  const getId = () => {
    if (popup.value) {
      return parseShowQueryStringToNumber(popup.value)
    }
    if (route.params.id) {
      return parseRouteParamsToNumber(route.params.id)
    }
    return null
  }

  onBeforeMount(async () => {
    if (getId() === null) {
      isLoading.value = false
      router.push({ name: 'NotFoundView' })
    } else {
      showDetails.value = await getShowById(getId() as Number)
      isLoading.value = false
    }
  })

  const getImages = (type: 'poster' | 'background') =>
    showDetails.value?.images.filter((i) => i.type === type).map((i) => i.image) || []

  return { isLoading, showDetails, getImages }
}
