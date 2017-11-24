function getRepositories() {
  let username = document.getElementById("username").value

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  let list = repos.map(r => {
    return `<li><a href=${r.html_url}>${r.name}</a> - 
    <a href='#' 
      data-repository="${r.name}" 
      data-username="${r.owner.login}" 
      onclick='getCommits(this)'> Show Commits </a> - 
    <a href='#' 
      data-repository="${r.name}" 
      data-username="${r.owner.login}" 
      onclick='getBranches(this)'> Show Branches </a></li>`
  }).join('')
  let repoList = `<ul>${list}</ul>`

  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(anchor) {
  let dataset = anchor.dataset;
  let repository = dataset.repository;
  let username = dataset.username;

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send()
}

function displayCommits() {
  let commits = JSON.parse(this.responseText)
  let list = commits.map(c => {
    return `<li>user: ${c.author.login}, name: ${c.commit.author.name}, message: ${c.commit.message}</li>`
  }).join('')
  let commitList = `<ul>${list}</ul>`

  document.getElementById("details").innerHTML = commitList
}

//Add a link to each repository that calls a getBranches function when clicked and, when complete, 
//calls a displayBranches function that fills the details div with a list of names of each branch of 
//the repository. Give the link data attributes of username and repository for use by the getBranches function.

function getBranches(anchor) {
  let dataset = anchor.dataset;
  let repository = dataset.repository;
  let username = dataset.username;

  const req = new XMLHttpRequest()

  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
  req.send()
}

function displayBranches() {
  let branches = JSON.parse(this.responseText)
  let list = branches.map(b => {
    return `<li>name: ${b.name}</li>`
  }).join('')
  let branchesList = `<ul>${list}</ul>`

  document.getElementById("details").innerHTML = branchesList
}