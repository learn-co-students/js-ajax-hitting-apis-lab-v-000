// your code here

function showRepos() {
    let repoList = document.createElement('ul');
    let repos = JSON.parse(this.responseText);
    console.log(repos)

    for(let i = 0; i < repos.length; i++){
        let li = `<li>${repos[i].name} +  '- <a href="#" data-repo="' +
        r.name + 'onclick="getCommits(${repos[i].name})">Get Commits</a></li></li>'`

        repoList.appendChild(li);

    }

}

function getRepositories() {
    console.log("stribg")
    let userName = document.getElementById('username').value;
    debugger;
    const req = new XMLHttpRequest();
    req.addEventListener('load', showRepos);
    req.open('GET', `https://api.github.com/users/${userName}/repos`);
    req.send();
}
