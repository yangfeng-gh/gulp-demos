# 将 buffer 变为 stream (内存中的内容)

有时候，你会需要这样一个 stream，它们的内容保存在一个变量中，而不是在一个实际的文件中。换言之，怎么不使用 gulp.src() 而创建一个 'gulp' stream。

我们来举一个例子，我们拥有一个包含 js 库文件的目录，以及一个包含一些模块的不同版本文件的目录。编译的目标是为每个版本创建一个 js 文件，其中包含所有库文件以及相应版本的模块文件拼接后的结果。

逻辑上我们将把这个拆分为如下步骤：

载入库文件
拼接库文件的内容
载入不同版本的文件
对于每个版本的文件，将其和库文件的内容拼接
对于每个版本的文件，将结果输出到一个文件
想象如下的文件结构：

```
├── libs
│   ├── lib1.js
│   └── lib2.js
└── versions
    ├── version.1.js
    └── version.2.js
```

你应该要得到这样的结果：

```
└── output
    ├── version.1.complete.js # lib1.js + lib2.js + version.1.js
    └── version.2.complete.js # lib1.js + lib2.js + version.2.js
```