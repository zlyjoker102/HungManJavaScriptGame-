// Random JSON FROM GOOGLE
const apiJson = () => {
  return [{
      name: "Mayotte",
      code: "YT"
    },
    {
      name: "Mexico",
      code: "MX"
    },
    {
      name: "Micronesia, Federated States of",
      code: "FM"
    },
    {
      name: "Moldova, Republic of",
      code: "MD"
    },
    {
      name: "Monaco",
      code: "MC"
    },
    {
      name: "Mongolia",
      code: "MN"
    },
    {
      name: "Montserrat",
      code: "MS"
    },
    {
      name: "Morocco",
      code: "MA"
    },
    {
      name: "Mozambique",
      code: "MZ"
    },
    {
      name: "Myanmar",
      code: "MM"
    },
    {
      name: "Namibia",
      code: "NA"
    },
    {
      name: "Nauru",
      code: "NR"
    },
    {
      name: "Nepal",
      code: "NP"
    },
    {
      name: "Netherlands",
      code: "NL"
    },
    {
      name: "Netherlands Antilles",
      code: "AN"
    },
    {
      name: "New Caledonia",
      code: "NC"
    },
    {
      name: "New Zealand",
      code: "NZ"
    },
    {
      name: "Nicaragua",
      code: "NI"
    },
    {
      name: "Niger",
      code: "NE"
    },
    {
      name: "Nigeria",
      code: "NG"
    },
    {
      name: "Niue",
      code: "NU"
    },
    {
      name: "Norfolk Island",
      code: "NF"
    }
  ];
};

const generateAlphabet = (charA, charZ) => {
  let alphabet = [],
    i = charA.charCodeAt(0),
    j = charZ.charCodeAt(0);
  for (; i <= j; ++i) {
    alphabet.push(String.fromCharCode(i));
  }

  return alphabet;
};

const json = apiJson();
const button = document.querySelector(".getRandomWord");

const getRandomWord = (wordList) => {
  const wordListLength = wordList.length,
    number = Math.floor(Math.random() * wordListLength);

  return json[number].name;
};

hideRandomElements = (elements, counter) => {
  elements = [...elements];

  for (let i = 0; i < counter; i++) {
    let randomElement = elements[Math.floor(Math.random() * elements.length)];

    while (randomElement.className === "hidden") {
      randomElement = elements[Math.floor(Math.random() * elements.length)];
    }

    randomElement.classList.add("hidden");
  }
};

countNumberItemsToHide = (percent, word) => {
  word = [...word];
  let number = Math.round(percent / 100 * word.length);

  switch (number) {
    case number === word.length:
      number = number - 1;
      break;
    case number > word.length:
      number = number - 2;
      break;
  }

  return number;
};

drawAlphabetBoard = (alphabet) => {
  const alphabetBoardDiv = document.querySelector('.alphabetBoard');

  if (alphabetBoardDiv !== null) {
    alphabetBoardDiv.remove();
  }

  const appContainer = document.getElementById("app"),
    alphabetBoard = document.createElement("div");

  alphabetBoard.classList.add("alphabetBoard");
  appContainer.appendChild(alphabetBoard);

  alphabet.map(item => {
    let letter = document.createElement("div");

    letter.classList.add('letter');
    alphabetBoard.appendChild(letter);
    letter.innerHTML += `${item.toUpperCase()}`;
    letter.addEventListener("click", checkLetter);
  });
};

incorrectShot = () => {
  console.log("Nie trafiony");
}
correctShot = () => {
  console.log("Trafiony");
};


const checkLetter = function() {
  let value = this.textContent;
  const currentWord = document.querySelector('ul');
  let letters = currentWord.querySelectorAll('li.hidden span');

  letters = [...letters];

  let arr = letters.map((letter) => letter.textContent.toUpperCase());

  let idx = arr.indexOf(value);
  let indexes = [];

  while (idx != -1) {
    indexes.push(idx);
    idx = arr.indexOf(value, idx + 1);
  }

  if (indexes.length) {
    indexes.forEach((element) =>letters[element].parentNode.classList.remove('hidden'));
    indexes = [];
    correctShot();
  }
  else{
    incorrectShot()
  }

  this.classList.add("hidden");
};

drawWordBar = (word) => {
  const list = document.querySelector("ul");

  let number = countNumberItemsToHide(70, word);

  if (list.childNodes.length !== 0) {
    list.innerHTML = "";
  }

  [...word].map(letter => {
    let li = document.createElement("li");
    list.appendChild(li);
    li.innerHTML += `<span>${letter.toUpperCase()}</span>`;
  });

  const listItem = document.querySelectorAll("li");
  hideRandomElements(listItem, number);
};

const initialize = () => {
  const word = getRandomWord(json),
    alphabet = generateAlphabet("a", "z")

  drawAlphabetBoard(alphabet);
  drawWordBar(word);
  // checkLetter();
};

initialize();
const letter = document.querySelector('.alphabet');
console.log("letter", letter);
button.addEventListener("click", () => initialize());
