# Kotlin null checking

Last Edited: April 2, 2021 1:34 AM  
Links: https://medium.com/mobile-app-development-publication/kotlin-dont-just-use-let-7e91f544e27f

## `let` 으로 `if (item != null)` 을 대신할 수 있을까?

[https://kotlinlang.org/docs/null-safety.html#checking-for-null-in-conditions](https://kotlinlang.org/docs/null-safety.html#checking-for-null-in-conditions)

To perform a certain operation only for non-null values, you can use the safe call operator together with [let](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/let.html):

```kotlin
val listWithNulls: List<String?> = listOf("Kotlin", null)
for (item in listWithNulls) {
    item?.let { println(it) } // prints Kotlin and ignores null
}
```

```kotlin
if (item != null) { /* Do something */}

-> item?.let { /* Do something */}
```
</br>

## 추천하지 않는 케이스

### immutable variable

NOT RECOMMEND

```kotlin
fun process(str: String?) { str?.let { println(it) } }
```

Decompile

```java
public static final void process(@Nullable String str) {
      if (str != null) {
         **boolean var2 = false;**
         System.out.println(str);
      }
}
```

`process` function 을 많이 사용하면 이득이 없는 필요없는 코드를 생산

RECOMMEND

str 은 이미 if 시점에 nullable 이 아닌 것으로 자동 캐스팅 된다. 

```java
// RECOMMENDED
fun process(str: String?) {
    if (str != null) {
        // Do Something
    }
}
```
</br>

### 내부 변수 값 세팅

NOT RECOMMEND

```kotlin
webviewSetting?.let {
    it.javaScriptEnabled = true
    it.databaseEnabled = true
}
```

RECOMMEND

```kotlin
webviewSetting?.run {
    javaScriptEnabled = true
    databaseEnabled = true
}
```

`run` 을 사용하면 `this` 가 scope로 잡히기 때문에 it 을 걷어낼 수 있다. 

### 변수에 `let` 을 사용하고 나서, 그 변수 값에다 chaining 걸고 싶을 때

NOT RECOMMEND

```kotlin
stringList?.let {
    println("Total Count: ${it.size}")
    it // <- 값 반환을 위한 목적
}?.forEach{ println(it) }
```

추천하지는 않지만 좀 더 나은 모양

```kotlin
stringList?.also {
    println("Total Count: ${it.size}")
}?.forEach{ println(it) }
```

## `LET` 사용을 추천하는 케이스

### mutable variable 의 null을 체크하는 경우 let 을 사용하면 scope 내에서 immutable 보장

RECOMMEND

```kotlin
//전역변수라서 값이 바뀔 수 있음
private var str: String? = null

fun process() {
    str?.let { /*Do something*/ }
}
```

NOT RECOMMEND

if 로 체크해도 변수의 상태나 내용이 바뀔 수 있는 경우 

```kotlin
private var str: String? = null

fun process() {
    if (str != null) {
        println(**str?**.length)
    }
}
```

### 외부에 있는 변수와 구분

RECOMMEND

```kotlin
var javaScriptEnabled = false
var databaseEnabled = false

webviewSetting?.let {
    javaScriptEnabled = it.javaScriptEnabled
    databaseEnabled = it.databaseEnabled
}
```

NOT RECOMMEND

this 의 어디에 속하는 scope 인지 알기 어려움

```kotlin
var javaScriptEnabled = false
var databaseEnabled = false

webviewSetting?.run {
    javaScriptEnabled = this.javaScriptEnabled
    databaseEnabled = this.databaseEnabled
}
```

### long nullable chain

RECOMMEND

실제 nullable 한 곳을 let으로 끊어보자

```kotlin
fun process(string: String?): List<Char>? {
    return string?.let {
        it.asIterable().distinct().sorted()
    }
}
```

NOT RECOMMEND

디컴파일 해보면 복잡도가 올라가는 것을 볼 수 있다. 

```kotlin
fun process(string: String?): List<Char>? {
    return string?.asIterable()?.distinct()?.sorted()
}
```