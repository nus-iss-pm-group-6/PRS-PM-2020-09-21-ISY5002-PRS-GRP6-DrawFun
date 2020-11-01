## SECTION 1 : DrawFun
## DrawFun

![img-ph](src/assets/img/logo.png)

---

## SECTION 2 : EXECUTIVE SUMMARY / PAPER ABSTRACT
Since childhood, human beings have developed the ability to use stroke-based sketch drawings to reconstruct the real world they see from their eyes and to express their nonrepresentational inner feelings. Nowadays, with the development of AI technology, the machine could think and act in daily routines like humans to some extent, as well as in sketch drawings.  

 

Our team is comprised of 4 members who enjoy drawing in our daily lives. However, it is embarrassing that we often try to draw a stick figure, such as for a cat, and it turns out to be like a dog absurdly. Due to the fact that without systematic learning, not everyone has the talent to draw like professional painters. So, we hope to build a sketch drawings optimization system to help ordinary people to improve their drawings. 

 

DrawFUN is such a fun, artistic and playful system. It can help users to continue their incomplete drawings as well as inspiring their artistic imagination. According to the content drawn by the user, the machine will perform artistic creation in the background, so as to randomly, continuously and creatively generate sketches of the same category for the user's preference. In other words, by using the DrawFUN system to draw, users do not have to start from an extremely blank canvas with their own imagination. Instead, the machine is enabled to provide certain creative samples to the users according to what they are drawing for. 

 

Inspired by the image processing techniques imparted to us in lectures, we build the system based on sketch classification and sketch generation. The programming languages we used are JavaScript and Python. Firstly, we develop a webpage to obtain users’ drawing data from an easy-to-use UI. Then, the RNN (LSTM) model is utilized to identify and classify users’ drawing content into more than three hundred categories, and finally the SketchRNN model is used to automatically generate sketches corresponding to the previous classification results. 



We appreciate this experience of online collaboration, which requires more leadership, self-discipline and time management compared with usual offline group work. We acknowledge that this project is still immature and there are a number of aspects to be improved, but all of us spare no effort to solve every problem we encountered in the process of learning, and contributed to the final complete of the project. 

---

## SECTION 3 : CREDITS / PROJECT CONTRIBUTION

| Official Full Name  | Student ID (MTech Applicable)  | Work Items (Who Did What) | Email (Optional) |
| :------------ |:---------------:| :-----| :-----|
| LIN Ying Lin | A0215298X | As the project designer and planner, I write the final report and the video presentation. I am responsible for the generator module, which using SketchRNN to generate sketch drawings. And I am also contributed to the graphical user interface design. | anitalyl22@gmail.com |
| SONG Bing Heng | A0215496X | <ol type="a"><li>Data collection (Generated pattern collection)</li><li>Back-end development (Flask frame construction, Back-end data processing)</li><li>Model design and training</li><li>Report</li>| songbingheng17@foxmail.com |
| XIONG Hui | A0215431U | What I| ArlenaXiong@gmail.com |
| ZUO Zong Yuan | A0215291L | <ul><li>Design and build a ML model in practical application to solve real-world problems</li><li>Tune a ML model based on its metrics</li><li>Combine what I learnt before with newly obtained knowledges</li><li>Cooperate with my teammates</li></ul>
| eternalphane@gmail.com |

---

## SECTION 4 : VIDEO OF SYSTEM MODELLING & USE CASE DEMO

[![DrawFUN](src/assets/img/logo.png)](Video/DrawFUN.mp4 "DrawFUN")

---

## SECTION 5 : USER GUIDE

`Refer to appendix <Installation & User Guide> in project report at Github Folder: ProjectReport`

* Download the [source file](https://github.com/nus-iss-pm-group-6/IRS-PM-2020-09-21-ISY5002-PRS-GRP6-DrawFun/archive/master.zip), or

* Clone the repository from git:

  $ `git clone https://github.com/nus-iss-pm-group-6/IRS-PM-2020-09-21-ISY5002-PRS-GRP6-DrawFun.git`

* `cd` to the project root directory, run the following command in terminal:

  $ `pip install flask flask_cors`

  $ `npm install`

  $ `npm flask`

  and then the flask server will start

* Open the web browser, go to url http://localhost:5000 or http://127.0.0.1:5000

  Tada! DrawFUN is ready to serve you!

---
## SECTION 6 : PROJECT REPORT / PAPER

[ProjectReport](ProjectReport/Team 6 fianl report.pdf)
