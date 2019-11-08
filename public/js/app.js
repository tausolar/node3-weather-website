console.log('client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageONe = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageONe.textContent = 'Loading Forecast'
    messageTwo.textContent = ''

    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) =>{
       
            if (data.error){
                console.log(data.error)
                messageONe.textContent = 'Error'
                messageTwo.textContent = data.error
            } else{
    
           console.log(data.location)
           console.log(data.forecast)
           messageONe.textContent = data.location
           messageTwo.textContent = data.forecast
    
            }
    
        })
    
    })


})