import { Component } from "react";
import axios from "axios";

class ApiRoutes extends Component {
  constructor() {
    super();
    this.state = {
      // route: "http://localhost:3010", //localhost
      // route: 'https://bizweb-israel.up.railway.app' //server
      route: 'https://bizweb-server.onrender.com' //server
    };
  }

  // Login Page
  async login(email, password) {
    return await axios
      .post(`${this.state.route}/api/auth/login`, {
        email: email,
        password: password,
      })
      .then((response) => response);
  }

  async fastLogin(token) {
    return await axios
      .get(`${this.state.route}/api/auth/fast-login`, {
        headers: { Authorization: token },
      })
      .then((response) => response);
  }

  async getUserInfo(token) {
    return await axios
      .get(`${this.state.route}/api/users`, {
        headers: { Authorization: token },
      })
      .then((response) => response);
  }

  // Forgot Password Page
  async ForgotPassword(email) {
    return await axios
      .post(`${this.state.route}/api/auth/forgot-password`, { email: email })
      .then((response) => response);
  }

  // Forgot Password Page
  async ResetPassword(id, token, password) {
    return await axios
      .post(`${this.state.route}/api/auth/reset-password/${id}/${token}`, {
        password: password,
      })
      .then((response) => response);
  }

  // Register Page
  async register(user) {
    return await axios
      .post(`${this.state.route}/api/auth/register`, user)
      .then((response) => response);
  }

  //MyApointment & MyShoppingCart & Calender Page

  async deleteEventFromCalender(token, appointment) {
    return await axios
      .delete(`${this.state.route}/api/calender/delete-event`, {
        headers: { Authorization: token },
        data: appointment,
      })
      .then((response) => response);
  }

  async deleteEventFromMyAppointments(token, eventID) {
    return axios
      .delete(`${this.state.route}/api/users/delete-appointment`, {
        headers: { Authorization: token },
        data: eventID,
      })
      .then((response) => response);
  }

  async addAvailableHour(token, appointment) {
    return await axios
      .post(`${this.state.route}/api/calender/add-hours`, appointment, {
        headers: { Authorization: token },
      })
      .then((response) => response);
  }

  //Quick appointment Page
  async findQuickAppointment(business) {
    return await axios
      .post(`${this.state.route}/api/business/home/quickappointment`, business)
      .then((response) => response);
  }

  //My Business Page
  async deleteBusiness(token, businessID) {
    return await axios
      .delete(`${this.state.route}/api/business/delete`, {
        headers: { Authorization: token },
        data: { businessID: businessID },
      })
      .then((response) => response);
  }

  //Edit Business Page
  async updateDetailsOfBusiness(id, updatedDetails, token) {
    return await axios
      .put(`${this.state.route}/api/business/${id}`, updatedDetails, {
        headers: { Authorization: token },
      })
      .then((response) => response);
  }

  async getMyBusiness(token) {
    return await axios
      .get(`${this.state.route}/api/users/my-business`, {
        headers: { Authorization: token },
      })
      .then((response) => response);
  }

  // async createOrderPaypal() {
    
  // }

  // New Business Page
  async addNewBusiness(token, business) {
    return await axios
      .post(`${this.state.route}/api/business/add`, business, {
        headers: { Authorization: token },
      })
      .then((response) => response);
  }

  async addBusinessToUser(userID, business) {
    return axios
      .put(`${this.state.route}/api/users/${userID}/business`, business)
      .then((response) => response);
  }

  //BusinessContext Page
  async getAllBusiness() {
    return await axios
      .get(`${this.state.route}/api/business`)
      .then((response) => response);
  }

  //CategoryCard Page
  async addRecordEntry(token, category) {
    return await axios
      .post(`${this.state.route}/api/users/categoryEntry`, category, {
        headers: { Authorization: token },
      })
      .then((response) => response);
  }
  //Top5 Page
  async getTop5() {
    return await axios
      .get(`${this.state.route}/api/business/home/top5`)
      .then((response) => response);
  }

  //Calender Page
  async removeExpiredEvents(id) {
    return await axios
      .delete(`${this.state.route}/api/calender/delete-expired-events`, {
        data: { businessID: id },
      })
      .then((response) => response);
  }

  async getAllEventsOfCalender(id) {
    return await axios
      .post(`${this.state.route}/api/calender/get-events`, { businessID: id })
      .then((response) => response);
  }

  async addNewEvent(appointment) {
    return await axios
      .post(`${this.state.route}/api/calender/create-event`, appointment)
      .then((response) => response);
  }

  async updateEventInMyAppointment(token, appointment) {
    return await axios
      //**FIX TEST ROUTE */
      .put(`${this.state.route}/api/users/new-appointment`, appointment, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  }

  // BigML - Home Page
  async prediction(record) {
    return await axios
      .post(`${this.state.route}/api/users/prediction`, record)
      .then((response) => response.data);
  }

  async trainModel() {
    return await axios
      .get(`${this.state.route}/api/users/trainBigML`)
      .then((response) => response.data);
  }

  //Gallery Page
  async getGallery(id) {
    return await axios
      .get(`${this.state.route}/api/business/${id}/gallery`)
      .then((response) => response.data);
  }

  async addNewImage(id, newImage) {
    return await axios
      .put(`${this.state.route}/api/business/${id}/gallery`, newImage)
      .then((response) => response.data);
  }

  async updateBackgroundImage(id, updatedBackgroundImage) {
    return await axios
      .put(`${this.state.route}/api/business/${id}/background`, {
        backgroundPicture: updatedBackgroundImage,
      })
      .then((response) => response.data);
  }

  async removeImageFromGallery(id, removeImage) {
    return await axios
      .delete(`${this.state.route}/api/business/${id}/gallery`, {
        data: { id: removeImage },
      })
      .then((response) => response.data);
  }

  //Reviews Page
  async getAllReviews(id) {
    return await axios
      .get(`${this.state.route}/api/business/${id}/reviews`)
      .then((response) => response);
  }

  async addNewReview(id, newReview) {
    return await axios
      .put(`${this.state.route}/api/business/${id}/reviews`, newReview)
      .then((response) => response.data);
  }

  async removeReview(id, reviewID) {
    return await axios.delete(
      `${this.state.route}/api/business/${id}/reviews`,
      { data: { id: reviewID } }
    );
  }

  //Shop & MyShoppingCart Page
  async addNewProduct(token, id, newProduct) {
    return await axios
      .put(`${this.state.route}/api/business/${id}/shop`, newProduct, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  }

  async removeProductFromShop(token, id, productID) {
    return await axios
      .delete(`${this.state.route}/api/business/${id}/shop`, {
        headers: { Authorization: token },
        data: { productID: productID },
      })
      .then((response) => response.data);
  }

  async getAllProducts(id) {
    return await axios
      .get(`${this.state.route}/api/business/${id}/shop`)
      .then((response) => response);
  }

  async increaseQuantity(token, product) {
    return await axios
      .put(`${this.state.route}/api/users/increase-quantity`, product, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  }

  async decreaseQuantity(token, product) {
    return await axios
      .put(`${this.state.route}/api/users/decrease-quantity`, product, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  }

  async clearCart(token) {
    return await axios
      .delete(`${this.state.route}/api/users/clear-cart`, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  }

  async RemoveProductFromCart(token, productID) {
    return await axios
      .delete(`${this.state.route}/api/users/remove-product-from-cart`, {
        headers: { Authorization: token },
        data: { productID: productID },
      })
      .then((response) => response.data);
  }
}

export default new ApiRoutes();
