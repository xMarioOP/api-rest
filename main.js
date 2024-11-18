const newImageBtn = document.getElementById("btn")
const img1 = document.getElementById("img1")
const img2 = document.getElementById("img2")
const img3 = document.getElementById("img3")

const spanError = document.getElementById("error")

const btn1 = document.getElementById("btn1")
const btn2 = document.getElementById("btn2")


const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=5&api_key=live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG"

const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?limit=5&api_key=live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG"


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

        btn1.addEventListener("click", () => {
            saveFavoritesCats(data[0].id);
        })
        btn2.addEventListener("click", () => {
            saveFavoritesCats(data[1].id);
        })
    } catch (error) {
        console.error("Error", error)
        spanError.innerHTML = `${error.message} `
    }
}

newImageBtn.addEventListener("click", () => {
    loadRandomCats(API_URL_RANDOM)
})


// FAVORITE CATS
async function loadFavoritesCat(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${data.message || "unknown error"}`)
        }
        console.log("FAVORITE:", data)
        data.forEach(cat => {
            const section = document.getElementById("favorites-cats")
            const article = document.createElement("article")
            const image = document.createElement("img")
            const button = document.createElement("button")
            const buttonText = document.createTextNode("Remove cat of favorites")

            button.appendChild(buttonText)
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
    const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?api_key=live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG"; // URL fija
    try {
        const response = await fetch(API_URL_FAVORITES, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                image_id: id
            })
        });
        console.log(id);

        // Verificar si la respuesta es correcta
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Favorite cat saved:", data);
    } catch (error) {
        console.error("Error saving favorite cat:", error);
        spanError.innerHTML = `${error.message}`;
    }
}



// CALL FOR FUNCTIONS
loadRandomCats(API_URL_RANDOM)
loadFavoritesCat(API_URL_FAVORITES)




//////////////ELIMINAR TODOS LOS FAVORITOS/////////////////////////
// document.getElementById("clear-favorites-btn").addEventListener("click", clearFavorites);

// // Eliminar todos los gatos de los favoritos
// async function clearFavorites() {
//     const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?api_key=live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG"; // URL fija

//     try {
//         // Obtener los favoritos (todos)
//         const response = await fetch(API_URL_FAVORITES);
//         const data = await response.json();

//         // Verificar que la respuesta sea correcta
//         if (!response.ok) {
//             throw new Error(`Error ${response.status}: ${data.message || "unknown error"}`);
//         }

//         // Eliminar todos los gatos de los favoritos
//         const deletePromises = data.map(cat => {
//             return fetch(`https://api.thecatapi.com/v1/favourites/${cat.id}?api_key=live_IXdbF6NTpXDU8aDS8LQPdlyR2xkm0IMGq9Oo8R0X403cKFR0VlI2ZG8JOaZqFbIG`, {
//                 method: "DELETE"
//             });
//         });

//         // Esperar a que todas las eliminaciones se completen
//         await Promise.all(deletePromises);
//         console.log("All favorite cats removed.");

//         // Recargar la lista de favoritos después de eliminar todos
//         loadFavoritesCat(API_URL_FAVORITES);

//     } catch (error) {
//         console.error("Error removing favorites:", error);
//         spanError.innerHTML = `${error.message}`;
//     }
// }
