---
layout: post
title: Predicting Global Video Game Sales With a Linear Regression Model
image:
---

Welcome back! It's currently the end of week 3 of my Lambda School journey and
I thought I'd provide an update on the data set [we used two weeks
ago](https://www.kaggle.com/rush4ratio/video-game-sales-with-ratings). This
week, we'll look at some additional visualizations of the data plus a simple
linear regression model (which uses some of the pre-course work for the
course).

First, let's clean up the data a bit.

```
video_game_ratings = video_game_ratings.dropna(subset=['User_Score', 'Critic_Score', 'Year_of_Release'])
video_game_ratings = video_game_ratings[video_game_ratings['User_Score'] != 'tbd']
video_game_ratings['User_Score_Numeric'] = pd.to_numeric(video_game_ratings['User_Score'])
video_game_ratings['Critic_Score_Numeric'] = pd.to_numeric(video_game_ratings['Critic_Score'])
```

Next, let's look at some scatterplots to see if we can identify a relationship
between the variables we are interested in.

![user_score](https://dcj24-storage.s3.amazonaws.com/lambda/images/user_score.png
"Global Sales by User Score")

![critic_score](https://dcj24-storage.s3.amazonaws.com/lambda/images/critic_score.png
"Global Sales by Critic Score")

We see that there is a slight positive relationship between user and critic
scores and global sales. This is what we would expect.

Before we actually do the linear regression, let's be sure to check for
correlations between our two variables.

![user_score_by_critic_score](https://dcj24-storage.s3.amazonaws.com/lambda/images/critic_score_user_score.png
"User Score by Critic Score")

It looks like there is a pronounced positive correlation between user score and
critic score (which is what we would expect). We can confirm this by calling
`.corr()` on the required feature set:

![corr](https://dcj24-storage.s3.amazonaws.com/lambda/images/corr.png
"Correlation between Critic Score and User Score")

Since we don't want to do a multiple linear regression with correlated
features, we'll do individual regressions of global sales on both critic score
and user score.

For a regression on user score, we get a `beta_0` of `-0.11201624` and a
`beta_1` of `0.01213527`. For our training data, we get a mean absolute error
of `0.762`, while for our test data, we get a mean absolute error of `0.8202`.

For a regression on critic score, we get a `beta_0` of `-1.54676995` and a
`beta_1` of `0.03283348`. For our training data, we get a mean absolute error
of `0.745`, while for our test data, we get a mean absolute error of `0.8095`.

We see from our models that there is (as expected) a positive relationship
between both critic and user scores and global sales. We also notice that
critic score is the better predictor of the two features.

And that's it! You can find the completed Google Colab notebook
[here](https://colab.research.google.com/drive/1Jq1QLC9x7PoovRdJbLKi_Pj_pm9l-6No).
Hope you enjoyed this dive into simple linear regression. See you next time!
