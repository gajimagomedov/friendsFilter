var btn = document.querySelector(".open__friend-filter");
var pop = document.querySelector(".friend-filter");
var ex = document.querySelector(".exit");


btn.addEventListener('click', function(){
    pop.style.display = "block";
});

ex.addEventListener('click', function(){
    pop.style.display = "none";
});



new Promise(function(resolve){
if(document.readyState === "complete"){
    resolve();
}	else {
    window.onload = resolve;
}
}).then(function(){
return new Promise(function(resolve,reject){
    VK.init({
        apiId: 6161507
    });

    VK.Auth.login(function(response){
        if(response.session){
            resolve(response);
        } else {
            reject(new Error("Не удалось авторизоваться"));
        }
    }, 2)
});
}).then(function(response){
    
return new Promise(function(resolve,reject){
    VK.api('users.get', {'name_case':'gen'}, function(response){
        if(response.error){
            reject(new Error(response.error.error_msg));
        } else {
            resolve(response.response);
        }
    })
});
}).then(function(){
return new Promise(function(resolve,reject){
    VK.api('friends.get',{'fields':'nickname, photo_50'},function(response){
        if(response.error){
            reject(new Error(response.error.error_msg))
        } else {
            var source = friendFilter.innerHTML,
            templateFn = Handlebars.compile(source),
            template = templateFn({list: response.response});

            result.innerHTML = template;
            resolve(response.response);
        }
    });
});
}).then(function(response){
return new Promise(function(resolve){
    let mainList = document.querySelector('.ff-list__main');//Переменная для основного списка
    let userList = document.querySelector('ff-list__user')//Переменная для списка пользователя 
    let inputMainList = document.getElementById('main-search');//Поиск основного списка
    let inputUserList = document.getElementById('user-search');//Поиск списка пользователя
    let listFriends = response;//Переменная для хранения данных с сервера
    let userList = [];//Переменная для хранения списка пользователя
    
    function prepareList(frineds, list){
        list.innerHTML = ''; //Предварительная очистка списка
        friends.forEach(function(item, i, arr) {
            let userPropsPhoto = '<img src=' + friends[i].photo_50 + ' class="ff-photo"></img>';
            let usePropsName = friends[i].first_name + '' + friends[i].last_name;
            let friend = document.createElement('li');
            let wrapButton = document.createElement('div');
            if(list === mainList) {//Если рендерим в основной список
                wrapButton.className = 'ff-add';
            }	else if (list === userList){
							wrapButton.className = 'ff-del';
						}

						friend.innerHTML = '<ul class="list-grop">'
        });
    }




});
}).catch(function(e){
alert('Ошибка: ' + e.message);
});

