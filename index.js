function getRepositories() {
  const username = document.querySelector('input[id="username"]').value

  const req = new XMLHttpRequest()
    req.addEventListener('load', displayRepositories);
    req.open("GET", 'https://api.github.com/users/' + username + '/repos')
    req.send()
}

function displayRepositories(event, data) {
   var repos = JSON.parse(this.responseText)
   console.log(repos)
   const repoList = "<ul>" + repos.map(r =>
     {const dataUsername = '" data-username="' + r.owner.login + '"'
      const dataRepoName = 'data-repository="' + r.name + '"'
      return(`
        <li>
          <h1>${r.name}</h1>
          <a href="${r.html_url}"> ${r.html_url}</a><br>
          <a href="#" ${dataRepoName} ${dataUsername}  onclick="getCommits(this);return false">Get Commits</a><br>
          <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this);return false">Get Branches</a><br>
        </li>`
      )
      }).join('') + "</ul>"

   document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repository
   const req = new XMLHttpRequest()
   const uri = 'https://api.github.com/repos/' + el.dataset.username + "/" + el.dataset.repository + "/commits"
     req.addEventListener('load', displayCommits);
     req.open("GET", uri)
     req.send()
}

function getBranches(el) {
  const reponame = el.dataset.repository
  const username = el.dataset.username
  const req = new XMLHttpRequest()
  const uri = 'https://api.github.com/repos/' + username + "/" + reponame +  "/branches"
  req.addEventListener('load', displayBranches);
  req.open("GET", uri)
  req.send()
}

function displayCommits() {
  console.log(this.responseText)
  const commits = JSON.parse(this.responseText)
  const commitsList = "<ul>" + commits.map(commit =>
    `
      <li><h2>${commit.commit.author.name} (${commit.author.login})</h2> ${commit.commit.message}</li>
    `).join('') + "</ul>"

    document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = "<ul>" + branches.map(branch =>
  `<li>${branch.name}</li>`).join('') + "</ul>"

  document.getElementById("details").innerHTML = branchesList
}
