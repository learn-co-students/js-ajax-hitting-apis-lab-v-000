function displayRepositories(event, data) {
  let repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = "<ul>" + repos.map(repo => {
     const userName = 'data-username="' + repo.owner.login + '"';
     const repoName = 'data-repository="' + repo.name + '"';
     return(`
           <li>
             <h2>${repo.name}</h2>
             <a href="${repo.html_url}">${repo.html_url}</a><br>
             <a href="#" ${repoName} ${userName} onclick="getCommits(this)">Get Commits</a><br>
             <a href="#" ${repoName} ${userName} onclick="getBranches(this)">Get Branches</a></li>
           </li>`
           )
   }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList;
}

function displayCommits(event, data) {
  let commits= JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.commit.author.name +
  ' (' + commit.author.login + ')' + commit.commit.message + '</li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
    const repoName = el.dataset.repository;
    const uri = rootURL + "/repos/" + el.dataset.username + "/" + repoName + "/branches";
    const req = new XMLHttpRequest();
   req.addEventListener("load", displayBranches);
   req.open("GET", uri);
   req.send();
}

function displayBranches() {
    const branches = JSON.parse(this.responseText);
    const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = branchesList;
}

function getRepositories() {
 const user = document.getElementById("username").value;
 const userLink = "https://api.github.com/users/" + user + "/repos";
 const req = new XMLHttpRequest();
 req.addEventListener("load", displayRepositories);
 req.open("GET", userLink);
 req.send();
}

function getCommits(element) {
  const user = document.getElementById("username").value;
  const commitPath = "https://api.github.com/repos/" + user + "/" + element.dataset.repository +"/commits";
  debugger;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", commitPath);
  req.send();
}

function getBranches(element) {
  const user = document.getElementById("username").value;
  const branchLink = "https://api.github.com/repos/" + user + "/" + element.dataset.repository + "/branches";
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", branchLink);
  req.send();
}
