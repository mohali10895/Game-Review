var menutog = document.getElementById('menutog')
var navbarSupportedContent = document.getElementById('navbarSupportedContent')
menutog.addEventListener('click', function () {
   navbarSupportedContent.classList.toggle('show');
})


class GamDat {
   displayDataGame(data) {
      var box = ``;
      for (var i = 0; i < data.length; i++) {
         box += `
            <div class="col">
               <div data-id="${data[i].id}" class="card h-100 bg-transparent d-flex flex-wrap" role="button">
                  <div  class=" card-body w-100 mb-5">
                     <div class="position-relative">
                           <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}" />
                           <div class="hstack d-flex flex-wrap justify-content-between pt-2 w-100">
                              <h3 class="h6 small w-50">${data[i].title}</h3>
                              <span class="badge text-bg-primary p-2">Free</span>
                              <div class="card-text small text-center opacity-50 w-100">
                              <p>${data[i].short_description.split(" ", 8)}</p>
                              </div>
                           </div>
                     </div>
                  </div>
                  <div class="card-footer small hstack justify-content-between mt-5 w-100">
                        <span class="badge badge-color">${data[i].genre}</span>
                        <span class="badge badge-color">${data[i].platform}</span>
                  </div>
               </div>
            </div>
          `;
      }
      document.getElementById("gameData").innerHTML = box;
   }

   disDets(data) {
      const detls = `
      <div class="col-md-4">
         <img src="${data.thumbnail}" class="w-100" alt="image details" />
      </div>
      <div class="col-md-8">
         <h3>Title: ${data.title}</h3>
         <p>Category: <span class="badge text-bg-info"> ${data.genre}</span> </p>
         <p>Platform: <span class="badge text-bg-info"> ${data.platform}</span> </p>
         <p>Status: <span class="badge text-bg-info"> ${data.status}</span> </p>
         <p class="small">${data.description}</p>
         <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">Show Game</a>
      </div>`;
      document.getElementById("detailsContent").innerHTML = detls;
   }
}

class Dets {
   constructor(id) {
      this.gamdat = new GamDat();

      document.getElementById("btnClose").addEventListener("click", () => {
         document.querySelector(".games").classList.remove("d-none");
         document.querySelector(".details").classList.add("d-none");
      });

      this.getDetails(id);
   }

   getDetails(idGs) {
      const loading = document.querySelector(".loading");
      loading.classList.remove("d-none");

      const options = {
         method: "GET",
         headers: {
            "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
         },
      };

      fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idGs}`, options)
         .then((response) => response.json())
         .then((response) => this.gamdat.disDets(response))
         .catch((err) => console.error(err))
         .finally(() => {
            loading.classList.add("d-none");
         });
   }
}
class Gams {
   constructor() {
      this.getGames("mmorpg");

      document.querySelectorAll(".menu a").forEach((link) => {
         link.addEventListener("click", (e) => {
            document.querySelector(".menu .active").classList.remove("active");
            e.target.classList.add("active");
            this.getGames(e.target.dataset.category);
         });
      });

      this.gamdat = new GamDat();
   }

   async getGames(category) {
      const loading = document.querySelector(".loading");
      loading.classList.remove("d-none");
      const options = {
         method: "GET",
         headers: {
            "X-RapidAPI-Key": "517a2d68f5mshe5e49653c51bbb4p1fd656jsnf33f398fa0f8",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            Accept: "application/json",
            "Content-Type": "application/json",
         },
      };

      const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
      const response = await api.json();

      this.gamdat.displayDataGame(response);
      this.startEvent();
      loading.classList.add("d-none");
   }

   startEvent() {
      document.querySelectorAll(".card").forEach((item) => {
         item.addEventListener("click", () => {
            const id = item.dataset.id;
            this.showDets(id);
         });
      });
   }

   showDets(idGs) {
      const details = new Dets(idGs);
      document.querySelector(".games").classList.add("d-none");
      document.querySelector(".details").classList.remove("d-none");
   }
}
new Gams();