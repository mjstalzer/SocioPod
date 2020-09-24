$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/members/:intOne/:intTwo/:intThree").then(data => {
    console.log(data);
    // fixed members.js get route to append data from api to our members page!
    const result = document.getElementById("result");
    // eslint-disable-next-line array-callback-return
    data.results.map(item => {
      const newDiv = document.createElement("div");
      const addCard = document.createTextNode(
        item.audio +
          item.title_original +
          item.description_original +
          item.image
      );
      newDiv.appendChild(addCard);


      const node = document.createElement("a");
      const textNode = document.createTextNode(item.audio);
      const newElement = document.createElement("div");
      newElement.classList.add("holderdiv");
      node.appendChild(textNode);
      node.href = item.audio;

      // this is for making cards for the specific podcast with descriptions and img...
      const newTitle = document.createElement("h2");
      // This is for showing the title of the specific url
      const textTitle = document.createTextNode(item.title_original);
      newTitle.appendChild(textTitle);
      newElement.appendChild(newTitle);
      // const audio = `<p>${item[0].audio}</p>`;
      const br = document.createElement("br");
      node.appendChild(br);
      newElement.appendChild(node);
      const imgDiv = document.createElement("div");
      const newImg = document.createElement("img");

      newImg.src = item.image;
      imgDiv.appendChild(newImg);
      newElement.appendChild(imgDiv);

      const newDescrip = document.createElement("p");
      const description = document.createTextNode(item.description_original);
      newDescrip.appendChild(description);
      newElement.appendChild(newDescrip);
      result.appendChild(newElement);
    });
  });
  // $("button").on("click", event => {
  //   event.preventDefault();
  //   const int = $("#interest")
  //     .val()
  //     .trim()
  //     .toLowerCase();
  //   console.log(int);
  //   $.ajax({
  //     type: "POST",
  //     url: "/profile",
  //     interstOne: int
  //   });
  // });
});
