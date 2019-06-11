function displayRepositories() {
  let repos = JSON.parse(this.responseText);

  const repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
        r.name + ` - <a href= "${r.html_url}">${r.html_url}</a>` +
        ' - <a href="#" data-username="'+ r.owner.login + '"data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
const userName = document.querySelector('input').value;
const req = new XMLHttpRequest();
req.addEventListener('load', displayRepositories);
req.open('GET', `https://api.github.com/users/${userName}/repos`);
req.send();
}

function getCommits(el) {
  const elName = el.dataset.repo;
  const userName = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${userName}/` + elName + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  debugger;
  const commitsList = `<ul>${commits
    .map(
      c =>
        '<li><strong>' +
        c.author.login +
        '</strong> - ' +
        c.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
