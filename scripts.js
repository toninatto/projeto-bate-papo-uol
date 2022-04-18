let conversas = [];


enviarNome();


function enviarNome () {
    let adicionarNome =  {name: prompt("Qual o seu nome?") }

let promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", adicionarNome);
console.log(promise);

promise.catch(tratarErro);
}

function tratarErro(error) {
    console.log(error.response);
    enviarNome()
}

pegarConversas();

function pegarConversas () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    console.log(promise);

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
        console.log(conversas[i].from);
        if (conversas[i].type === "status") {
            elemento.innerHTML +=             
            `<li class="msg-status"> 
            <span>(${conversas[i].time})</span>
            <h1>${conversas[i].from}</h1>            
            <p>: ${conversas[i].text}</p>
            </li>`;           
        }
        else if (conversas[i].type === "message") {
            elemento.innerHTML += `<li class="msg-normal"> 
            <span>(${conversas[i].time})</span>
            <h1>${conversas[i].from}</h1>
            <p class="especial"> para </p> 
            <h1>${conversas[i].to}</h1>
            <p>: ${conversas[i].text}</p>
            </li>`;
        }
        else if (conversas[i].type === "private_message") {
            elemento.innerHTML += `<li class="msg-reservada"> 
            <span>(${conversas[i].time})</span>
            <h1>${conversas[i].from}</h1>
            <p class="especial"> para </p> 
            <h1>${conversas[i].to}</h1>
            <p>: ${conversas[i].text}</p>
            </li>`;
        } 
        else {
            //idk yet
        }
    }
}

