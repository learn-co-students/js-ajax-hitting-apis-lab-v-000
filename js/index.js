function getRepositories() {
  const req = new XMLHttpRequest();
  //console.log("username: ",username.value);
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username.value}/repos`);
  req.send();
}

function displayRepositories() {
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText);
    console.log("repos:",repos);
    const repoList = `<ul>${repos
   .map(
     r =>
       '<li>'+
       `<a href=${r.html_url}>`+
       r.name+`</a>`+
       ' - <a href="#" data-repository="' +
              r.name +
              '"data-username="' +
                     username.value +
              '" onclick="getCommits(this)">Get Commits</a>'+
      ' - <a href="#" data-repo="' +
             r.name +
             '"data-username="' +
                    username.value +
             '" onclick="getBranches(this)">Get Branches</a>'+
       '</li>'
   )
   .join('')}</ul>`;
    document.getElementById('repositories').innerHTML = repoList;
}


function getCommits(el) {
  const reponame = el.dataset.repository;
  const username = el.dataset.username;
  console.log("reponame in commits:",reponame);
  console.log("username in commits:",username);
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${reponame}` + '/commits');
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  console.log("commits: ",commits);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' + 'Full name:'+
        commit.commit.author.name +' '+
        'GitHub name:'+
        (commit.author == null? 'No existed ':commit.author.login)
        +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
  const reponame = el.dataset.repository;
  const username = el.dataset.username;
  console.log("reponame in branches:",reponame);
  console.log("username in branches:",username);
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${reponame}`+ '/branches');
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  console.log("branches: ",branches);
  const branchesList = `<ul>${branches
    .map(
      branch =>
        '<li>' +
        branch.name +
        '</li>'
    )
    .join('')}</ul>`;
  document.getElementById('details').innerHTML = branchesList;
}
