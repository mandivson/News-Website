// console.log("This is my index js file");

function requestXml(source,name) {
  let apiKey = 'apikey';

  // Grab the news container
  let newsAccordion = document.getElementById('newsAccordion');
  let cname = document.getElementById('cname');
  // Create an ajax get request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=${source}&apiKey=${apiKey}`, true);

  // What to do when response is ready
  xhr.onload = function() {
    if (this.status === 200) {
      let json = JSON.parse(this.responseText);
      let articles = json.articles;
      // console.log(articles);
      let newsHtml = "";
      let countryname = "";
      articles.forEach(function(element, index) {
        // console.log(element, index)
        let news = `<div class="card">
          <div class="card-header" id="heading${index}">
            <h2 class="mb-0">
              <button class="btn btn-link collapsed" type="button" 
              data-toggle="collapse" data-target="#collapse${index}"
              aria-expanded="false" aria-controls="collapse${index}">
                <b>Breaking News ${index + 1}:</b> ${element["title"]}
              </button>
            </h2>
          </div>
          <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" 
          data-parent="#newsAccordion">
            <div class="card-body"> ${element["content"]}. 
              <a href="${element['url']}" target="_blank" >Read more here</a>  
            </div>
          </div>
        </div>`;
        newsHtml += news;
      });
      countryname = `<h3 id="cname">Top Headlines from : <span class="badge badge-secondary">${name}</span></h3>`;
      cname.innerHTML = countryname;
      newsAccordion.innerHTML = newsHtml;
      cname.innerHTML = countryname;
    } else {
      console.log("Some error occured")
    }
  }

  xhr.send();

}

document.getElementById("list").addEventListener("click",function(e) {
  const tgt = e.target;
  const cc = tgt.dataset.cc;
  // console.log(cc);
  const cname = tgt.id;
  // console.log(cname);
  requestXml(cc,cname)
})
