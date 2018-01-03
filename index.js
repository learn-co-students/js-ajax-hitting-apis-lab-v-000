function getRepositories() {
  let name = document.getElementById('username').value
  let uri = `https://api.github.com/users/${name}/repos`
  const xhr = new XMLHttpRequest()
    xhr.addEventListener("load", displayRepositories)
    xhr.open("GET", uri)
    xhr.send()
    return false;
}

function displayRepositories() {
    let data = JSON.parse(this.responseText)
    let repoList = "<ul>" + data.map(repo => {
      let username = `data-username="${repo.owner.login}"`
      let repoName = `data-repository="${repo.name}"`
      return(`
            <li>
              <h2>${repo.name}</h2>
              <a href="${repo.html_url}">${repo.html_url}</a><br>
              <a href="#" ${repoName} ${username} onclick="getCommits(this)">Get Commits</a><br>
              <a href="#" ${repoName} ${username} onclick="getBranches(this)">Get Branches</a>
            </li>
            `)
  }).join('') + "</ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  let repoName = el.dataset.repository
  let uri = `https://api.github.com/repos/${el.dataset.username}/${repoName}/commits`
  let xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", uri)
  xhr.send()
}

function displayCommits() {
  let commits = JSON.parse(this.responseText)
  let commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const uri = `https://api.github.com/repos/${el.dataset.username}/${repoName}/branches`
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
