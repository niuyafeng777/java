## JDK8新特性

### 1. 介绍

> 在JDK8版本中 引入了很多新的内容 分为
>
> 新的语法
>
> 新的功能
>
> 新的底层实现
>
> 等等

### 2. 集合相关

> ArrayList 被设计为了懒加载的模式 初始化无参构造 只维护一个空列表 当我们第一次添加元素 才将数组初始化为10
>
> HashMap加入了红黑树数据结构

### 3. 接口相关

> 接口中可以书写普通方法 使用default关键字修饰 加在返回值类型之前 访问修饰符之后 
>
> 接口中可以书写静态方法 

```java
package com.atguigu.test1;

public interface A {
    public default void m1(){

    }

    public static void m2(){
        
    }

}
```

### 4. 函数式接口

> 函数式接口：即一个接口中只有一个抽象方法 这样的接口称之为  SAM接口 Single Abstract Method  这样的接口可以使用注解@FunctionalInterface修饰 称之为函数式接口
>
> `只要一个接口中只有一个抽象方法，即可称之为函数式接口`
>
> 函数式编程属于一种编程思想  就像面向过程 面向对象 等等 都属于编程思想
>
> 函数式编程的代表语言是Haskell  更强调函数(方法)可以实现什么操作，执行了什么功能，不注重是哪个角色调用了这个函数（方法）
>
> 使用函数式编程 即表示前提必须为函数式接口 

### 5.lambda表达式

> lambda表达式即函数式编程的最终实现   
>
>  回顾匿名内部类  ：即我们可以”直接new“接口 或者抽象类 相当于创建一个匿名内部类
>
> 使用了lambda表达式以后 之前匿名内部类书写格式混乱的问题 可以得到解决
>
> 前提：lambda表达式只能用于函数式接口
>
> 写法越简洁 前期越难理解 后期使用越方便
>
> lambda表达式格式：()-> 

```java
package com.atguigu.test1;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/26 9:42
 *  回顾匿名内部类  ：即我们可以”直接new“接口 或者抽象类 相当于创建一个匿名内部类
 *  使用了lambda表达式以后 之前匿名内部类书写个数混乱的问题 可以得到解决
 *  前提：lambda表达式只能用于函数式接口
 *
 *  写法越简洁 前期越难理解 后期使用越方便
 */
public class B {
    public static void main(String[] args) {
        C c1 = new C() {
            @Override
            public void m1() {
                System.out.println("匿名内部类的方式重写m1方法");
            }
        };

        c1.m1();

        // 无参 无返回值 只有一条语句
        C c2 = ()-> System.out.println("lambda表达式的方式重写m1方法");


        c2.m1();

        // 有一个参数 无返回值 只有一条语句
        D d1 = (a)-> System.out.println("lambda表达式方式重写D接口m1方法" + a);


        d1.m1(100);
        // 有两个个参数 无返回值 只有一条语句
        E e1 = (a,b)-> System.out.println("lambda表达式方式重写E接口m1方法" + a + b);
        e1.m1(123, "abc");

        // 有两个参数 有返回值 只有一条语句
        F f1 = (a,b)-> a + b;
        System.out.println(f1.m1(10, 20));

        // 有一个参数 有返回值 有多条语句
        F f2 = (a,b)->{
            System.out.println(a + b);
            return a + b;
        };

    }
}

interface F{
    int m1(int a,int b);
}
interface E{
    void m1(int a,String b);
}
interface D{
    void m1(int a);
}
interface C{
    void m1();
}

```

### 6.方法引用

> 方法引用  ：在lambda表达式的基础上 使用其他的方法的方法体 来作为 lambda表达式(函数式接口中)
>
> 抽象方法的方法体
>
>
> 具体细节：被引用的方法体 原本的方法 返回值  形参列表 必须和 函数式接口中抽象方法的返回值 形参列表 完全匹配
>
> 否则 将无法引用
>
>
> 方法引用格式 ::
>
> 构造方法引用 类名 :: new;
>
> 静态方法引用 类名 :: 方法名;
>
> 实例方法引用 对象名 :: 方法名;

