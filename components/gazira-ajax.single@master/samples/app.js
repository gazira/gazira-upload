var $ = require('jquery');
require('../index');
var DateTool = require('gazira/date@master');

$(function () {
    $('#btn1').click(function() {
        $.ajax({
            url: './data.php',
            data: {
                name: 'tom',
                age: 20
            },
            beforeSend: function() {
                $('#result').append('<div>old mode: ' + DateTool.format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' --> 发送请求</div>');
            },
            single: {
                name: 'always_old',
                rule: 'old'
            }
        });
    });

    $('#btn2').click(function() {
        $.ajax({
            url: './data.php',
            data: {
                name: 'tom',
                age: 20
            },
            beforeSend: function() {
                $('#result').append('<div>new mode: ' + DateTool.format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' --> 发送请求</div>');
            },
            single: {
                name: 'always_new'
            }
        });
    });

    $('#btn3').click(function() {
        var t = +new Date() % 2;
        $.ajax({
            url: './data.php',
            data: {
                name: 'tom',
                age: 20,
                t: t
            },
            beforeSend: function() {
                $('#result').append('<div>auto mode: ' + DateTool.format(new Date(), 'yyyy-MM-dd HH:mm:ss') + ' --> 发送请求</div>');
            },
            single: {
                name: 'auto_case',
                rule: 'auto'
            }
        });
    });
});
