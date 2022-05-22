var count = 0;
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

let transactions = []

let myMap; 

const alert = (data, type) => {
  const wrapper = document.createElement('div')

  list = `<svg data-bs-dismiss="alert" onclick="swap_center([${data.client.lat},${data.client.long}])" style="position: absolute; top:0px; right:40px; margin: 12px; position: unset;" class="btn-confirm" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>`
//  list += `<div class="btn-group dropup" style="width: 100%;">`
//  list += `<button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">У вас заказ на ${data.cost}!</button>`
//  list += `<ul class="dropdown-menu" style="padding: 5px; width: 100%;">`
//  $.each(data.product, function( index, value ) {
//	list += `<li  data-id="${value.id}">${value.name} ${value.price} coins</li>`
//	});
//  list += `</ul> </div>`
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert" style="display: flex;">`,
    `Вам поступил заказ ${data.id} от ${data.client.name}`,
    `		${list}`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="position: unset;"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}


function add_alert() {
	count+=1;
	alert(data, 'success')
}

function swap_center(data){
    myMap.geoObjects.add(
      new ymaps.Placemark(
        data, null,
        {
          balloonContent: "vendorObj.name",
          iconLayout: 'default#image',
            iconImageHref: '/static/img/man2.png',
            // Размеры метки.
            iconImageSize: [30, 30],
            iconImageOffset: [-5, -38]
        })
    );
    myMap.setCenter(data);
    get_orders();
}


function add_transaction(vendor_id=1) {
    product_ids = []
    $(".product-check").each(function( index, el ) {
        if ($(el).is(":checked")){
            product_ids.push($(el).data("id"))
        }
    });
    
    $.ajax({
        url: `https://3d2d-178-155-14-183.eu.ngrok.io/api/create-transaction/`,
        method: 'post',
        crossDomain: true,
        data: {"vendor_id": vendor_id, "products": product_ids},
        success: function(data){
            to_pay_page(data.trasaction_id)
        },
        traditional: true
    });
}


function get_products(vendor_id=1){
    $.ajax({
        url: `https://3d2d-178-155-14-183.eu.ngrok.io/api/vendor/${vendor_id}/products/`,
        method: 'get',
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        success: function(data){
            console.log(data)
            
            $.each(data, function( index, value ) {
                html = `<tr><th scope="row">${value.name}</th><td>${value.price}</td><td><input class="product-check" type="checkbox" data-id="${value.id}" name=""></td></tr>`
                $("#product_list").append(html);
            });
        }
    });
}


function get_first_created_order(vendor_id=1){
	$.ajax({
		url: `https://3d2d-178-155-14-183.eu.ngrok.io/api/vendor/${vendor_id}/created/`,
		method: 'get',
		crossDomain: true,
		dataType: 'json',
		contentType: 'application/json',
		success: function(data){
			console.log(data)
			//$.each(data, function( index, value ) {
            alert(data, 'success')
				// html = `<li class="list-group-item list-group-item-action vendor-list-item" data-id="${value.id}">${value.name}</li>`
				// $("#vendor_list").append(html);
			//});
		}
	});
}


function open_modal_order(transaction_id){
    const myModal = new bootstrap.Modal('#exampleModal2', {keyboard: false});
    $("#client_info").empty()
    $("#order_info").empty()

    console.log(transaction_id)
    $.each(transactions, function( index, transaction ) {
        if (transaction.id == transaction_id) {
            if (transaction.client != null){
                $("#client_info").html(`<strong>${transaction.client.name} ${transaction.client.phone} </strong>`);
                myMap.setCenter([transaction.client.lat, transaction.client.long]);
            }
            console.log(transaction)
            $.each(transaction.product, function( index, value ) {
                html = `<tr><th scope="row">${value.name}</th><td>${value.price}</td></tr>`
                $("#order_info").append(html);
            });
            html = `<tr><th scope="row">Всего</th><td>${transaction.cost}</td></tr>`
            $("#order_info").append(html);
        }
    });

    $("#start_pay").attr("transaction_id", transaction_id)

    myModal.show();
}

$('#start_pay').one("click", function () {
    to_pay_page($("#start_pay").attr("transaction_id"));
});


//function get_orders(ven

