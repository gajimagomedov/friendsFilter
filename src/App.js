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
		let btnOpen = document.querySelector(".open__friend-filter");//Переменная для кнопки "friendFilter"
		let popWindow = document.querySelector(".friend-filter");//Переменная для окна friendFilter
		let btnClose = document.querySelector(".exit");//Переменная для кнопки "close"
		let mainList = document.querySelector('.ff-list__main');//Переменная для основного списка
		let userList = document.querySelector('.ff-list__user')//Переменная для списка пользователя 
		let inputMainList = document.getElementById('main-search');//Поиск основного списка
		let inputUserList = document.getElementById('user-search');//Поиск списка пользователя
		let listFriends = response;//Переменная для хранения данных с сервера
		let userListFriends = [];//Переменная для хранения списка пользователя
		let wrapButton = document.querySelector('.ff-icon');
	
		btnOpen.addEventListener('click', function(){// Событие "открыть окно friendFilter".
			popWindow.style.display = "block";
		});
		
		btnClose.addEventListener('click', function(){// Событие "закрыть окно friendFilter".
			popWindow.style.display = "none";
		});

		function renderList(responseFriend, listRender){//Функция для отрисовки списка друзей, принимает на вход два аргумента: 1)массив из списка друзей. 2)список ,куда будем рендерить 
			let source = friendFilter.innerHTML;
			console.log(source);
			templateFn = Handlebars.compile(source);
			template = templateFn({list:responseFriend});
			
			listRender.innerHTML = template;
		}

		console.log(mainList.querySelector('.ff-add'));

		renderList(listFriends, mainList);
		
		console.log(mainList.querySelector('.ff-add'));

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

		popWindow.addEventListener('click', function(e){
			if(e.target.className === "ff-add"){
				let currentElement = e.target.closest('li');
				addFriend(e, currentElement);

			} else if(e.target.className === "ff-del") {
				removeFriend(e,currentElement);
			}
		});

		function addFriend(e,element){
			let currentFriend = element.getAttribute('data-id'),	
					buttonAdd =	element.querySelector('.ff-add'),
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
				if(userListFriends[i].uid.toString() === friendId){
					thisFriend = userListFriends[i];
					listFriends.push(thisFriend);
					userListFriends.splice([i], 1);
					renderList(mainList, listFriends);
					renderList(userList, userListFriends);
				};
			};
		};



	});
	}).catch(function(e){
	alert('Ошибка: ' + e.message);
	}); 