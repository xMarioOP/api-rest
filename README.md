# Cat App Documentation

This project leverages **The Cat API** to display random cat images, manage favorites, and upload cat photos. Below is an overview of the key functionalities implemented in JavaScript.

---


## Features

### 1. Load Random Cats
Displays random cat images fetched from The Cat API.  
**Function:** `loadRandomCats(url)`  
- **API Endpoint:** `https://api.thecatapi.com/v1/images/search?limit=5`  
- **Description:** Fetches 5 random cat images and displays the first two with buttons to save them as favorites.

---

### 2. Load Favorite Cats
Displays your favorite cats stored on The Cat API.  
**Function:** `loadFavoritesCat(url)`  
- **API Endpoint:** `https://api.thecatapi.com/v1/favourites?limit=5`  
- **Description:** Fetches favorite cats and renders them with a button to remove them.

---

### 3. Save a Favorite Cat
Saves a cat to your favorites on The Cat API.  
**Function:** `saveFavoritesCats(id)`  
- **API Endpoint:** `https://api.thecatapi.com/v1/favourites`  
- **Method:** POST  
- **Description:** Sends the `image_id` to save it as a favorite.

---

### 4. Delete a Favorite Cat
Removes a favorite cat from your collection.  
**Function:** `deleteFavoritesCats(id)`  
- **API Endpoint:** `https://api.thecatapi.com/v1/favourites/{id}`  
- **Method:** DELETE  
- **Description:** Deletes a favorite cat based on its `id`.

---

### 5. Upload a Cat Photo
Uploads a cat photo to The Cat API and optionally adds it to your favorites.  
**Function:** `uploadCatPhoto()`  
- **API Endpoint:** `https://api.thecatapi.com/v1/images/upload`  
- **Method:** POST  
- **Description:** Sends a form-data object containing the image file for upload.

---

## How to Use

1. **Random Cats:** Click the "Get New Cats" button to display random cats.  
2. **Save to Favorites:** Click "Save to Favorites" below a cat image to add it to your favorites.  
3. **View Favorites:** Favorites are displayed under the "Favorite Cats" section.  
4. **Remove from Favorites:** Click "Remove Cat of Favorites" to delete a favorite.  
5. **Upload Photo:** Submit the upload form to upload your cat image.

---

## Error Handling
Errors are captured using `try-catch` blocks. Errors are displayed in the UI via the `spanError` element.

---

### Acknowledgment
Special thanks to [Platzi](https://platzi.com/cursos/api/) for their guidance on API integration and development.
