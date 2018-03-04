function getRepositories() {
  const query = document.querySelector("#username").value
  const req = new XMLHttpRequest()
  req.open("GET", `https://api.github.com/users/${encodeURIComponent(query)}/repos`)
  req.addEventListener("load", displayRepositories)
  req.send()
}

function getBranches(branchUrl) {
  const req = new XMLHttpRequest()
  req.open("GET", stripOptionalUrl(branchUrl))
  req.addEventListener("load", displayBranches)
  req.send()
}

function getCommits(commitUrl) {
  const req = new XMLHttpRequest()
  req.open("GET", stripOptionalUrl(commitUrl))
  req.addEventListener("load", displayCommits)
  req.send()
}

function stripOptionalUrl(url) {
  return url.replace(/\{.+\}/, "")
}

function displayBranches() {
  var source = document.getElementById("branches-template").innerHTML;
  var template = Handlebars.compile(source);
  let branches = JSON.parse(this.responseText)

  let branchesHtml = template({
    branches
  })
  const branchesElement = document.querySelector("#branches")
  branchesElement.innerHTML = branchesHtml
}

function displayCommits() {
  var source = document.getElementById("commits-template").innerHTML;
  var template = Handlebars.compile(source);
  let commits = JSON.parse(this.responseText)

  let commitsHtml = template({
    commits
  })
  const commitsElement = document.querySelector("#commits")
  commitsElement.innerHTML = commitsHtml
}

function getDetails(repoElement) {
  getBranches(repoElement.dataset.branchesUrl)
  getCommits(repoElement.dataset.commitsUrl)
}

function displayRepositories(event) {
  var source = document.getElementById("repos-template").innerHTML;
  var template = Handlebars.compile(source);
  let repos = JSON.parse(this.responseText)

  let reposHtml = template({
    repos
  })
  const repositoriesElement = document.querySelector("#repositories")
  repositoriesElement.innerHTML = reposHtml
  addClickRepoListeners(repositoriesElement)
}

function addClickRepoListeners(repositoriesElement) {
  repositoriesElement.querySelectorAll("a.repo").forEach(repo => {
    repo.addEventListener("click", handleRepoClick)
  })
}

function handleRepoClick(event) {
  getDetails(event.target)
  event.preventDefault()
}
