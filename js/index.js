// your code here
function getRepositories(){
  const req = new XMLHttpRequest();
  req.addEventListener('load', showRepositories);
  username = document.getElementById("username").value
  userURL = "https://api.github.com/users/" + username + "/repos"
  req.open("GET", userURL)
  req.send()
}

function showRepositories(){
  let repos = JSON.parse(this.responseText)
  let repoList = `<ul>${repos
    .map(
      r =>
        '<li>' +
    '<a href="https://github.com/' + username + "/" + r.name + '">"' +
    r.name + '</a>' +
    ' - <a href="#" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;

  document.getElementById("repositories").innerHTML=repoList;
  }

  function getCommits(el) {
  let name = el.dataset.repo;
  let req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/' + name + '/commits');
  req.send();
}

  function displayCommits(){
  let commits = JSON.parse(this.responseText);
console.log(Object.keys(commits[0].author))
  let commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' + commit.commit.author.name + ' - <a href="https://github.com/' + commit.author.login + '">"' +
        commit.author.login + " " +
        '</strong> - ' +
        commit.commit.message.value +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}
