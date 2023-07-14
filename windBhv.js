var formulario = new FormData()
var horario = new Date()

function ContarSegundos(){
    var horario = new Date()
    let output = document.getElementById("horario")
    output.innerText = `${
        horario.getHours() < 10? `0${horario.getHours()}`:`${horario.getHours()}`
    }:${
        horario.getMinutes() < 10? `0${horario.getMinutes()}`:`${horario.getMinutes()}`
    }:${
        horario.getSeconds() < 10? `0${horario.getSeconds()}`:`${horario.getSeconds()}`
    }`

    AtualizaEstado(horario.getHours(), horario.getMinutes(), horario.getDay())
    
    //HABILITAR ISTO NO LADO DO SERVIDOR
    //document.querySelector("body > div").style.visibility = "hidden"
}

function AtualizaEstado(horaAtual, minutos, dia){
    let estado = document.getElementById("estado")
    let barra = document.querySelector("footer")
    let verde = "rgb(12, 194, 12)", vermelho = "rgb(194, 12, 12)"

    switch (dia){
        case 6: 
            if (horaAtual >= 6 && minutos >= 0){
            
                if (horaAtual < 13){
                    
                    estado.innerText = " - Aberto!"
                    barra.style.backgroundColor = verde
                
                } else {
                    
                    estado.innerText = " - Fechado :("
                    barra.style.backgroundColor = vermelho
        
                }

                if (horaAtual >= 14 && horaAtual < 19){
                    
                    estado.innerText = " - Aberto!"
                    barra.style.backgroundColor = verde
                
                } else {
                    
                    estado.innerText = " - Fechado :("
                    barra.style.backgroundColor = vermelho
        
                }
            }
        break

        case 0:
            estado.innerText = " - Fechado :("
            barra.style.backgroundColor = vermelho
        break

        default:
            if (horaAtual >= 6 && minutos >= 0){
        
                if (horaAtual <= 13 && minutos < 30){
                    
                    estado.innerText = " - Aberto!"
                    barra.style.backgroundColor = verde
                
                } else {
                    
                    estado.innerText = " - Fechado :("
                    barra.style.backgroundColor = vermelho
        
                }
                
                if (horaAtual >= 15 && minutos >= 0){
        
                    if (horaAtual < 18 && minutos >= 0){
                        
                        estado.innerText = " - Aberto!"
                        barra.style.backgroundColor = verde
                    
                    } else {
                        
                        estado.innerText = " - Fechado :("
                        barra.style.backgroundColor = vermelho
                    
                    }
                }
            } else {
                
                estado.innerText = " - Fechado :("
                barra.style.backgroundColor = vermelho
            
            }
    }

    let color = barra.style.backgroundColor.valueOf()
    document.getElementById("location").addEventListener("mouseover", function(){
        document.getElementById("location").style.color = color
    })
    document.getElementById("location").addEventListener("mouseout", function(){
        document.getElementById("location").style.color = "#ffffff"
    })
} setInterval(ContarSegundos, 1000)

window.onload = function(){
    let qsA = document.querySelector("div.SignInWindow")
    let qsB = document.querySelector("div.SignUpWindow")
    let checkbox = document.getElementsByClassName("showPassword")
    let input = document.getElementsByTagName("input")
    let btnLoja = document.getElementById("toMain")
    let btnConta = document.getElementById("toPf")

    btnLoja.addEventListener("click", function(){
        changeWindow("selector")
    })

    btnConta.addEventListener("click", function(){
        changeWindow("selector", "user-ui")
    })

    //mudando de menu
    document.getElementById("si").addEventListener("click", function(){
        qsA.style.display = "block"
        qsB.style.display = "none"

        input[1].addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              document.getElementById("btnSI").click();
            }
        });
    })
    document.getElementById("su").addEventListener("click", function(){
        qsA.style.display = "none"
        qsB.style.display = "block"

        input[6].addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              document.getElementById("btnSU").click();
            }
        });
    })

    // mostrar a senha
    checkbox[0].onclick = function(){
        MostraSenha(0, 1)
    }
    checkbox[1].onclick = function(){
        MostraSenha(1, 0)
    }

    //enviando as informações pro servidor por meio de função callback
    document.getElementById("btnSI").addEventListener("click", function(){
        serverCallback(1)
    })
    document.getElementById("btnSU").addEventListener("click", function(){
        serverCallback(2)
    })

    
    //autoexplicativo
    function MostraSenha(cb1, cb2){
        if (checkbox[cb1].checked){
            checkbox[cb2].checked = true
            document.getElementById("password1").type = "text"
            document.getElementById("password2").type = "text"
            document.getElementById("verifPassword2").type = "text"
        } else {
            checkbox[cb2].checked = false
            document.getElementById("password1").type = "password"
            document.getElementById("password2").type = "password"
            document.getElementById("verifPassword2").type = "password"
        }
    }

    function changeWindow(from, to){
        let goBack = document.querySelector("body > section > i")

        goBack.addEventListener("click", function(){
            goBack.style.display = "none"
            document.getElementById(from).style.display = "block"
            document.getElementsByClassName(to)[0].style.display = "none"
        })
        goBack.style.display = "block"

        document.getElementById(from).style.display = "none"
        document.getElementsByClassName(to)[0].style.display = "block"
    }
}

