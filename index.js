function getRepositories() {
  const req = new XMLHttpRequest()
  req.open("GET", 'https://api.github.com/users/octocat/repos')
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.open("GET", 'https://api.github.com/repos/octocat/Spoon-Knife/commits')
  req.send()
}

function displayCommits() {

}

function getBranches() {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.open("GET", 'https://api.github.com/repos/octocat/Spoon-Knife/branches')
  req.send()
}

function displayBranches() {

}
