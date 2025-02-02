var r = document.querySelector(':root');
let codep = document.getElementById("code")
let animationType = "scroll";

// check if session storage has been created
if (sessionStorage.getItem("textColor") == null) {
    sessionStorage.setItem("textColor", "#ffffff");
} else {
    r.style.setProperty('--textColor', sessionStorage.getItem("textColor"));
}
if(sessionStorage.getItem("bodyColor") == null) {
    sessionStorage.setItem("bodyColor", "#000000");
} else {
    r.style.setProperty('--bodyColor', sessionStorage.getItem("bodyColor"));
}
if (sessionStorage.getItem("animationType") == null || sessionStorage.getItem("animationType") == "scroll"){
    sessionStorage.setItem("animationType", "scroll");
} else {
    animationType = sessionStorage.getItem("animationType");
    document.getElementById("animationType").value = "type"
}

function getRootColors(item){
    var rs = getComputedStyle(r);
    return rs.getPropertyValue(item);
}

function pageScroll() {
    window.scrollBy(0,1);
    scrolldelay = setTimeout(pageScroll,10);
}

function animator(text){
    codep.textContent = ""
    switch (animationType){
        case "scroll":
            codep.innerText = text;
            pageScroll()
        break;
        case "type":
            let i = 0
            let timer = setInterval(function(){
                if(i < text.length){
                    if(text[i] == " "){
                        codep.innerHTML += "&nbsp;"
                    } else {
                        codep.innerText += text[i]
                    }
                    
                } else {
                    clearInterval(timer)
                }
                i++
            }, 15);
        break;
        }
}

function doText(){
    if(sessionStorage.getItem("text") == null){
        fetch('short.txt')
        .then(response => response.text())
        .then(text => {
            animator(text);
        })
    } else {
        animator(sessionStorage.getItem("text"));
    }
}


document.addEventListener("DOMContentLoaded", function(){
    doText();
    document.getElementById("animationType").addEventListener("change", function(){
        let val = this.value;
        animationType = val;
        sessionStorage.setItem("animationType", val);
        doText();
    })

    const fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = (event) => {
            const fileContent = event.target.result;
            sessionStorage.setItem("text", fileContent)
            doText();
        };

        reader.readAsText(file);
    });

    let textColorInput = document.getElementById("txtColorPicker");
    textColorInput.value = getRootColors("--textColor");
    let bodyColorInput = document.getElementById("bodyColorPicker")
    bodyColorInput.value = getRootColors("--bodyColor");

    document.querySelector(".collapse-button").addEventListener("click", function(){
        document.querySelector(".sidebar").remove();
    })

    document.getElementById("txtColorPicker").addEventListener("input", function(){
        r.style.setProperty('--textColor', this.value);
        sessionStorage.setItem("textColor", this.value);
    }, false)

    document.getElementById("bodyColorPicker").addEventListener("input", function(){
        r.style.setProperty('--bodyColor', this.value);
        sessionStorage.setItem("bodyColor", this.value);
    }, false)

})