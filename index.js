function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + '<a href="http://www.github.com/"' + ${r.full_name} + '></a></li>').join('')}</ul>`
  // const repoList = `<ul>${repos.map(r => '<li>' + r.name + '</li>').join('')}</ul>`
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + `<br><a href="${r.html_url}"> Link </a><br>`
  	+ ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Commits</a></li>' 
  	+ ' - <a href="#" data-repo="' + r.name 
  	+ '" onclick="getBranches(this)">Branches</a></li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username.value}/${name}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.committer.name + '</strong> - ' 
  	+ commit.author.login + " - " + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const name = el.dataset.repository
  // console.log(name);
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username.value}/${name}/branches`)
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - ' + branch.commit.sha + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
  // document.getElementById("details-header").innerHTML = "Details: " + 
}