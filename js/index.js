// your code here
// your code here

function getRepositories() {
 const req = new XMLHttpRequest();
 req.addEventListener('load', displayRepositories);
 req.open('GET', 'https://api.github.com/users/octocat/repos');
 req.send();
}

function displayRepositories() {

  var repos = JSON.parse(this.responseText);
  //debugger
  var repoList = `<ul> ${repos.map( r =>
         // <li>
         //  - <a href="' +r.clone_url + '" > r.name </a></li>
         //  - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)"> Get Commits </a></li>

         //"' +r.clone_url + '"

        '<li>' +
        r.name +
        ' - <a href= "' +r.clone_url + '" data-repo="' +
        r.name +
        '" onclick="getCommits(this)">Get Commits</a></li>'

    )
    .join('')}</ul>`;


    document.getElementById('repositories').innerHTML = repoList;

}

function getCommits(el) {
  var name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/commits');
  req.send();
}

function displayCommits() {
  //debugger
  var repos = JSON.parse(this.responseText);
  var repoList = `<ul> ${repos.map( r =>
         // <li>
         //  - <a href="' +r.clone_url + '" > r.name </a></li>
         //  - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)"> Get Commits </a></li>

         //"' +r.clone_url + '"

        '<li>' +
        r.name +
        ' - <a href=# data-repo="' +
        r.name +
        '" onclick="getBranches(this)">Get Branches /Monalisa Octocat/  /octocat/  /Fix all the bugs/ </a></li>'

    )
    .join('')}</ul>`;

    document.getElementById('details').innerHTML = repoList;

}

function getBranches(el) {
  var name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', 'https://api.github.com/repos/octocat/Spoon-Knife/branches');
  req.send();
}

function displayBranches() {
  var repos = JSON.parse(this.responseText);
  var repoList = `<ul> ${repos.map( r =>
         // <li>
         //  - <a href="' +r.clone_url + '" > r.name </a></li>
         //  - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)"> Get Commits </a></li>

         //"' +r.clone_url + '"

        '<li>' +
        r.name +
        ' - <a href=# data-repo="' +
        r.name +
        '" onclick="getBranches(this)">Get Branches /Monalisa Octocat/  /octocat/  /Fix all the bugs/ /master/ </a></li>'

    )
    .join('')}</ul>`;

    document.getElementById('details').innerHTML = repoList;

}
