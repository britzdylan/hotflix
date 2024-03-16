import { ref, computed } from 'vue'
import type { IShow } from '@/types'
import { useShowsStore } from '@/stores/shows'

export function useShowSearch() {
  const { getRecommendedShows, searchShows } = useShowsStore()

  const loading = ref(false)
  const isTyping = ref(false)
  const searchResults = ref<IShow[]>([])
  const query = ref('')
  const typingTimeout = ref<number | undefined>(undefined)

  const startSearch = () => {
    isTyping.value = true
    loading.value = true

    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value)
    }

    typingTimeout.value = window.setTimeout(async () => {
      isTyping.value = false
      searchResults.value = await searchShows(query.value)
      loading.value = false
    }, 600)
  }

  const showList = computed(() => {
    if (searchResults.value.length > 0 || query.value.length > 0) {
      return searchResults.value
    } else {
      return getRecommendedShows
    }
  })

  const title = computed(() => {
    if (searchResults.value.length > 0) {
      return 'Search results for: ' + query.value
    } else {
      return 'Recommended shows'
    }
  })

  return { query, startSearch, showList, title, loading, isTyping }
}
