const news = document.querySelector('#news');

fetch('../html/news.html')
.then(res => res.text())
.then(data => footer.innerHTML = data)