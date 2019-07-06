function displayCommits() {}

function displayBranches() {}

function displayRepositories() {
  let repos = JSON.parse(this.responseText);
  console.log(repos)
  const repoList = `<ul>${repos
    .map(r =>
      '<li>' +
      r.name +
      '- <a href="#"  data-repo="' +
      r.html_url +
      `" onclick="getCommits(this)">${r.name}</a></li>`
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getRepositories() {
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  user = document.getElementById('username').value;
  // console.log(`https://api.github.com/users/${user}/repos`)
  req.open('GET', `https://api.github.com/users/${user}/repos`);

  req.send();
}

function getCommits(el) {
  const name = el.dataset.repo;
  console.log(name)
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `${name}` + '/commits');
  req.send();

}

function getBranches() {}
