## IO流

### 1.File类

> java.io.File  文件类 提供了用于操作文件 创建文件 获取文件信息等 各种文件相关的方法
>
> exists( )判断文件或目录是否存在
>
> boolean isFile( )   判断是否是文件
>
> boolean isDirectory( )  判断是否是目录
>
> String getPath( )   返回此对象表示的文件的相对路径名
>
> String getAbsolutePath( )   返回此对象表示的文件的绝对路径名
>
> String getName( )   返回此对象表示的文件或目录的名称
>
> boolean delete( )   删除此对象指定的文件或目录
>
> boolean createNewFile( )    创建名称的空文件，不创建文件夹
>
> long  length()  返回文件的长度，单位为字节, 如果文件不存在，则返回 0L

```java
package com.atguigu.test3;

import java.io.File;
import java.io.IOException;
import java.util.Date;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/19 11:10
 *  java.io.File  文件类 提供了用于操作文件 创建文件 获取文件信息等 各种文件相关的方法
 *  exists( )判断文件或目录是否存在
 *  boolean isFile( )	判断是否是文件
 *  boolean isDirectory( )	判断是否是目录
 *  String getPath( )	返回此对象表示的文件的相对路径名
 *  String getAbsolutePath( )	返回此对象表示的文件的绝对路径名
 *  String getName( )	返回此对象表示的文件或目录的名称
 *  boolean delete( )	删除此对象指定的文件或目录
 *  boolean createNewFile( )	创建名称的空文件，不创建文件夹
 *  long  length()	返回文件的长度，单位为字节, 如果文件不存在，则返回 0L
 */
public class TestFile {
    public static void main(String[] args) throws IOException {
        File file1 = new File("C:\\Users\\WHD\\Desktop\\0628.txt");

        System.out.println("文件是否存在" + file1.exists());
        System.out.println("是否为一个文件" + file1.isFile());
        System.out.println("是否为一个文件夹" + file1.isDirectory());
        System.out.println("获取文件相对路径" + file1.getPath());
        System.out.println("获取文件绝对路径" + file1.getAbsolutePath());
        System.out.println("获取文件名称" + file1.getName());
        System.out.println("获取文件大小，单位为字节：" + file1.length());
        System.out.println("删除文件" + file1.delete());

        System.out.println("-----------------------------------------------------------");
//
        File file2 = new File("D://a.txt");

        System.out.println("创建文件是否成功" + file2.createNewFile());

        System.out.println("文件是否可操作：" + file2.canExecute());
        System.out.println("文件是否可写：" + file2.canWrite());
        System.out.println("文件是否可读：" + file2.canRead());
        System.out.println("是否为隐藏文件" + file2.isHidden());

        long lastModified = file2.lastModified();

        Date date = new Date(lastModified);

        System.out.println("最后一次修改时间： " + date);

        System.out.println("删除文件：" +  file2.delete());

        System.out.println("文件是否存在：" +  file2.exists());

        System.out.println("-----------------------------------------------------------");

        File file3 = new File("A");

        System.out.println("创建文件夹：" + file3.mkdir());

        System.out.println("-----------------------------------------------------------");
        File file4 = new File("B/C/D");

        System.out.println("创建文件夹：" + file4.mkdirs());

    }
}

```

### 2. 字节流

#### 2.1 InputStream 读

##### 2.1.1 FileInputStream

>  InputStream 字节读取流父类 抽象类
>
> FileInputStream
>
> read() : 每次读取一个字节 返回值为读取的内容 ASCII码 如果读取到文件的末尾 返回值为-1
> close() 关闭字节流

```java
package com.atguigu.test4;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/19 14:12
 *  InputStream 字节读取流父类 抽象类
 *  FileInputStream
 *
 *  read() : 每次读取一个字节 返回值为读取的内容 ASCII码 如果读取到文件的末尾 返回值为-1
 *
 *
 *  close() 关闭字节流
 */
public class TestFileInputStream1 {
    public static void main(String[] args) {
        // 使用相对路径创建File对象
        File file = new File("A.txt"); // D:\\ideaProjects\\java0724day19\\
        FileInputStream inputStream = null;
        try {
            // 创建字节读取流对象 参数为file对象
            inputStream = new FileInputStream(file);
            // 读取文件 读取一个字节
            int readData = inputStream.read();
            // 打印 因为读取内容的返回值为int类型 所以需要强转为char类型
            System.out.println("readData = " + (char)readData);
            // 读取文件 读取一个字节
            readData = inputStream.read();
            // 打印 因为读取内容的返回值为int类型 所以需要强转为char类型
            System.out.println("readData = " + (char)readData);
            // 使用循环多次读取 循环停止的条件为 读取内容返回值为-1
            while((readData = inputStream.read()) != -1){
                System.out.println((char)readData); // 强制类型转换
            }
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            // 做非null判断
            if(inputStream != null){
                try {
                    inputStream.close(); // 关闭资源
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}

```

