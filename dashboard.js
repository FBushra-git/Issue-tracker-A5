const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

// connect html with js

const container= document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner");
const count =document.getElementById("issueCount");

// global storing
let allissues=[];

// Loading spinner

const toggleSpinner = (show)=>{
    show?spinner.classList.remove("hidden"):spinner.classList.add("hidden");
};

// Issues from API
const loadIssues = ()=>{
    toggleSpinner(true);
    
    fetch(API)
    .then(res => res.json())
    .then(json =>{
        allissues = json.data;
        displayIssues(allissues);
        toggleSpinner(false);
    })

    .catch(err=>{
        
        console.error("API Load error:",err);
        toggleSpinner(false);
});

    


};
// display issues cards in UI
const displayIssues=(issues)=>{
    // empty container
    container.innerHTML="";
    // total issues show
    count.innerText = issues.length;

    container.className =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";

    // loop for every element
    issues.forEach(issue =>{

        // for priority high/meddium/low
        let priorityClass = "";

        if(issue.priority === "high"){
            priorityClass = "bg-red-100 text-red-600";
        }
        else if(issue.priority === "medium"){
            priorityClass = "bg-yellow-100 text-yellow-600";
        }
        else{
            priorityClass = "bg-gray-200 text-gray-600";
        }


        const borderClass= issue.status === "open"? "border-t-4 border-green-500":
        "border-t-4 border-purple-500";

        const statusIcon = 
        issue.status = 
        "open"?`<img src ="./assets/Open-Status.png" class="w-5 h-5">`:`<img src="./assets/Closed- Status .png" class="w-5 h-5">`;


        // bug+help wanted bdge

        const badges = `
        <span class="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
            <img src="./assets/BugDroid.png" class="w-3 h-3">
            BUG
        </span>

        <span class="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-600">
            <img src="./assets/Lifebuoy.png" class="w-3 h-3">
            HELP WANTED
        </span>
        `;

        // card element create

        const card = document.createElement("div");

        card.className=
        `bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition ${borderClass}`;
        
        card.inclick = () => openModal(issue.id);

        // card UI content 
        card.innerHTML=
        `
        <div class="flex justify-between items-center mb-2">

        <div>${statusIcon}</div>
         <span class="text-xs px-3 py-1 rounded-full ${priorityClass}">
         ${issue.priority.toUpperCase()}</span>
         </div>

          <h3 class="font-semibold text-sm mb-2">
            ${issue.title}
        </h3>

        <p class="text-xs text-gray-500 mb-3">
            ${issue.description.slice(0,80)}...
        </p>

         <hr class="mb-3">

         <div class="flex gap-2 mb-3 flex-wrap">
            ${badges}
        </div>

        <div class="text-xs text-gray-400 space-y-1">
            <p>#${issue.id} by ${issue.author}</p>
            <p>${issue.createdAt}</p>
        </div>
        `;

        // add card to page
        container.appendChild(card);

        
    });
};

// tab active button style

const setActive = (activeBtn) =>{
    ["allBtn","openBtn","closedBtn"].forEach(id =>{
        const btn = document.getElementById(id);

        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");

    });

    const active = document.getElementById(activeBtn);

    active.classList.remove("btn-outline");
    active.classList.add("btn-primary");
};
const showAll = () => {
    setActive("allBtn");
    displayIssues(allIssues);
};



const showOpen = () => {
    setActive("openBtn");

    displayIssues(
        allIssues.filter(i => i.status === "open")
    );
};



const showClosed=()=> {
    setActive("closedBtn");

    displayIssues(
        allIssues.filter(i=>i.status==="closed")
    );
};


// Search issues

const searchIssues = () =>{
    const text = document.getElementById("searchInput").value;
    fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
    )
    .then(res => res.json())
    .then(json => displayIssues(json.data));

};