import fs from 'fs'
import genres from '../data/genres.json' with { type: 'json' }

function containsItems(array1) {
  return genres.some((item) => array1.includes(item))
}

function filterData(data) {
  return data.filter((show) => {
    return (
      containsItems(show.genres) &&
      show.rating.average !== null &&
      show.image !== null &&
      show.language === 'English'
    )
  })
}

async function fetchAndSaveData() {
  let page = 0
  let allData = []

  try {
    while (true) {
      const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`)
      if (!response.ok) {
        if (response.status === 404) {
          console.log('Reached end of pages. Saving data to JSON file...')
          break
        }
        throw new Error(`Failed to fetch data. Status: ${response.status}`)
      }
      const data = await response.json()
      const optimisedData = filterData(data).map(
        ({ id, name, genres, image, rating, premiered }) => ({
          id,
          name,
          genres,
          image: image.medium,
          rating: rating.average,
          premiered
        })
      )

      allData.push(...optimisedData)
      page++
    }

    allData = allData.sort((a, b) => b.rating - a.rating)

    fs.writeFileSync('src/data/shows.json', JSON.stringify(allData, null, 0))
    console.log('Data saved successfully.')
  } catch (error) {
    console.error('Error:', error)
  }
}

// Call the function to start fetching and saving data
fetchAndSaveData()
