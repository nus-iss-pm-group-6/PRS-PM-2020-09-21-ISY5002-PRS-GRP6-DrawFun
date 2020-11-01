## SECTION 1 : DrawFun
## DrawFun

![img-ph](https://picsum.photos/id/137/600/400.jpg)

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
| LIN Ying Lin | A0215298X | xxxxxxxxxx yyyyyyyyyy zzzzzzzzzz| anitalyl22@gmail.com |
| SONG Bing Heng | A0215496X | xxxxxxxxxx yyyyyyyyyy zzzzzzzzzz| songbingheng17@foxmail.com |
| XIONG Hui | A0215431U | xxxxxxxxxx yyyyyyyyyy zzzzzzzzzz| ArlenaXiong@gmail.com |
| ZUO Zong Yuan | A0215291L | xxxxxxxxxx yyyyyyyyyy zzzzzzzzzz| eternalphane@gmail.com |

---

## SECTION 4 : VIDEO OF SYSTEM MODELLING & USE CASE DEMO

[![Sudoku AI Solver](http://img.youtube.com/vi/-AiYLUjP6o8/0.jpg)](https://youtu.be/-AiYLUjP6o8 "Sudoku AI Solver")

Note: It is not mandatory for every project member to appear in video presentation; Presentation by one project member is acceptable. 
More reference video presentations [here](https://telescopeuser.wordpress.com/2018/03/31/master-of-technology-solution-know-how-video-index-2/ "video presentations")

---

## SECTION 5 : USER GUIDE

`Refer to appendix <Installation & User Guide> in project report at Github Folder: ProjectReport`

### [ 1 ] To run the system using iss-vm

> download pre-built virtual machine from http://bit.ly/iss-vm

> start iss-vm

> open terminal in iss-vm

> $ git clone https://github.com/telescopeuser/Workshop-Project-Submission-Template.git

> $ source activate iss-env-py2

> (iss-env-py2) $ cd Workshop-Project-Submission-Template/SystemCode/clips

> (iss-env-py2) $ python app.py

> **Go to URL using web browser** http://0.0.0.0:5000 or http://127.0.0.1:5000

### [ 2 ] To run the system in other/local machine:
### Install additional necessary libraries. This application works in python 2 only.

> $ sudo apt-get install python-clips clips build-essential libssl-dev libffi-dev python-dev python-pip

> $ pip install pyclips flask flask-socketio eventlet simplejson pandas

---
## SECTION 6 : PROJECT REPORT / PAPER

`Refer to project report at Github Folder: ProjectReport`

**Recommended Sections for Project Report / Paper:**
- Executive Summary / Paper Abstract
- Sponsor Company Introduction (if applicable)
- Business Problem Background
- Market Research
- Project Objectives & Success Measurements
- Project Solution (To detail domain modelling & system design.)
- Project Implementation (To detail system development & testing approach.)
- Project Performance & Validation (To prove project objectives are met.)
- Project Conclusions: Findings & Recommendation
- Appendix of report: Project Proposal
- Appendix of report: Mapped System Functionalities against knowledge, techniques and skills of modular courses: MR, RS, CGS
- Appendix of report: Installation and User Guide
- Appendix of report: 1-2 pages individual project report per project member, including: Individual reflection of project journey: (1) personal contribution to group project (2) what learnt is most useful for you (3) how you can apply the knowledge and skills in other situations or your workplaces
- Appendix of report: List of Abbreviations (if applicable)
- Appendix of report: References (if applicable)

---
## SECTION 7 : MISCELLANEOUS

`Refer to Github Folder: Miscellaneous`

### PLACEHOLDER.xlsx
* Results of survey
* Insights derived, which were subsequently used in our system
