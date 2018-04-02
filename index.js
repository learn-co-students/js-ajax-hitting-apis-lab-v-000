function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value;

  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories(event, data) {
  const repos = JSON.parse(this.responseText);

  const username = repos[0].owner.login;
  const userUrl = repos[0].owner.html_url;
  const userUrlHTML =`<p><a href=${userUrl} target="_blank">${username}</a></p>`;
  console.log(repos[0].html_url)
  const repoList = `<ul>${
    repos.map(
      r => '<li>'
        + '<a '
          + 'href="' + r.html_url + '" '
          + 'target="_blank">'
          + r.name
        + '</a>'
        + '<br> - '
        + '<a '
          + 'href="#" '
          + 'data-repository="' + r.name + '" '
          + 'data-username="' + username + '" '
          + 'onclick="getCommits(this)">'
          + 'Get Commits'
        + '</a>'
        + ' | '
        + '<a href="#" '
          + 'data-repository="' + r.name + '" '
          + 'data-username="' + username + '" '
          + '" onclick="getBranches(this)">'
          + 'Get Branches'
        + '</a>'
      + '</li>'
    ).join('')
  }</ul>`;
  document.getElementById("repositories").innerHTML += userUrlHTML;
  document.getElementById("repositories").innerHTML += repoList;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;

  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${
    commits.map(
      commit => '<li>'
        + '<strong>' + commit.commit.author.name + '</strong> '
        + '(' + commit.author.login + ')'
        + ' - ' + commit.commit.message
      + '</li>'
    ).join('')
  }</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const username = el.dataset.username;
  console.log(`https://api.github.com/repos/${username}/${name}/branches`)
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul>${
    branches.map(
      branch => '<li>' + branch.name + '</li>'
    ).join('')
  }</ul>`;
  document.getElementById("details").innerHTML = branchList;
}
