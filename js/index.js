var mail = false;

// function qui verifie si l'email est conforme
function form_control(elt) {

    if (elt == "email") {
        if (document.getElementById(elt).value.indexOf('@') == -1 || document.getElementById(elt).value.indexOf('.') == -1) {
            error_control(elt, "error", "Votre mail ne semble pas correct !");
            mail = false;
        } else {
            mail = true;
        }
    }
}
// function qui gere les messages d'alertes
function error_control(elt, msg_type, msg_txt) {

    let msg_alert = document.getElementById("msg_alert");
    if (msg_type == "error") {
        if (elt != "") {
            document.getElementById(elt).style.border = '2px solid red';
        }
        msg_alert.classList.add("alert", "alert-danger");
        msg_alert.textContent = msg_txt;
    } else {
        msg_alert.classList.add("alert", "alert-success");
        msg_alert.textContent = msg_txt;
    }

}
// suppression des messages d'alertes
function delete_alert(){
    let msg = document.querySelector("#msg_alert");
    let contentbx = document.getElementsByClassName("contentBx");
    contentbx.addEventListener("click",function(){msg.innerHTML= "";});
    
}

delete_alert();
// Envoi du formilaire
function submit_form(statut, array) {

    let url_endPoint;
    if (statut == "cnx") {
        url_endPoint = "/users/login";
    } else url_endPoint = "/users";

    if (mail == true) {
        let user_param = {};
        for (let i = 0; i < array.length; i++) {
            user_param[array[i]] = document.getElementById(array[i]).value;
        }
        generate_fetch_method(user_param, url_endPoint, "POST", statut);
    } else {
        error_control("email", "error", "Identifiants manquants !")
    }
}

// ############# connexion form ############
function open_cnx_form() {
    let cnx_title = document.querySelector(".formBx h2");
    let cnx_form = document.querySelector(".formBx form");
    cnx_title.textContent = "connexion";

    cnx_form.innerHTML = `
        <form action="">
            <div class="inputBx">
                <span>Email : </span>
                <input id="email" type="mail" value="" onblur="form_control(this.id)">
            </div>
            <div class="inputBx">
                <span>Mot de passe :</span>
                <input type="password" id="password" name="">
            </div>
            <div class="remember">
                <label><input type="checkbox" name=""> Se souvenir de moi</label>
            </div>
            <div class="inputBx">
                <input type="button" value = "Se connecter"  onclick="submit_form('cnx',['email', 'password'])">
            </div>
            <div class="inputBx">
                <p>Vous n'avez pas encore un compte? <a onclick="open_insc_form()">S'inscrire</p>
            </div>
        </form>
    `;
}

// ########### Inscription form ########
function open_insc_form() {
    let inscription_title = document.querySelector(".formBx h2");
    let inscription_form = document.querySelector(".formBx form");
    inscription_title.textContent = "Inscription";

    inscription_form.innerHTML = `
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