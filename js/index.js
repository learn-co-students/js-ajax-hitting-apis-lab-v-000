function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log(commits)
  const commitsList = `<ul>${commits
  .map(c =>
    '<li>' +
    c.commit.author.name + ", " + c.commit.message +
    ' - <a href="#" data-username="' + c.author.login + '" data-repository="' + c.html_url + '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log(branches)
  const branchList = `<ul>${branches
  .map(b =>
    '<li>' +
    b.name + '</li>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos)
  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name +
        ' - <a href="#"  data-repo="' + r.html_url + '" data-repository="' + r.name + '" data-username= "' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>'
         +  ' - <a href="#" data-repo="' + r.html_url + '" data-repository="' + r.name + '" data-username= "' + r.owner.login +  '" onclick="getBranches(this)">Get Branches</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  const user = document.getElementById('username').value;
  // console.log(`https://api.github.com/users/${user}/repos`)
  req.open('GET', `https://api.github.com/users/${user}/repos`);

  req.send();
}

function getCommits(el) {
  const userName = el.dataset.username;
  const repoName = el.dataset.repository;
  console.log(username)
  console.log(repoName)
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${userName}/${repoName}/commits`);
  req.send();
}

function getBranches(el) {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  const userName = el.dataset.username;
  const repoName = el.dataset.repository;
  req.open('GET', `https://api.github.com/repos/${userName}/${repoName}/branches`);
  req.send();
}
