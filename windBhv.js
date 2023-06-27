window.onload = function(){
    let btnA = document.getElementById("si"),
    btnB = document.getElementById("su"),
    rtsi = document.getElementById("rtsi"),
    rtsu = document.getElementById("rtsu"),
    qsA = document.querySelector("div.SignInWindow"),
    qsB = document.querySelector("div.SignUpWindow")
      
    const changeLog = pararg => {
        switch(pararg){
            case 1:
                qsA.style.display = "block"
                qsB.style.display = "none"
                break
            case 2:
                qsA.style.display = "none"
                qsB.style.display = "block"
                break
        }
    }

    btnA.addEventListener("click", changeLog(1))
    btnB.addEventListener("click", changeLog(2))

    rtsi.onclick = changeLog(1)
    rtsu.onclick = changeLog(2)
}