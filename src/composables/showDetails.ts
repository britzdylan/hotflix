import type { IShowDetailed } from '@/types'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useShowsStore } from '../stores/shows'

export function useShowDetails() {
  const route = useRoute()
  const { getShowById } = useShowsStore()

  const isLoading = ref(true)
  const showDetails = ref<IShowDetailed | null>(null)

  const showId = ref(
    Array.isArray(route.params.id) ? Number(route.params.id[0]) : Number(route.params.id)
  )

  onBeforeMount(async () => {
    showDetails.value = await getShowById(showId.value)
    isLoading.value = false
  })

  const getImages = (type: 'poster' | 'background') =>
    showDetails.value?.images.filter((i) => i.type === type).map((i) => i.image) || []

  return { isLoading, showDetails, getImages }
}
