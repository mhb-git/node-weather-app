const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageFieldOne = document.querySelector('#message-1');
const messageFieldTwo = document.querySelector('#message-2');

messageFieldOne.textContent = "Please provide an address above!"

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    messageFieldOne.textContent = 'Loading...';
    messageFieldTwo.textContent = '';
    fetch(`/weather?address=${search.value}`).then((res)=>{
    res.json().then((data)=>{
        if(data.error){
            messageFieldOne.textContent = data.error
        }
        else{
            messageFieldOne.textContent = data.location
            messageFieldTwo.textContent = data.forecast
        }
    })
})

})


