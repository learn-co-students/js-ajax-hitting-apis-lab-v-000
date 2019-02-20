// your code here
function getRepositories() {
    let username = document.getElementById('username').value;

    const req = new XMLHttpRequest();
    req.addEventListener('load', displayRepositories)
    req.open('GET', `https://api.github.com/users/${username}/repos`);

    req.send();
    return false;
}

function displayRepositories() {
    let repos = JSON.parse(this.responseText);
    console.log(repos);
    const repoList = 
        '<ul>' +
            repos.map( r => {
                const dataUsername = 'data-username="' + r.owner.login + '"';
                const dataRepoName = 'data-repository="' + r.name + '"';
                return `
                    <li>
                        <h2>${r.name}</h2>
                        <a href="${r.html_url}" target="_blank">${r.html_url}</a><br>
                        <a href="#" ${dataRepoName} ${dataUsername}onclick="getCommits(this)">Get Commits</a><br>
                        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
                    </li>`;
            })
            .join('') +
        '</ul>';
    
        document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
    
    // let username = document.getElementById('username').value;
    // let repoName = el.dataset.username;
    // const req = new XMLHttpRequest();
    // req.addEventListener('load', displayCommits);
    // req.open('GET', `https://api.github.com/repos/${username}/` + repoName + '/commits');
    // req.send();

}

function displayCommits() {
//     const commits = JSON.parse(this.responseText);
//     console.log(commits);

//     const commitsList = commits.map(c =>
//         c.html_url)
//     console.log(commitsList)
//     debugger
// }

function getBranches() {

}

function displayBranches(){

}