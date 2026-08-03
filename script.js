/* ==========================================================
   Tiny Decision Buddy
   app.js
========================================================== */

/* -------------------------------
   Elements
-------------------------------- */

const input = document.getElementById("question");
const decideButton = document.getElementById("decideButton");

const loading = document.getElementById("loading");
const loadingText = document.getElementById("loadingText");

const result = document.getElementById("result");
const resultCategory = document.getElementById("resultCategory");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const againButton = document.getElementById("againButton");

const historyButton = document.getElementById("historyButton");
const closeHistory = document.getElementById("closeHistory");

const historyPanel = document.getElementById("historyPanel");
const historyList = document.getElementById("historyList");


/* -------------------------------
   Loading Messages
-------------------------------- */

const loadingMessages = [

    "Thinking...",

    "Looking at the options...",

    "Giving this some thought...",

    "Almost there...",

    "Taking a tiny moment..."

];


/* -------------------------------
   History
-------------------------------- */

let history = JSON.parse(

    localStorage.getItem("tinyBuddyHistory")

) || [];


renderHistory();


/* -------------------------------
   Events
-------------------------------- */

decideButton.addEventListener(

    "click",

    makeDecision

);

againButton.addEventListener(

    "click",

    resetApp

);

historyButton.addEventListener(

    "click",

    () => historyPanel.classList.add("is-open")

);

closeHistory.addEventListener(

    "click",

    () => historyPanel.classList.remove("is-open")

);


input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        makeDecision();

    }

});


/* ==========================================================
   MAIN
========================================================== */

function makeDecision(){

    const question=input.value.trim();

    if(question===""){

        input.focus();

        return;

    }

    hideResult();

    showLoading();

    loadingText.textContent=

        randomItem(loadingMessages);

    setTimeout(()=>{

        const answer=getDecision(question);

        showResult(answer);

        saveHistory(question,answer);

    },1800);

}


/* ==========================================================
   Decision Engine
========================================================== */

function getDecision(question){

    const q=question.toLowerCase();

    /* Big decisions */

    const importantWords=[

        "marry",

        "marriage",

        "quit",

        "career",

        "baby",

        "house",

        "divorce",

        "move country",

        "move abroad"

    ];

    for(const word of importantWords){

        if(q.includes(word)){

            return{

                category:"Big Decision",

                title:"Take your time.",

                message:"This sounds important. A random answer isn't enough. Reflect carefully, pray if that's part of your life, and seek wise counsel before making your decision."

            };

        }

    }

    /* Normal */

    const options=[

        {

            category:"Go for it",

            title:"Go for it.",

            message:"You've spent enough time thinking. Taking the first step might teach you more than waiting."

        },

        {

            category:"Give it time",

            title:"Give it a little time.",

            message:"Not every decision needs an immediate answer. Come back with fresh eyes."

        },

        {

            category:"Maybe let this one go",

            title:"I'd let this one go.",

            message:"Sometimes saying no creates room for something better."

        },

        {

            category:"Pause",

            title:"Take a short break.",

            message:"Drink some water, stretch, then ask yourself again."

        },

        {

            category:"Trust yourself",

            title:"You probably already know.",

            message:"If you're honest with yourself, you might already know what you want."

        }

    ];

    return randomItem(options);

}


/* ==========================================================
   UI
========================================================== */

function showLoading(){

    loading.classList.remove("hidden");

    result.classList.add("hidden");

}


function hideResult(){

    result.classList.add("hidden");

}


function showResult(answer){

    loading.classList.add("hidden");

    result.classList.remove("hidden");

    resultCategory.textContent=

        answer.category;

    resultTitle.textContent=

        answer.title;

    resultMessage.textContent=

        answer.message;

}


function resetApp(){

    result.classList.add("hidden");

    loading.classList.add("hidden");

    input.value="";

    input.focus();

}


/* ==========================================================
   History
========================================================== */

function saveHistory(question,answer){

    history.unshift({

        question,

        ...answer,

        date:new Date().toLocaleDateString()

    });

    if(history.length>20){

        history.pop();

    }

    localStorage.setItem(

        "tinyBuddyHistory",

        JSON.stringify(history)

    );

    renderHistory();

}


function renderHistory(){

    historyList.innerHTML="";

    if(history.length===0){

        historyList.innerHTML=

        `<p>No decisions yet.</p>`;

        return;

    }

    history.forEach(item=>{

        const card=document.createElement("div");

        card.className="history-item";

        card.innerHTML=`

            <h3>${escapeHTML(item.question)}</h3>

            <strong>${escapeHTML(item.title)}</strong>

            <p>${escapeHTML(item.message)}</p>

            <small>${item.date}</small>

        `;

        historyList.appendChild(card);

    });

}


/* ==========================================================
   Helpers
========================================================== */

function randomItem(array){

    return array[

        Math.floor(Math.random()*array.length)

    ];

}


function escapeHTML(text){

    const div=document.createElement("div");

    div.textContent=text;

    return div.innerHTML;

}

console.log("Tiny Decision Buddy ready.");});

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
