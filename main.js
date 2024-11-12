const newImageBtn = document.getElementById("btn")

const URL = "https://api.thecatapi.com/v1/images/search"


async function fetchData(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error("Error")
        }
        const data = await response.json()

        img = document.querySelector("img")
        img.src = data[0].url
        console.log(data[0].url)

    } catch (error) {
        console.error("error", error);
    }
}

newImageBtn.addEventListener("click", () => {
    fetchData(URL)
})
fetchData(URL)

