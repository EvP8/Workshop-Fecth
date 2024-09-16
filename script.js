const inputDOM = document.querySelector('#breedInput');
const photoBtnDOM = document.querySelector('.getPhotoBtn');
const dogListDOM = document.querySelector('#dogList');
const errorDOM = document.querySelector('.error');
const dogBtnDOM = document.querySelector('.getDogBtn');

photoBtnDOM.addEventListener('click', getDogPhoto);

async function getDogPhoto() {
    const inputVal = inputDOM.value.trim().toLowerCase(); 

    if (inputVal === '') {
        showError('Įveskite šunų veislę.');
        return;
    }

    const url = `https://dog.ceo/api/breed/${inputVal}/images/random`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Įvyko klaida. Galbūt veislė neegzistuoja.');
        }

        const imgJson = await response.json();
        if (imgJson.status !== 'success') {
            throw new Error('Įvyko klaida. Galbūt veislė neegzistuoja.');
        }

        const image = imgJson.message;
        const dogPhotoContainer = document.querySelector(".dog_photos");

        dogPhotoContainer.innerHTML = ''; 

        const img = document.createElement("img");
        img.src = image;
        dogPhotoContainer.appendChild(img);
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    errorDOM.style.display = 'block';
    errorDOM.textContent = "Klaida: " + message;

    setTimeout(() => {
        errorDOM.style.display = 'none';
    }, 3000);
}

dogBtnDOM.addEventListener('click', getDogBreeds);

async function getDogBreeds() {
    const url = 'https://dog.ceo/api/breeds/list/all';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Nepavyko gauti šunų veislių sąrašo.');
        }

        const breedsJson = await response.json();
        const breeds = breedsJson.message;

        dogListDOM.innerHTML = ''; 

        for (const breed in breeds) {
            const li = document.createElement('li');
            li.textContent = breed;
            dogListDOM.appendChild(li);
        }
    } catch (error) {
        showError(error.message);
    }
}
