
# Aspect 使用文档

- order: 2

---

使用 Aspect，可以允许你在指定方法执行的前后插入特定函数。

---

## 使用说明

基于 `Base.extend` 创建的类，会自动添加上 `Aspect` 提供的功能。


### before `object.before(methodName, callback, [context])`

在 `object[methodName]` 方法执行前，先执行 `callback` 函数。

```js
var Dialog = Base.extend({
    ...

    show: function() {
        console.log(2);
        this.element.show();
    },

    ...
});

var dialog = new Dialog();

dialog.before('show', function() {
    console.log(1);
});

dialog.after('show', function() {
    console.log(3);
});

dialog.show(); // ==> 1, 2, 3
```

`callback` 函数在执行时，接收的参数与传给 `object[methodName]` 参数相同。如果传入了
`context` 参数，则 `callback` 里的 `this` 指向 `context`。

```js
var dialog = new Dialog();

dialog.before('show', function(a, b) {
    console.log(a);
    console.log(b);
});

dialog.show(1, 2); // ==> 1, 2
```

**可以在 `callback` 中 return false 来阻止原函数执行。**

```js
dialog.before('show', function() {
    console.log(1);
    return false;
});

dialog.after('show', function() {
    console.log(3);
});

dialog.show(); // ==> 1
```


### after `object.after(methodName, callback, [context])`

在 `object[methodName]` 方法执行后，再执行 `callback` 函数。

`callback` 函数在执行时，接收的参数是 `object[methodName]` 执行完成后的返回值以及传给 `object[methodName]` 的参数。如果传入了
`context` 参数，则 `callback` 里的 `this` 指向 `context`。

```
var dialog = new Dialog();

dialog.after('show', function(returned, a, b) {
	console.log(returned); // show 的返回值
    console.log(a);
    console.log(b);
});

dialog.show(1, 2); // ==> undefined, 1, 2
```

**注意**

`before` 和 `after` 是按注册的先后顺序执行的，先注册先执行。

```js
dialog.before('show', function() {
    console.log(1);
});

dialog.before('show', function() {
    console.log(2);
});

dialog.show(); // ==> 1, 2
```