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
         var userModel = JSON.parse(localStorage.getItem('USER_MODEL'))[userId];
         if (!userModel) return null;
         return userModel;
     };
 
     function setModelToLocalStorage(userModel) {
         !userModel && (userModel = {});
         var userId = userModel.userId;
         var userModel =  JSON.parse(localStorage.getItem('USER_MODEL'))[userId];
         var allModels = JSON.parse(localStorage.getItem('USER_MODEL'));
         allModels[userId] = userModel;
         localStorage.setItem('USER_MODEL', JSON.stringify(allModels));
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