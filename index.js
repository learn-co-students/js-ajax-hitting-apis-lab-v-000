function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(repo => {
   const userName = 'data-username="' + repo.owner.login + '"'
   const repoName = 'data-repository="' + repo.name + '"'
   return(`
         <li>
           <h2>${repo.name}</h2>
           <a href="${repo.html_url}">${repo.html_url}</a><br>
           <a href="#" ${repoName} ${userName} onclick="getCommits(this)">Get Commits</a><br>
           <a href="#" ${repoName} ${userName} onclick="getBranches(this)">Get Branches</a></li>
         </li>`
         )
 }).join('') + "</ul>";
 document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  let user = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `${'https://api.github.com/users/' + user + '/repos'}`)
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong>' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el){
  let branch = el.dataset.repository
  let user = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", `${'https://api.github.com/repos/' +user+ '/' +branch+'/branches'}`)
  req.send()
}

function getCommits(el) {
  let user = document.getElementById('username').value
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/' + user + '/'+ name + '/commits')
  req.send()
}
function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + commit.commit.author.name +'</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
