
// your code here
const rootURL = "https://api.github.com"


function getRepositories(){
    const name = document.getElementById("username").value
    const uri = rootURL + "/users/" + name + "/repos"
    const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", displayRepositories)
    xhr.open("GET", uri)
    xhr.send()
    //var repos = JSON.parse(this.responseText)
}

function displayRepositories(){
    // debugger
          console.log(this.responseText);
           const repos = JSON.parse(this.responseText)
          const repoList = repos.map(r => `<li><a href=${r.html_url}>${r.name}</a></li>`).join('')
        //    target what we need in those URL so it his clickable.
          document.getElementById('repositories').innerHTML = "<ul>" + repoList + "</ul>"
   }
  
function getCommits(el){
    const repoName = el.dataset.respository;
    const uri = rootURL + '/repos/' + el.dataset.username + '/' + repoName + '/commits';
    // the formate stays the same, but it targets different things.
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", displayCommits);
        // the formate stays the same, but it targets different things, then we go make the function for it

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
 
//  this get what is needed.
function getBranches(el){
    const repoName = el.dataset.repository;
    const uri = rootURL + '/repos/' + el.dataset.username + '/' +repoName + '/branches';
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", displayBranches);
    xhr.open("GET", uri)
    xhr.send()

}

//  this display what is needed. 
function displayBranches(){
  const branches = JSON.parse(this.responseText);
   const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
document.getElementById('details').innerHTML = branchesList;
}










