// your code here

function getRepositories() {
  const input = document.querySelector('input#username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', 'https://api.github.com/users/' + input + '/repos');
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  console.log(repos);
  const repoList = `<ul>${repos
    .map(
      //     ' - <a href="#" data-repo="' + r.name + '"onclick="getCommits(this)">Get Commits</a>' +
      //   '</li>'
      r =>
        '<li>' +
          '<a href="' + r.html_url + '">' + r.name + '</a>' +
          ' - <a href="#" data-repo="' + r.name + '"onclick="getCommits(this)">Get Commits</a>' +
        '</li>'
           )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repo;
  const user = el.dataset.user;
  const req = new XMLHttpRequest();
  req.addEventListener('load', showCommits);
  req.open('GET', 'https://api.github.com/repos/' + user + '/' + name + '/commits');
  req.send();
  // debugger
}

function showCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' +
        commit.author.login +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('commits').innerHTML = commitsList;
}
