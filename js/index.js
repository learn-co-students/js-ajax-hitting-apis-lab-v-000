// your code here
const rootURL = "https://api.github.com"


function getRepositories(){
    const name = document.getElementById("username").value
    const uri = rootURL + "/users/" + name + "/repos"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", displayRepositories)
    xhr.open("GET", uri)
    xhr.send()
}

function displayRepositories(){
    console.log(this.responseText);
    const repos = JSON.parse(this.responseText)
    const repoList = repos.map(r => `<li><a href=${r.html_url}>${r.name}</a></li>`).join('')
    document.getElementById('repositories').innerHTML = "<ul>" + repoList + "</ul>"
   }

function getCommits(el){

    const repoName = el.dataset.repository;
    const uri =
    rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/commits';
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", displayCommits);
    xhr.open("GET", uri)
    xhr.send()
}

function displayCommits(){
    const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.
        map(
            commit =>
             '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login +
             ') </h3>' +
            commit.commit.message +
            '</li>'
    ).join('') }</ul>`;

    document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el){
    const repoName = el.dataset.repository;
    const uri = rootURL + '/repos/' + el.dataset.username + '/' +repoName + '/branches';
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", displayBranches);
    xhr.open("GET", uri)
    xhr.send()

}

function displayBranches(){
   const branches = JSON.parse(this.responseText);
   const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
   document.getElementById('details').innerHTML = branchesList;
}
