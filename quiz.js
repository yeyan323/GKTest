const ques = document.getElementById("quiz");
const opt = document.querySelectorAll(".form-check");
// const optradio = document.querySelectorAll(".form-check-input");

const sbm = document.getElementById("sbbtn");
const nex = document.getElementById("nexbtn");

let quiznum = 0;
let stumark = document.getElementById("mk");

let points = 0;

const loginform = document.getElementById("loginpg");
const quizform = document.getElementById("quizpg");
const resultform = document.getElementById("resultpg");
const tryagain = document.getElementById("tryagain");
const login = document.getElementById("log");
const finput = document.getElementById("userinput");
const usr = document.getElementById("user");


function optcheck(){
const optradio = document.querySelectorAll(".form-check-input");
   optradio.forEach(element => {
        if(element.checked == true){
            sbm.removeAttribute("disabled")
        }
   });
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array);
}

for (let index = 0; index < 5; index++) {
    shuffleArray(quarr);
}

// arr.sort(function(){return 0.5 - Math.random()});

const selectedQuestions = quarr.slice(0, 2);


function showque(h){
    let tempque = selectedQuestions[h].question;
    ques.innerHTML = tempque;
    selectedQuestions[h].incorrect_answers.sort(function(){return 0.5 - Math.random()});
    opt.forEach((e,i) => {
        // console.log(e.innerHTML)
        let answer = selectedQuestions[h].incorrect_answers[i];
        // console.log(answer);

        e.innerHTML = `
        <label class="form-check-label p-3 d-flex align-items-center justify-content-between w-100 " for="flexRadioDefault${i+1}">
            <input onclick="optcheck()"  class="form-check-input d-none m-0 me-2" type="radio" value="${answer}" name="flexRadioDefault" id="flexRadioDefault${i+1}" data-rd="rd${i+1}" data-iconright="iconright${i+1}"  data-iconfalse="iconfalse${i+1}" data-radinner="inner_radio${i+1}">
            <span class=" col-10 f-color lh-lg">${answer}</span>
            <div class="radio-custom d-flex position-relative p-1 border border-color border-2 rounded-circle" style="width: 1.7em;height: 1.7em;" id="rd${i+1}" >
                <div class="radio-inner w-100 h-100 bg-light rounded-circle m-auto " id="inner_radio${i+1}">
                </div>    
                <i class="fa-solid fa-check position-absolute top-50 start-50 translate-middle text-light d-none" id="iconright${i+1}"></i>
                <i class="fa-solid fa-xmark position-absolute top-50 start-50 translate-middle text-light d-none" id="iconfalse${i+1}"></i>
                </div>
        </label>`
    });   
    nex.setAttribute("disabled","disabled"); 
    sbm.setAttribute("disabled","disabled");

}


sbm.onclick = function (){
        let checkcount = 0;
        let correctans = quarr[quiznum].correct_answer;
        const optradio = document.querySelectorAll(".form-check-input");
        
        optradio.forEach(element => {

            if(element.value == correctans){
                let inrd = element.dataset["radinner"];
                let iright = element.dataset["iconright"];
                let rd = element.dataset["rd"];

                let iconright = document.getElementById(iright);
                let rdinner = document.getElementById(inrd);
                let rdbt = document.getElementById(rd);

                rdinner.classList.add("d-none");
                iconright.classList.remove("d-none");
                rdbt.classList.remove("border");
                rdbt.classList.add("bg-success");   
                
                
        }        
           

            if(element.checked == true){
                checkcount++;

                if(element.value != correctans){
                    let inrd = element.dataset["radinner"];
                    let iwrong = element.dataset["iconfalse"];
                    let rd = element.dataset["rd"];
    
                    let iconwrong = document.getElementById(iwrong);
                    let rdinner = document.getElementById(inrd);
                    let rdbt = document.getElementById(rd);
    
                    rdinner.classList.add("d-none");
                    iconwrong.classList.remove("d-none");
                    rdbt.classList.remove("border")
                    rdbt.classList.add("bg-danger");   
                        
                    // console.log("Your mark is " + stumark);
                }
                else{
                    points++;
                }
            }
            
           

               
               
                
                        
        });
        let marktemp;


        switch(points){
            case 0:
            case 1:
                marktemp = points + " mark";
                break;
            default:
                marktemp = points + " marks";
                break;
        }

        stumark.innerHTML=marktemp;


        if(checkcount == 0){

            window.alert("Choose one answer");  
        }
        else{
            sbm.setAttribute("disabled","disabled");
            nex.removeAttribute("disabled")
            optradio.forEach(element => {
                element.setAttribute("disabled","disabled");
            })
        }     
    }



console.log(showque(quiznum));

nex.onclick = () => {
    quiznum++;

    console.log(quiznum)
   if(quiznum < selectedQuestions.length){
        showque(quiznum)
   }
   else{
       quizform.classList.add("d-none");
       if(points == 2){
           resultform.classList.remove("d-none");
       }
       else{
            tryagain.classList.remove("d-none");
       }
   }
}

const usrnam = document.querySelectorAll(".username");

login.onclick = () => {
    if(finput.value == ""){
       usr.classList.add("is-invalid"); 
       finput.classList.add("is-invalid")
    }
    else{
        usr.classList.remove("is-invalid");
        loginform.classList.add("d-none");
        quizform.classList.remove("d-none");

        usrnam.forEach(element => {
            element.innerHTML=finput.value;
        });
    }


}

function restart(){
    location.reload();;
}