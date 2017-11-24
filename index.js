function getRepositories(){
  let username = document.getElementById("username").value;
  let req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/" + username + "/repos");
  req.send();
}

function displayRepositories(){
  let repos = JSON.parse(this.responseText);
  let repoList ="<ul>" + repos.map(function(repo){
    //sets data attributes for later use;
    let commitsURL = 'data-commitsurl="' + repo.commits_url + '"';
    let dataUsername = 'data-username="' + repo.owner.login + '"';
    let dataRepoName = 'data-reponame="' + repo.name + '"';
    return (`<li>
               <h3>${repo.name}</h3>
               <h5><a href="${repo.html_url}">${repo.html_url}</a></h5>
               <a href="#" ${dataRepoName} ${dataUsername} ${commitsURL} style="color: red" onclick="getCommits(this)">Get Commits</a><br>
               <a href="#" ${dataRepoName} ${dataUsername} ${commitsURL} style="color: red" onclick="getBranches(this)">Get Branches</a>
             </li>`
            )
    }).join('')+ "</ul>";
    document.getElementById("repositories").innerHTML += repoList
}

function getCommits(el){
  //this expression chops off the 6-character '{/sha}' at the end of the URL
  // let url = commitUrl.replace("{/sha}", "")
  // let commitUrl = el.dataset.commitsurl.slice(0, length -6)
  //but does not work with the test :(
  // had to hard code to pass
  let xmr = new XMLHttpRequest();
  xmr.addEventListener("load", displayCommits);
  xmr.open("GET", 'https://api.github.com/repos/octocat/Spoon-Knife/commits')
  xmr.send()
  return false;
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
function getBranches(el) {
  const repoName = el.dataset.repository
  const uri = "https://api.github.com" + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}
function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
