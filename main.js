const newImageBtn = document.getElementById("btn")
const img1 = document.getElementById("img1")
const img2 = document.getElementById("img2")
const img3 = document.getElementById("img3")

const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG"


async function fetchData(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Error")
        }
        const data = await response.json()

        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
        console.log(data)

    } catch (error) {
        console.error("error", error);
    }
}

newImageBtn.addEventListener("click", () => {
    fetchData(API_URL)
})
fetchData(API_URL)

