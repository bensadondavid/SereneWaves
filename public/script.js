let feelings = document.querySelector('.feelings')
let button1 = document.querySelector('.button1')
let button2 = document.querySelector('.button2')
let button3 = document.querySelector('.button3')
let button4 = document.querySelector('.button4')
let button5 = document.querySelector('.button5')


const funFacts = async()=>{
  try{
  const response = await fetch('funfacts.json')
  if(!response.ok){
    throw new Error('not okay')
  }
  else{
    const data = await response.json()
    return data
  }
}
catch(error){
  console.log(error);
}
}

const getFunfact = async ()=>{
    try {
    const data = await funFacts();
    if (!data) {
        console.error('Failed to retrieve fun facts');
        return
    }
    const index =  Math.floor(Math.random()* data.length)
    console.log(index);
    const funfact = data[index].fact
    console.log(funfact);
    let anotherButton = document.createElement('button')
    anotherButton.innerHTML = 'Another one !'
    anotherButton.style.fontSize = '20px'
    anotherButton.addEventListener('click', e=>{e.preventDefault(), getFunfact()})
    feelings.innerHTML = ''
    feelings.innerHTML = funfact
    feelings.style.fontSize = '30px'
    feelings.append(document.createElement('br'),anotherButton)
}
    catch (error) {
      console.error(error);
  
  }
}

const getRespiration = async ()=>{
  feelings.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/DbDoBzGY3vo?si=0pzbJYSH4nZAk0e_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
}

const getVideo = async ()=>{
  feelings.innerHTML = '<iframe width="560" height="315" src="https://www.youtube.com/embed/03Xm7D3rWAk?si=Ukd2BYeQPE5hnTQB" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
}

button1.addEventListener('click', e=>{
    e.preventDefault()
    feelings.innerHTML = ''
    let newh2 = document.createElement('h2')
    newh2.innerHTML = 'Maybe you need to write about it...'
    let myDiary = document.createElement('button')
    myDiary.innerHTML = 'Go to my diary'
    myDiary.addEventListener('click',e=>{e.preventDefault(),window.location.href = 'index.html#myDiary'})
    let newH2 = document.createElement('h2')
    newH2.innerHTML = 'Or do a respiration Exercise'
    let respirationEx = document.createElement('button')
    respirationEx.innerHTML = 'Do a little exercise'
    respirationEx.addEventListener('click', e =>{e.preventDefault(), getRespiration()})
    feelings.append(newh2, myDiary, newH2, respirationEx)
    newH2.style.marginTop = '20px'
})


button2.addEventListener('click', e=>{
    e.preventDefault()
    feelings.innerHTML = ''
    let newh2 = document.createElement('h2')
    newh2.innerHTML = 'Maybe you need to write about it...'
    let myDiary = document.createElement('button')
    myDiary.innerHTML = 'Go to my diary'
    myDiary.addEventListener('click',e=>{e.preventDefault(),window.location.href = 'index.html#myDiary'})
    let newH2 = document.createElement('h2')
    newH2.innerHTML = 'Or do a respiration Exercise'
    let respirationEx = document.createElement('button')
    respirationEx.innerHTML = 'Do a little exercise'
    respirationEx.addEventListener('click', e =>{e.preventDefault(), getRespiration()})
    feelings.append(newh2, myDiary, newH2, respirationEx)
    newH2.style.marginTop = '20px'
})

button3.addEventListener('click', e=>{
    e.preventDefault()
    feelings.innerHTML = ''
    let newh2 = document.createElement('h2')
    newh2.innerHTML = 'Okay, What can we do to get you happier ?'
    let happyVideo = document.createElement('button')
    happyVideo.innerHTML = 'Watch a funny video'
    happyVideo.addEventListener('click', e =>{e.preventDefault(), getVideo()})
    let respirationEx = document.createElement('button')
    respirationEx.innerHTML = 'Do a little exercise'
    respirationEx.addEventListener('click', e =>{e.preventDefault(), getRespiration()})
    feelings.append(newh2, happyVideo, respirationEx)
    newH2.style.marginTop = '20px'
})

button4.addEventListener('click', e=>{
    e.preventDefault()
    feelings.innerHTML = ''
    let newh2 = document.createElement('h2')
    newh2.innerHTML = 'Hey ! Great ! Would you like to hear something funny ?'
    let yes = document.createElement('button')
    yes.innerHTML = 'Yes, tell me !'
    yes.addEventListener('click', e=>{e.preventDefault(), getFunfact()})
    let no = document.createElement('button')
    no.innerHTML = 'Home'
    no.addEventListener('click',e=>{e.preventDefault(),window.location.href = 'index.html'})
    feelings.append(newh2, yes,no,)
    no.style.marginTop = '20px'
})

button5.addEventListener('click', e=>{
    e.preventDefault()
    feelings.innerHTML = ''
    let newh2 = document.createElement('h2')
    newh2.innerHTML = 'Hey ! Awesome ! Would you like to write about it ?'
    let yes = document.createElement('button')
    yes.innerHTML = 'Yes, That\'d be great !'
    yes.addEventListener('click',e=>{e.preventDefault(),window.location.href = 'index.html#myDiary'})
    let no = document.createElement('button')
    no.innerHTML = 'Home'
    no.addEventListener('click',e=>{e.preventDefault(),window.location.href = 'index.html'})
    feelings.append(newh2, yes,no,)
    no.style.marginTop = '20px'
})


let formdiary = document.querySelector('#formdiary')
  formdiary.addEventListener('submit',e=>{
  e.preventDefault()
  const formTA = new FormData(formdiary)
  data2 = {
  diary : formTA.get('diary')
  }

  console.log(JSON.stringify(data2));

  fetch('/diary',{
    method : 'POST',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(data2)
  })

  .then(response => {
    if(response.status === 400){
      return 'error'
    }
    else{
        return response.json()
      }
  })
  .then(data2 =>{ 
    if (data2 === 'error') {
    alert('An error occurred while sending the diary entry')
    } else {
    console.log('Sent', data2);
    alert('Sent !')
    }
  })

   .catch(err => console.log(err))
})



