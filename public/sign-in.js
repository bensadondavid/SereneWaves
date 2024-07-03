let form = document.querySelector('.signin-form')
form.addEventListener('submit', e=>{
    e.preventDefault()
   const formdata = new FormData(form)
   data = {
    username : formdata.get('username'),
    password : formdata.get('password'),
    email : formdata.get('email')
   }
   fetch('/register',{
    method : 'POST',
    headers :{ 'Content-Type' : 'application/json'
   },
   body : JSON.stringify(data)
   })
   .then(response => {
    if (response.status === 409) {
        alert('already taken')
        return response.json()
    }
})
   .then(data =>{ console.log('success',  data)
    alert('Registration successful')})
   .catch(err => console.log(err))

})