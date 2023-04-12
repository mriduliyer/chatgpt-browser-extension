const API_KEY = 'YOUR_API_KEY';
function showLoading() {
  //document.getElementById("sendButton").classList.add("loading-animation");
}

function hideLoading() {
  //document.getElementById("sendButton").classList.remove("loading-animation");
}

document.addEventListener('DOMContentLoaded', () => {
const sendButton = document.getElementById('sendButton');
const input = document.getElementById('input');
const response = document.getElementById('response');

sendButton.addEventListener('click', async () => {
  const message = input.value;
  input.value = '';
  sendButton.innerHTML = '<center><div class="loading-animation"></div></center>'
  const data = {
    model: "gpt-3.5-turbo",
    messages: [{"role": "user", "content": message}],
    max_tokens: 50,
    temperature: 0.7,
    n: 1,
    stop: '\n'
  };

    const responseJson = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(data)
    }).then(response => response.json());

  const responseText = responseJson["choices"][0]["message"]["content"] 
  sendButton.innerHTML = "Send";
  response.innerText = responseText;
  
});
});
