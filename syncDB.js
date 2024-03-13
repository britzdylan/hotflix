import fs from 'fs'

function containsItems(array1) {
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
      const optimisedData = data.map(({ id, name, language, genres, image }) => ({
        id,
        name,
        language,
        genres,
        image
      }))
      const filteredData = optimisedData.filter((show) => containsItems(show.genres))
      allData.push(...filteredData)
      page++
    }

    // Save all data to a JSON file
    fs.writeFileSync('allShowsData.json', JSON.stringify(allData, null, 2))
    console.log('Data saved successfully.')
  } catch (error) {
    console.error('Error:', error)
  }
}

// Call the function to start fetching and saving data
fetchAndSaveData()
