const URL = "https://api.thecatapi.com/v1/images/search"

fetch(URL)
    .then(res => res.json())
    .then(data => {
        img = document.querySelector("img")
        img.src = data[0].url


        console.log(data[0].url);
    });