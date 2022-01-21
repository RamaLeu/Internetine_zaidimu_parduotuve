
let translate = 0

let prev = document.querySelector(".prevBtn")
let next =  document.querySelector(".nextBtn")

prev.addEventListener("click", function() {
    if (translate > 0){
        translate -= 25
        document.querySelector(".inner").style.transform = `translateX(${-translate}%)`;
    }
});
next.addEventListener("click", function(){
    if (translate < 75){
        translate += 25
        document.querySelector(".inner").style.transform = `translateX(${-translate}%)`;
    }
})


let prev2 = document.querySelector(".prevBtn2")
let next2 = document.querySelector(".nextBtn2")
let translate2 = 0

prev2.addEventListener("click", function() {
    if (translate2 > 0){
        translate2 -= 50
        if (translate2 == 1){
            translate2 = 0
        }
        document.querySelector(".inner2").style.transform = `translateX(${-translate2}%)`;
    }
});
next2.addEventListener("click", function(){
    if (translate2 < 50){
        translate2 += 50
        if (translate2 == 99){
            translate2 = 100
        }
        document.querySelector(".inner2").style.transform = `translateX(${-translate2}%)`;
    }
})

let prev3 = document.querySelector(".prevBtn3")
let next3 = document.querySelector(".nextBtn3")
let translate3 = 0

prev3.addEventListener("click", function() {
    if (translate3 > 0){
        translate3 -= 50
        if (translate3 == 1){
            translate3 = 0
        }
        document.querySelector(".inner3").style.transform = `translateX(${-translate3}%)`;
    }
});
next3.addEventListener("click", function(){
    if (translate3 < 50){
        translate3 += 50
        if (translate3 == 99){
            translate3 = 100
        }
        document.querySelector(".inner3").style.transform = `translateX(${-translate3}%)`;
    }
})