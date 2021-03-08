let myButton =  document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName(){
    let myName = prompt("input your name:");
    localStorage.setItem('name',myName);
    myHeading.textContent = 'Mozilla is wonderful'+ myName;
}

if(!localStorage.getItem('name')) {
    setUserName();
} else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent = 'Mozilla はすばらしいよ、' + storedName;
}

myButton.onclick = function() {
    setUserName();
}