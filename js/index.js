function getRepositories(){
	const req = new XMLHttpRequest();
	const nameValue = document.getElementById("username").value;
	req.addEventListener('load', showRepositories);
	req.open('GET', `https://api.github.com/users/${nameValue}/repos`);
	req.send();
}

function showRepositories(){
	var repos = JSON.parse(this.responseText);
	console.log(repos);
	const repoList = `<ul>${repos
	.map(
      r =>
        '<li>' +
        `<a href="${r.html_url}" target="_blank">` + r.name + '</a>' + 
        ' - <a href="#" data-repo="' +
        r.name +
        'onclick="getCommits(this)">Get Commits</a></li>'
    )
    .join('')}</ul>`;
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
  const name = el.dataset.repo;
  const user = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${user}/${name}/commits`);
  req.send();
}

function displayCommits(){
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits
    .map(
      commit =>
        '<li><strong>' + '(' +
        commit.author.login + ')' +
        '<li><strong>' +
        commit.commit.author.name +
        '</strong> - ' +
        commit.commit.message +
        '</li>'
    ).join('')}</ul>`;
  document.getElementById('details').innerHTML += commitsList;
}








// function showRepositories() {
//   // console.log(this.responseText);
// }

// function getRepositories() {
// 	const req = new XMLHttpRequest();
// 	req.addEventListener('load', showRepositories);
// 	req.open('GET', 'https://api.github.com/users/octocat/repos');
//     req.send();
// }



// function showCommits() {
//   const commits = JSON.parse(this.responseText);
//   const commitsList = `<ul>${commits
//     .map(
//       commit =>
//         '<li><strong>' +
//         commit.author.login +
//         '</strong> - ' +
//         commit.commit.message +
//         '</li>'
//     )
//     .join('')}</ul>`;
//   document.getElementById('commits').innerHTML = commitsList;
// }