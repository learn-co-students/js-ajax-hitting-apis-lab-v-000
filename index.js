function displayCommits(event, data) {
  var commits = JSON.parse(this.responseText)
  const commitsList = `
  <ul>
    ${commits.map(c => 
      `<li>
        <strong>${c.author.login}</strong> - ${c.commit.author.name} - ${c.commit.message}
      </li>`
    ).join('')}
  </ul>
  `
  document.getElementById("details").innerHTML = commitsList
}

// <a href="#" data-repository="${c.author.repos_url}" data-username="${r.author.login}" onclick="getCommits(this)">Get Commits</a> */}

function displayBranches(event, data) {
  var branches = JSON.parse(this.responseText)
  const branchesList = `
  <ul>
    ${branches.map(b => 
      `<li>
        <strong>${b.name}</strong>
      </li>`
    ).join('')}
  </ul>
  `
  document.getElementById("details").innerHTML = branchesList
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `
  <ul>
    ${repos.map(r => 
      `<li>
        ${r.owner.login} - ${r.name} - ${r.html_url}<br>
        <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getCommits(this)">Get Commits</a>
        <a href="#" data-repository="${r.name}" data-username="${r.owner.login}" onclick="getBranches(this)">Get Branches</a>
      </li>
      `).join('')
    }
  </ul>
  `
  document.getElementById("repositories").innerHTML = repoList
}

// const repoList = `<ul>${repos.map(r => '<li>' + r.owner.login + ' - ' + r.name + ' - ' + r.html_url + '</li>').join('')}</ul>`
// const repoList = `<ul>${repos.map(r => '<li>' + r.owner.login + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`

function getRepositories() {
  const req = new XMLHttpRequest()
  const name = document.getElementById('username').value
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
}

function getCommits(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
  req.send()
}

function getBranches(el) {
  const name = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
  req.send()
}