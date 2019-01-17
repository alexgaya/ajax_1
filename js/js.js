const crear = document.getElementById("crear");
const content = document.getElementById("content");
const ver = document.getElementById("ver");
const mytable = document.getElementById("mytable");
let myform;
let myselect;

crear.addEventListener("click", ()=> {
    recieve("crear");
});

ver.addEventListener("click", ()=>{
    recieve("ver");
});

const recieve = (action, id)=>{
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","http://127.0.0.1/javascript-daw/ajax-1/php/main.php?action="+action+"&id="+id, true);
    
    xmlhttp.onload = ()=> {
        mytable.innerHTML = "";
        switch(action){
            case "ver":
                content.innerHTML = xmlhttp.responseText;
                myselect = document.getElementsByTagName("select")[0];
                createEventListener("select");
                break;
                
            case "crear":
                content.innerHTML = createForm(xmlhttp.responseText);
                myform = document.forms.namedItem("newUser");
                createEventListener("form");
                break;
                
            case "table":
                let json = JSON.parse(xmlhttp.responseText);
                printJson(json);
                break;
                
            default:
                break;
        }

    };

    xmlhttp.send();
};



const send = param =>{
    const xmlhttp = new XMLHttpRequest();
    
    xmlhttp.open("POST", "http://localhost/javascript-daw/ajax-1/php/main.php", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xmlhttp.onreadystatechange = ()=>{
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            mytable.innerHTML = "";
            content.innerHTML = xmlhttp.responseText;
        }
    };
    
    xmlhttp.send(param);
};

const printJson = json =>{
    let result = '<table><tr><th>Puesto</th><th>Nombre</th><th>Email</th><th>Teléfono</th></tr>';
    for(let key in json){
        result += `<tr><td>${json[key].puesto}</td><td>${json[key].nombre}</td><td>${json[key].email}</td><td>${json[key].telefono}</td></tr>`;
    }
    mytable.innerHTML = result;
};

const createEventListener = param =>{
    switch(param){
        case "form":
            myform.addEventListener('submit', ev =>{
                let param = '';
                let child = myform.childNodes;
                let validate = [];
                for(i = 0; i < child.length; i++){
                    if(child[i].nodeName === "SELECT"){
                        param += `${child[i].name}=${child[i].value}&`;
                        validate[i] = child[i].value;
                    }
                    if(child[i].nodeName === "INPUT" && child[i].value != "Enviar"){
                        param += `${child[i].name}=${child[i].value}&`;
                        validate[i] = child[i].value;
                    }
                }
                
                if(validateForm(validate)){
                    send(param);
                }
                
                ev.preventDefault();
            }, false);
        break;
        
        case "select":
            myselect.addEventListener('change', ()=>{
                recieve("table",myselect.value);
            });
            break;
            
        default: 
            break;
    }
    
};

const createForm = options => {
    let output;
    output = `<form method='POST' name='newUser' enctype='multipart/form-data'>${options}<input type='text' name='nombre' placeholder='Nombre' required><input type='email' name='email' placeholder='Email' required><input type='text' name='telefono' minlength='6' placeholder='Número de teléfono' required><input type='submit' value='Enviar'></form>`;
    return output;
};

const validateForm = validate => {
    mytable.innerHTML = "";
    
    let errores = [];
    
    //Validar puesto
    if(validate[0] < 1){
        errores.push("Debes seleccionar un puesto");
    }
    
    //Validar nombre
    //let re = new RegExp("^[a-z]+$","i");
    if(!validate[1].match(/^[a-z]+$/i)){
       errores.push("Nombre no introducido o no válido"); 
    }

    //Validar email
    //re = new RegExp("^[\w\.-]+@[\w\.-]+\.\w{2,4}$","i");
    if(!validate[2].match(/^[\w\.-]+@[\w\.-]+\.\w{2,4}$/i)){
        errores.push("Email no introducido o formato inválido");
    }

    //Validar teléfono
    //re = new RegExp("^[+]?[(]?[0-9]{0,4}[)]?[0-9\s-]+$","");
    if(!validate[3].match(/^[+]?[(]?[0-9]{0,4}[)]?[0-9\s-]+$/)){
        errores.push("Número de teléfono no introducido o formato inválido");
    }
    
    let error = false;
    
    errores.forEach( error => {
        if(error != ""){
            mytable.innerHTML += `${error} <br>`;
            error = true;
        }
    });
    
    if(error){
        return false;
    }else{
        return true;
    }
};