> read(byte [] data) : 每次读取一个字节数组 返回值为读取字节的个数 读取的内容保存在byte数组中
>
> 如果读取到文件的末尾 返回值为-1

```java
package com.atguigu.test4;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/19 14:26
 *  read(byte [] data) : 每次读取一个字节数组 返回值为读取字节的个数 读取的内容保存在byte数组中
 *  如果读取到文件的末尾 返回值为-1
 */
public class TestFileInputStream2 {
    public static void main(String[] args) throws IOException {
        FileInputStream inputStream = new FileInputStream("A.txt");
        // 定义数组 长度为15 表示每次读取15个字节
        byte [] data = new byte[15];

        // 定义变量表示实际读取的字节的个数
        int readCount = -1;
        // 循环读取 每次读取到的内容保存在byte数组中 读取到的个数 保存在 readCount中
        while((readCount = inputStream.read(data)) != -1) {
            // 解析byte数组 转换为字符串
            // 第一个参数 byte数组
            // 第二个参数 从0开始转换
            // 第三个参数 转换的数量(即读取到几个 就转换几个字节)
            System.out.println(new String(data, 0, readCount));

        }

        inputStream.close();

        System.out.println("程序结束");



    }
}

```

> 使用字节流读取中文
>
> available() 返回当前字节流可读字节数
>
> 中文占几个字节？
>
> ​	UTF-8 占3个字节
>
> ​	GBK 占2个字节

```java
package com.atguigu.test4;


import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/19 14:38
 *  使用字节流读取中文
 *  available() 返回当前字节流可读字节数
 *  中文占几个字节？
 *      UTF-8 占3个字节
 *      GBK 占2个字节
 *
 */
public class TestFileInputStream3 {
    public static void main(String[] args) {
        FileInputStream inputStream = null;
        try {
            inputStream = new FileInputStream("A.txt");
            int available = inputStream.available();

            System.out.println("可读字节数 = " + available);

            // 使用可读字节数来定义数组长度 避免拆分中文 导致乱码
            byte [] data = new byte[inputStream.available()];

            int readCount = -1;

            // 循环读取
            while((readCount = inputStream.read(data)) != -1){
                System.out.println(new String(data,0,readCount)); // 转换字符串
            }
        } catch (FileNotFoundException e) {
           e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            // 关闭资源
        }

    }
}

```



#### 2.2 OutputStream 写

##### 2.2.1 FileOutputStream

> OutputStream
>
> FileOutputStream
>
>
> new FileOutputStream(String fileName) 传入字符串
>
> new FileOutputStream(File file) 传入文件对象
>
> new FileOutputStream(File file , boolean append)   true表示追加 默认不写 或者 false 表示覆盖源文件
>
>
> 使用字节写入流写入文件 如果文件不存在 则自动创建
>
>
>
> write(int data) 写入单个字节
>
> write(byte [] data) 写入字节数组
>
> close() 关闭写入字节流

```java
package com.atguigu.test5;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/19 15:16
 *  OutputStream
 *  FileOutputStream
 *
 *  new FileOutputStream(String fileName) 传入字符串
 *  new FileOutputStream(File file) 传入文件对象
 *  new FileOutputStream(File file , boolean append)   true表示追加 默认不写 或者 false 表示覆盖源文件
 *
 *  使用字节写入流写入文件 如果文件不存在 则自动创建
 *
 *
 *  write(int data) 写入单个字节
 *  write(byte [] data) 写入字节数组
 *  close() 关闭写入字节流
 *
 *
 *
 */
public class TestFileOutputStream1 {
    public static void main(String[] args) {
        FileOutputStream outputStream = null;
        try {
            outputStream = new FileOutputStream("B.txt");

            outputStream.write(65);
            outputStream.write(66);
            outputStream.write(67);
            outputStream.write(68);
            outputStream.write(69);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            if(outputStream != null){
                try {
                    outputStream.close();
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }

        }
    }
}

```

