---
layout: post
title: My first dataset
image:
---

Hello, world!

My name is Daniel Jaouen and I am a student in Lambda School's part time Data
Science program. I am excited to have this opportunity to learn Data Science
and I look forward to updating all of you on my progress as I progress through
the course.

Our first assignment was to help get us a broad overview of the associated
libraries (i.e., pandas, numpy, and matplotlib). For this assignment, I chose
the following data set:
https://www.kaggle.com/rush4ratio/video-game-sales-with-ratings As a long-time
gamer, this data set piqued my interest. In particular, I would like to (down
the road) predict a game's global sales based on user and critic ratings.

However, for now, I just cleaned up the user rating feature (by removing 'NA'
and 'tbd' values from the data frame), converted the column to numeric by using
pandas' `to_numeric` function, and then classified the data into "high",
"medium", and "low" score rankings. See the image below.

![classification](https://dcj24-storage.s3.amazonaws.com/lambda/images/download.png
"Classifying Video Games Based on Ratings")

Even though it's still early in the course, I've already learned a lot through
the first lecture as well as the precourse work. Anyway, I hope you enjoyed
this post and I will see you next time!