```java
package com.atguigu.test2;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/26 10:18
 *  方法引用  ：在lambda表达式的基础上 使用其他的方法的方法体 来作为 lambda表达式(函数式接口中)
 *  抽象方法的方法体
 *
 *  具体细节：被引用的方法体 原本的方法 返回值  形参列表 必须和 函数式接口中抽象方法的返回值 形参列表 完全匹配
 *  否则 将无法引用
 *
 *  方法引用格式 ::
 *  构造方法引用 类名 :: new;
 *  静态方法引用 类名 :: 方法名;
 *  实例方法引用 对象名 :: 方法名;
 *
 *
 */
public class TestMethodReference {
    public static void main(String[] args) {
        A a1 = ()-> System.out.println("");

        A a2 = Student :: new;
        a2.m1();


        B b1 = Student :: new;

        b1.m1("赵四");

        C c1 = Student :: new;
        c1.m1("a", 20);

        // 思考：哪个方法首先为静态方法
        // 并且参数为布尔类型 返回值为String类型的
        D<String,Boolean> d1 = String :: valueOf;
        System.out.println(d1.m1(true).length());

        D<Double,Double> d2 = Math :: abs;
        System.out.println(d2.m1(20.0));

        D<Integer,Float> d3 = Math :: round;

        System.out.println(d3.m1(3.5F));

        System.out.println("-----------------------------------------------------");

        String str = "abc";
        D<Boolean,String> d4 = str :: startsWith;
        System.out.println(d4.m1("def"));

        D<Boolean,String> d5 = str :: endsWith;
        System.out.println(d5.m1("c"));

        E<String> e1 = System.out :: println;
        e1.m1("hello world");


    }
}

interface E<P>{
    void m1(P p);
}
interface D<R,P>{
    R m1(P p);
}
interface C{
    void m1(String str,int num);
}
interface B{
    void m1(String str);
}
class Student{
    private String name;
    private int age;

    public Student(String name) {
        this.name = name;
        System.out.println("单个参数name属性的构造方法");
    }

    public Student(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("两个参数 name age属性的构造方法");
    }

    public Student() {
        System.out.println("无参构造方法");
    }
}
interface A{
    void m1();
}


```



> JDK提供的函数式接口位于 java.util.function 这个包中
>
> 这些函数式接口可以大致分为四类
>
> 消费型接口：Consumer<T> accept(T t)  只接受参数没有返回值
>
> 功能型接口：Function<T,R> R apply(T t) 有参数 有返回值
>
> 供给型接口：Supplier<T>  T get() 没有参数 但是有返回值
>
> 断言型接口：Predicate<T> boolean test(T t) 有参数有返回值 但是返回值固定为布尔类型

```java
package com.atguigu.test3;

import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/26 10:48
 *  JDK提供的函数式接口位于 java.util.function 这个包中
 *  这些函数式接口可以大致分为四类
 *  消费型接口：Consumer<T> accept(T t)  只接受参数没有返回值
 *  功能型接口：Function<T,R> R apply(T t) 有参数 有返回值
 *  供给型接口：Supplier<T>  T get() 没有参数 但是有返回值
 *  断言型接口：Predicate<T> boolean test(T t) 有参数有返回值 但是返回值固定为布尔类型
 */
public class TestFunctional {
    public static void main(String[] args) {
        Consumer<Integer> consumer = System.out::println;
        consumer.accept(100);


        Function<String,Integer> function = Integer :: parseInt;
        System.out.println(function.apply("123"));

        Supplier<Double> supplier = Math ::random;
        System.out.println(supplier.get());

        Predicate<String> predicate = String :: isEmpty;

        System.out.println(predicate.test("abc"));


    }
}

```



### 

