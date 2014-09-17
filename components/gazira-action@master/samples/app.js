var $ = require('component/jquery@1.0.0');
var Action = require('../index');

$(function () {
    Action.listen({
        alert: function () {
            alert('document接受到冒泡，click');
        },
        aim1: {
            is: function (e, node, key) {
                alert('aim1  只触发一次');
            },
            not: function () {
                alert('没点击到aim1');
            }
        },
        aim2: {
            is: function (e, node, key) {
                alert('aim2 会一直触发');
            },
            not: function () {
                alert('没点击到aim2');
                return false;
            }
        }
    });

    Action.listen({
        alert: function (e, node, key) {
            e.stopPropagation();
            alert('click other');
        }
    }, $('#box2'));

    Action.listen({
        alert: function (e, node, key) {
            alert('节点，click');
        }
    }, $('#box3'));

    Action.listen({
        alert: function (e, node, key) {
            e.stopPropagation();
            alert($(e.target).val());
        }
    }, $('#box4'));

    Action.listen({
        A: function (e, node, key) {
            alert('A');
        },
        B: function (e, node, key) {
            alert('B');
        },
        C: function (e, node, key) {
            alert('C');
        }
    }, $('#box6'));

    var num = 0;
    Action.listen({
        aspect: {
            is: function (e, node, key) {
                alert('is');
            },
            before: function (e, node, key) {
                alert('before');
                num++;
                if (num % 2 === 1) {
                    return true;
                } else {
                    return false;
                }
            },
            after: function (e, node, key) {
                alert('after');
            }
        }
    }, $('#box7'));
});
