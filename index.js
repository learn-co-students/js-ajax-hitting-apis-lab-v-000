function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${reposListBody(repos)}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function reposListBody(repos) {
  return repos.map(repo => {
    return `
    <li>
      <h2>${repo.name}</h2>
      <p>Owner: ${repo.owner.login}</p>
      <p><a href="${repo.html_url}">${repo.html_url}</a></p>
    </li>`
  }).join('')
}

function getRepositories() {
  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText)
  const commitList = `<ul>${commitListBody(commits)}</ul>`
  document.getElementById("commits").innerHTML = commitList
}

function commitListBody(commits) {
  return commits.map(commit => {
    return `
    <li>
      <h3>${commit.commit.author.name} (${commit.author.login})</h3>
      <p>${commit.commit.message}</p>
    </li>`
  }).join('')
}

function getCommits(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/commits`)
  req.send()
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(b => b.name).join('')}</ul>`
  document.getElementById("branches").innerHTML = branchList
}

function getBranches(el) {
  const repo = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`)
  req.send()
}
