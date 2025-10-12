const directDOM = (elem) => document.querySelector(elem)

const button = directDOM('#new-quote')
const textQuote = directDOM('#text')
const authorQuote = directDOM('#author')
const copyBtn = directDOM('.copy')

button.addEventListener("click", () => {
    button.innerText = 'Please wait...'
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
        textQuote.innerText = result.content;
        authorQuote.innerText = result.author;
        button.innerText = 'Generate Quote'
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
    })
})


copyBtn.addEventListener("click", () => {
   navigator.clipboard.writeText(textQuote.innerText)
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
})