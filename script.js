const createElements = (arr) => {
  const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElements.join(" ");
};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const faqBtn = document.getElementById('faqBtn');
const learnBtn = document.getElementById('learnBtn')
const logOut = document.getElementById('logOut');
const navbar = document.getElementById('navBar')
const banner = document.getElementById('banner')
const faq = document.getElementById('FAQsection')
const learn = document.getElementById('learnSec')
faqBtn.classList.add('hidden');
learnBtn.classList.add('hidden');
learn.classList.add('hidden');
faq.classList.add('hidden');

function setActive(btn) {
  [faqBtn, learnBtn].forEach(b => b.classList.remove('bg-gray-500', 'text-white'));
  btn.classList.add('bg-gray-500', 'text-white')
}
faqBtn.addEventListener('click', () => {
  setActive(faqBtn)
  faq.scrollIntoView({ behavior: 'smooth' });

  learn.classList.add('hidden')
  banner.classList.add('hidden')
  faq.classList.remove('hidden')
 
})
learnBtn.addEventListener('click', () => {
  learn.scrollIntoView({ behavior: 'smooth' });

  setActive(learnBtn)
  faq.classList.add('hidden')
  banner.classList.add('hidden')
  learn.classList.remove('hidden')
})
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault()
  const name = document.getElementById('name').value;
  const pass = document.getElementById('pass').value;
  if (!name) {
    alert('Enter your correct name');
    return;
  } if (pass !== '12345') {
    alert('put correct password');
    return
  }
  faqBtn.classList.remove('hidden');
learnBtn.classList.remove('hidden');
    banner.classList.add('hidden');       // banner hide
  learn.classList.remove('hidden');     // learning section show
  faq.classList.remove('hidden');
    learnBtn.disabled = false;
  faqBtn.disabled = false;
   setActive(learnBtn);
  learn.scrollIntoView({ behavior: 'smooth' });

})

const closeModal = () => {
  const modal = document.getElementById("word_modal");
  modal.classList.remove("modal-open"); // close modal
};
const loadTitle = () => {
  fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res => res.json())
    .then(data => displayTitle(data.data))
}
const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};
const loadWords = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayWordDetails(data.data))
}
const displayWordDetails = (word) => {
  // console.log(word);
  const detailsBox = document.getElementById("details-container");
  detailsBox.innerHTML = `
    <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
    word.pronunciation
  })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
             
            </div>
          <div class="">
            <h2 class="font-bold">Synonym</h2>
            <div class="">${createElements(word.synonyms)}</div>
          </div>
    
    
    `;
    const modal = document.getElementById("word_modal"); // DaisyUI compatible open modal.classList.add("modal-open"); }
    // const openModal = () => {
  // const modal = document.getElementById("word_modal");
      modal.classList.add("modal-open");


};
const displayTitle = (data) => {
  // console.log(data)
  const learningContainer = document.getElementById('lessonsSec');
  learningContainer.innerHTML="";
  for (const da of data) {
    // console.log(da)
    const titleDiv = document.createElement('div')
    titleDiv.innerHTML = `
       <button id="lesson-btn-${da.level_no}" onclick="loadTitleWord(${da.level_no})" class="text-white bg-gray-600 p-2 rounded hover:bg-yellow-600 hover:text-gray-400">${da.lessonName}</button>

  `;
    learningContainer.append(titleDiv)
  }
}
const displayWords = (words) => {
  const wordsContainer = document.getElementById('wordContainer')
  wordsContainer.innerHTML="";
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div
        class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
        <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    
    `;
    return;
  }

   words.forEach(word => {
    const wordsDiv = document.createElement('div')
    wordsDiv.innerHTML = `
   <div class="border p-5 rounded border-[#56ffc5] h-full">
          <div class="text-center flex flex-col gap-1 items-center justify-center">
            <h1 class="mt-8 font-bold text-2xl text-gray-600">${word.word}</h1>
            <p class="text-sm font-thin">Meaning/Pronunciation</p>
            <h2 class="text-xl font-semibold mb-5 text-[#636e72]">${word.meaning}/${word.pronunciation}</h2>
          </div>
          <div class="flex justify-between items-end px-5">
            <i onclick="loadWords('${word.id}')" class="fa-solid fa-clipboard-question"></i>
            <i onclick="pronounceWord('${word.word}')" class="fa-solid fa-volume-low"></i>
          </div>
        </div>
   `;
    wordsContainer.append(wordsDiv)
  })
}
const loadTitleWord = (id) => {
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then(data => {
      removeActive()
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); // add active class
      displayWords(data.data)
    })
}
loadTitle()
// {
// "id": 101,
// "level_no": 1,
// "lessonName": "Basic Vocabulary"
// }
// {
//     "id": 4,
//     "level": 5,
//     "word": "Diligent",
//     "meaning": "পরিশ্রমী",
//     "pronunciation": "ডিলিজেন্ট"
// }
// {
//     "status": true,
//     "message": "successfully fetched a word details",
//     "data": {
//         "word": "Market",
//         "meaning": "বাজার",
//         "pronunciation": "মার্কেট",
//         "level": 2,
//         "sentence": "I will go to the market to buy fruits.",
//         "points": 2,
//         "partsOfSpeech": "noun",
//         "synonyms": [
//             "bazaar",
//             "store",
//             "shop"
//         ],
//         "id": 101
    // }
// }