> write(byte [] data) 写入字节数组

```java
package com.atguigu.test5;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class TestFileOutputStream2 {
    public static void main(String[] args) throws IOException {
        FileOutputStream outputStream = new FileOutputStream("C.txt",true);

        byte [] data = {101};

        outputStream.write(data);

        outputStream.close();

    }
}

```

>  使用字节写入流写入中文

```java
package com.atguigu.test5;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/19 15:23
 *  使用字节写入流写入中文
 */
public class TestFileOutputStream3 {
    public static void main(String[] args) throws IOException {
        FileOutputStream outputStream = new FileOutputStream("D.txt",true);

        String str = "世界你好 hello world 666";

        byte[] bytes = str.getBytes();

        outputStream.write(bytes);

        outputStream.close();

    }
}

```



### 3.字符流

#### 3.1 Reader

##### 3.1.1 InputStreamReader

> Reader 字符读取流 父类 抽象类
>
> InputStreamReader
>
> <p>
>
> read() 每次读取一个字符 返回值为读取的内容 如果读取到文件末尾 返回值为-1
>
> close() 关闭资源

```java
package com.atguigu.test6;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/19 15:30
 * Reader 字符读取流 父类 抽象类
 * InputStreamReader
 * <p>
 * read() 每次读取一个字符 返回值为读取的内容 如果读取到文件末尾 返回值为-1
 * close() 关闭资源
 */
public class TestInputStreamReader1 {
    public static void main(String[] args) {
        FileInputStream fileInputStream = null;
        InputStreamReader reader = null;
        try {
            fileInputStream = new FileInputStream("A.txt"); // 创建字节读取流对象
            reader = new InputStreamReader(fileInputStream); // 创建字符读取对象

            int data = reader.read(); // 每次读取一个字符

            System.out.println((char)data); // 打印 强转为char类型

            data = reader.read();

            System.out.println((char)data);

            while((data = reader.read())!= -1){ // 循环读取 返回值为-1表示读取到文件末尾
                System.out.println((char)data); // 强转为char类型
            }



        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }finally{
            // 关闭资源  先用后关
            try{
                if(reader != null){ // 非null判断 
                    reader.close(); // 关闭资源
                }
                if(fileInputStream != null){// 非null判断 
                    fileInputStream.close();// 关闭资源
                }
            }catch(IOException e){
                e.printStackTrace();
            }
        }

    }
}

```

> read(char [] data) 每次读取一个字符数组 返回值为读取字符的个数 读取的内容保存在数组中  读取到末尾 返回值为-1

```java
package com.atguigu.test6;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/19 15:38
 *  read(char [] data) 每次读取一个字符数组 返回值为读取字符的个数 读取的内容保存在数组中  读取到末尾 返回值为-1
 */
public class TestInputStreamReader2 {
    public static void main(String[] args) throws IOException {
        InputStreamReader reader = new InputStreamReader(new FileInputStream("A.txt"));

        char [] data = new char[5];

        int readCount = -1;

        while((readCount = reader.read(data)) != -1){
//            System.out.println(data); //
            // 将字符数组 转换为String对象
            // 第一个参数为要转换的字符数组
            // 第二个参数为0 表示从数组中的第一个位置开始转换
            // 第三个参数 为转换的个数 readCount表示读取了多少 就转换多少
            System.out.println(new String(data, 0, readCount));
        }

        byte [] b = {1,2,3,4,5};
        System.out.println(b);

        char [] c = {'a','b','c'};
        System.out.println(c); // println方法单独对char数组作为参数 做了操作 直接遍历 拼接 再 打印


    }
}

```

> 使用InputStreamReader解决读取中文乱码问题
>
>
> 如果文件的编码格式 和 本地平台默认读取文件的编码格式不一致
>
> 将产生乱码 可以使用InputStreamReader类构造方法 传入 编码格式 来指定编码

