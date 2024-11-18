const newImageBtn = document.getElementById("btn")
const img1 = document.getElementById("img1")
const img2 = document.getElementById("img2")
const img3 = document.getElementById("img3")

const spanError = document.getElementById("error")


const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG"

const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG"


// RANDOM CATS
async function loadRandomCats(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${data.message || "unknown error"}`)
        }
        img1.src = data[0].url
        img2.src = data[1].url
        console.log("RANDOM:", data)

    } catch (error) {
        console.error("Error", error)
        spanError.innerHTML = `${error.message} `
    }
}

newImageBtn.addEventListener("click", () => {
    loadRandomCats(API_URL_RANDOM)
})


// FAVORITE CATS
async function loadFavoritesCats(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${data.message || "unknown error"}`)
        }
        console.log("FAVORITE:", data)

    } catch (error) {
        console.error("error", error)
        spanError.innerHTML = `${error.message}`
    }
}

// CALL FOR FUNCTIONS
loadRandomCats(API_URL_RANDOM)
loadFavoritesCats(API_URL_FAVORITES)