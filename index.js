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

function stripOptionalUrl(url) {
  return url.replace(/\{.+\}/, "")
}

function displayBranches() {
  debugger
}

function getDetails(repoElement) {
  getBranches(repoElement.dataset.branchesUrl)
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
