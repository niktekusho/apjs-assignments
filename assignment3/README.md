# [To the demo...](./faceAnalytics.html)

# Advanced Programming with JavaScript - Assignment 3

The assignment for this module is to use the Face API from Microsoft Cognitive Services to determine the age and gender of face images.
Before beginning this assignment, make sure you obtain a free Face API Key from Microsoft Cognitive Services. You will need to use the API key to complete the assignment.

Note: If you do not wish to sign up for an API Key from Microsoft Cognitive Services you may use the following keys for the purposes of this course. The following API Keys are not guaranteed to work if too many students use up the free trial usage allowance.

Face API Keys: 

023f1661f6244d3e9f81501646ef9a0f

17a26f2fbc9240aebfb272df98928812

Text Analytics API Keys: 

8e9100485bab4a7a8b3b261626e7e3c6

7e3029df2246402ebd81c3b480eb813b

![Assignment demo][https://prod-edxapp.edx-cdn.org/assets/courseware/v1/47ec1354bad33287874cbe5f2617d0bb/asset-v1:Microsoft+DEV234x+1T2018+type@asset+block/face_full_demo.gif]

The user should see the following:
1.  An application title
2.  A section labeled "Enter Image URL" that includes an input field and a button labeled "Analyse".
3.  A section labeled "Image" that displays the image of the provided URL
4.  A section labeled "Attributes" that displays the age and gender of the image provided

The user should be able to do the following:
1.  Populate the Image Section with the provided URL image by pressing the Analyse button and providing an image URL.
2.  Populate the Attributes Section with the age and gender of the analyzed image by pressing the Analyse button and providing an image URL. If the image does not contain a face, the attributes section should show "No Faces Detected".
