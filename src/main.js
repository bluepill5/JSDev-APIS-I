const n = 3;
const API_KEY = 'c42f2028-4966-46f9-bf88-a6055e363547';
const API_URL_RANDOM = `https://api.thecatapi.com/v1/images/search?limit=${n}`;
const API_URL_FAVOURITES = `https://api.thecatapi.com/v1/favourites`;
const API_URL_FAVOURITES_DEL = id => `https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.getElementById('error');

async function loadRandomMichis() {
    let response = await fetch(API_URL_RANDOM);
    let data = await response.json();

    if(response.status === 200) {
        // Imagenes
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        // Botones
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;

        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
        btn3.onclick = () => saveFavouriteMichi(data[2].id);
    } else {
        spanError.innerHTML = 'Hubo un error: ' + response.status + ' ' + data.message;
    }
}

async function loadFavoriteMichis() {
    let response = await fetch(API_URL_FAVOURITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY,
        }
    });
    let data = await response.json();

    if(response.status === 200) {
        const container = document.getElementsByClassName('imgsContainer')[1];
        container.innerHTML = '';
        for (let index = 0; index < data.length; index++) {
            const id_image = data[index].image.id;
            const id_image_del = data[index].id;

            const url_image = data[index].image.url;
            container.innerHTML = container.innerHTML + `
            <div class="imgContainer">
                <img src=${url_image} alt="Foto gatito" width="250" id=${id_image} />
                <button id="btn-${id_image}" onclick="deleteFavouriteMichi(${id_image_del})" class="button-style-del">
                    Borrar michi
                </button>
            </div>
            `;            
        }
    } else {
        spanError.innerHTML = 'Hubo un error: ' + response.status + ' ' + data.message;
    }
}

async function saveFavouriteMichi(id) {
    let response = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': API_KEY,
        },
        body: JSON.stringify({
            image_id: id
        })
    }); 
    loadFavoriteMichis();
    let data = await response.json();
    if(response.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + response.status + ' ' + data.message;
    }
}

async function deleteFavouriteMichi(id) {
    let response = await fetch(API_URL_FAVOURITES_DEL(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': API_KEY,
        }
    }); 
    let data = await response.json();
    if(response.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + response.status + ' ' + data.message;
    
    } else {
        loadFavoriteMichis();
    }
}

async function uploadMichiPhoto() {
    
}

loadRandomMichis();
loadFavoriteMichis();

