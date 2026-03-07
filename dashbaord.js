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
    })
}