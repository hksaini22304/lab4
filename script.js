// beginner-friendly: small steps, short functions, and the required DOM APIs

// 1) grab stuff with getElementById / querySelector
const mainImage = document.getElementById("mainImage");
const captionEl = document.getElementById("caption");
const thumbList = document.getElementById("thumbList");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const title = document.getElementById("title");
const stage = document.querySelector("#stage");

// 2) add a tiny helper line with insertAdjacentHTML (progressive enhancement)
stage.insertAdjacentHTML(
  "beforeend",
  '<p id="hint" class="tagline" style="margin-top:.25rem;">Tip: Use the buttons or click a picture below 💗</p>'
);

// 3) add ONE extra thumbnail using createElement + appendChild (to show both styles)
const li = document.createElement("li");
li.className = "thumb";
const img = document.createElement("img");
img.src = "images/lehenga.png";
img.alt = "Woman in a lehenga";
img.setAttribute("data-large", "images/lehenga.png");
li.appendChild(img);
thumbList.appendChild(li);

// 4) if you want to write text by hand, use createTextNode
const hidden = document.createElement("span");
hidden.className = "sr-only";
hidden.appendChild(document.createTextNode("thumbnail list"));
thumbList.appendChild(hidden);

// 5) make a list of all thumbs (querySelectorAll)
const thumbs = document.querySelectorAll(".thumbs img");

// keep track of which image is showing
let currentIndex = 0;

// 6) click each thumbnail (addEventListener)
for (let i = 0; i < thumbs.length; i++) {
  thumbs[i].addEventListener("click", function () {
    // parentNode example (from <img> to <li>)
    const parent = this.parentNode;
    // childNodes vs children (beginner peek)
    // (no need to use the values; just logging so you used the property)
    // console.log("childNodes:", thumbList.childNodes.length);
    // console.log("children:", thumbList.children.length);

    showImage(this.getAttribute("data-large"), this.alt);
    currentIndex = i;

    // change page title with innerText
    title.innerText = "♡ My Gallery ♡ • " + this.alt;
  });
}

// 7) prev / next buttons
prevBtn.addEventListener("click", function () {
  goTo(-1);
});
nextBtn.addEventListener("click", function () {
  goTo(1);
});

function goTo(step) {
  currentIndex = currentIndex + step;
  if (currentIndex < 0) currentIndex = thumbs.length - 1;
  if (currentIndex >= thumbs.length) currentIndex = 0;

  const t = thumbs[currentIndex];

  // previousSibling / nextSibling demo:
  // we “peek” at neighbors on the <li> level (might hit text nodes!)
  let node = t.parentNode;
  let neighbor = step > 0 ? node.nextSibling : node.previousSibling;
  while (neighbor && neighbor.nodeType !== 1) {
    neighbor = step > 0 ? neighbor.nextSibling : neighbor.previousSibling;
  }
  // we don't actually need neighbor; this is just to show usage in a simple way

  showImage(t.getAttribute("data-large"), t.alt);
}

// 8) update main image + caption (innerHTML + innerText)
function showImage(src, cap) {
  captionEl.innerHTML = "<em>Loading…</em>";
  mainImage.src = src;
  // after it loads, set innerText (simple)
  mainImage.addEventListener("load", function onLoadOnce() {
    captionEl.innerText = cap;
    mainImage.removeEventListener("load", onLoadOnce);
  });
}

// 9) getElementsByTagName example: count all <img> inside the list
const allImgs = thumbList.getElementsByTagName("img");
if (allImgs.length > 0) {
  // just to prove we touched it—append a tiny note to the footer
  const footer = document.getElementById("footerText");
  footer.innerText = footer.innerText + " • " + allImgs.length + " images";
}
