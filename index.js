function getRepositories() {
  const name = document.getElementsByName('username')[0].value
  console.log(name)
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => `<li><a href='https://github.com/${r.full_name.replace(" ", "/")}'>${r.name}</a></br><a href="#" onclick="getCommits(this)" data-repository="${r.name}" data-username="${r.owner.login}">Get Commits</a>
  </br><a href="#" onclick="getBranches(this)" data-repository="${r.name}" data-username="${r.owner.login}">Get Branches</a></li>`).join('')}</ul>`
  console.log(repoList)
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(link) {
  const name = link.dataset.username
  const repo = link.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open("GET", `https://api.github.com/repos/${name}/${repo}/commits`)
  req.send()  
}

function displayCommits(event) {
  const commits = JSON.parse(this.responseText)
  const commitsList = commits.map(c => `<div> Github name: ${c.author.login}</br>Commiter name: ${c.commit.author.name}</br> Message: ${c.commit.message}</dov>`).join("")
  document.getElementById('details').innerHTML = commitsList
}

function getBranches(link) {
  const name = link.dataset.username
  const repo = link.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open("GET", `https://api.github.com/repos/${name}/${repo}/branches`)
  req.send() 
}

function displayBranches(event) {
  const branches = JSON.parse(this.responseText)
  const branchList = branches.map(b => `<div>Branch name: ${b.name}`).join("")
  document.getElementById("details").innerHTML = branchList
}
