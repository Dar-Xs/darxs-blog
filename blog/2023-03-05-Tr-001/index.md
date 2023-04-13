---
slug: tr-001
title: 浏览器如何运作
authors:
  - name: Tali Garsiel
    url: http://taligarsiel.com/
    title: Web 工程师
    image_url: https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/V3imNwHh9VNaDmFpXRnC.png
  - name: Paul Irish
    title: 前端工程师 @ Google
    url: https://www.paulirish.com
    image_url: https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/pkfFfQq25tFjXgFQw1rF.png
  - Dar-Xs
---
现代web浏览器的背后

英文原文于 2011 年 8 月 5 日发布在 [web.dev](https://web.dev) 上（[原文链接](https://web.dev/howbrowserswork/)）

## 序

　　这份关于 WebKit 和 Gecko 内部操作的全面入门材料，是以色列开发人员 Tali Garsiel 所做的大量研究的结果。在过去的几年里，她审阅了所有关于浏览器内部结构的公开数据，并花了大量时间阅读网络浏览器的源代码。她写道:

:::info Tali Garsiel:
　　在IE占据90%市场的那些年里，我们除了将浏览器视为“黑盒”外，没有什么可做的。但现在，随着开源浏览器占据了[超过一半的市场份额](http://techcrunch.com/2011/08/01/open-web-browsers/)，是时候窥探一下引擎的核心，看看web浏览器内部是什么了。好吧，里面有数百万行的C++代码……
:::

　　Tali在[她的网站](http://taligarsiel.com/)上发表了她的研究，但我们知道这值得被广泛传播，所以我们把它整理了一下，并在这里重新发表。

> 　　作为一名web开发人员，**了解浏览器内部的操作原理可以帮助你做出更好的决策，并了解最佳开发方法背后的理由**。虽然这是一个相当长的文档，但我们建议您花些时间深入研究。我们保证你研究完之后会很满意。
> 
>  -- _Paul Irish, Chrome Developer Relations_

## 简介

　　Web 浏览器是使用最为广泛的软件。在本文中，我将解释它们在幕后是如何工作的。从你在地址栏中输入 `google.com` 开始，直到浏览器屏幕上显示谷歌页面为止，浏览器到底干了些什么？让我们一起来探究这个过程。

## 我们将要讨论的浏览器


　　现在有五种主要的桌面浏览器：Chrome, Internet Explorer, Firefox, Safari 和 Opera。在移动端，主要的浏览器有 Android 浏览器、iPhone、Opera Mini 和 Opera mobile、UC 浏览器、Nokia S40/S60 浏览器和 Chrome。在这其中，除了 Opera 浏览器，其他浏览器都基于 WebKit。我将从开源浏览器 Firefox 和 Chrome 以及 Safari（部分开源）中举例。根据 [StatCounter 的统计数据](http://gs.statcounter.com/)（截至 2013 年 6 月），Chrome、Firefox 和 Safari 占据了全球桌面浏览器使用量的 71% 左右。在移动设备上，Android 浏览器、iPhone 和 Chrome 的使用率约为 54%。

## 浏览器的主要功能

浏览器的主要功能是，从服务器请求所选择的web资源，并在浏览器窗口中显示它们。这些资源通常是HTML文档，但也可能是PDF、图像或其他类型的内容。资源的位置由用户使用URI(Uniform Resource Identifier统一资源标识符)指定。

浏览器解释和显示HTML文件的方式由HTML和CSS的规范指定。这些规范由W3C(World Wide Web Consortium万维网联盟)组织维护，该组织是web的标准组织。多年来，浏览器只遵循了部分规范，并开发了自己的扩展。这给网页作者带来了严重的兼容性问题。如今，大多数浏览器或多或少都符合规范。

浏览器用户界面之间有很多共同之处。常见的用户界面元素有:

1. 用于插入URI的地址栏
2. 后退和前进按钮
3. 书签选项
4. 刷新和停止按钮，用于刷新或停止对当前文档的加载
5. 返回主页的Home按钮

奇怪的是，没有任何正式的规范指定了浏览器的用户界面。这只是来自于多年的经验和浏览器相互模仿而形成的良好结果。HTML5规范没有定义浏览器必须拥有的UI(User Interface，用户界面)元素，但还是列出了一些常见元素。其中包括地址栏、状态栏和工具栏。当然，某些浏览器也有其独特的功能，比如Firefox的下载管理器。

## 浏览器的宏观结构

浏览器的主要组成部分有：

  1. **用户界面**：包括地址栏、后退/前进按钮、书签菜单等。这包含浏览器显示的每个部分，除了您查看请求页面的窗口。
  1. **浏览器引擎**：整合渲染引擎并构建UI。
  2. **渲染引擎**：负责显示请求的内容。例如，如果请求的内容是HTML页面，呈现引擎将解析HTML和CSS，并在屏幕上显示解析后的内容。
  3. **网络**：对于网络调用(如HTTP请求)，在与平台无关的接口后面使用针对不同平台的不同实现。
  4. **UI后端**：用于绘制基本的小部件，如组件(combo box)和窗口。这个后端暴露了一个平台通用的接口。它向下直接调用操作系统UI相关的方法。
  5. **JavaScript解释器**：用于解析和执行JavaScript代码。
  6. **数据存储**：这是一个持久层。浏览器可能需要在本地保存各种数据，比如cookie。浏览器还支持localStorage、IndexedDB、WebSQL和文件系统等存储机制。

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/PgPX6ZMyKSwF6kB8zIhB.png" alt="Browser components" width="500" height="339" />
  <figcaption>Figure 1: Browser components</figcaption>
</figure>

需要注意的是，浏览器(如Chrome)会运行多个渲染引擎实例：每个页面一个实例。每个页面在单独的进程中运行。

## 渲染引擎

渲染引擎的职责嘛…就是渲染，即在浏览器屏幕上显示所请求的内容。

默认情况下，渲染引擎可以显示HTML和XML文档和图像。它可以通过安装插件或扩展来显示其他类型的数据。例如，使用PDF查看器插件显示PDF文档。然而，在本章中，我们将关注主要的用例：显示使用CSS格式化的HTML和图像。

## 多种渲染引擎

不同的浏览器使用不同的渲染引擎：Internet Explorer使用Trident, Firefox使用Gecko, Safari使用WebKit。Chrome和Opera(从版本15开始)使用Blink，这是WebKit的一个分支。

WebKit是一个开源的渲染引擎，最初用于Linux平台，后来被苹果修改为支持Mac和Windows。详情请参见[webkit.org](http://webkit.org/)。

## 渲染的主要流程

渲染引擎将开始从网络层获取所请求文档的内容。这些内容通常被分为很多8kB的块。

以下是渲染引擎的基本流程:

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/bPlYx9xODQH4X1KuUNpc.png" alt="Rendering engine basic flow" width="600" height="66" />
  <figcaption>Figure 2: Rendering engine basic flow</figcaption>
</figure>

The rendering engine will start parsing the HTML document and convert elements to [DOM](#dom) nodes in a tree called the "content tree". The engine will parse the style data, both in external CSS files and in style elements. Styling information together with visual instructions in the HTML will be used to create another tree: the [render tree](#render-tree-construction).
渲染引擎将开始解析HTML文档，并将元素转换为称为“content tree”的树中的DOM节点。引擎将解析外部CSS文件和样式元素中的样式数据。样式信息和HTML中的可视指令将用于创建另一棵树：渲染树。

渲染树包含具有颜色和尺寸等视觉属性的矩形渲染区域。这些矩形以正确的次序显示在屏幕上。

After the construction of the render tree it goes through a "[layout](#layout)" process.
This means giving each node the exact coordinates where it should appear on the screen.
The next stage is [painting](#painting) - the render tree will be traversed and each node will be painted using the UI backend layer.
在构建渲染树之后，它会经历一个“[布局](#布局)”过程。这意味着为树中每个节点提供它应该出现在屏幕上的确切坐标。下一个阶段是[绘制](#绘制)——渲染树将被遍历，每个节点将使用UI后端层绘制。

重要的是要明白，这是一个渐进的过程。为了更好的用户体验，渲染引擎会尽量在屏幕上尽快显示内容。它不会等到所有HTML都解析完毕后才开始构建和布局渲染树。部分内容将提前被解析和显示，而随着来自网络的其余内容到达，该过渲染过程将继续。

### Main flow examples

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/S9TJhnMX1cu1vrYuQRqM.png" alt="WebKit main flow." width="624" height="289" />
  <figcaption>Figure 3: WebKit main flow</figcaption>
</figure>

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/Tbif2mUJCUVyPdyXntZk.jpg" alt="Mozilla's Gecko rendering engine main flow." width="624" height="290" />
  <figcaption>Figure 4: Mozilla's Gecko rendering engine main flow</figcaption>
</figure>

Mozilla 的 Gecko 渲染引擎从图3和图4可以看到，尽管WebKit和Gecko使用的术语略有不同，但流程基本上是相同的。

Gecko称视觉上格式化的元素树为“Frame tree”。每个元素都是一个Frame。WebKit使用术语“Render Tree”，它由“Render Objects”组成。WebKit使用术语“Layout”来放置元素，而Gecko称之为“Reflow”。“Attachment”是WebKit用于连接DOM节点和可视信息以创建渲染树的术语。一个微小的非语义差异是，Gecko在HTML和DOM树之间有一个额外的层。它被称为“Content Sink”(内容槽)，是制作DOM元素的工厂。我们将讨论流程的每个部分:

### 解析-简介

由于解析在呈现引擎中是一个非常重要的过程，我们需要更深入地讨论它。让我们先简单介绍一下解析。

解析文档意味着将其转换为程序可以使用的结构。解析的结果通常是表示文档结构的节点树。这被称为解析树(parse tree)或语法树。

For example, parsing the expression `2 + 3 - 1` could return this tree:

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/xNQUG9emGd8FzuOpumP7.png" alt="Mathematical expression tree node." width="400" height="155" />
  <figcaption>Figure 5: mathematical expression tree node</figcaption>
</figure>

### Grammars

Parsing is based on the syntax rules the document obeys: the language or format it was written in.
Every format you can parse must have deterministic grammar consisting of vocabulary and syntax rules. It is called a
[context free grammar](#context_free_grammar). Human languages are not such languages and therefore cannot be parsed with conventional parsing techniques.
解析过程基于文档的句法(syntax，语言中单词或语句的排列方式)。文档遵循的句法，指的是编写文档的语言或格式。每种可以解析的格式都必须具有确定的语法(grammar，语言的整体结构和用法)，一般由词汇和句法规则组成。这被称为上下文无关语法。人类语言不是这样的语言，因此不能用传统的解析技术进行解析。

### 解析器-词法分析器(Lexer)的组合

解析过程可以分为两个子过程：词法分析(lexical analysis)和句法分析。

词法分析是将程序输入分解为标记(Token)的过程。标记是语言的词汇，即有效构组成成分的集合。在人类语言中，它由词典中出现的该语言的所有单词组成。

句法分析是运用语言句法的规则。

解析器通常将任务划分为两个部分：**词法分析器**(有时称为标记器，tokenizer)负责将输入分解为有效的标记；**解析器**负责根据句法规则分析文档结构，来构造解析树。

词法分析器知道如何去除不相关的字符，如空格和换行符。

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/TfY1qPDNbZS8iBnlAO4b.png" alt="From source document to parse trees" width="101" height="300" />
  <figcaption>Figure 6: from source document to parse trees</figcaption>
</figure>

解析过程是迭代的。解析器通常会向词法分析器请求一个新的标记，并尝试将该标记与语法规则之一匹配。如果匹配到规则，则与该标记对应的节点将被添加到解析树中，解析器将请求另一个标记。

如果没有匹配的规则，解析器将在内部存储标记，并继续请求标记，直到找到与所有内部存储的标记匹配的规则。如果没有找到规则，解析器将抛出异常。这意味着文档无效并且包含句法错误。

### 翻译

在许多情况下，解析树并不是最终产物。解析通常用于翻译：将输入文档转换为另一种格式。一个较好的例子就是“编译”。编译器能将源代码编译为机器码。它首先将其解析为解析树，然后将树转换为机器码文档。

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/VhoUBTyHWNnnZJiIfRAo.png" alt="Compilation flow" width="104" height="400" />
  <figcaption>Figure 7: compilation flow</figcaption>
</figure>

### Parsing example

在图5中，我们根据一个数学表达式构建了解析树。让我们尝试定义一种简单的数学语言，并观察解析表达式的过程。

:::info 关键术语
我们的语言可以包括整数、加号和减号。
:::

句法：
1. 这个语言中，句法的基本单元是“表达式”、“项”和“操作”
2. 我们的语言可以包含任意数量的“表达式”
3. “表达式”定义为“项”后面跟着“操作”，后面跟着另一个“项”
4. 一个“操作”是一个“加号”或“减号”
5. “项”是一个“整数”或“表达式”

我们分析一下输入 `2 + 3 - 1`.

The first substring that matches a rule is `2`: according to rule #5 it is a term.
The second match is `2  + 3`: this matches the third rule: a term followed by an operation followed by another term.
The next match will only be hit at the end of the input.
`2 + 3 - 1` is an expression because we already know that `2 + 3`is a term, so we have a term followed by an operation followed by another term.
`2 + +` will not match any rule and therefore is an invalid input.

### Formal definitions for vocabulary and syntax

Vocabulary is usually expressed by [regular expressions](http://www.regular-expressions.info/).

For example our language will be defined as:
```js
INTEGER: 0|[1-9][0-9]*
PLUS: +
MINUS: -
```

As you see, integers are defined by a regular expression.

Syntax is usually defined in a format called [BNF](http://en.wikipedia.org/wiki/Backus%E2%80%93Naur_Form).
Our language will be defined as:

```js
expression :=  term  operation  term
operation :=  PLUS | MINUS
term := INTEGER | expression
```

We said that a language can be parsed by regular parsers if its grammar is a context free grammar.
An intuitive definition of a context free grammar is a grammar that can be entirely expressed in BNF.
For a formal definition see
[Wikipedia's article on Context-free grammar](http://en.wikipedia.org/wiki/Context-free_grammar)

### Types of parsers

There are two types of parsers: top down parsers and bottom up parsers. An intuitive explanation is that top down parsers examine the high level structure of the syntax and try to find a rule match. Bottom up parsers start with the input and gradually transform it into the syntax rules, starting from the low level rules until high level rules are met.

Let's see how the two types of parsers will parse our example.

The top down parser will start from the higher level rule: it will identify `2 + 3` as an expression. It will then identify `2 + 3 - 1` as an expression (the process of identifying the expression evolves, matching the other rules, but the start point is the highest level rule).

The bottom up parser will scan the input until a rule is matched. It will then replace the matching input with the rule. This will go on until the end of the input.
The partly matched expression is placed on the parser's stack.

<div class="table-wrapper scrollbar">
  <table>
    <thead>
      <tr>
        <th>Stack</th>
        <th>Input</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td>2 + 3 - 1</td>
      </tr>
      <tr>
        <td>term</td>
        <td>+ 3 - 1</td>
      </tr>
      <tr>
        <td>term operation</td>
        <td>3 - 1</td>
      </tr>
      <tr>
        <td>expression</td>
        <td>- 1</td>
      </tr>
      <tr>
        <td>expression operation</td>
        <td>1</td>
      </tr>
      <tr>
        <td>expression</td>
        <td>-</td>
      </tr>
    </tbody>
  </table>
</div>

This type of bottom up parser is called a shift-reduce parser, because the input is shifted to the right (imagine a pointer pointing first at the input start and moving to the right) and is gradually reduced to syntax rules.

### Generating parsers automatically

There are tools that can generate a parser. You feed them the grammar of your language - its vocabulary and syntax rules - and they generate a working parser.
Creating a parser requires a deep understanding of parsing and it's not easy to create an optimized parser by hand, so parser generators can be very useful.

WebKit uses two well known parser generators: [Flex](http://en.wikipedia.org/wiki/Flex_lexical_analyser) for creating a lexer and [Bison](http://www.gnu.org/software/bison/) for creating a parser (you might run into them with the names Lex and Yacc).
Flex input is a file containing regular expression definitions of the tokens.
Bison's input is the language syntax rules in BNF format.

## HTML Parser

The job of the HTML parser is to parse the HTML markup into a parse tree.

### The HTML grammar definition

The vocabulary and syntax of HTML are defined in specifications created by the W3C organization.

### Not a context free grammar

As we have seen in the parsing introduction, grammar syntax can be defined formally using formats like BNF.

Unfortunately all the conventional parser topics do not apply to HTML (I didn't  bring them up just for fun - they will be used in parsing CSS and JavaScript).
HTML cannot easily be defined by a context free grammar that parsers need.

There is a formal format for defining HTML - DTD (Document Type Definition) - but it is not a context free grammar.

This appears strange at first sight; HTML is rather close to XML. There are lots of available XML parsers.
There is an XML variation of HTML - XHTML - so what's the big difference?

The difference is that the HTML approach is more "forgiving": it lets you omit certain tags (which are then added implicitly), or sometimes omit start or end tags, and so on.
On the whole it's a "soft" syntax, as opposed to XML's stiff and demanding syntax.

This seemingly small detail makes a world of a difference.
On one hand this is the main reason why HTML is so popular: it forgives your mistakes and makes life easy for the web author.
On the other hand, it makes it difficult to write a formal grammar. So to summarize, HTML cannot be parsed easily by conventional parsers, since its grammar is not context free. HTML cannot be parsed by XML parsers.

### HTML DTD

HTML definition is in a DTD format. This format is used to define languages of the [SGML](http://en.wikipedia.org/wiki/Standard_Generalized_Markup_Language) family. The format contains definitions for all allowed elements, their attributes and hierarchy. As we saw earlier, the HTML DTD doesn't form a context free grammar.

There are a few variations of the DTD. The strict mode conforms solely to the specifications but other modes contain support for markup used by browsers in the past. The purpose is backwards compatibility with older content.
The current strict DTD is here:
[www.w3.org/TR/html4/strict.dtd](http://www.w3.org/TR/html4/strict.dtd)

### DOM

The output tree (the "parse tree") is a tree of DOM element and attribute nodes.
DOM is short for Document Object Model.
It is the object presentation of the HTML document and the interface of HTML elements to the outside world like JavaScript.

The root of the tree is the "[Document](http://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/level-one-core.html#i-Document)" object.


The DOM has an almost one-to-one relation to the markup.
For example:

```html
<html>
  <body>
    <p>
      Hello World
    </p>
    <div> <img src="example.png"/></div>
  </body>
</html>
```

This markup would be translated to the following DOM tree:

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/DNtfwOq9UaC3TrEj3D9h.png" alt="DOM tree of the example markup" width="400" height="219" />
  <figcaption>Figure 8: DOM tree of the example markup</figcaption>
</figure>


Like HTML, DOM is specified by the W3C organization.
See [www.w3.org/DOM/DOMTR](http://www.w3.org/DOM/DOMTR).
It is a generic specification for manipulating documents. A specific module describes HTML specific elements. The HTML definitions can be found here:
[www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/idl-definitions.html](http://www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/idl-definitions.html).

When I say the tree contains DOM nodes, I mean the tree is constructed of elements that implement one of the DOM interfaces. Browsers use concrete implementations that have other attributes used by the browser internally.

#### The parsing algorithm

As we saw in the previous sections, HTML cannot be parsed using the regular top down or bottom up parsers.

The reasons are:

1. The forgiving nature of the language.
1. The fact that browsers have traditional error tolerance to support well known cases of invalid HTML.
1. The parsing process is reentrant. For other languages, the source doesn't change during parsing, but in HTML, dynamic code (such as script elements containing `document.write()` calls) can add extra tokens, so the parsing process actually modifies the input.

Unable to use the regular parsing techniques, browsers create custom parsers for parsing HTML.

The[parsing algorithm is described in detail by the HTML5 specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/parsing.html).
The algorithm consists of two stages: tokenization and tree construction.

Tokenization is the lexical analysis, parsing the input into tokens.
Among HTML tokens are start tags, end tags, attribute names and attribute values.

The tokenizer recognizes the token, gives it to the tree constructor, and consumes the next character for recognizing the next token, and so on until the end of the input.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/YYYp1GgcD0riUliWJdiX.png" alt="HTML parsing flow (taken from HTML5 spec)" width="308" height="400" />
  <figcaption>Figure 9: HTML parsing flow (taken from HTML5 spec)</figcaption>
</figure>

### The tokenization algorithm

The algorithm's output is an HTML token.
The algorithm is expressed as a state machine.
Each state consumes one or more characters of the input stream and updates the next state according to those characters.
The decision is influenced by the current tokenization state and by the tree construction state. This means the same consumed character will yield different results for the correct next state, depending on the current state.
The algorithm is too complex to describe fully, so let's see a simple example that will help us understand the principle.

Basic example - tokenizing the following HTML:

```html
<html>
  <body>
    Hello world
  </body>
</html>
```

The initial state is the "Data state".
When the `<` character is encountered, the state is changed to **"Tag open state"**.
Consuming an `a-z` character causes creation of a "Start tag token", the state is changed to **"Tag name state"**.
We stay in this state until the `>` character is consumed. Each character is appended to the new token name. In our case the created token is an `html` token.

When the `>` tag is reached, the current token is emitted and the state changes back to the **"Data state"**.
The `<body>` tag will be treated by the same steps.
So far the `html` and `body` tags were emitted. We are now back at the **"Data state"**.
Consuming the `H` character of `Hello world` will cause creation and emitting of a character token, this goes on until the `<` of `</body>` is reached. We will emit a character token for each character of `Hello world`.

We are now back at the **"Tag open state"**.
Consuming the next input `/` will cause creation of an `end tag token` and a move to the **"Tag name state"**. Again we stay in this state until we reach `>`.Then the new tag token will be emitted and we go back to the **"Data state"**.
The `</html>` input will be treated like the previous case.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/52SA8fqorIKP6h22JHUR.png" alt="Tokenizing the example input" width="627" height="387" />
  <figcaption>Figure 10: Tokenizing the example input</figcaption>
</figure>

#### Tree construction algorithm

When the parser is created the Document object is created. During the tree construction stage the DOM tree with the Document in its root will be modified and elements will be added to it.
Each node emitted by the tokenizer will be processed by the tree constructor.
For each token the specification defines which DOM element is relevant to it and will be created for this token.
The element is added to the DOM tree, and also the stack of open elements.
This stack is used to correct nesting mismatches and unclosed tags.
The algorithm is also described as a state machine.  The states are called "insertion modes".

Let's see the tree construction process for the example input:

```html
<html>
  <body>
    Hello world
  </body>
</html>
```

The input to the tree construction stage is a sequence of tokens from the tokenization stage.
The first mode is the **"initial mode"**. Receiving the "html" token will cause a move to the **"before html"** mode and a reprocessing of the token in that mode.
This will cause creation of the HTMLHtmlElement element, which will be appended to the root Document object.

The state will be changed to **"before head"**. The "body" token is then received. An HTMLHeadElement will be created implicitly although we don't have a "head" token and it will be added to the tree.

We now move to the **"in head"** mode and then to **"after head"**. The body token is reprocessed, an HTMLBodyElement is created and inserted and the mode is transferred to **"in body"**.

The character tokens of the "Hello world" string are now received. The first one will cause creation and insertion of a "Text" node and the other characters will be appended to that node.

The receiving of the body end token will cause a transfer to **"after body"** mode.
We will now receive the html end tag which will move us to **"after after body"** mode.
Receiving the end of file token will end the parsing.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/Q8vtwKMnnvYf48eeY95Y.gif" alt="Tree construction of example HTML." width="532" height="769" />
  <figcaption>Figure 11: tree construction of example html</figcaption>
</figure>

### Actions when the parsing is finished

At this stage the browser will mark the document as interactive and start parsing scripts that are in "deferred" mode: those that should be executed after the document is parsed.
The document state will be then set to "complete" and a "load" event will be fired.

You can see [the full algorithms for tokenization and tree construction in the HTML5 specification](http://www.w3.org/TR/html5/syntax.html#html-parser).

### Browsers' error tolerance

You never get an "Invalid Syntax" error on an HTML page.
Browsers fix any invalid content and go on.

Take this HTML for example:

```html
<html>
  <mytag>
  </mytag>
  <div>
  <p>
  </div>
    Really lousy HTML
  </p>
</html>
```

I must have violated about a million rules ("mytag" is not a standard tag, wrong nesting of the "p" and "div" elements and more) but the browser still shows it correctly and doesn't complain.
So a lot of the parser code is fixing the HTML author mistakes.

Error handling is quite consistent in browsers, but amazingly enough it hasn't been part of HTML specifications.
Like bookmarking and back/forward buttons it's just something that developed in browsers over the years. There are known invalid HTML constructs repeated on many sites, and the browsers try to fix them in a way conformant with other browsers.

The HTML5 specification does define some of these requirements. (WebKit summarizes this nicely in the comment at the beginning of the HTML parser class.)

The parser parses tokenized input into the document, building up the document tree. If the document is well-formed, parsing it is straightforward.

Unfortunately, we have to handle many HTML documents that are not well-formed, so the parser has to be tolerant about errors.

We have to take care of at least the following error conditions:

1. The element being added is explicitly forbidden inside some outer tag. In this case we should close all tags up to the one which forbids the element, and add it afterwards.
1. We are not allowed to add the element directly. It could be that the person writing the document forgot some tag in between (or that the tag in between is optional). This could be the case with the following tags: HTML HEAD BODY TBODY TR TD LI (did I forget any?).
1. We want to add a block element inside an inline element. Close all inline elements up to the next higher block element.
1. If this doesn't help, close elements until we are allowed to add the element - or ignore the tag.

Let's see some WebKit error tolerance examples:

#### `</br>` instead of `<br>`

Some sites use `</br>` instead of `<br>`. In order to be compatible with IE and Firefox, WebKit treats this like `<br>`.

The code:
```js
if (t->isCloseTag(brTag) && m_document->inCompatMode()) {
     reportError(MalformedBRError);
     t->beginTag = true;
}
```

Note that the error handling is internal: it won't be presented to the user.

#### A stray table

A stray table is a table inside another table, but not inside a table cell.

For example:

```html
<table>
  <table>
    <tr><td>inner table</td></tr>
  </table>
  <tr><td>outer table</td></tr>
</table>
```

WebKit will change the hierarchy to two sibling tables:

```html
<table>
  <tr><td>outer table</td></tr>
</table>
<table>
  <tr><td>inner table</td></tr>
</table>
```

The code:

```js
if (m_inStrayTableContent && localName == tableTag)
        popBlock(tableTag);
```

WebKit uses a stack for the current element contents: it will pop the inner table out of the outer table stack. The tables will now be siblings.

#### Nested form elements

In case the user puts a form inside another form, the second form is ignored.

The code:

```js
if (!m_currentFormElement) {
        m_currentFormElement = new HTMLFormElement(formTag,    m_document);
}
```

#### A too deep tag hierarchy

The comment speaks for itself.

:::info
www.liceo.edu.mx is an example of a site that achieves a level of nesting of about 1500 tags, all from a bunch of `<b>`s.
We will only allow at most 20 nested tags of the same type before just ignoring them all together.
:::

```js
bool HTMLParser::allowNestedRedundantTag(const AtomicString& tagName)
{

unsigned i = 0;
for (HTMLStackElem* curr = m_blockStack;
         i < cMaxRedundantTagDepth && curr && curr->tagName == tagName;
     curr = curr->next, i++) { }
return i != cMaxRedundantTagDepth;
}
```

#### Misplaced html or body end tags

Again - the comment speaks for itself.

:::info
Support for really broken HTML.
We never close the body tag, since some stupid web pages close it before the actual end of the doc.
Let's rely on the end() call to close things.
:::

```js
if (t->tagName == htmlTag || t->tagName == bodyTag )
        return;
```

So web authors beware - unless you want to appear as an example in a WebKit error tolerance code snippet - write well formed HTML.

## CSS parsing

Remember the parsing concepts in the introduction?  Well, unlike HTML, CSS is a context free grammar and can be parsed using the types of parsers described in the introduction.
In fact [the CSS specification defines CSS lexical and syntax grammar](http://www.w3.org/TR/CSS2/grammar.html).

Let's see some examples:

The lexical grammar (vocabulary) is defined by regular expressions for each token:

```markup
comment   \/\*[^*]*\*+([^/*][^*]*\*+)*\/
num       [0-9]+|[0-9]*"."[0-9]+
nonascii  [\200-\377]
nmstart   [_a-z]|{nonascii}|{escape}
nmchar    [_a-z0-9-]|{nonascii}|{escape}
name      {nmchar}+
ident     {nmstart}{nmchar}*
```

"ident" is short for identifier, like a class name.
"name" is an element id (that is referred by "#" )

The syntax grammar is described in BNF.

```css
ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
selector
  : simple_selector [ combinator selector | S+ [ combinator? selector ]? ]?
  ;
simple_selector
  : element_name [ HASH | class | attrib | pseudo ]*
  | [ HASH | class | attrib | pseudo ]+
  ;
class
  : '.' IDENT
  ;
element_name
  : IDENT | '*'
  ;
attrib
  : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*
    [ IDENT | STRING ] S* ] ']'
  ;
pseudo
  : ':' [ IDENT | FUNCTION S* [IDENT S*] ')' ]
  ;
```

Explanation:

A ruleset is this structure:

```css
div.error, a.error {
  color:red;
  font-weight:bold;
}
```

`div.error` and `a.error` are selectors. The part inside the curly braces contains the rules that are applied by this ruleset.
This structure is defined formally in this definition:

```css
ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
```

This means a ruleset is a selector or optionally a number of selectors separated by a comma and spaces (S stands for white space).
A ruleset contains curly braces and inside them a declaration or optionally a number of declarations separated by a semicolon.
"declaration" and "selector" will be defined in the following BNF definitions.

### WebKit CSS parser

WebKit uses [Flex and Bison](#parser_generators) parser generators to create parsers automatically from the CSS grammar files.
As you recall from the parser introduction, Bison creates a bottom up shift-reduce parser.
Firefox uses a top down parser written manually.
In both cases each CSS file is parsed into a StyleSheet object. Each object contains CSS rules. The CSS rule objects contain selector and declaration objects and other objects corresponding to CSS grammar.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/vBMlouM57RHDG29Ukzhi.png" alt="Parsing CSS." width="500" height="393" />
  <figcaption>Figure 12: parsing CSS</figcaption>
</figure>

## The order of processing scripts and style sheets

### Scripts

The model of the web is synchronous. Authors expect scripts to be parsed and executed immediately when the parser reaches a `<script>` tag.
The parsing of the document halts until the script has been executed.
If the script is external then the resource must first be fetched from the network - this is also done synchronously, and parsing halts until the resource is fetched.
This was the model for many years and is also specified in HTML4 and 5 specifications.
Authors can add the "defer" attribute to a script, in which case it will not halt document parsing and will execute after the document is parsed. HTML5 adds an option to mark the script as asynchronous so it will be parsed and executed by a different thread.

### Speculative parsing

Both WebKit and Firefox do this optimization. While executing scripts, another thread parses the rest of the document and finds out what other resources need to be loaded from the network and loads them. In this way, resources can be loaded on parallel connections and overall speed is improved. Note: the speculative parser only parses references to external resources like external scripts, style sheets and images: it doesn't modify the DOM tree - that is left to the main parser.

### Style sheets

Style sheets on the other hand have a different model.
Conceptually it seems that since style sheets don't change the DOM tree, there is no reason to wait for them and stop the document parsing. There is an issue, though, of scripts asking for style information during the document parsing stage.
If the style is not loaded and parsed yet, the script will get wrong answers and apparently this caused lots of problems.
It seems to be an edge case but is quite common.
Firefox blocks all scripts when there is a style sheet that is still being loaded and parsed.
WebKit blocks scripts only when they try to access certain style properties that may be affected by unloaded style sheets.

## Render tree construction

While the DOM tree is being constructed, the browser constructs another tree, the render tree.
This tree is of visual elements in the order in which they will be displayed.
It is the visual representation of the document.
The purpose of this tree is to enable painting the contents in their correct order.


Firefox calls the elements in the render tree "frames". WebKit uses the term renderer or render object.

A renderer knows how to lay out and paint itself and its children.

WebKit's RenderObject class, the base class of the renderers, has the following definition:

```js
class RenderObject{
  virtual void layout();
  virtual void paint(PaintInfo);
  virtual void rect repaintRect();
  Node* node;  //the DOM node
  RenderStyle* style;  // the computed style
  RenderLayer* containgLayer; //the containing z-index layer
}
```

Each renderer represents a rectangular area usually corresponding to a node's CSS box, as described by the CSS2 spec.
It includes geometric information like width height and position.

The box type is affected by the "display" value of the style attribute that is relevant to the node (see the <a href="#style_computation">style computation</a> section).
Here is WebKit code for deciding what type of renderer should be created for a DOM node, according to the display attribute:

```js
RenderObject* RenderObject::createObject(Node* node, RenderStyle* style)
{
    Document* doc = node->document();
    RenderArena* arena = doc->renderArena();
    ...
    RenderObject* o = 0;

    switch (style->display()) {
        case NONE:
            break;
        case INLINE:
            o = new (arena) RenderInline(node);
            break;
        case BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case INLINE_BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case LIST_ITEM:
            o = new (arena) RenderListItem(node);
            break;
       ...
    }

    return o;
}
```

The element type is also considered: for example, form controls and tables have special frames.

In WebKit if an element wants to create a special renderer, it will override the `createRenderer()` method.
The renderers point to style objects that contains non geometric information.

### The render tree relation to the DOM tree

The renderers correspond to DOM elements, but the relation is not one to one.
Non-visual DOM elements will not be inserted in the render tree. An example is the "head" element. Also elements whose display value was assigned to "none" will not appear in the tree (whereas elements with "hidden" visibility will appear in the tree).

There are DOM elements which correspond to several visual objects. These are usually elements with complex structure that cannot be described by a single rectangle. For example, the "select" element has three renderers: one for the display area, one for the drop down list box and one for the button.
Also when text is broken into multiple lines because the width is not sufficient for one line, the new lines will be added as extra renderers.

Another example of multiple renderers is broken HTML.
According to the CSS spec an inline element must contain either only block elements or only inline elements.
In the case of mixed content, anonymous block renderers will be created to wrap the inline elements.

Some render objects correspond to a DOM node but not in the same place in the tree.
Floats and absolutely positioned elements are out of flow, placed in a different part of the tree, and mapped to the real frame.
A placeholder frame is where they should have been.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/937hKTBHU2FAEyMRdi5z.png" alt="The render tree and the corresponding DOM tree." width="731" height="396" />
  <figcaption>Figure 13: The render tree and the corresponding DOM tree. The "Viewport" is the initial containing block. In WebKit it will be the "RenderView" object</figcaption>
</figure>

#### The flow of constructing the tree

In Firefox, the presentation is registered as a listener for DOM updates.
The presentation delegates frame creation to the `FrameConstructor` and the constructor resolves style (see [style computation](#style)) and creates a frame.

In WebKit the process of resolving the style and creating a renderer is called "attachment".
Every DOM node has an "attach" method.
Attachment is synchronous, node insertion to the DOM tree calls the new node "attach" method.

Processing the html and body tags results in the construction of the render tree root.
The root render object corresponds to what the CSS spec calls the containing block: the top most block that contains all other blocks. Its dimensions are the viewport: the browser window display area dimensions.
Firefox calls it `ViewPortFrame` and WebKit calls it `RenderView`.
This is the render object that the document points to.
The rest of the tree is constructed as a DOM nodes insertion.

See [the CSS2 spec on the processing model](http://www.w3.org/TR/CSS21/intro.html#processing-model).

### Style Computation

Building the render tree requires calculating the visual properties of each render object.
This is done by calculating the style properties of each element.

The style includes style sheets of various origins, inline style elements and visual properties in the HTML (like the "bgcolor" property).The later is translated to matching CSS style properties.

The origins of style sheets are the browser's default style sheets, the style sheets provided by the page author and user style sheets - these are style sheets provided by the browser user (browsers let you define your favorite styles. In Firefox, for instance, this is done by placing a style sheet in the "Firefox Profile" folder).

Style computation brings up a few difficulties:

1. Style data is a very large construct, holding the numerous style properties, this can cause memory problems.
1. Finding the matching rules for each element can cause performance issues if it's not optimized. Traversing the entire rule list for each element to find matches is a heavy task.  Selectors can have complex structure that can cause the matching process to start on a seemingly promising path that is proven to be futile and another path has to be tried.

    For example - this compound selector:

    ```css
    div div div div{
    ...
    }
    ```

    Means the rules apply to a `<div>` who is the descendant of 3 divs. Suppose you want to check if the rule applies for a given `<div>` element. You choose a certain path up the tree for checking. You may need to traverse the node tree up just to find out there are only two divs and the rule does not apply. You then need to try other paths in the tree.

1. Applying the rules involves quite complex cascade rules that define the hierarchy of the rules.

Let's see how the browsers face these issues:

### Sharing style data

WebKit nodes references style objects (RenderStyle).
These objects can be shared by nodes in some conditions.
The nodes are siblings or cousins and:

1. The elements must be in the same mouse state (e.g., one can't be in :hover while the other isn't)
1. Neither element should have an id
1. The tag names should match
1. The class attributes should match
1. The set of mapped attributes must be identical
1. The link states must match
1. The focus states must match
1. Neither element should be affected by attribute selectors, where affected is defined as having any selector match that uses an attribute selector in any position within the selector at all
1. There must be no inline style attribute on the elements
1. There must be no sibling selectors in use at all. WebCore simply throws a global switch when any sibling selector is encountered and disables style sharing for the entire document when they are present. This includes the + selector and selectors like :first-child and :last-child.

### Firefox rule tree

Firefox has two extra trees for easier style computation: the rule tree and style context tree.
WebKit also has style objects but they are not stored in a tree like the style context tree, only the DOM node points to its relevant style.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/qnms42muTKM1KVUarpVH.png" alt="Firefox style context tree." width="640" height="407" />
  <figcaption>Figure 14: Firefox style context tree.</figcaption>
</figure>

The style contexts contain end values. The values are computed by applying all the matching rules in the correct order and performing manipulations that transform them from logical to concrete values. For example, if the logical value is a percentage of the screen it will be calculated and transformed to absolute units.
The rule tree idea is really clever.  It enables sharing these values between nodes to avoid computing them again.  This also saves space.

All the matched rules are stored in a tree. The bottom nodes in a path have higher priority.
The tree contains all the paths for rule matches that were found.
Storing the rules is done lazily. The tree isn't calculated at the beginning for every node, but whenever a node style needs to be computed the computed paths are added to the tree.

The idea is to see the tree paths as words in a lexicon.
Lets say we already computed this rule tree:

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/RwZNIJLCLZqbH2c9eXXg.png" alt="Computed rule tree" width="400" height="261" />
  <figcaption>Figure 15: Computed rule tree.</figcaption>
</figure>

Suppose we need to match rules for another element in the content tree, and find out the matched rules (in the correct order) are B-E-I. We already have this path in the tree because we already computed path  A-B-E-I-L. We will now have less work to do.

Let's see how the tree saves us work.

### Division into structs

The style contexts are divided into structs. Those structs contain style information for a certain category like border or color. All the properties in a struct are either inherited or non inherited. Inherited properties are properties that unless defined by the element, are inherited from its parent. Non inherited properties (called "reset" properties) use default values if not defined.

The tree helps us by caching entire structs (containing the computed end values) in the tree. The idea is that if the bottom node didn't supply a definition for a struct, a cached struct in an upper node can be used.

### Computing the style contexts using the rule tree

When computing the style context for a certain element, we first compute a path in the rule tree or use an existing one.
We then begin to apply the rules in the path to fill the structs in our new style context. We start at the bottom node of the path - the one with the highest precedence (usually the most specific selector) and traverse the tree up until our struct is full.
If there is no specification for the struct in that rule node, then we can greatly optimize - we go up the tree until we find a node that specifies it fully and simply point to it - that's the best optimization - the entire struct is shared.
This saves computation of end values and memory.

If we find partial definitions we go up the tree until the struct is filled.

If we didn't find any definitions for our struct then, in case the struct is an "inherited" type, we point to the struct of our parent in the **context tree**. In this case we also succeeded in sharing structs.
If it's a reset struct then default values will be used.

If the most specific node does add values then we need to do some extra calculations for transforming it to actual values.
We then cache the result in the tree node so it can be used by children.

In case an element has a sibling or a brother that points to the same tree node then the **entire style context** can be shared between them.

Lets see an example:
Suppose we have this HTML

```html
<html>
  <body>
    <div class="err" id="div1">
      <p>
        this is a <span class="big"> big error </span>
        this is also a
        <span class="big"> very  big  error</span> error
      </p>
    </div>
    <div class="err" id="div2">another error</div>
  </body>
</html>
```

And the following rules:

```css
div {margin: 5px; color:black}
.err {color:red}
.big {margin-top:3px}
div span {margin-bottom:4px}
#div1 {color:blue}
#div2 {color:green}
```

To simplify things let's say we need to fill out only two structs: the color struct and the margin struct.
The color struct contains only one member: the color
The margin struct contains the four sides.

The resulting rule tree will look like this (the nodes are marked with the node name: the number of the rule they point at):

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/zJM11a5O0t2C91bXl8wS.png" alt="The rule tree" width="500" height="294" />
  <figcaption>Figure 16: The rule tree</figcaption>
</figure>

The context tree will look like this (node name: rule node they point to):

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/3QoZ4kD7dDBR6HYobs4w.png" alt="The context tree." width="400" height="305" />
  <figcaption>Figure 17: The context tree</figcaption>
</figure>

Suppose we parse the HTML and get to the second `<div>` tag. We need to create a style context for this node and fill its style structs.

We will match the rules and discover that the matching rules for the `<div>` are 1, 2 and 6.
This means there is already an existing path in the tree that our element can use and we just need to add another node to it for rule 6 (node F in the rule tree).

We will create a style context and put it in the context tree.  The new style context will point to node F in the rule tree.

We now need to fill the style structs. We will begin by filling out the margin struct.
Since the last rule node (F) doesn't add to the margin struct, we can go up the tree until we find a cached struct computed in a previous node insertion and use it.
We will find it on node B, which is the uppermost node that specified margin rules.

We do have a definition for the color struct, so we can't use a cached struct.
Since color has one attribute we don't need to go up the tree to fill other attributes.
We will compute the end value (convert string to RGB etc) and cache the computed struct on this node.

The work on the second `<span>` element is even easier. We will match the rules and come to the conclusion that it points to rule G, like the previous span.
Since we have siblings that point to the same node, we can share the entire style context and just point to the context of the previous span.

For structs that contain rules that are inherited from the parent, caching is done on the context tree (the color property is actually inherited, but Firefox treats it as reset and caches it on the rule tree).

For instance if we added rules for fonts in a paragraph:

```css
p {font-family: Verdana; font size: 10px; font-weight: bold}
```

Then the paragraph element, which is a child of the div in the context tree, could have shared the same font struct as his parent. This is if no font rules were specified for the paragraph.

In WebKit, who does not have a rule tree, the matched declarations are traversed four times. First non-important high priority properties are applied (properties that should be applied first because others depend on them, such as display), then high priority important, then normal priority non-important, then normal priority important rules.
This means that properties that appear multiple times will be resolved according to the correct cascade order. The last wins.

So to summarize: sharing the style objects (entirely or some of the structs inside them) solves issues 1 and 3. The Firefox rule tree also helps in applying the properties in the correct order.

### Manipulating the rules for an easy match

There are several sources for style rules:

1. CSS rules, either in external style sheets or in style elements.
    ```css
    p {color: blue}
    ```
1. Inline style attributes like
    ```html
    <p style="color: blue" />
    ```
1. HTML visual attributes (which are mapped to relevant style rules)
    ```html
    <p bgcolor="blue" />
    ```
The last two are easily matched to the element since he owns the style attributes and HTML attributes can be mapped using the element as the key.

As noted previously in issue #2, the CSS rule matching can be trickier.
To solve the difficulty, the rules are manipulated for easier access.

After parsing the style sheet, the rules are added to one of several hash maps, according to the selector.
There are maps by id, by class name, by tag name and a general map for anything that doesn't fit into those categories.
If the selector is an id, the rule will be added to the id map, if it's a class it will be added to the class map etc.

This manipulation makes it much easier to match rules. There is no need to look in every declaration: we can extract the relevant rules for an element from the maps.
This optimization eliminates 95+% of the rules, so that they need not even be considered during the matching process(4.1).

Let's see for example the following style rules:

```css
p.error {color: red}
#messageDiv {height: 50px}
div {margin: 5px}
```

The first rule will be inserted into the class map. The second into the id map and the third into the tag map.

For the following HTML fragment;

```html
<p class="error">an error occurred</p>
<div id=" messageDiv">this is a message</div>
```

We will first try to find rules for the p element. The class map will contain an "error" key under which the rule for "p.error" is found.
The div element will have relevant rules in the id map (the key is the id) and the tag map.
So the only work left is finding out which of the rules that were extracted by the keys really match.

For example if the rule for the div was

```css
table div {margin: 5px}
```

it will still be extracted from the tag map, because the key is the rightmost selector, but it would not match our div element, who does not have a table ancestor.

Both WebKit and Firefox do this manipulation.

### Applying the rules in the correct cascade order

The style object has properties corresponding to every visual attribute (all CSS attributes but more generic).
If the property is not defined by any of the matched rules, then some properties can be inherited by the parent element style object. Other properties have default values.

The problem begins when there is more than one definition - here comes the cascade order to solve the issue.

### Style sheet cascade order

A declaration for a style property can appear in several style sheets, and several times inside a style sheet.
This means the order of applying the rules is very important. This is called the "cascade" order.
According to CSS2 spec, the cascade order is (from low to high):

1. Browser declarations
1. User normal declarations
1. Author normal declarations
1. Author important declarations
1. User important declarations

The browser declarations are least important and the user overrides the author only if the declaration was marked as important.
Declarations with the same order will be sorted by [specificity](#specificity) and then the order they are specified.
The HTML visual attributes are translated to matching CSS declarations . They are treated as author rules with low priority.

### Specificity

The selector specificity is defined by the [CSS2 specification](http://www.w3.org/TR/CSS2/cascade.html#specificity) as follows:

1. count 1 if the declaration it is from is a 'style' attribute rather than a rule with a selector, 0 otherwise (= a)
1. count the number of ID attributes in the selector (= b)
1. count the number of other attributes and pseudo-classes in the selector (= c)
1. count the number of element names and pseudo-elements in the selector (= d) 

Concatenating the four numbers a-b-c-d (in a number system with a large base) gives the specificity.

The number base you need to use is defined by the highest count you have in one of the categories.

For example, if a=14 you can use hexadecimal base.  In the unlikely case where a=17 you will need a 17 digits number base.
The later situation can happen with a selector like this:
html body div div p… (17 tags in your selector… not very likely).

Some examples:
```css
 *             {}  /* a=0 b=0 c=0 d=0 -> specificity = 0,0,0,0 */
 li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
 li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
 ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
 h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
 ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
 li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
 #x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
 style=""          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */
```

### Sorting the rules

After the rules are matched, they are sorted according to the cascade rules.
WebKit uses bubble sort for small lists and merge sort for big ones.
WebKit implements sorting by overriding the ">" operator for the rules:

```css
static bool operator >(CSSRuleData& r1, CSSRuleData& r2)
{
    int spec1 = r1.selector()->specificity();
    int spec2 = r2.selector()->specificity();
    return (spec1 == spec2) : r1.position() > r2.position() : spec1 > spec2;
}
```

### Gradual process

WebKit uses a flag  that marks if all top level style sheets (including @imports) have been loaded.
If the style is not fully loaded when attaching, place holders are used and it is marked in the document, and they will be recalculated once the style sheets were loaded.

## Layout

When the renderer is created and added to the tree, it does not have a position and size. Calculating these values is called layout or reflow.

HTML uses a flow based layout model, meaning that most of the time it is possible to compute the geometry in a single pass. Elements later "in the flow" typically do not affect the geometry of elements that are earlier "in the flow", so layout can proceed left-to-right, top-to-bottom through the document. There are exceptions: for example, HTML tables may require more than one pass.

The coordinate system is relative to the root frame.  Top and left coordinates are used.

Layout is a recursive process.  It begins at the root renderer, which corresponds to the `<html>` element of the HTML document. Layout continues recursively through some or all of the frame hierarchy, computing geometric information for each renderer that requires it.

The position of the root renderer is 0,0 and its dimensions are the viewport - the visible part of the browser window.

All renderers have a "layout" or "reflow" method, each renderer invokes the layout method of its children that need layout.

### Dirty bit system

In order not to do a full layout for every small change, browsers use a "dirty bit" system.
A renderer that is changed or added marks itself and its children as "dirty": needing layout.

There are two flags: "dirty", and "children are dirty" which means that although the renderer itself may be OK, it has at least one child that needs a layout.

### Global and incremental layout

Layout can be triggered on the entire render tree - this is "global" layout.
This can happen as a result of:

1. A global style change that affects all renderers, like a font size change.
1. As a result of a screen being resized

Layout can be incremental, only the dirty renderers will be laid out (this can cause some damage which will require extra layouts).

Incremental layout is triggered (asynchronously) when renderers are dirty. For example when new renderers are appended to the render tree after extra content came from the network and was added to the DOM tree.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/pjIcQqbVvJPryLtHpefc.png" alt="Incremental layout." width="326" height="341" />
  <figcaption>Figure 18: Incremental layout - only dirty renderers and their children are laid out (<a href="#3_6">3.6</a>)</figcaption>
</figure>

### Asynchronous and Synchronous layout

Incremental layout is done asynchronously. Firefox queues "reflow commands" for incremental layouts and a scheduler triggers batch execution of these commands.
WebKit also has a timer that executes an incremental layout - the tree is traversed and "dirty" renderers are layout out.

Scripts asking for style information, like "offsetHeight" can trigger incremental layout synchronously.

Global layout will usually be triggered synchronously.

Sometimes layout is triggered as a callback after an initial layout because some attributes, like the scrolling position changed.

### Optimizations

When a layout is triggered by a "resize" or a change in the renderer position(and not size), the renders sizes are taken from a cache and not recalculated…

In some cases only a sub tree is modified and layout does not start from the root. This can happen in cases where the change is local and does not affect its surroundings - like text inserted into text fields (otherwise every keystroke would trigger a layout starting from the root).

### The layout process

The layout usually has the following pattern:

1. Parent renderer determines its own width.
1. Parent goes over children and:
    1. Place the child renderer (sets its x and y).
    1. Calls child layout if needed - they are dirty or we are in a global layout, or for some other reason - which calculates the child's height.
1. Parent uses children's accumulative heights and the heights of margins and padding to set its own height - this will be used by the parent renderer's parent.
1. Sets its dirty bit to false.

Firefox uses a "state" object(nsHTMLReflowState) as a parameter to layout (termed "reflow"). Among others the state includes the parents width.

The output of the Firefox layout is a "metrics" object(nsHTMLReflowMetrics). It will contain the renderer computed height.

### Width calculation

The renderer's width is calculated using the container block's width, the renderer's style "width" property, the margins and borders.

For example the width of the following div:

```html
<div style="width: 30%"/>
```
Would be calculated by WebKit as the following(class RenderBox method calcWidth):

- The container width is the maximum of the containers availableWidth and 0.
The availableWidth in this case is the contentWidth which is calculated as:

```css
clientWidth() - paddingLeft() - paddingRight()
```

clientWidth and clientHeight represent the interior of an object
excluding border and scrollbar.

- The elements width is the "width" style attribute.
It will be calculated as an absolute value by computing the percentage of the container width.

- The horizontal borders and paddings are now added.

So far this was the calculation of the "preferred width".
Now the minimum and maximum widths will be calculated.

If the preferred width is greater then the maximum width, the maximum width is used.
If it is less then the minimum width (the smallest unbreakable unit) then the minimum width is used.

The values are cached in case a layout is needed, but the width does not change.

### Line Breaking

When a renderer in the middle of a layout decides that it needs to break, the renderer stops and propagates to the layout's parent that it needs to be broken.
The parent creates the extra renderers and calls layout on them.

## Painting

In the painting stage, the render tree is traversed and the renderer's "paint()" method is called to display content on the screen.
Painting uses the UI infrastructure component.

### Global and Incremental

Like layout, painting can also be global - the entire tree is painted - or incremental.
In incremental painting, some of the renderers change in a way that does not affect the entire tree.
The changed renderer invalidates its rectangle on the screen.
This causes the OS to see it as a "dirty region" and generate a "paint" event.
The OS does it cleverly and coalesces several regions into one.
In Chrome it is more complicated because the renderer is in a different process then the main process. Chrome simulates the OS behavior to some extent.
The presentation listens to these events and delegates the message to the render root.  The tree is traversed until the relevant renderer is reached. It will repaint itself (and usually its children).

### The painting order

[CSS2 defines the order of the painting process](http://www.w3.org/TR/CSS21/zindex.html).
This is actually the order in which the elements are stacked in the [stacking contexts](#stackingcontext). This order affects painting since the stacks are painted from back to front.
The stacking order of a block renderer is:

1. background color
1. background image
1. border
1. children
1. outline

### Firefox display list

Firefox goes over the render tree and builds a display list for the painted rectangular.
It contains the renderers relevant for the rectangular, in the right painting order (backgrounds of the renderers, then borders etc).

That way the tree needs to be traversed only once for a repaint instead of several times - painting all backgrounds, then all images, then all borders etc.

Firefox optimizes the process by not adding elements that will be hidden, like elements completely beneath other opaque elements.

#### WebKit rectangle storage
Before repainting, WebKit saves the old rectangle as a bitmap.
It then paints only the delta between the new and old rectangles.

### Dynamic changes

The browsers try to do the minimal possible actions in response to a change.
So changes to an element's color will cause only repaint of the element.
Changes to the element position will cause layout and repaint of the element, its children and possibly siblings.
Adding a DOM node will cause layout and repaint of the node.
Major changes, like increasing font size of the "html" element, will cause invalidation of caches, relayout and repaint of the entire tree.

### The rendering engine's threads

The rendering engine is single threaded. Almost everything, except network operations, happens in a single thread.
In Firefox and Safari this is the main thread of the browser. In Chrome it's the tab process main thread.

Network operations can be performed by several parallel threads. The number of parallel connections is limited (usually 2 - 6 connections).

### Event loop

The browser main thread is an event loop.
It's an infinite loop that keeps the process alive. It waits for events (like layout and paint events) and processes them.
This is Firefox code for the main event loop:

```js
while (!mExiting)
    NS_ProcessNextEvent(thread);
```

## CSS2 visual model

### The canvas

According to the [CSS2 specification](http://www.w3.org/TR/CSS21/intro.html#processing-model),
the term canvas describes "the space where the formatting structure is rendered": where the browser paints the content.

The canvas is infinite for each dimension of the space but browsers choose an initial width based on the dimensions of the viewport.

According to [www.w3.org/TR/CSS2/zindex.html](http://www.w3.org/TR/CSS2/zindex.html),
the canvas is transparent if contained within another, and given a browser defined color if it is not.

### CSS Box model

The [CSS box model](http://www.w3.org/TR/CSS2/box.html) describes the rectangular boxes that are generated for elements in the document tree and laid out according to the visual formatting model.

Each box has a content area (e.g. text, an image, etc.) and optional surrounding padding, border, and margin areas.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/KbqHxGe3HMLM5BbXMcP8.jpg" alt="CSS2 box model" width="509" height="348" />
  <figcaption>Figure 19: CSS2 box model</figcaption>
</figure>

Each  node generates 0…n such boxes.

All elements have a "display" property that determines the type of box that will be generated.

Examples:

```markup
block: generates a block box.
inline: generates one or more inline boxes.
none: no box is generated.
```

The default is inline but the browser style sheet may set other defaults.
For example: the default display for the "div" element is block.

You can find a default style sheet example here: [www.w3.org/TR/CSS2/sample.html](http://www.w3.org/TR/CSS2/sample.html).

### Positioning scheme

There are three schemes:

1. Normal: the object is positioned according to its place in the document. This means its place in the render tree is like its place in the DOM tree and laid out according to its box type and dimensions
1. Float: the object is first laid out like normal flow, then moved as far left or right as possible
1. Absolute: the object is put in the render tree in a different place than in the DOM tree

The positioning scheme is set by the "position" property and the "float" attribute.

- static and relative cause a normal flow
- absolute and fixed cause absolute positioning

In static positioning no position is defined and the default positioning is used.
In the other schemes, the author specifies the position: top, bottom, left, right.

The way the box is laid out is determined by:

- Box type
- Box dimensions
- Positioning scheme
- External information such as image size and the size of the screen

### Box types

Block box: forms a block - has its own rectangle in the browser window.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/fvhwoy1W1Se7IY4XyiXp.png" alt="Block box." width="150" height="127" />
  <figcaption>Figure 20: Block box</figcaption>
</figure>

Inline box: does not have its own block, but is inside a containing block.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/srPz5klZnpr6j5edpV45.png" alt="Inline boxes." width="300" height="233" />
  <figcaption>Figure 21: Inline boxes</figcaption>
</figure>

Blocks are formatted vertically one after the other.
Inlines are formatted horizontally.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/8i6bZtuslRR3kJdsST6p.png" alt="Block and Inline formatting." width="350" height="324" />
  <figcaption>Figure 22: Block and Inline formatting</figcaption>
</figure>

Inline boxes are put inside lines or "line boxes".
The lines are at least as tall as the tallest box but can be taller, when the boxes are aligned "baseline" - meaning the bottom part of an element is aligned at a point of another box other then the bottom.
If the container width is not enough, the inlines will be put on several lines.
This is usually what happens in a paragraph.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/xChsrrYLPU7MfekdR7zS.png" alt="Lines." width="400" height="277" />
  <figcaption>Figure 23: Lines</figcaption>
</figure>

### Positioning

#### Relative

Relative positioning - positioned like usual and then moved by the required delta.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/C1rUmDaOa8kGRx1PSdUu.png" alt="Relative positioning." width="500" height="261" />
  <figcaption>Figure 24: Relative positioning</figcaption>
</figure>

#### Floats

A float box is shifted to the left or right of a line. The interesting feature is that the other boxes flow around it.
The HTML:

```html
<p>
  <img style="float: right" src="images/image.gif" width="100" height="100">
  Lorem ipsum dolor sit amet, consectetuer...
</p>
```

Will look like:

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/ozqqfqboQ0IJJWlv5xXx.png" alt="Float." width="444" height="203" />
  <figcaption>Figure 25: Float</figcaption>
</figure>

#### Absolute and fixed

The layout is defined exactly regardless of the normal flow. The element does not participate in the normal flow.
The dimensions are relative to the container.
In fixed, the container is the viewport.

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/0xwOrAiWm2kpuCecsRv1.png" alt="Fixed positioning." width="500" height="343" />
  <figcaption>Figure 26: Fixed positioning</figcaption>
</figure>

:::info
The fixed box will not move even when the document is scrolled!
:::

### Layered representation

This is specified by the z-index CSS property.
It represents the third dimension of the box: its position along the "z axis".

The boxes are divided into stacks (called stacking contexts).
In each stack the back elements will be painted first and the forward elements on top, closer to the user.  In case of overlap the foremost element will hide the former element.

The stacks are ordered according to the z-index property.
Boxes with "z-index" property form a local stack.
The viewport has the outer stack.

Example:

```html
<style type="text/css">
  div {
    position: absolute;
    left: 2in;
    top: 2in;
  }
</style>

<p>
  <div
    style="z-index: 3;background-color:red; width: 1in; height: 1in; ">
  </div>
  <div
    style="z-index: 1;background-color:green;width: 2in; height: 2in;">
  </div>
</p>
```

The result will be this:

<figure align="center">
  <img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/EXneyo5lwaJ6g09BuCo6.png" alt="Fixed positioning." width="254" height="227" />
  <figcaption>Figure 27: Fixed positioning</figcaption>
</figure>

Although the red div precedes the green one in the markup, and would have been painted before in the regular flow, the z-index property is higher, so it is more forward in the stack held by the root box.

## Resources

1. Browser architecture
    1. Grosskurth, Alan.  [A Reference Architecture for Web Browsers (pdf)](http://grosskurth.ca/papers/browser-refarch.pdf)
    1. Gupta, Vineet. [How Browsers Work - Part 1 - Architecture](http://www.vineetgupta.com/2010/11/how-browsers-work-part-1-architecture/)

1. Parsing
    1. Aho, Sethi, Ullman, Compilers: Principles, Techniques, and Tools (aka the "Dragon book"), Addison-Wesley, 1986
    1. Rick Jelliffe. [The Bold and the Beautiful: two new drafts for HTML 5.](http://broadcast.oreilly.com/2009/05/the-bold-and-the-beautiful-two.html)

1. Firefox
    1. L. David Baron, [Faster HTML and CSS: Layout Engine Internals for Web Developers.](http://dbaron.org/talks/2008-11-12-faster-html-and-css/slide-6.xhtml)
    1. L. David Baron, [Faster HTML and CSS: Layout Engine Internals for Web Developers (Google tech talk video)](https://www.youtube.com/watch?v=a2_6bGNZ7bA)
    1. L. David Baron, [Mozilla's Layout Engine](http://www.mozilla.org/newlayout/doc/layout-2006-07-12/slide-6.xhtml)
    1. L. David Baron, [Mozilla Style System Documentation](http://www.mozilla.org/newlayout/doc/style-system.html)
    1. Chris Waterson, [Notes on HTML Reflow](http://www.mozilla.org/newlayout/doc/reflow.html)
    1. Chris Waterson, [Gecko Overview](http://www.mozilla.org/newlayout/doc/gecko-overview.htm)
    1. Alexander Larsson, [The life of an HTML HTTP request](https://developer.mozilla.org/en/The_life_of_an_HTML_HTTP_request)

1. WebKit
    1. David Hyatt, [Implementing CSS(part 1)](http://weblogs.mozillazine.org/hyatt/archives/cat_safari.html)
    1. David Hyatt, [An Overview of WebCore](http://weblogs.mozillazine.org/hyatt/WebCore/chapter2.html)
    1. David Hyatt, [WebCore Rendering](http://webkit.org/blog/114/)
    1. David Hyatt, [The FOUC Problem](http://webkit.org/blog/66/the-fouc-problem/)

1. W3C Specifications
    1. [HTML 4.01 Specification](http://www.w3.org/TR/html4/)
    1. [W3C HTML5 Specification](http://dev.w3.org/html5/spec/Overview.html)
    1. [Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification](http://www.w3.org/TR/CSS2/)

1. Browsers build instructions
    1. Firefox. [https://developer.mozilla.org/Build_Documentation](https://developer.mozilla.org/Build_Documentation)
    1. WebKit. [http://webkit.org/building/build.html](http://webkit.org/building/build.html)

:::info
<img src="https://web-dev.imgix.net/image/T4FyVKpzu4WKF1kBNvXepbi08t52/V3imNwHh9VNaDmFpXRnC.png" alt="Tali Garsiel" width="150" height="150" style={{float: "left", padding: "0 1rem 0 0"}}/>

[Tali Garsiel](http://taligarsiel.com/) is a developer in Israel. She started as a web developer in 2000, and became aquainted with Netscape's "evil" layer model. Just like Richard Feynmann, she had a fascination for figuring out how things work so she began digging into browser internals and documenting what she found. Tali also has published a short [guide on client-side performance](http://taligarsiel.com/ClientSidePerformance.html). 
:::

### Translations

This page has been translated into Japanese, twice! [How Browsers Work - Behind the Scenes of Modern Web Browsers (ja)](http://cou929.nu/docs/how-browsers-work/) by [@_kosei_](https://twitter.com/#!/_kosei_) and also [ブラウザってどうやって動いてるの？（モダンWEBブラウザシーンの裏側](http://shanon-tech.blogspot.com/2011/09/web.html) by [@ikeike443](https://twitter.com/#!/ikeike443) and [@kiyoto01](https://twitter.com/#!/kiyoto01).

You can view the externally hosted translations of [Korean](http://helloworld.naver.com/helloworld/59361) and [Turkish](http://sonsuzdongu.com/blog/tarayicilar-nasil-calisir-modern-web-tarayicilarin-perde-arkasi-cevirisi) as well.

Thanks everyone!