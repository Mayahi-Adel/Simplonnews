
function getArticles() {
    var token = localStorage.getItem('token');

    if (!token) {
        location.href = "index.html";
    }
    else {
        let url = "https://simplonews.brianboudrioux.fr/articles";
        let fetch_config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " +token
            }

        }
        fetch(url, fetch_config)
            .then(response => response.json().then(articles => {
                generateArticles(articles, token);
            }))
    }
}

function generateArticles(data, token) {
    let first_article = document.querySelector("#first_article");

    first_article.innerHTML = `
        <a >
            <figure>
                <img src="${data.articles[0].img}" alt="" >
                <figcaption>
                    <h3>${data.articles[0].title}</h3>
                    <p>${data.articles[0].resume.substr(0, 300)}... </p>
                </figcaption>
            </figure>
        </a>`


    let list_products = document.querySelector("#list_products");
    let article1 = document.querySelector('#first_article');
    article1.addEventListener("click", function(){msgError (data.articles[0].id, token)});
    
    
    
    
    let concat = "";


    for (let i = 1; i <5; i++) {
        concat += `
        <a onclick = "msgError(${data.articles[i].id}, '${token}')">
            <figure>
                <img src="${data.articles[i].img}" alt="" >
                <figcaption>
                    <h3>${data.articles[i].title}</h3>
                    <p>${data.articles[i].resume.substr(0, 120)}... </p>
                </figcaption>
            </figure>
        </a>`;
        

    }
    
    list_products.innerHTML = concat;
    // let articlesList = document.querySelector("#list_products a");
    // articlesList.addEventListener("click", a => console.log('pouet'))
}


getArticles();

function msgError(id, token) {

    let urlApi = `https://simplonews.brianboudrioux.fr/articles/${id}`;
    let fetch_config = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " +token
        }

    }
    fetch(urlApi, fetch_config)
        .then(response => response.json().then(data => {
            generateError(data, response.status, id)
        }));
}

function generateError(data, error, id) {
    let msgError = document.querySelector("#msg_error");
    if (error == 403 || error == 400) {
        msgError.textContent = data.error;
        document.getElementById("msg_error").classList.add("alert", "alert-danger");


    }
    else {
        location.href = "details.html?id=" + id;
    }
}

// destruction du localStorage => deconnexion
function distroy_cnx() {
    localStorage.removeItem('token');
    location.href = "index.html";
}



// function createNewArticle(){
//     let token = document.cookie;
//     let url = 'https://simplonews.brianboudrioux.fr/articles';
//         let article = {
//             "title": "25 ans de JavaScript : Le langage de programmation qui fait tourner le monde",
//             "resume": `Le langage de programmation JavaScript est apparu il y a 25 ans. Depuis, il est devenu l'un des éléments les plus importants des applications web et des navigateurs que nous utilisons aujourd'hui.`,
//             "content": `Le langage de programmation JavaScript est apparu il y a 25 ans. Depuis, il est devenu l'un des éléments les plus importants des applications web et des navigateurs que nous utilisons aujourd'hui.

//             JavaScript est le langage de référence pour le développement front-end et a donné naissance au Typescript de Microsoft, un sur-ensemble de JavaScript avec un système de types optionnels plus puissants pour les développeurs, qui se compile en JavaScript lorsqu'il est exécuté dans le navigateur.

//             JavaScript et TypeScript sont tous deux conformes à ECMAScript, la norme pour JavaScript et node.js, le runtime permettant d'exécuter des applications en dehors du navigateur grâce au puissant moteur JavaScript V8 de Google.`,
//             "author": "Adelov",
//             "img": "https://d1fmx1rbmqrxrr.cloudfront.net/zdnet/optim/i/edit/ne/2018/08/code-3337044_640__w630.jpg",
//             "category_id": "3"
//         }
//         let fetch_config = {
//             method: 'POST',
//             body: JSON.stringify(article),
//             headers : {
//                 "Content-Type": "application/json", 
//                 "Authorization": "Bearer " + token.split("=")[1] 
//             }
//         }

//         fetch(url, fetch_config)
//         .then(response => response.json()
//         .then(new_article => {
//         console.log(new_article)
//         }));
// }









