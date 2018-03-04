function getRepositories() {
  const query = document.querySelector("#username").value
  const req = new XMLHttpRequest()
  req.open("GET", `https://api.github.com/users/${encodeURIComponent(query)}/repos`)
  req.addEventListener("load", displayRepositories)
  req.send()
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
  event.preventDefault()
  debugger
}
