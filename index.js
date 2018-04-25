function displayRepositories() {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>` + repos.map(r => {
    return(
      `<li><h3>${r.name}</h3>
      - <a href="${r.html_url}">${r.html_url}</a><br>
      - <a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getCommits(this)">Get Commits</a>
      - <a href="#" data-username="${r.owner.login}" data-repository="${r.name}" onclick="getBranches(this)">Get Branches</a>
      </li>`
    )}
  ).join("") + '</ul'
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {

  const req = new XMLHttpRequest()
  const username = document.getElementById("username").value
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>` + commits.map(c => {
    if (c.author != null) {
      return(`<li><strong>${ c.author.login}</strong> - ${c.commit.message} - ${c.commit.author.name}</li>`)
    } else {
      return(
        `<li><strong>${c.commit.author.name}</strong> - ${c.commit.message} </li>`
      )
    }

  }).join('') + '</ul>'
  document.getElementById("details").innerHTML = commitsList
}

function getCommits(el) {
  const repository = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/commits`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>` + branches.map(b => `<li>${b.name}</li>`).join("") + '</ul>'

  document.getElementById("details").innerHTML = branchesList
}

function getBranches(el) {
  const repository = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${repository}/branches`)
  req.send()
}
