const rootURL = "https://api.github.com"

function getRepositories(){
    const username = document.getElementById("username").value;
    const url = rootURL + "/users/" + username + "/repos"
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayRepositories);
    req.open("GET", url);
    req.send();
}

function displayRepositories(){
    const repos = JSON.parse(this.responseText);
    let repoList =  "<ul>" + repos.map(repo => {
        const dataUserName = repo.owner.login; 
        const dataRepo= repo.name; 

        return "<li>" + 
        "<h3>" + repo.name + "</h3>" + 
        `<a href="${repo.html_url}">${repo.html_url}</a><br/>` +
        `<a href="#" onclick="getCommits(this)" data-username="${dataUserName}" data-repository="${dataRepo}">View Commits</a></br>` +
        `<a href="#" onclick="getBranches(this)" data-username="${dataUserName}" data-repository="${dataRepo}">View Branches</a></br>` +     
        "</li>";

    } ).join("") + "<ul>";

    document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(element){
    const username = element.dataset.username;
    const repository = element.dataset.repository;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", displayCommits);
    xhr.open("GET", rootURL + "/repos/" + username + "/" + repository + "/commits");
    xhr.send();
}
function getBranches(element){
    const username = element.dataset.username;
    const repository = element.dataset.repository;
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", displayBranches);
    xhr.open("GET", rootURL + "/repos/" + username + "/" + repository + "/branches");
    xhr.send();
}

function displayCommits(){
//The display of commits should include the author's Github name, the author's full name, and the commit message. 
    const commits = JSON.parse(this.responseText);
    const commitList = "<ul>" + commits.map(comm => {
        const username = comm.author.login;
        const fullname = comm.commit.author.name;
        const commitMessage = comm.commit.message;
        return "<li>" + username + " -- " + fullname + ":<br/>" +
            commitMessage + "</li>";
    
    }).join("") + "</ul>";
    document.getElementById("details").innerHTML = commitList;

}
function displayBranches() {
    //list of names of each branch of the repository
    const branches = JSON.parse(this.responseText);
    const branchesList = "<ul>" + branches.map(branch => {
        return "<li>" + branch.name + "</li>";
    }).join("") + "</ul>";
    document.getElementById("details").innerHTML = branchesList;
}