function getRepositories() {
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/" + username + "/repos")
  req.send()
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(r => {
    const dataUsername = 'data-username="' + r.owner.login + '"'
    const dataRepoName = 'data-repository="' + r.name + '"'
    return(`
      <li>
      <h2>${r.name}</h2>
        <a href="${r.html_url}">${r.html_url}</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a><br>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a></li>
        </li>`)
  }).join('') + "</ul>";

  document.getElementById("repositories").innerHTML = repoList
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + name + "/branches")
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`

  document.getElementById("details").innerHTML = branchesList

}

function getCommits(el) {
  const name = el.dataset.repository
  const username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", "https://api.github.com/repos/" + username + "/" + name + "/commits")
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + '-' + commit.commit.message + '</li>').join('')}</ul>`

  document.getElementById("details").innerHTML = commitsList

}
