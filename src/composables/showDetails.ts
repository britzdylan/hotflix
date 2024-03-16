import type { IShowDetailed } from '@/types'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '../stores/shows'
import { usePopup } from '@/composables/popup'

export function useShowDetails() {
  const { popup, closePopup } = usePopup()
  const route = useRoute()
  const { getShowById } = useShowsStore()

  const popupId = popup.value ? parseInt(popup.value?.split('_')[1] || '', 10) : null
  const paramId = route.params.id
    ? Array.isArray(route.params.id)
      ? Number(route.params.id[0])
      : Number(route.params.id)
    : null

  const isLoading = ref(true)
  const showDetails = ref<IShowDetailed | null>(null)
  const showId = ref(popupId || paramId)

  onBeforeMount(async () => {
    if (!showId.value) return
    showDetails.value = await getShowById(showId.value)
    isLoading.value = false
  })

  const getImages = (type: 'poster' | 'background') =>
    showDetails.value?.images.filter((i) => i.type === type).map((i) => i.image) || []

  return { isLoading, showDetails, getImages, closePopup }
}
