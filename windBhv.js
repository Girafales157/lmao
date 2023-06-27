window.onload = function(){
    let btnA = document.getElementById("si"),
    btnB = document.getElementById("su"),
    qsA = document.querySelector("div.SignInWindow"),
    qsB = document.querySelector("div.SignUpWindow")
        

    btnA.addEventListener("click", function(){
        // console.log("listener de evento pegando fi")
        qsA.style.display = "block"
        qsB.style.display = "none"
    })
      
    btnB.addEventListener("click", function(){
        // console.log("nesse tbm tu eh doido")
        qsA.style.display = "none"
        qsB.style.display = "block"
    })
}