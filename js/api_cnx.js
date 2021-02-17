function generate_fetch_method(user_param, endPoint, method,statut){
    let url = 'https://simplonews.brianboudrioux.fr' + endPoint;

    let fetch_config = {
        method: method,
        body: JSON.stringify(user_param),
        headers : {"Content-Type": "application/json"}
    }

    fetch(url, fetch_config)
        .then(response => response.json()
        .then(data => {
            generateResponseApi(data, statut);
        }));

}

function generateResponseApi(data, statut){
    if (statut == "cnx"){
        if (data.token == null ){
            error_control("", "error", "Vous n'êtes pas inscrit !");
        } else{ 
            // let cookieUser = document.cookie = `token=${users.token}; max-age=86000`;
            let storageUser = localStorage.setItem('token', `${data.token}`);
            location.href = "html/home.html";
        }
    }
    else if (statut == "insc"){

        open_cnx_form();
        error_control("", "valid", "inscription réussie.");
        
        

    }
}

// destruction du localStorage => deconnexion
function distroy_cnx() {
    localStorage.removeItem('token');
    location.href = "../index.html";
}
