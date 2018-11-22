let mainTr = document.querySelector('#mainTr');
let tBody = document.querySelector('tbody');
let mainH2 = document.querySelector('h2');
let allLinks = document.querySelectorAll('a');
let image = document.querySelector('#image');
let tableRow = document.querySelector('#tableRow');

for (let i = 0; i < allLinks.length; i++) {
  allLinks[i].addEventListener('click',getData);
}

start();

function start() {
  let xml = new XMLHttpRequest();

  xml.open('get','http://mysafeinfo.com/api/data?list=bestnovels7&format=json');
  xml.onreadystatechange = function () {
    if (xml.readyState == 4 && xml.status == 200) {
      displayData(JSON.parse(xml.responseText));
      mainH2.innerHTML = "Novels";
    }
  }
  xml.send();
}
function displayData(data) {
  let text = '';
  let first = data[0];
  for (var prop in first) {
    text += '<th>'+prop+'</th>';
  }
  mainTr.innerHTML = text;
  text = '';
  for (let i = 0; i < data.length; i++) {
    text += '<tr>';
    for (let prop in first) {
      text += '<td>'+data[i][prop]+'</td>'
    }
    text += '</tr>';
  }
  tBody.innerHTML = text;
  image.style.display = "none";
  tableRow.style.display = "block";
}

function getData(e) {
  tableRow.style.display = "none";
  image.style.display = "block";
  e.preventDefault();
  for (var i = 0; i < allLinks.length; i++) {
    allLinks[i].parentElement.classList.remove('active');
  }
  this.parentElement.classList.add('active');
  mainH2.innerHTML = this.innerHTML;
  let url = this.getAttribute('href');
  let xml = new XMLHttpRequest();

  xml.open('get',url);
  xml.onreadystatechange = function () {
    if (xml.readyState == 4 && xml.status == 200) {
      displayData(JSON.parse(xml.responseText));
    }
  }
  xml.send();
}