```java
package com.atguigu.test6;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/19 15:47
 *  使用InputStreamReader解决读取中文乱码问题
 *
 *  如果文件的编码格式 和 本地平台默认读取文件的编码格式不一致
 *  将产生乱码 可以使用InputStreamReader类构造方法 传入 编码格式 来指定编码
 *
 */
public class TestInputStreamReader3 {
    public static void main(String[] args) throws IOException {
        FileInputStream fileInputStream = new FileInputStream("C:\\Users\\WHD\\Desktop\\0324.txt");

        // 第二个参数为 指定读取文件的编码格式 
        InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream,"GBK");

        char [] data = new char[10];

        int readCount = -1;

        while((readCount = inputStreamReader.read(data)) != -1){
            System.out.println(new String(data,0,readCount)); // 解析字符串
        }

        inputStreamReader.close();

        fileInputStream.close();





    }
}

```

###### 3.1.1.1 FileReader

> Reader
>
> InputStreamReader
>
> FileReader   : 只能按照本地平台默认的编码格式读取数据 不能单独指定数据
>
>
> read() 每次读取一个字符  返回值为读取内容的ASCII码 或者 Unicode编码 十进制 如果读取到末尾 返回-1
>
> read(char [] data) 每次读取一个字符数组 返回值为读取字符的个数 如果读取到末尾 返回-1
>
> close() 关闭资源

```java
package com.atguigu.test1;

import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 9:09
 * Reader
 * InputStreamReader
 * FileReader   : 只能按照本地平台默认的编码格式读取数据 不能单独指定数据
 *
 * read() 每次读取一个字符  返回值为读取内容的ASCII码 或者 Unicode编码 十进制 如果读取到末尾 返回-1
 * read(char [] data) 每次读取一个字符数组 返回值为读取字符的个数 如果读取到末尾 返回-1
 * close() 关闭资源
 */
public class TestFileReader1 {
    public static void main(String[] args) {
        // 定义FileReader对象
        FileReader fileReader = null;
        try {
            // 创建对象 并且指定读取文件
            fileReader = new FileReader("A.txt");

            // 调用read()方法 读取一个字符   接收返回值
            int readData = fileReader.read();

            // 打印读取数据 返回值为int类型 需要强转为char类型
            System.out.println("readData = " + (char)readData);

            readData = fileReader.read();

            System.out.println("readData = " + (char)readData);

            // 循环读取 循环依据为读取返回值不为-1 表示还未读取结束
            while((readData = fileReader.read()) != -1){
                System.out.println("readData = " + (char)readData);
            }

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }finally{
            // 关闭资源
            try{
                // 在关闭之前做非空判断 因为如果为空 调用close方法 将出现空指针异常
                if(fileReader != null){
                    fileReader.close();
                }
            }catch(IOException e){
                e.printStackTrace();
            }
        }
    }
}

```

> read(char [] data) 每次读取一个字符数组 返回值为读取字符的个数 如果读取到末尾 返回-1

```java
package com.atguigu.test1;

import java.io.FileReader;
import java.io.IOException;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 9:20
 * read(char [] data) 每次读取一个字符数组 返回值为读取字符的个数 如果读取到末尾 返回-1
 */
public class TestFileReader2 {
    public static void main(String[] args) throws IOException {
        // 创建对象 并且指定读取文件
        FileReader reader = new FileReader("A.txt");

        // 创建长度为10的char数组 用于保存读取数据
        char [] data = new char[10];

        // 定义每次读取字符的个数 初始化值为-1
        int readCount = -1;

        // 循环读取 循环条件为 读取字符个数不为-1
        while((readCount = reader.read(data)) != -1){
            // 将读取完毕的字符数组 转换为字符串
            // 第一个参数 为字符数组
            // 第二个参数 转换为字符串的起始位置
            // 第三个参数 转换个数
            System.out.println(new String(data,0,readCount));
        }

        reader.close(); // 关闭资源

    }
}

```



##### 3.1.2 BufferedReader

> Reader
>
> BufferedReader  带有缓冲区的字符读取流 也叫缓冲流 可以提高读取文件的效率
>
> 因为读取过程是先将内容 读取到内容 等待一行读取完毕 再一次行加载到程序中 相当于减少了
>
> 与硬盘 内存 IO的次数 所以效率更高
>
> String readLine() 每次读取一行内容
>
> InputStreamReader 可以作为参数构造BufferedReader实例
>
> 而InputStreamReader支持使用FileInputStream 字节读取流构建实例
>
> 所以 InputStreamReader属于转换流

