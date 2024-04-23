document.addEventListener('DOMContentLoaded', (event) => {
  window.onload = function() {
    const totalA = document.getElementsByTagName('a');
    for (var a = 0; a < totalA.length; a++) {
      if (totalA.item(a).href == "https://formfacade.com/website/customize-google-forms.html?product=website&utm_source=madewith&utm_medium=107400614936190841234&utm_campaign=1FAIpQLScM0eswrGbnlZiRoN9HGh8lgJUip_gVX2o8ZloEVzy_VYI5OA&plan=free&userId=107400614936190841234&by=OAAO%20sign%20up%20form&utm_content=logo") {
        totalA.item(a).remove();
        console.log("asdasd");
        a++;
      }
    }
  }



  const canvas = document.getElementById('backgroundCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const stars = [];

  function generateStars() {
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 2,
        color: "#aaaaaa",
      });
      setInterval(function() { twinkle(i); }, randomInt(7000, 11000));
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function moveStars() {
    stars.forEach(star => {
      star.y += star.speed;
      if (star.y > canvas.height) {
        star.y = 0;
        star.x = randomInt(0, canvas.width);
      }
    });
  }

  function scrollStars(mult, all) {
    if (all) {
      for (var i = 0; i < stars.length; i++) {
        stars[i].y += stars[i].speed * mult;
        if (stars[i].y > canvas.height) {
          stars[i].y = 0;
          stars[i].x = randomInt(0, canvas.width);
        } else if (stars[i].y < 0) {
          stars[i].y = canvas.height;
          stars[i].x = randomInt(0, canvas.width);
        }
      }
    } else {
      for (var i = 0; i < stars.length; i += 2) {
        stars[i].y += stars[i].speed * mult;
        if (stars[i].y > canvas.height) {
          stars[i].y = 0;
          stars[i].x = randomInt(0, canvas.width);
        } else if (stars[i].y < 0) {
          stars[i].y = canvas.height;
          stars[i].x = randomInt(0, canvas.width);
        }
      }
    }
  }

  // function scrollStars(mult) {
  //   for (var i = 0; i < stars.length; i+=2){
  //       stars[i].y += stars[i].speed * mult;
  //     if (stars[i].y > canvas.height) {
  //       stars[i].y = 0;
  //       stars[i].x = randomInt(0,canvas.width);
  //     }
  //   }
  // }

  function twinkle(star) {
    stars[star].color = "#aaaaaa";
    var rand = randomInt(10, 70);
    setTimeout(() => { changeStar(star, "#cccccc", .25) }, rand);
    setTimeout(() => { changeStar(star, "#aaaaaa", -.25) }, (rand + randomInt(50, 80)));
    setTimeout(() => { changeStar(star, "#ffffff", .25) }, (rand + randomInt(120, 150)));
    setTimeout(() => { changeStar(star, "#aaaaaa", -.25) }, (rand + randomInt(180, 190)));
  }

  function changeStar(star, color, size) {
    stars[star].color = color;
    stars[star].radius += size;
  }

  generateStars();
  drawStars();

  setInterval(drawAndMove, 50)
  function drawAndMove() {
    moveStars();
    drawStars();
  }
  var scrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY < scrollY) {
      scrollStars(-0.5, true);
      scrollY = window.scrollY;
    } else {
      scrollStars(0.5, false);
      scrollY = window.scrollY;
    }
    drawStars();
  });

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawStars();
  });
});

window.onload = function() {
  const img = document.getElementById('logoImg');
  function calculateOpacity() {
    const maxOpacity = 1;
    const minOpacity = 0.8;
    const maxPosition = window.innerWidth - img.width;
    const currentPosition = parseFloat(img.style.left || 0);
    const normalizedPosition = currentPosition / maxPosition;
    let opacity = maxOpacity - (maxOpacity - minOpacity) * normalizedPosition;
    opacity = Math.max(opacity, minOpacity);
    return opacity;
  }

  function updateOpacity() {
    img.style.opacity = calculateOpacity();
  }
  img.addEventListener('animationiteration', updateOpacity);

  updateOpacity();
}

// Google Sheets Stuff

const calendarURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT8T20PnJhqmGWRoioSBbgGOru87CKhDqfaBwCip8yaffcNZEacFMmpIagblVyT6laQUwLnGvmUvnCL/pub?gid=0&single=true&output=csv"

async function csvToArray(url) {
  try {
    const response = await fetch(url);

    const csvData = await response.text();

    console.log(csvData);

    var csvArray = csvData.split("\n");

    console.log(csvArray);

    document.getElementById('calendar').textContent = "";
    for (let i = 0; i < csvArray.length; i++) {
      var event = document.createElement("div");
      var date = document.createElement("span");
      var txt = document.createElement("span");
      event.classList.add("calendarEvent");
      date.textContent = csvArray[i].split(",")[0];
      date.style.fontWeight = "bold";
      txt.textContent = ": " + csvArray[i].split(",")[1];
      event.appendChild(date);
      event.appendChild(txt);
      document.getElementById('calendar').appendChild(event);
    }

    return csvArray;
  } catch (error) {
    console.error('Error fetching CSV:', error);
    return null;
  }
}

async function fetchData() {
  var calendar = await csvToArray(calendarURL);
}

fetchData();

const apiKey = 'patr5LyzFGyLcGFV1.1e042019e262b9394b9129375034b7eb20a6e59984d52e59d121ac0c0fd21f25';
const baseId = 'appGQR3YLk3KQzD6a';
const tableName = 'Table 1';

function fetchAndDisplayRecords() {
  fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`
    }
  })
  .then(response => response.json())
  .then(data => {
    displayRecords(data.records);
  })
  .catch(error => {
    console.error('Error fetching Airtable data:', error);
  });
}

function displayRecords(records) {
    const recordList = document.getElementById('record-list');

    // Sort the records by the Start field in descending order
    records.sort((a, b) => new Date(b.fields.Start) - new Date(a.fields.Start));

    records.forEach(record => {
      const listItem = document.createElement('li');

      // Convert the Start field to a Date object
      const startDate = new Date(record.fields.Start);

      // Format the date as a string in dd/mm/yyyy format
      const start = `${startDate.getDate().toString().padStart(2, '0')}/${(startDate.getMonth() + 1).toString().padStart(2, '0')}/${startDate.getFullYear()}`;

      const html = `
        <div class="record">
          <h1 class="field-title">${record.fields.Title}</h1>
          <h4>${start}</h4>
          <!-- <p class="field-description">${'Description'}: ${record.fields.Description}</p> -->
          <h3>Individual Round</h3>
          <a class="InTest" href="${record.fields.InTest}" target="_blank">${'Test'}</a>
          <a class="InSol" href="${record.fields.InSol}" target="_blank">${'Solution'}</a>
          <br>
          <h3>Team Round</h3>
          <a class="TeTest" href="${record.fields.TeTest}" target="_blank">${'Test'}</a>
          <a class="TeSol" href="${record.fields.TeSol}" target="_blank">${'Solution'}</a>
        </div>
      `;

      listItem.innerHTML = html;

      recordList.appendChild(listItem);
    });
  }

// fetchAndDisplayRecords();