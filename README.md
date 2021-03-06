# Foodie-ReactNative-App

Foodie App is a multiplatform mobile application. As the foundation for this application, I used React Native - a mobile application framework developed by Facebook for building mobile applications in JavaScript that can run at the same speed as native mobile applications. 

* _**Firebase**_ is a real-time database, authentication service, and blob file storage service backed by Google's cloud. The photos I took are stored using blob storage and my authentication is done using Firebase's authentication services. I used Firebase as the complete backend. All of my post data is stored in the database. 

* _**NativeBase**_ is a UI framework that wraps React Native's components and provides several commonly used components like buttons, icons, cards, etc. It allows for an app theme so you can change the look of your application from one file instead of every component. This makes application development faster and the mobile application has a more uniform look. 

* _**MobX**_ is a state management library similar to Redux which is the current de facto state management library. However, unlike Redux, MobX strives to be as simple as possible. It takes care of everything you normally have to write by hand in Redux and does it in an extremely efficient manner. You don't need a bunch of boiler plates or to worry about actions and reducers. MobX handles everything for you. The only thing you need to do is make the data you are storing an observable and the component that is changing that data an observer. MobX takes care of the rest. In my application, I used MobX in conjunction with Firebase to keep my external database and my internal application state in sync. I could make my application just using Firebase. But since most applications use a state management framework, it was a good idea for me to learn one and MobX is the fastest to get started with.  

![](images/1.png)
![](images/2.png)

## Technologies Used
* React Native
* Firebase
* NativeBase
* MobX
* Android Studio, Xcode, VS Code
* iMovie, Adobe Creative Cloud
