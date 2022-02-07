
//====D.U.K FORMOS====//
var box = document.getElementsByClassName('display-none')[0];
var box1 = document.getElementsByClassName('display-none')[1];
var box2 = document.getElementsByClassName('display-none')[2];
var box3 = document.getElementsByClassName('display-none')[3];


//====D.U.K FORMA(1)====//
function transitionFAQFirst() {
    box.classList.add('display-first');
};
//====D.U.K FORMOS(1) MYGTUKAS====//
function closeForm() {
    box.classList.remove('display-first');
}

document.getElementsByClassName('closeFormBtn')[0].addEventListener('click', closeForm);

//====D.U.K FORMA(2)====//
function transitionFAQSecond() {
    box1.classList.add('display-first');
}
//====D.U.K FORMOS(2) MYGTUKAS====//
function closeForm2() {
    box1.classList.remove('display-first');
}

document.getElementsByClassName('closeFormBtn')[1].addEventListener('click', closeForm2);

//====D.U.K FORMA(3)====//
function transitionFAQThird() {
    box2.classList.add('display-first');
}
//====D.U.K FORMOS(3) MYGTUKAS====//
function closeForm3() {
    box2.classList.remove('display-first');
}

document.getElementsByClassName('closeFormBtn')[2].addEventListener('click', closeForm3);

//====D.U.K FORMA(4)====//
function transitionFAQFourth() {
    box3.classList.add('display-first');
}
//====D.U.K FORMOS(4) MYGTUKAS====//
function closeForm4() {
    box3.classList.remove('display-first');
}

document.getElementsByClassName('closeFormBtn')[3].addEventListener('click', closeForm4);