```java
package com.atguigu.test2;

import java.io.*;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 10:05
 * Reader
 * BufferedReader  带有缓冲区的字符读取流 也叫缓冲流 可以提高读取文件的效率
 * 因为读取过程是先将内容 读取到内容 等待一行读取完毕 再一次行加载到程序中 相当于减少了
 * 与硬盘 内存 IO的次数 所以效率更高
 * <p>
 * String readLine() 每次读取一行内容
 * <p>
 * InputStreamReader 可以作为参数构造BufferedReader实例
 * 而InputStreamReader支持使用FileInputStream 字节读取流构建实例
 * 所以 InputStreamReader属于转换流
 */
public class TestBufferedReader1 {
    public static void main(String[] args) {
        // 声明字节流对象
        FileInputStream fileInputStream = null;
        // 声明字符流/转换流 对象
        InputStreamReader inputStreamReader = null;
        // 声明缓冲流对象
        BufferedReader reader = null;
        try {
            // 指定读取文件
            fileInputStream = new FileInputStream("A.txt");

            // 创建转换流对象 需要使用字节流对象作为参数
            inputStreamReader = new InputStreamReader(fileInputStream);

            // 创建缓冲流对象 使用转换流作为参数
            reader = new BufferedReader(inputStreamReader);

            // 声明读取内容返回值 因为每次读取一行 所以返回值为String类型
            String line = null;

            // 循环读取 循环依据为返回值不为空 表示还未读取完毕
            while ((line = reader.readLine()) != null) {
                System.out.println(line); // 打印读取内容
            }

        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源 先用后关
            // 关闭之前做非空判断
            try {
                if (reader != null) {
                    reader.close();
                }
                if (inputStreamReader != null) {
                    inputStreamReader.close();
                }
                if (fileInputStream != null) {
                    fileInputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }


        }

    }


}


```



#### 3.2 Writer

##### 3.2.1 OutputStreamWriter

>  Writer 字符写入流 父类 抽象类
>
> OutputStreamWriter 写入的转换流
>
> OutputStreamWriter(OutputStream )
>
> OutputStreamWriter(OutputStream outputStream,String charSetName)
>
>
> write(String str) : 写入内容 直接写入字符串
>
> flush() 刷新内容 将内存中的内容刷新到硬盘上
>
> close() 关闭资源

```java
package com.atguigu.test3;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 11:17
 *  Writer 字符写入流 父类 抽象类
 *  OutputStreamWriter 写入的转换流
 *  OutputStreamWriter(OutputStream )
 *  OutputStreamWriter(OutputStream outputStream,String charSetName)
 *
 *  write(String str) : 写入内容 直接写入字符串
 *  flush() 刷新内容 将内存中的内容刷新到硬盘上
 *  close() 关闭资源
 *
 */
public class TestOutputStreamWriter1 {
    public static void main(String[] args) {
        // 声明字节写入流对象
        FileOutputStream fileOutputStream = null;
        // 声明字符写入流/转换流 对象
        OutputStreamWriter writer = null;
        try {
            // 创建字节写入流对象
            // 第一个参数 表示写入当前相对路径下(相对于当前项目而言的路径) B.txt 如果文件不存在 将自动创建
            // 第二个参数 true 表示在原文件基础之上追加内容 false或者不写 表示覆盖原内容
            fileOutputStream = new FileOutputStream("B.txt",true);

            // 创建字符写入流 / 转换流对象  使用字节流对象作为参数构造实例
            writer =  new OutputStreamWriter(fileOutputStream);

            // 写入文件
            writer.write("123456");

            writer.flush(); // 刷新 表示将缓存中的数据刷新到硬盘中

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            // 关闭资源 关闭资源之前 会自动刷新缓存
            try {
                if(writer != null){
                    writer.close();
                }
                if(fileOutputStream != null){
                    fileOutputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }
}

```

> OutputStreamWriter(OutputStream outputStream,String charSetName) 指定写入文件的编码格式

