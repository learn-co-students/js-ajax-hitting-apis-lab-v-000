function getRepositories() {
  const xhr = new XMLHttpRequest();
  const userName = document.getElementById('username').value;
  xhr.addEventListener('load', displayRepositories);
  xhr.open('GET', `https://api.github.com/users/${userName}/repos`);
  xhr.send();
};
const index = 0;
function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = document.createElement('ul');
  repos.forEach(function(r) {
    const repoLi = document.createElement('li');
    const repoLink = document.createElement('a');
    const commitLink = document.createElement('a');
    const space = document.createTextNode(' ');
    repoLink.href = r.html_url;
    repoLink.textContent = r.name;
    commitLink.href = '#';
    console.log(commitLink);
    commitLink.dataset.repo = r.name;
    commitLink.dataset.username = r.owner.login;
    commitLink.textContent = 'Get Commits';
    commitLink.addEventListener('click', getCommits);
    repoLi.appendChild(repoLink);
    repoLi.appendChild(space);
    repoLi.appendChild(commitLink);
    repoList.appendChild(repoLi);
  });

  document.getElementById('repositories').appendChild(repoList);
};

function getCommits() {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayCommits);
  xhr.open('GET', `https://api.github.com/repos/${this.dataset.username}/${this.dataset.repo}/commits`)
  xhr.send();
};

function displayCommits(e) {
  const commits = JSON.parse(this.responseText);
  console.log(commits);
  const commitList = document.createElement('ul');
  commits.forEach(function(c) {
    const commitLi = document.createElement('li');
    const authorLogin = document.createTextNode(c.author.login + ', ');
    const authorName = document.createTextNode(c.commit.author.name + ', ');
    const message = document.createTextNode(c.commit.message);
    commitLi.appendChild(authorLogin);
    commitLi.appendChild(authorName);
    commitLi.appendChild(message);
    commitList.appendChild(commitLi);
  });
  document.getElementById('details').appendChild(commitList);
}
