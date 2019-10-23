---
layout: post
title: Predicting Global Video Game Sales
image:
---

For my project, I decided to use a Kaggle data set of video game sales. The
goal of the project is to predict global sales based on critic score, critic
count, publisher, platform, etc.

For this project, I decided to lean heavily on Randomized Search Cross
Validation and xgboost's XGBRegressor (using the `mae` `eval_metric`). However,
I first started out with a baseline of the average global sales for the entire
data set. This led me to a baseline `mae` of `0.6605`.

Then after applying a randomized search cross validation to xgboost's
XGBRegressor, I ended up with an `mae` of `0.4875`. This beats the baseline by
`0.173`.

I also plotted the permutation importances of all the used features, which can
be viewed below:

![permutation_importances](https://dcj24-storage.s3.amazonaws.com/lambda/images/permutation-importances.png "Permutation Importances")

That's it.  Thanks for reading!