function to_pay_page(transaction_id){
    window.location.href = `https://3d2d-178-155-14-183.eu.ngrok.io/api/transaction/${transaction_id}/qrcode/`;
}

// function get_orders(){
// 	$.ajax({
// 		url: "https://3d2d-178-155-14-183.eu.ngrok.io/api/vendors/",
// 		method: 'get',
// 		crossDomain: true,
// 		dataType: 'json',
// 		contentType: 'application/json',
// 		success: function(data){

// 			//NEW
// 			$.each(data, function( index, value ) {
// 				html = `<li class="list-group-item list-group-item-action vendor-list-item" data-id="${value.id}">${value.name}</li>`
// 				$("#vendor_list").append(html);
// 			});

// 		}
// 	});
// }


//function get_clients(){
//    $.ajax({
//    url: "https://3d2d-178-155-14-183.eu.ngrok.io/api/clients/",
//    method: "get",
//    crossDomain: true,
//    dataType: "json",
//    contentType: "application/json",
//    success: function (data) {
//      console.log(data);
//      for (let vendorObj of data) {
//        myMap.geoObjects.add(
//          new ymaps.Placemark(
//            [vendorObj.lat, vendorObj.long], null,
//            {
//              balloonContent: vendorObj.name,
//              iconLayout: 'default#image',
//                iconImageHref: '/static/img/man2.png',
//                // Размеры метки.
//                iconImageSize: [30, 30],
//                iconImageOffset: [-5, -38]
//            })
//        );
//      }
//    },
//  });
//}



ymaps.ready(init);
function init(){
    // Создание карты.
    myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        // 44.902487, 37.316827
        //44.902286, 37.316861
        center: [44.902286, 37.316861],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 18,
        controls: []
    }, {suppressMapOpenBlock: true});

    var myPlacemark1 = new ymaps.Placemark([44.896244, 37.310458], {
        balloonContentHeader: "Анапский археологический музей Горгиппия - филиал ГБУК КК кгиамз им. Е. Д. Фелицына",
        balloonContentBody: "Археологический музей под открытым небом в городе Анапа",
        balloonContentFooter: "Сайт: museumanapa.ru",
        hintContent: "Хинт метки"
    });
    myMap.geoObjects.add(myPlacemark1);

    var myPlacemark1 = new ymaps.Placemark([44.922170, 37.324442], {
        balloonContentHeader: "Сквер военной техники",
        hintContent: "Хинт метки"
    });
    myMap.geoObjects.add(myPlacemark1);

    var myPlacemark2 = new ymaps.Placemark([44.887545, 37.299373], {
        balloonContentHeader: "Маршрут туристический",
        balloonContentBody: "Красивый маршрут по побережью с видом на горы",
        hintContent: "Хинт метки"
    });
    myMap.geoObjects.add(myPlacemark2);

    myMap.geoObjects.add(
          new ymaps.Placemark(
            [44.902286, 37.316861], null,
            {
              balloonContent: "цвет <strong>воды пляжа бонди</strong>",
              ballonContentBody: 'Персонаж',
              iconImageHref: '/static/img/ifgps1055047.png',
              iconLayout: 'default#image',
                iconImageHref: '/static/img/ifgps1055047.png',
                // Размеры метки.
                iconImageSize: [30, 30],
                iconImageOffset: [-5, -38]
            }
          )
        );

        // Создаем ломаную с помощью вспомогательного класса Polyline.
    var myPolyline = new ymaps.Polyline([
            // Указываем координаты вершин ломаной.
            [44.887545, 37.299373],
            [44.870526, 37.319798],
            [44.878761, 37.335960],
        ], {
            // Описываем свойства геообъекта.
            // Содержимое балуна.
            balloonContent: "туристический маршрут"
        }, {
            // Задаем опции геообъекта.
            // Отключаем кнопку закрытия балуна.
            balloonCloseButton: false,
            // Цвет линии.
            strokeColor: "#123456",
            // Ширина линии.
            strokeWidth: 4,
            // Коэффициент прозрачности.
            strokeOpacity: 0.5
        });

    // Добавляем линии на карту.
    myMap.geoObjects
        .add(myPolyline);

    let timerId = setInterval(() => get_first_created_order(), 10000);
    //get_clients();
//    get_orders();
//    get_products();
}