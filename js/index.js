var mail = false;
function form_control(elt){
    // function qui verifie si l'email est conforme
    
    if (elt=="email") {
        if (document.getElementById(elt).value.indexOf('@')==-1 || document.getElementById(elt).value.indexOf('.')==-1 ) {
            error_control(elt,"error", "Votre mail ne semble pas correct !");
            mail = false;
        }
        else{
            mail = true;
        }
    }
}

function error_control(elt, msg_type, msg_txt){
    if (msg_type == "error"){
        if (elt != ""){
            document.getElementById(elt).style.border='2px solid red';
        }
        document.getElementById("msg_alert").classList.add("alert", "alert-danger");        
        document.getElementById("msg_alert").textContent = msg_txt;
    }
    else {
        document.getElementById("msg_alert").classList.add("alert", "alert-success");        
        document.getElementById("msg_alert").textContent = msg_txt;
    }

}
function submit_form(statut,array){

    let url_endPoint;
    if(statut == "cnx"){
        url_endPoint = "/users/login";
    }
    else url_endPoint = "/users";

    if (mail == true){
        let user_param = {};
        for (let i=0; i<array.length; i++){
            user_param[array[i]] = document.getElementById(array[i]).value;
        }
        generate_fetch_method(user_param, url_endPoint, "POST",statut);
    }
    else {
        error_control("email", "error", "Identifiants manquants !")
    } 
}

// ########### Inscription ########
function open_insc_form(){
    let inscription = document.querySelector(".formBx");
    inscription.innerHTML = `
        <h2>Inscription</h2>
        <div id="msg_alert"></div>
        <form action="">
            <div class="inputBx">
                <span>Prenom : </span>
                <input id="firstName" type="text" value="">
            </div>
            <div class="inputBx">
                <span>Nom : </span>
                <input id="lastName" type="text" value="">
            </div>

            <div class="inputBx">
                <span>Email : </span>
                <input id="email" type="mail" value="" onblur="form_control(this.id)">
            </div>
            <div class="inputBx">
                <span>Mot de passe :</span>
                <input type="password" id="password" name="">
            </div>
            
            <div class="inputBx">
                <input type="button" value = "S'inscrire"  onclick="submit_form('insc',['firstName','lastName','email', 'password'])">
            </div>
        </form>
    `;
}

