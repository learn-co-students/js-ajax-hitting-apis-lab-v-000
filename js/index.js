import { Z_PARTIAL_FLUSH } from "zlib";

// your code here
const rootURL = "https://api.github.com"

function getRepositories(){
    const name = document.getElementById("username").value
    const uri = rootURL + "/users" + name + "/repos"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", displayRepositories)
    xhr.open("GET", uri)
    xhr.send()
    //var repos = JSON.parse(this.responseText)
}

function displayCommits(){
    const details = JSON.parse(this.responseText);
    const detailsList = `<ul>${details.map
        (
            detail => '<li><strong>' + octocat +
            '</strong> - ' + 
            detail.commit.message +
            '</li>'
        )
    .join('')}</ul>`;
    document.getElementById('details').innerHTML = detailsList;
}


function diisplayBraches(){
    
}










