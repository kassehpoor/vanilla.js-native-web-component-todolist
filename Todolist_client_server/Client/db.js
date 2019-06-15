var db = (function () {
    //   MODEL_KEY = 'USER_MODEL',
    allModels = [];
         USER_KEY = 'USER';
 
     return {
         getModel: getModelFromLocalStorage,
         setModel: setModelToLocalStorage,
         getUser: getUserFromLocalStorage,
         setUser: setUserToLocalStorage,
     };
 
     function getModelFromLocalStorage(userId) {
         var model = JSON.parse(localStorage.getItem('USER_MODEL')) || {};
         var userModel = model[userId];
         if (!userModel) return null;
         return userModel;
     };
 
     function setModelToLocalStorage(userId,userModel) {
         !userModel && (userModel = {});
         var model = JSON.parse(localStorage.getItem('USER_MODEL'))|| {};
         model[userId] = userModel; 
         localStorage.setItem('USER_MODEL', JSON.stringify(model));
     };
 
     function getUserFromLocalStorage() {
         var user = localStorage.getItem(USER_KEY);
         if (!user) return null;
         return JSON.parse(user);
     }
 
     function setUserToLocalStorage(user) {
         if (!user) {
             return localStorage.removeItem(USER_KEY);
         }
         localStorage.setItem(USER_KEY, JSON.stringify(user));
     }
 
 }())