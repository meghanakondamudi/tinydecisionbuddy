/* ======================================
   Tiny Decision Buddy
   script.js
====================================== */

const input = document.getElementById("questionInput");
const decideBtn = document.getElementById("decideBtn");
const againBtn = document.getElementById("againBtn");

const thinking = document.getElementById("thinking");

const resultCard = document.getElementById("resultCard");
const categoryText = document.getElementById("category");
const responseText = document.getElementById("response");

const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

const buddy = document.getElementById("buddy");

let history = JSON.parse(localStorage.getItem("tinyDecisionHistory")) || [];

/* ======================================
Load History
====================================== */

loadHistory();

/* ======================================
Events
====================================== */

decideBtn.addEventListener("click", makeDecision);

againBtn.addEventListener("click", () => {
    input.focus();
});

clearHistoryBtn.addEventListener("click", () => {

    history = [];

    localStorage.removeItem("tinyDecisionHistory");

    loadHistory();

});

input.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        makeDecision();

    }

});

/* ======================================
Decision
====================================== */

function makeDecision() {

    const question = input.value.trim();

    if (question === "") {

        alert("Ask me something first 😊");

        return;

    }

    thinking.classList.remove("hidden");
    resultCard.classList.add("hidden");

    buddy.style.transform = "translateY(-10px)";

    setTimeout(() => {

        buddy.style.transform = "";

    },300);

    setTimeout(() => {

        thinking.classList.add("hidden");

        const answer = getAnswer(question);

        categoryText.textContent = answer.category;

        responseText.textContent = answer.text;

        resultCard.classList.remove("hidden");

        saveHistory(question, answer.category, answer.text);

        input.value = "";

    },1500);

}

/* ======================================
Random Answer
====================================== */

function getAnswer(question){

    const q = question.toLowerCase();

    /* -------------------------
       Easter Eggs
    ------------------------- */

    if(q.includes("love you")){

        return{

            category:"💛 Tiny Buddy",

            text:"Aww... I think you're pretty awesome too."

        };

    }

    if(q.includes("who made you")){

        return{

            category:"😊 Tiny Buddy",

            text:"Someone who probably overthinks too."

        };

    }

    if(q.includes("are you real")){

        return{

            category:"🤖",

            text:"Emotionally? Yes. Technically? JavaScript."

        };

    }

    if(q.includes("tax")){

        return{

            category:"😂",

            text:"I'm definitely not qualified for tax advice."

        };

    }

    if(q.includes("marry")){

        return{

            category:"❤️",

            text:"That's a pretty big decision. Don't leave it to a random website. Talk, pray, think, and take your time."

        };

    }

    /* -------------------------
       Big Decisions
    ------------------------- */

    const bigWords = [

        "marriage",
        "marry",
        "divorce",
        "quit job",
        "career",
        "move",
        "country",
        "house",
        "baby"

    ];

    for(const word of bigWords){

        if(q.includes(word)){

            return{

                category:"💙 Big Decision",

                text:"This sounds important. A random answer isn't enough. Consider writing down the pros and cons, praying if that's part of your life, and talking with someone you trust."

            };

        }

    }

    /* -------------------------
       Random Category
    ------------------------- */

    const category = categories[
        Math.floor(Math.random()*categories.length)
    ];

    const array = responses[category.key];

    const text = array[
        Math.floor(Math.random()*array.length)
    ];

    return{

        category:category.title,

        text:text

    };

}

/* ======================================
History
====================================== */

function saveHistory(question,category,response){

    history.unshift({

        question,

        category,

        response

    });

    if(history.length>10){

        history.pop();

    }

    localStorage.setItem(

        "tinyDecisionHistory",

        JSON.stringify(history)

    );

    loadHistory();

}

/* ======================================
Render History
====================================== */

function loadHistory(){

    historyList.innerHTML="";

    if(history.length===0){

        historyList.innerHTML="<li>No decisions yet.</li>";

        return;

    }

    history.forEach(item=>{

        const li=document.createElement("li");

        li.innerHTML=`

            <strong>${escapeHtml(item.question)}</strong>

            <br>

            <small>${item.category}</small>

            <br>

            ${escapeHtml(item.response)}

        `;

        historyList.appendChild(li);

    });

}

/* ======================================
Escape HTML
====================================== */

function escapeHtml(text){

    const div=document.createElement("div");

    div.textContent=text;

    return div.innerHTML;

}

/* ======================================
Tiny Buddy Idle Blink
====================================== */

setInterval(()=>{

    buddy.style.transform="scale(0.98)";

    setTimeout(()=>{

        buddy.style.transform="scale(1)";

    },180);

},6000);

/* ======================================
Floating Button Effect
====================================== */

setInterval(()=>{

    decideBtn.animate(

        [

            {transform:"translateY(0px)"},

            {transform:"translateY(-2px)"},

            {transform:"translateY(0px)"}

        ],

        {

            duration:1500

        }

    );

},2500);

console.log("🌼 Tiny Decision Buddy is ready!");
