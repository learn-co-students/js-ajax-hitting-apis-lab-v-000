function getRepositories() {
  const userName = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${userName}/repos`); 
  req.send();
}

// function displayRepositories(event, data) {
//   const repos = JSON.parse(this.responseText)
//   const repoList = `<ul>${repos.map(repo => '<li>' + repo.name + ' - ' + repo.html_url + '</li>').join('')}</ul>`
//   document.getElementById("repositories").innerHTML = repoList;
// }

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);

  const repoList = "<ul>" + repos.map(r => {

    const dataRepo = 'data-repository="' + r.name + '"';
    const dataUsername = 'data-username="' + r.owner.login + '"';
    const dataLink = r.html_url;
    return (
      `<li>
          <a href="${dataLink}" target="_blank">${r.name}</a>
          <a href="#" ${dataUsername} ${dataRepo} onclick="getCommits(this)">Get Commits</a><br>
          <a href="#" ${dataUsername} ${dataRepo} onclick="getBranches(this)">Get Branches</a>
      </li>`
    )
  }).join('') + "</ul>"

  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const repoName = el.dataset.repository
  const userName = el.dataset.username
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${userName}/${repoName}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest();
  const repoName = el.dataset.repository;
  const username = el.dataset.username;
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${repoName}/branches`)
  req.send()
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText);
  const branchList = "<ul>" + branches.map(b => {
    const branch = b.name;

    return (`<li>${branch}</li>`)
  }).join('') + "</ul>"

  document.getElementById("details").innerHTML = branchList;
}
