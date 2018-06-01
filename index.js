function getRepositories(){
  const username = document.getElementById("username").value
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayRepositories)
  xhr.open("GET", `https://api.github.com/users/${username}/repos`)
  xhr.send();
}

function displayRepositories(e, data){
  const repos = JSON.parse(this.responseText)
  const repoList =
  `<ul>
    ${repos.map(repo=>
      `<li>${repo.name}<br>
      <a href=${repo.html_url}>Link</a><br>
      <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onClick="getCommits(this)">Get Commits</a><br>
      <a href="#" data-username="${repo.owner.login}" data-repository="${repo.name}" onClick="getBranches(this)">Get Branches</a><br>

      </li>`
    )}
  </ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(data){
  const username = data.dataset.username
  const repo = data.dataset.repository
  const uri = `https://api.github.com/repos/${username}/${repo}/commits`
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayCommits)
  xhr.open("GET", uri)
  xhr.send()
}

function displayCommits(e,data){
  const commits = JSON.parse(this.responseText)
  const commitList =
    `<ul>
      ${commits.map(commit=>
        ` <li>${commit.author.login}</li>
            <li>${commit.commit.author.name}</li>
            <li>${commit.commit.message}</li>`
      )}
    </ul>`
    document.getElementById("details").innerHTML=commitList
}

function getBranches(data){
  const username = data.dataset.username
  const repo = data.dataset.repository
  const uri = `https://api.github.com/repos/${username}/${repo}/branches`
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>
    ${branches.map(branch=>
      `<li>${branch.name}</li>`
    )}
  </ul>`
  document.getElementById("details").innerHTML = branchesList
}
