const newImageBtn = document.getElementById("btn")
const img1 = document.getElementById("img1")
const img2 = document.getElementById("img2")
const img3 = document.getElementById("img3")

const spanError = document.getElementById("error")

const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")


const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=5"
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?limit=5"
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload"




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

        btn1.onclick = () => saveFavoritesCats(data[0].id);
        btn2.onclick = () => saveFavoritesCats(data[1].id);
    } catch (error) {
        console.error("Error", error)
        spanError.innerHTML = `${error.message} `
    }
}

newImageBtn.addEventListener("click", () => {
    loadRandomCats(API_URL_RANDOM)
})


// LOAD FAVORITE CATS
async function loadFavoritesCat(url) {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-API-KEY": "live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG",
            }
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${data.message || "unknown error"}`)
        }
        const section = document.getElementById("favorites-cats")
        section.innerHTML = ""
        const h2 = document.createElement("h2")
        const h2Text = document.createTextNode("favorite Cats")
        h2.appendChild(h2Text)
        section.appendChild(h2)

        console.log("FAVORITE:", data)
        data.forEach(cat => {
            console.log(cat.id);

            const article = document.createElement("article")
            const image = document.createElement("img")
            const button = document.createElement("button")
            const buttonText = document.createTextNode("Remove cat of favorites")
            button.appendChild(buttonText)
            button.addEventListener("click", () => {
                deleteFavoritesCats(cat.id)
            })

            image.src = cat.image.url
            image.width = 180

            article.append(image, button)

            section.appendChild(article)
        })

    } catch (error) {
        console.error("error", error)
        spanError.innerHTML = `${error.message}`
    }
}

// SAVE FAVORITES CATS
async function saveFavoritesCats(id) {
    const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?api_key=live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG";
    try {
        const response = await fetch(API_URL_FAVORITES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG",

            },
            body: JSON.stringify({
                image_id: id
            })
        });


        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Favorite cat saved:", data);
        loadFavoritesCat(API_URL_FAVORITES)
    } catch (error) {
        console.error("Error saving favorite cat:", error);
        spanError.innerHTML = `${error.message}`;
    }
}


// DELETE FAVORITES CATS
async function deleteFavoritesCats(id) {
    try {
        const response = await fetch(API_URL_FAVORITES_DELETE(id), {
            method: "DELETE",
            headers: {
                "X-API-KEY": "live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG",
            }
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Favorite cat saved:", data);
        loadFavoritesCat(API_URL_FAVORITES)
    } catch (error) {
        console.error("Error saving favorite cat:", error);
        spanError.innerHTML = `${error.message}`;
    }
}

// UPLOAD CAT PHOTO
async function uploadCatPhoto() {
    const form = document.getElementById("uploadingForm")
    const formData = new FormData(form)

    try {
        const response = await fetch(API_URL_UPLOAD, {
            method: "POST",
            headers: {
                // "Content-Type": "multipart/form-data",
                "X-API-KEY": "live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG",
            },
            body: formData,
        })
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Image loaded!:", data);
        saveFavoritesCats(data.id)

    } catch (error) {
        console.error("Error uploading  image:", error);
        spanError.innerHTML = `${error.message}`;
    }

}


// INITIALIZE FUNCTIONS
loadRandomCats(API_URL_RANDOM)
loadFavoritesCat(API_URL_FAVORITES)



