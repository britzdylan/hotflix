import fs from 'fs'
const genreOptions = [
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Family',
  'Fantasy',
  'Horror',
  'Nature',
  'Romance',
  'Science-Fiction',
  'Sports',
  'Thriller',
  'War'
]
function containsItems(array1) {
  return genreOptions.some((item) => array1.includes(item))
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
      const optimisedData = data.map(
        ({ id, name, genres, image, rating, language, premiered }) => ({
          id,
          name,
          genres,
          image,
          rating,
          language,
          premiered
        })
      )

      let filteredData = optimisedData.filter((show) => containsItems(show.genres))
      filteredData = filteredData.filter((show) => show.rating.average !== null)
      filteredData = filteredData.filter((show) => show.image !== null)
      filteredData = filteredData.filter((show) => show.language === 'English')

      allData.push(...filteredData)
      page++
    }

    allData = allData.sort((a, b) => b.rating.average - a.rating.average)
    allData = allData.map((show) => {
      return {
        id: show.id,
        name: show.name,
        genres: show.genres,
        rating: show.rating.average,
        image: show.image?.medium,
        premiered: show.premiered
      }
    })

    fs.writeFileSync('allShowsData.json', JSON.stringify(allData, null, 2))
    console.log('Data saved successfully.')
  } catch (error) {
    console.error('Error:', error)
  }
}

// Call the function to start fetching and saving data
fetchAndSaveData()
