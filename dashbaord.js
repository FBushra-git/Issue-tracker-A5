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
const loadIssues = async()=>{
    toggleSpinner(true);
    try{
        const res = await fetch(API);
        const data = await res.json();
        allissues=data.data;

        // ui showing
        displayIssues(allissues);

    }
    catch(err){
        console.error("API Load error:",err);

    }

    toggleSpinner(false);

};