```java
package com.atguigu.test3;

import jdk.internal.util.xml.impl.Input;

import java.io.*;
import java.nio.Buffer;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 11:32
 *  OutputStreamWriter(OutputStream outputStream,String charSetName) 指定写入文件的编码格式
 */
public class TestOutputStreamWriter2 {
    public static void main(String[] args) throws IOException {

        // 打印本地平台默认的编码格式
        System.out.println(System.getProperty("file.encoding"));

        // 创建字节流对象 如果文件不存在将自动创建
        FileOutputStream fileOutputStream = new FileOutputStream("C.txt");

        // 创建字符流/转换流 对象  指定写入文件编码格式为 'GBK'
        OutputStreamWriter writer = new OutputStreamWriter(fileOutputStream,"GBK");

        // 写入文件
        writer.write("hello world 世界你好 66666");

        // 刷新缓存
        writer.flush();
        // 关闭资源
        writer.close();

        FileInputStream fileInputStream = new FileInputStream("C.txt");

        // 因为写入的编码格式为 GBK 所以读取的编码格式也应该设置为  GBK 否则将出现乱码
        InputStreamReader inputStreamReader = new InputStreamReader(fileInputStream,"GBK");

        BufferedReader reader = new BufferedReader(inputStreamReader);

        System.out.println(reader.readLine());

        reader.close();

        inputStreamReader.close();

        fileOutputStream.close();


    }
}

```

###### 3.2.1.1 FileWriter

>  Writer
>
> OutputStreamWriter
>
> FileWriter : 只能按照本地平台默认的编码格式写入文件

```java
package com.atguigu.test4;

import java.io.FileWriter;
import java.io.IOException;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 14:01
 *  Writer
 *  OutputStreamWriter
 *  FileWriter : 只能按照本地平台默认的编码格式写入文件
 */
public class TestFileWriter {
    public static void main(String[] args) {
        // 声明写入文件对象
        FileWriter writer = null;
        try {
            // 创建对象 并且指定写入文件  如果文件不存在 将会自动创建
            // 默认不写第二个参数 表示覆盖原文件内容
            writer = new FileWriter("D.txt");

            // 写入内容
            writer.write("hello world 世界你好 6666");

            writer.flush(); // 刷新缓存
        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            // 关闭资源
            try {
                if(writer != null){
                    writer.close();
                }
            } catch(IOException e) {
                e.printStackTrace();
            }
        }
    }
}

```

##### 3.2.2 BufferedWriter

>  BufferedWriter ： 带有缓存区的字符写入流  写入的内容先保存在缓冲区 调用flush方法 将缓存区中的内容
>
> 刷新到硬盘上 提高写入文件的效率
>
> 独有 newLine() 换行

```java
package com.atguigu.test4;

import java.io.*;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 14:08
 *  BufferedWriter ： 带有缓存区的字符写入流  写入的内容先保存在缓冲区 调用flush方法 将缓存区中的内容
 *  刷新到硬盘上 提高写入文件的效率
 *  独有 newLine() 换行
 */
public class TestBufferedWriter {
    public static void main(String[] args) throws IOException {
        // 创建对象 以匿名对象的方式作为参数构造实例
        BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(new FileOutputStream("E.txt")));

        // 写入文件 \n 和 newLine() 方法 都可以实现换行的效果
        writer.write("hello world \n 世界你好 \n 6666   1");
        writer.newLine();
        writer.write("hello world \n 世界你好 6666  \n  2");
        writer.flush(); // 刷新缓存
        writer.close(); // 关闭资源

    }
}

```



### 4. 数据流

> 数据流  按照单元划分 属于字节流
>
> DataInputStream 负责读取二进制文件
>
> read(byte [] data) :每次读取一个byte数组
>
>
> DataOutputStream 负责写入二进制文件
>
> write(byte [] data) : 写入byte数组

