/*new Promise(function(resolve){
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
           /* var source = friendFilter.innerHTML,
            templateFn = Handlebars.compile(source),
            template = templateFn({list: response.response});

            result.innerHTML = template;
            resolve(response.response);
        }
    });
});
}).then(function(response){
return new Promise(function(resolve){
    let btnOpen = document.querySelector(".open__friend-filter");//Переменная для кнопки "friendFilter"
    let popWindow = document.querySelector(".friend-filter");//Переменная для окна friendFilter
    let btnClose = document.querySelector(".exit");//Переменная для кнопки "close"
    let mainList = document.querySelector('.ff-list__main');//Переменная для основного списка
    let userList = document.querySelector('ff-list__user')//Переменная для списка пользователя 
    let inputMainList = document.getElementById('main-search');//Поиск основного списка
    let inputUserList = document.getElementById('user-search');//Поиск списка пользователя
    let listFriends = response;//Переменная для хранения данных с сервера
    let userListFriends = [];//Переменная для хранения списка пользователя

    btnOpen.addEventListener('click', function(){
        popWindow.style.display = "block";
    });
    
    btnClose.addEventListener('click', function(){
        popWindow.style.display = "none";
    });
    
    
    function prepareList(friends, list){
        list.innerHTML = ''; //Предварительная очистка списка
        friends.forEach(function(item, i, arr) {
            let userPropsPhoto = '<img src=' + friends[i].photo_50 + ' class="ff-photo"></img>';
            let userPropsName = friends[i].first_name + ' ' + friends[i].last_name;
						let friend = document.createElement('li');
						let wrapButton = document.createElement('div');
						
            if(list === mainList) {//Если рендерим в основной список
                wrapButton.className = 'ff-add';
            }	else if (list === userList){
				    		wrapButton.className = 'ff-del';
						}
						friend.innerHTML = "<div class='ff-item', data_id=" +
																friends[i].uid + "><div class='ff-info'><span class='ff-photo'>" +
																userPropsPhoto + "</span><span class='ff-name'>" + userPropsName + 
																"</span></div>"+ wrapButton.outerHTML + "</div>";
						
						list.appendChild(friend);
						console.log();																				
				});
				console.log(userList);
		}

		prepareList(listFriends,mainList);


		

		document.addEventListener("input", function(e){
			let inputValue = e.target.value;//Введеное занчение
			let searchList = '';//Обертка для списка в который будем рендерить
			let searchFriends = [];

			if(e.target === inputMainList){
				searchList = mainList;
				searchFriends = listFriends;
			}	else {
				searchList = userList;
				searchFriends = userListFriends;
			}
			let result = [];
			for(let i = 0; i < searchFriends.length; i++){
				let inputFriend = searchFriends[i].first_name + ' ' + searchFriends[i].last_name;
				if(inputFriend.toLowerCase().indexOf(inputValue.toLowerCase()) > -1){
					result.push(searchFriends[i]);
				}
			}
			prepareList(result,searchList);
			console.log(result);
		});

		function addFriend(e,Element){
			let friendId = Element.getAttribute('data_id');
			let thisFriend;
			for(let i = 0; i < listFriends.length; i++){
				if(listFriends[i].uid.toString() === friendId){
					thisFriend = listFriends[i];
					userListFriends.push(thisFriend);
					listFriends.splice([i], 1);
					prepareList(listFriends, mainList);
					prepareList(userListFriends,userList);
					console.log(userListFriends);
				};
			};
		};

		function removeFriend(e,Element){
			let friendId = Element.getAttribute('data_id');
			let thisFriend;
			for(let i = 0; i < userListFriends.length; i++){
				if(userListFriends[i].uid.toString() === friendId){
					thisFriend = userListFriends[i];
					listFriends.push(thisFriend);
					userListFriends.splice([i], 1);
					prepareList(userListFriends, userList);
					prepareList(listFriends, mainList);
				};
			};
		};

		

		function checkClick(e){
			let Element = e.target.parentNode;
			if(e.target.className === 'ff-add'){
				addFriend(e,Element);
				console.log(Element);
			} else {
				removeFriend(e, Element);
			}
			document.removeEventListener('mouseup', checkClick);
		};

		
		function dragStart(e){
			if(e.target.className === 'ff-add' || e.target.className === 'ff-del'){
				document.addEventListener('mouseup', checkClick);
			}
		};

		document.addEventListener('mousedown', dragStart);
		


});
}).catch(function(e){
alert('Ошибка: ' + e.message);
}); */






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
				/*let mainList = document.querySelector('.ff-list__main');
			    var source = friendFilter.innerHTML,
				templateFn = Handlebars.compile(source),
				template = templateFn({list: response.response});
				mainList.innerHTML = template;*/
				resolve(response.response);
			}
		});
	});
	}).then(function(response){
	return new Promise(function(resolve){
		let btnOpen = document.querySelector(".open__friend-filter");//Переменная для кнопки "friendFilter"
		let popWindow = document.querySelector(".friend-filter");//Переменная для окна friendFilter
		let btnClose = document.querySelector(".exit");//Переменная для кнопки "close"
		let mainList = document.querySelector('.ff-list__main');//Переменная для основного списка
		let userList = document.querySelector('ff-list__user')//Переменная для списка пользователя 
		let inputMainList = document.getElementById('main-search');//Поиск основного списка
		let inputUserList = document.getElementById('user-search');//Поиск списка пользователя
		let listFriends = response;//Переменная для хранения данных с сервера
		let userListFriends = [];//Переменная для хранения списка пользователя
	
		btnOpen.addEventListener('click', function(){// Событие "открыть окно friendFilter".
			popWindow.style.display = "block";
		});
		
		btnClose.addEventListener('click', function(){// Событие "закрыть окно friendFilter".
			popWindow.style.display = "none";
		});

		function renderList(responseFriend, listRender){//Функция для отрисовки списка друзей, принимает на вход два аргумента: 1)список ,куда будем рендерить 2)массив из списка друзей.
			let source = friendFilter.innerHTML;
			templateFn = Handlebars.compile(source);
			template = templateFn({list:responseFriend});

			listRender.innerHTML = template;
		}

		renderList(listFriends, mainList);

		popWindow.addEventListener('input',function(e){//Событие поиска друзей в списке через делегирование.
			let inputValue = e.target.value,
			 	searchList = '',
			 	searchFriend = [];

			if(e.target === inputMainList){
				searchList = mainList;
				searchFriend = listFriends
			}	else {
				searchList = userList;
				searchFriend = userListFriends;
			}

			let result = [];
			for(let i = 0; i < searchFriend.length; i++){
				let inputValueFriend = searchFriend[i].first_name + ' ' + searchFriend[i].last_name;
				if(inputValueFriend.toLowerCase().indexOf(inputValue.toLowerCase()) > -1) {
					result.push(searchFriend[i]);
				}
			}
			
			searchList.innerHTML = "";
			renderList(result,searchList);
		});
		
	
			
	
	});
	}).catch(function(e){
	alert('Ошибка: ' + e.message);
	}); 