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
				resolve(response.response);
			}
		});
	});
	}).then(function(response){
	return new Promise(function(resolve){
		const btnOpen = document.querySelector(".open__friend-filter");//Переменная для кнопки "friendFilter"
		const popWindow = document.querySelector(".friend-filter");//Переменная для окна friendFilter
		const btnClose = document.querySelector(".exit");//Переменная для кнопки "close"
		let saveLocalStorage = document.querySelector('.btn-ff .btn-save')//Переменная для кнопки "сохранить"
		//let clearLocalStorage = popWindow.querySelector('.btn-ff .btn-clear')//Переменная для кнопки "очистить"
		let mainList = document.querySelector('.ff-list__main');//Переменная для основного списка
		let userList = document.querySelector('.ff-list__user')//Переменная для списка пользователя 
		let inputMainList = document.getElementById('main-search');//Поиск основного списка
		let inputUserList = document.getElementById('user-search');//Поиск списка пользователя
		let listFriends = response;//Переменная для хранения данных с сервера
		let userListFriends = [];//Переменная для хранения списка пользователя
		let listContent = document.querySelector('.ff-list');

	

		function renderList(responseFriend, listRender){//Функция для отрисовки списка друзей, принимает на вход два аргумента: 1)массив из списка друзей. 2)список ,куда будем рендерить 
			let source = friendFilter.innerHTML;
			if(listRender === userList){
			 let result =	source.replace('ff-add','ff-del');
			 templateFn = Handlebars.compile(result);
			 template = templateFn({list:responseFriend});
			} else {
				templateFn = Handlebars.compile(source);
				template = templateFn({list:responseFriend});
			}

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

		
		function clickButtonFriend(e){
			if(e.target.className === "ff-add"){
				let currentElement = e.target.closest('li');
				addFriend(e, currentElement);
				console.log(currentElement);
			} else if(e.target.className === "ff-del") {
				let currentElement = e.target.closest('li');
				deleteFriend(e,currentElement);
			}
		};

		function addFriend(e,element){
			let currentFriend = element.getAttribute('data-id'),	
					thisFriend;
				
			for(let i = 0; i < listFriends.length; i++){
				if(listFriends[i].uid.toString() === currentFriend){
					thisFriend = listFriends[i];
					userListFriends.push(thisFriend);
					listFriends.splice([i],1);		
					renderList(listFriends,mainList);
					renderList(userListFriends,userList);
				};
			};
		};

		function deleteFriend(e,element){
			let currentFriend = element.getAttribute('data-id'),
					thisFriend;
			
			for(let i = 0; i < userListFriends.length; i++){
				if(userListFriends[i].uid.toString() === currentFriend){
					thisFriend = userListFriends[i];
					listFriends.push(thisFriend);
					userListFriends.splice([i], 1);
					renderList(listFriends, mainList);
					renderList(userListFriends, userList);
				};
			};
		};

		

		function loadLocalStorage(){
			if(localStorage.listFriendsToJSON && localStorage.userListFriendsToJSON){
				listFriends = JSON.parse(localStorage.listFriendsToJSON);
				userListFriends = JSON.parse(localStorage.userListFriendsToJSON);
				renderList(listFriends,mainList);
				renderList(userListFriends,userList);
			}	else {
				renderList(listFriends, mainList);
			}
		}

	
		popWindow.addEventListener('click', clickButtonFriend);
		
		btnOpen.addEventListener('click', function(){// Событие "открыть окно friendFilter".
			popWindow.style.display = "block";
		});
	
		btnClose.addEventListener('click', function(){// Событие "закрыть окно friendFilter".
			popWindow.style.display = "none";
		});



		//saveLocalStorage.addEventListener('click',function(){
		//	localStorage.listFriendsToJSON = JSON.stringify(listFriends);
		//	localStorage.userListFriendsToJSON = JSON.stringify(userList);
		//});

		//loadLocalStorage();


	});
	}).catch(function(e){
	alert('Ошибка: ' + e.message);
	}); 