```java
package com.atguigu.test5;
import java.io.*;
/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 14:59
 *  数据流  按照单元划分 属于字节流
 *  DataInputStream 负责读取二进制文件
 *  read(byte [] data) :每次读取一个byte数组
 *
 *  DataOutputStream 负责写入二进制文件
 *  write(byte [] data) : 写入byte数组
 */
public class TestDataStream {
    public static void main(String[] args) throws IOException {
        // 定义字节读取流对象 表示读取此文件
        FileInputStream fileInputStream = new FileInputStream("D:\\beauty\\妖娆美女吊带短裙丝袜美腿写真\\2fae6d7344.jpg");

        // 定义数据写入流对象 将字节流对象传入 作为参数 构造实例
        DataInputStream dataInputStream = new DataInputStream(fileInputStream);

        // 定义byte数组 长度为此文件的可读字节数
        byte [] data = new byte[fileInputStream.available()];

        // 读取文件 内容保存在byte数组中
        dataInputStream.read(data);

        // 定义写入文件字节流对象 指定写入文件位置 以及 名称
        FileOutputStream fileOutputStream = new FileOutputStream("girl.jpg");

        // 定义数据写入流对象 将字节写入流对象作为参数 构造实例
        DataOutputStream dataOutputStream = new DataOutputStream(fileOutputStream);

        // 写入文件
        dataOutputStream.write(data);
		
        // 关闭资源

    }
}

```

### 5. 对象流

> 序列化和反序列化：
>
> 序列化是指将对象保存在二进制文件中 
>
> 反序列化是指将保存有对象的二进制文件读取出来 生成新的对象 
>
> 被序列化的对象 所属的类必须实现序列化接口 Serializable接口
>
> Serializable接口是一个空接口 只是相当于一个标识 表示此类可以被序列化  

> 对象流 按照单元划分 属于字节流
>
> ObjectInputStream 负责读取对象 
>
> readObject() 返回值为Object类型的对象
>
> ObjectOutputStream 负责写入对象 
>
> writeObject() 
>
> static修饰的属性也不能被序列化   

```java
package com.atguigu.test6;

import java.io.*;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 15:17
 *  序列化和反序列化：
 *      序列化是指将对象保存在二进制文件中 
 *      反序列化是指将保存有对象的二进制文件读取出来 生成新的对象 
 *      被序列化的对象 所属的类必须实现序列化接口 Serializable接口
 *      Serializable接口是一个空接口 只是相当于一个标识 表示此类可以被序列化  
 *
 *
 *  对象流 按照单元划分 属于字节流
 *  ObjectInputStream 负责读取对象 
 *  readObject() 返回值为Object类型的对象
 *  
 *  ObjectOutputStream 负责写入对象 
 *  writeObject() 
 *  
 */
public class TestObjectStream {
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        Student stu1 = new Student("赵四1", 21, '男');
        Student stu2 = new Student("赵四2", 22, '男');
        Student stu3 = new Student("赵四3", 23, '男');

        // 创建字节流对象 指定写入文件
        FileOutputStream fileOutputStream = new FileOutputStream("student.txt");

        // 创建对象流对象 使用字节流对象作为参数构造实例
        ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);

        // 写入对象
        objectOutputStream.writeObject(stu1);
        objectOutputStream.writeObject(stu2);
        objectOutputStream.writeObject(stu3);


        System.out.println("--------------------------------------------------");

        // 反序列化

        // 创建对象  指定读取文件
        FileInputStream fileInputStream = new FileInputStream("student.txt");

        // 创建对象 使用字节流对象作为参数 构造实例
        ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);

//        Object o1 = objectInputStream.readObject();
//
//        System.out.println(o1);
//
//        Object o2 = objectInputStream.readObject();
//
//        if(o2 instanceof  Student){
//            Student stu = (Student) o2;
//            System.out.println(stu.getName());
//            System.out.println(stu.getAge());
//            System.out.println(stu.getSex());
//        }
//
//        Object o3 = objectInputStream.readObject();
//
//        System.out.println(o3);

        // 判断可读字节数 大于0 表示文件中还有内容 继续读取
        while(fileInputStream.available() > 0){
            Object o = objectInputStream.readObject(); // 每次读取一个对象
            System.out.println("o = " + o); // 打印
        }

    }
}

```

```java
package com.atguigu.test6;

import java.io.Serializable;

/**
 * @author WHD
 * @description TODO
 * @date 2023/8/21 15:20
 *  如果不希望某个属性被序列化 可以使用transient关键字修饰
 */
public class Student implements Serializable {
    private String name;
    private transient int age;
    private transient char sex;

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", sex=" + sex +
                '}';
    }

    public Student(String name, int age, char sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    }

    public Student() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getSex() {
        return sex;
    }

    public void setSex(char sex) {
        this.sex = sex;
    }
}

```

