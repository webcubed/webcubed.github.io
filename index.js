// This is very skidded
window.onload = function() {
  const firebaseConfig = {
    apiKey: "AIzaSyC9IeopdU5LsK2T38yqDtm29zesMRAecfk",
    authDomain: "idabest-c1ad9.firebaseapp.com",
    projectId: "idabest-c1ad9",
    storageBucket: "idabest-c1ad9.appspot.com",
    messagingSenderId: "976576815053",
    appId: "1:976576815053:web:d7927fa9d151e978efee84"
  };
  firebase.initializeApp(firebaseConfig);
  var db = firebase.database()
  class MEME_CHAT{
    home(){
      document.body.innerHTML = ''
      this.create_join_form()
    }
    chat(){
      this.create_chat()
    }
    create_join_form(){
      var parent = this;
      window.whitelist = ["Brian", "King", "Aiden", "Zeewee", "Jordan", "Zoe", "Iris", "Sohaib"];
      var join_container = document.createElement('div')
      join_container.setAttribute('id', 'join_container')
      var join_inner_container = document.createElement('div')
      join_inner_container.setAttribute('id', 'join_inner_container')

      var join_button_container = document.createElement('div')
      join_button_container.setAttribute('id', 'join_button_container')

      var join_button = document.createElement('button')
      join_button.setAttribute('id', 'join_button')
      join_button.innerHTML = 'Join <i class="fas fa-sign-in-alt"></i>'

      var join_input_container = document.createElement('div')
      join_input_container.setAttribute('id', 'join_input_container')
      var join_input = document.createElement('input')
      join_input.setAttribute('id', 'join_input')
      join_input.setAttribute('spellcheck', 'false')
      join_input.setAttribute('maxlength', 20)
      join_input.placeholder = 'Enter REAL NAME (20 Character Limit)'
      // Every time we type into the join_input
      join_input.onkeyup  = function(){
        // If the input we have is longer that 0 letters
        if(join_input.value.length != 0){ // if not 0 length
          // Make the button light up
          if(whitelist.includes(join_input.value)){    
            join_button.classList.add('enabled') //nice
          }
          // Allow the user to click the button
          join_input.onkeypress = function(event) {
            if (event.keyCode == 13) {
              if (join_input.value.length != 0){ //check againeeee
                if (whitelist.includes(join_input.value)) {
                  parent.save_name(join_input.value)
                  join_container.remove()
                  parent.create_chat()
                }
              }
            }
          }
          join_button.onclick = function(){
            if (join_input.value.length !=0){ //check it again bruh
              if (whitelist.includes(join_input.value)) {
                // Save the name to local storage. Passing in
                // the join_input.value
                parent.save_name(join_input.value)
                // Remove the join_container. So the site doesn't look weird.
                join_container.remove()
                // parent = this. But it is not the join_button
                // It is (MEME_CHAT = this).
               parent.create_chat()
              } else {
               join_button.classList.remove('enabled') //whitelist
              } 
            } else {
               join_button.classList.remove('enabled') //length
            } //function
          } 
        }else{
          // If the join_input is empty then turn off the
          // join button
          join_button.classList.remove('enabled')
        }
      }

      // Append everything to the body
      join_button_container.append(join_button)
      join_input_container.append(join_input)
      join_inner_container.append(join_input_container, join_button_container)
      join_container.append(join_inner_container)
      document.body.append(join_container)
    }
    // create_load() creates a loading circle that is used in the chat container
    create_load(container_id){
      // YOU ALSO MUST HAVE (PARENT = THIS). BUT IT'S WHATEVER THO.
      var parent = this;

      // This is a loading function. Something cool to have.
      var container = document.getElementById(container_id)
      container.innerHTML = ''

      var loader_container = document.createElement('div')
      loader_container.setAttribute('class', 'loader_container')

      var loader = document.createElement('div')
      loader.setAttribute('class', 'loader')

      loader_container.append(loader)
      container.append(loader_container)

    }
    // create_chat() creates the chat container and stuff
    create_chat(){
      // Again! You need to have (parent = this)
      var parent = this;
      // GET THAT MEMECHAT HEADER OUTTA HERE
      var chat_container = document.createElement('div')
      chat_container.setAttribute('id', 'chat_container')

      var chat_inner_container = document.createElement('div')
      chat_inner_container.setAttribute('id', 'chat_inner_container')

      var chat_content_container = document.createElement('div')
      chat_content_container.setAttribute('id', 'chat_content_container')

      var chat_input_container = document.createElement('div')
      chat_input_container.setAttribute('id', 'chat_input_container')

      var chat_input_send = document.createElement('button')
      chat_input_send.setAttribute('id', 'chat_input_send')
      chat_input_send.setAttribute('disabled', true)
      chat_input_send.innerHTML = `<i class="far fa-paper-plane"></i>`
      var name = parent.get_name()
      if (name==="Nathan") {
        window.isadmin= true
      }
      

      var chat_input = document.createElement('input')
      chat_input.setAttribute('id', 'chat_input')
      // Only a max message length of 1000
      chat_input.setAttribute('maxlength', 1000)
      // Get the name of the user
      chat_input.placeholder = `Say something... (1000 Character Limit)`
      chat_input.setAttribute('spellcheck', 'false')
      chat_input.onkeyup  = function(){
        if(chat_input.value.length > 0){
          chat_input.onkeypress = function(event) {
            if (event.keyCode == 13) {
              chat_input_send.click();
            }
          }
          chat_input_send.removeAttribute('disabled')
          chat_input_send.classList.add('enabled')
          chat_input_send.onclick = function(){
            chat_input_send.setAttribute('disabled', true)
            chat_input_send.classList.remove('enabled')
            if(chat_input.value.length <= 0){
              return
            }
            // Enable the loading circle in the 'chat_content_container'
            parent.create_load('chat_content_container')
            // Send the message. Pass in the chat_input.value
            parent.send_message(chat_input.value)
            // Clear the chat input box
            chat_input.value = ''
            // Focus on the input just after
            chat_input.focus()
          }
        }else{
          chat_input_send.classList.remove('enabled')
        }
      }

      var chat_logout_container = document.createElement('div')
      chat_logout_container.setAttribute('id', 'chat_logout_container')

      var chat_logout = document.createElement('button')
      chat_logout.setAttribute('id', 'chat_logout')
      chat_logout.textContent = `Logout`
      // "Logout" is really just deleting the name from the localStorage
      chat_logout.onclick = function(){
        localStorage.clear()
        // Go back to home page
        parent.home()
      }

      chat_logout_container.append(chat_logout)
      document.body.append(admin_panel)
      chat_input_container.append(chat_input, chat_input_send)
      chat_inner_container.append(chat_content_container, chat_input_container, chat_logout_container)
      chat_container.append(chat_inner_container)
      document.body.append(chat_container)
      // After creating the chat. We immediatly create a loading circle in the 'chat_content_container'
      parent.create_load('chat_content_container')
      // then we "refresh" and get the chat data from Firebase
      parent.refresh_chat()
    }
    // Save name. It literally saves the name to localStorage
    save_name(name){
      // Save name to localStorage
      localStorage.setItem('name', name)
    }
    // Sends message/saves the message to firebase database
    send_message(message){
      var parent = this //again bro wtf
      if(parent.get_name() == null && message == null){
        return
      }

      // Get the firebase database value
      db.ref('chats/').once('value', function(message_object) {
        // This index is mortant. It will help organize the chat in order
        var index = parseFloat(message_object.numChildren()) + 1
        db.ref('chats/' + `message-${index}`).set({
          name: parent.get_name(),
          message: message,
          index: index,
          ip: ip
        })
        .then(function(){
          // After we send the chat refresh to get the new messages
          parent.refresh_chat()
        })
      })
    }
    // Get name. Gets the username from localStorage
    get_name(){
      // Get the name from localstorage
      if(localStorage.getItem('name') != null){
        return localStorage.getItem('name')
      }else{
        this.home()
        return null
      }
    }
    // Refresh chat gets the message/chat data from firebase
    refresh_chat(){
      var chat_content_container = document.getElementById('chat_content_container')

      // Get the chats from firebase
      db.ref('chats/').on('value', function(messages_object) {
        // When we get the data clear chat_content_container
        chat_content_container.innerHTML = ''
        // if there are no messages in the chat. Retrun . Don't load anything
        if(messages_object.numChildren() == 0){
          return
        }

        var messages = Object.values(messages_object.val());
        var guide = [] // this will be our guide to organizing the messages
        var unordered = [] // unordered messages
        var ordered = [] // we're going to order these messages

        for (var i, i = 0; i < messages.length; i++) {
          guide.push(i+1)
          unordered.push([messages[i], messages[i].index]);
        }

        guide.forEach(function(key) {
          var found = false
          unordered = unordered.filter(function(item) {
            if(!found && item[1] == key) {
              ordered.push(item[0])
              found = true
              return false
            }else{
              return true
            }
          })
        })
        // Now we're done. Simply display the ordered messages
        ordered.forEach(function(data) { //render for all
          var name = data.name
          var message = data.message
          var index = data.index
          window.realip= data.ip
          var message_container = document.createElement('div')
          message_container.setAttribute('class', 'message_container')

          var message_inner_container = document.createElement('div')
          message_inner_container.setAttribute('class', 'message_inner_container')

          var message_user_container = document.createElement('div')
          message_user_container.setAttribute('class', 'message_user_container')

          var message_user = document.createElement('p')
          message_user.setAttribute('class', 'message_user')
          if(name==="Nathan") {
            message_user.innerHTML = `<b>Owner</b> ${name}` //add owner tag everyone sees
          } else {
          message_user.textContent = `${name}`
          }

          var message_content_container = document.createElement('div')
          message_content_container.setAttribute('class', 'message_content_container')

          var message_content = document.createElement('p')
          message_content.setAttribute('class', 'message_content')
          message_content.textContent = `${message}`
          
          var info_content_container = document.createElement('div')
          info_content_container.setAttribute('class', 'info_content_container')

          var info_content = document.createElement('p')
          info_content.setAttribute('class', 'info_content')
          if (name==="Nathan"){
            info_content.textContent = ` ${index} ` // if is me then dont show ip (for everyone)
          } else {
            info_content.textContent = ` ${index} - ${realip} ` // if is not me then show ip (for everyone)
          }
          info_content_container.append(info_content)
          message_user_container.append(message_user)
          message_content_container.append(message_content)
          message_inner_container.append(message_user_container, message_content_container, info_content_container)
          message_container.append(message_inner_container)

          chat_content_container.append(message_container)
        });
        window.scrolldown=function() {
            console.log(chat_content_container.scrollHeight)
            chat_content_container.scrollTop = chat_content_container.scrollHeight;
        }
        scrolldown()
    })

    }
  }
  var app = new MEME_CHAT()
  if(app.get_name() != null){
    app.chat()
  }
}
