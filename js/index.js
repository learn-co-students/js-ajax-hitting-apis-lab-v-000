// display data

function displayRepositories () {
  const name = document.querySelector('#username').value;
  let repos = JSON.parse(this.responseText);

  let repoList = `<ul> ${repos.map(
    r =>
    '<li>' +
    '<a href="' + r.html_url + '" target="blank">' + r.name + '</a>' +
    ' - <a href="#" data-repository="' + r.name +
    '" data-username="' + r.owner.login +
    '" onClick="getCommits(this)">Get Commits</a>' +
    ' - <a href="#" data-repository="' + r.name +
    '" data-username="' + r.owner.login +
    '" onClick="getBranches(this)">Get Branches</a>' +
    '</li>'
  )
  .join(' ')}</ul>`;

  document.getElementById('repositories').innerHTML = repoList;
}

function displayCommits () {
  let commits = JSON.parse(this.responseText);

  let commitList = `<ul> ${commits.map(
    c =>
    '<li>' +
    (c.author != null ? c.author.login + ' - ' : ' ') +
    c.commit.author.name +
    ' - ' + c.commit.message +
    '</li>'
  )
  .join(' ')} </ul>`;

  document.getElementById('details').innerHTML = commitList;
}

function displayBranches () {
  const branches = JSON.parse(this.responseText);
  // console.log(branches);
  let branchList = `<ul> ${branches.map(
    b =>
    '<li>' +
    b.name +
    '</li>'
  )
  .join(' ')}</ul>`;

  document.getElementById('details').innerHTML = branchList;
}

// get data

function getRepositories () {
  // get repos and call displayRepositories()
  const name = document.querySelector('#username').value;
  const req = new XMLHttpRequest();

  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + name + '/repos')
  req.send();
}

function getCommits (el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repoName + '/commits');
  req.send();
}

function getBranches (el) {
  const repoName = el.dataset.repository;
  const username = el.dataset.username;

  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/' + username + '/' + repoName + '/branches');
  req.send();
}
