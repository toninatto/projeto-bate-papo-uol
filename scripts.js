let conversas = [];
let adicionarNome = {};
let manterNome = {};
let envio = {};
let usuario = "";

enviarNome();


function enviarNome () {
    usuario = prompt("Qual o seu nome?")
    console.log(usuario)
    adicionarNome =  {name: usuario}

let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", adicionarNome);
console.log(promise);

promise.catch(tratarErro);
}
console.log(usuario);
console.log(adicionarNome);

setInterval(conexao, 5000)


function conexao () {
    manterNome = {name: usuario}
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", manterNome);
    
    
}

function tratarErro(error) {
    console.log(error.response);
    enviarNome()
}

pegarConversas();

function pegarConversas () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    

    promise.then(carregarDados)
}

function carregarDados(response) {
    conversas = response.data;
    imprimirConversa();    
}

function imprimirConversa() {
    let elemento = document.querySelector(".centro");
    elemento.innerHTML = "";
    
    for (let i = 0; i < conversas.length; i++) {
        
        if (conversas[i].type === "status") {
            elemento.innerHTML +=             
            `<div class="msg-status"> 
            <span>(${conversas[i].time})</span>
            <h1>${conversas[i].from}</h1>            
            <p>: ${conversas[i].text}</p>
            </div>`;           
        }
        else if (conversas[i].type === "message") {
            elemento.innerHTML += `<div class="msg-normal"> 
            <span>(${conversas[i].time})</span>
            <h1>${conversas[i].from}</h1>
            <p class="especial"> para </p> 
            <h1>${conversas[i].to}</h1>
            <p>: ${conversas[i].text}</p>
            </div>`;
        }
        else if (conversas[i].type === "private_message") {
            if (conversas[i].to === usuario) {
            elemento.innerHTML += `<div class="msg-reservada"> 
            <span>(${conversas[i].time})</span>
            <h1>${conversas[i].from}</h1>
            <p class="especial"> para </p> 
            <h1>${conversas[i].to}</h1>
            <p>: ${conversas[i].text}</p>
            </div>`;
        } 
        }
    }
} 

setInterval(pegarConversas, 3000);



function enviarMsg() {
    let texto = document.querySelector(".caixa-send Input").value;
    envio = { 
        from: usuario,
        to: "Todos",
        text: texto,
        type: "message"
    }
    
    let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", envio);
    promise.then(()=>{console.log("enviado")})

    promise.catch(alert("Recarregue a página!"))
   
}

const elementoum = document.querySelector(".msg-normal");
elementoum.scrollIntoView({behavior: "smooth"});

const elementodois = document.querySelector(".msg-reservada");
elementodois.scrollIntoView({behavior: "smooth"});

const elementotres = document.querySelector(".msg-status");
elementotres.scrollIntoView({behavior: "smooth"});








