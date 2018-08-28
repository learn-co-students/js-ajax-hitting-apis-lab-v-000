function uri(data, tag){
  return 'https://api.github.com/repos/' + data.username + '/' + data.repository + '/' + tag
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const name = document.getElementById("username").value
   req.addEventListener("load", displayRepositories);
   req.open("GET", 'https://api.github.com/users/' + name + '/repos');
   req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
 console.log(repos);
 const repoList = "<ul>" + repos.map(repo => {
   const dataUsername = 'data-username="' + repo.owner.login + '"'
   const dataRepoName = 'data-repository="' + repo.name + '"'
   return(`
         <li>
          <h2> <a href="${repo.html_url}">${repo.name}</a></h2>
           <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
           <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
         </li>`
         )
 }).join('') + "</ul>";
 document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", uri(el.dataset, 'commits'))
  req.send()
}

function displayCommits() {
  var commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.author.name + " "+ commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", uri(el.dataset, 'branches'))
  req.send()
}

function displayBranches() {
  var branches = JSON.parse(this.responseText)
  const branchesList = `${branches.map(branch => '<li>' + branch.name + '</li>').join('')}`
  document.getElementById("details").innerHTML = branchesList
}