const serverCallback = opt => {
    switch(opt){
        case 1:
            login()
            break

        case 2:
            signup()
            break
    }
}

function login(){
    let user = document.getElementById("user").value
    let password = document.getElementById("password1").value
    let userType

    if (user != "" && password != ""){
        document.getElementsByClassName("output")[0].style.padding = "0%"
        document.getElementsByClassName("output")[0].innerText = ""
        if (user.includes("@")){
            userType = "email"
            formulario.append("user", null)
            formulario.append(userType, user)
            formulario.append("password", password)
        } else {
            userType = "user"
            formulario.append(userType, user)
            formulario.append("email", null)
            formulario.append("password", password)
        } 
    
        formulario.append("userType", userType)
        formulario.append("reqType", "login")
    
        let dados = {
            url: "https://mercadinho-teles-online.000webhostapp.com/php/query.php",
            method: "POST",
            data: formulario,
            processData: false,
            contentType: false,
            success: function(resposta){
                retorno(resposta)
            }
        }
        //programar o $.ajax()
        $.ajax(dados)
        
    } else {
        document.getElementsByClassName("output")[0].innerText = "Preencha os campos!"
        document.getElementsByClassName("output")[0].style.padding = "1%"
    }

    formulario.delete("user")
    formulario.delete("email")
    formulario.delete("password")
    formulario.delete("userType")
    formulario.delete("reqType")
}

function signup(){
    let user = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password = document.getElementById("password2").value
    let verifP = document.getElementById("verifPassword2").value

    //FAZER O TRATAMENTO DE SENHA
    if (user != "" && email != "" && password != "" && verifP != ""){
        if (password.length == 8){
            if (password == verifP){
                document.getElementsByClassName("output")[0].innerText = ""
                document.getElementsByClassName("output")[0].style.padding = "0%"
                formulario.append("user", user)
                formulario.append("email", email)
                formulario.append("password", password)
                formulario.append("reqType", "signup")
    
                let dados = {
                    url: "https://mercadinho-teles-online.000webhostapp.com/php/query.php",
                    method: "POST",
                    data: formulario,
                    processData: false,
                    contentType: false,
                    success: function(resposta){
                        retorno(resposta)
                    }
                }
                //programar o $.ajax()
                $.ajax(dados)
                
                formulario.delete("user")
                formulario.delete("email")
                formulario.delete("password")
            } else {
                document.getElementsByClassName("output")[0].innerText = "As senhas não coincidem!"
                document.getElementsByClassName("output")[0].style.padding = "1%"
            }
        } else {
            document.getElementsByClassName("output")[0].innerText = "A senha deve ter pelo menos 8 caracteres!"
            document.getElementsByClassName("output")[0].style.padding = "1%"
        }
    } else {
        document.getElementsByClassName("output")[0].innerText = "Preencha os campos!"
        document.getElementsByClassName("output")[0].style.padding = "1%"
    }
}

function retorno(param){
    console.log(`${param}`)
    
    if(param.includes("err0000")){
        document.getElementsByClassName("output")[0].innerText = `${param}: Problemas de conexão com o servidor.`
        document.getElementsByClassName("output")[0].style.padding = "1%"
    }
    //caso a conta já exista no cadastro
    else if(param.includes("err0001")){
        document.getElementsByClassName("output")[0].innerText = `${param}: Esta conta já existe.`
        document.getElementsByClassName("output")[0].style.padding = "1%"
    }

    //caso o usuário não seja encontrado
    else if(param.includes("err0002")){
        document.getElementsByClassName("output")[0].innerText = `${param}: Usuário não encontrado.`
        document.getElementsByClassName("output")[0].style.padding = "1%"
    }

    else if(param.includes("err0003")){
        document.getElementsByClassName("output")[0].innerText = `${param}: Senha incorreta.`
        document.getElementsByClassName("output")[0].style.padding = "1%"
    }
}