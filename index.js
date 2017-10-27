function getRepositories() {
  const username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", "https://api.github.com/users/" + username + "/repos")
  req.send()
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText)
  const repoList = "<ul>" +
                    repos.map(repo =>
                      `<li>
                        ${repo.name}<br>
                        <a href="${repo.html_url}">${repo.html_url}</a><br>
                        <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getCommits(this)">-Get Commits</a><br>
                        <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onclick="getBranches(this)">-Get Branches</a></li>
                      </li>`
                    ).join("")
                    + "</ul>"
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(element) {
  const userName = element.dataset.username
  const repoName = element.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", "https://api.github.com/repos/" + userName + "/" + repoName + "/commits")
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = "<ul>" +
                      commits.map(commit =>
                        `<li>
                          ${commit.commit.author.name}<br>
                          ${commit.author.login}<br>
                          ${commit.commit.message}<br>
                        </li>`
                      ).join("")
                      + "</ul>"
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(element) {
  const userName = element.dataset.username
  const repoName = element.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", "https://api.github.com/repos/" + userName + "/" + repoName + "/branches")
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = "<ul>" +
                      branches.map(branch =>
                        `<li>
                          ${branch.name}<br>
                        </li>`
                      ).join("")
                      + "</ul>"
  document.getElementById("details").innerHTML = branchesList
}
