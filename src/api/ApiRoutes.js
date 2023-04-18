import { Component } from 'react';
import axios from "axios";

class ApiRoutes extends Component {
    constructor() {
        super()
        this.state = {
            route: 'http://localhost:3010' //localhost
            // route: 'https://bizweb-israel.up.railway.app' //server
        }
    }

    // Login Page
    async login(email, password) {
        return await axios.post(`${this.state.route}/api/auth/login`,
            { email: email, password: password })
            .then(response => response);
    }

    async fastLogin(user) {
        return await axios.post(`${this.state.route}/api/auth/fast-login`,user)
            .then(response => response);
    }

    // Register Page
    async register(user) {
        return await axios.post(`${this.state.route}/api/auth/register`, user)
            .then(response => response);
    }

    //MyApointment & MyShoppingCart & Calender Page
    async getMyAppointments(userID) {
        return await axios.get(`${this.state.route}/api/users/${userID}`)
            .then(response => response);
    }

    async getUserDetails(userID) {
        return await axios.get(`${this.state.route}/api/users/${userID}`)
            .then(response => response);
    }

    async deleteEventFromCalender(appointment) {
        return await axios.delete(`${this.state.route}/api/calender/delete-event`,
            { data: appointment })
            .then(response => response);
    }

    async deleteEventFromMyAppointments(appointment) {
        return axios.delete(`${this.state.route}/api/users/${appointment.userID}/delete-appointment`,
            { data: appointment })
            .then(response => response);
    }

    async addAvailableHour(appointment) {
        return await axios.post(`${this.state.route}/api/calender/create-event`, appointment)
            .then(response => response);
    }

    //Quick appointment Page
    async findQuickAppointment(business) {
        return await axios.post(`${this.state.route}/api/business/home/quickappointment`, business)
            .then(response => response);
    }

    //My Business Page
    async deleteBusiness(userID, businessID) {
        return await axios.delete(`${this.state.route}/api/business/delete`,
            { data: { businessID: businessID, userID: userID } })
            .then(response => response);
    }

    //Edit Business Page
    async updateDetailsOfBusiness(id, updatedDetails) {
        return await axios.put(`${this.state.route}/api/business/${id}`, updatedDetails)
            .then(response => response);
    }

    // New Business Page
    async addNewBusiness(business) {
        return await axios.post(`${this.state.route}/api/business/add`, business)
            .then(response => response);
    }

    async addBusinessToUser(userID, business) {
        return axios.put(`${this.state.route}/api/users/${userID}/business`, business)
            .then(response => response);
    }

    //BusinessContext Page
    async getAllBusiness() {
        return await axios.get(`${this.state.route}/api/business`)
            .then(response => response);
    }

    //CategoryCard Page
    async addRecordEntry(id, record) {
        return await axios.post(`${this.state.route}/api/users/${id}/categoryEntry`, record)
            .then(response => response);
    }
    //Top5 Page
    async getTop5() {
        return await axios.get(`${this.state.route}/api/business/home/top5`)
            .then(response => response);
    }

    //Calender Page
    async removeExpiredEvents(id) {
        return await axios.delete(`${this.state.route}/api/calender/delete-expired-events`,
            { data: { businessID: id } })
            .then(response => response);
    }

    async getAllEventsOfCalender(id) {
        return await axios.post(`${this.state.route}/api/calender/get-events`, { businessID: id })
            .then(response => response);
    }

    async addNewEvent(appointment) {
        return await axios.post(`${this.state.route}/api/calender/create-event`, appointment)
            .then(response => response);
    }

    async updateEventInMyAppointment(id, appointment) {
        return await axios.put(`${this.state.route}/api/users/${id}/newappointment`, appointment)
            .then(response => response);
    }

    // BigML - Home Page
    async prediction(id, record) {
        return await axios.post(`${this.state.route}/api/users/${id}/prediction`, record)
            .then(response => response.data);
    }

    async trainModel(id) {
        return await axios.get(`${this.state.route}/api/users/${id}/trainBigML`)
            .then(response => response.data);
    }

    //Gallery Page

    async getGallery(id) {
        return await axios.get(`${this.state.route}/api/business/${id}/gallery`)
            .then(response => response.data);
    }

    async addNewImage(id, newImage) {
        return await axios.put(`${this.state.route}/api/business/${id}/gallery`, newImage)
            .then(response => response.data);
    }

    async updateBackgroundImage(id, updatedBackgroundImage) {
        return await axios.put(`${this.state.route}/api/business/${id}/background`, { backgroundPicture: updatedBackgroundImage })
            .then(response => response.data);
    }

    async removeImageFromGallery(id, removeImage) {
        return await axios.delete(`${this.state.route}/api/business/${id}/gallery`,
            { data: { id: removeImage } })
            .then(response => response.data);
    }

    //Reviews Page
    async getAllReviews(id) {
        return await axios.get(`${this.state.route}/api/business/${id}/reviews`)
            .then(response => response);
    }

    async addNewReview(id, newReview) {
        return await axios.put(`${this.state.route}/api/business/${id}/reviews`, newReview)
            .then(response => response.data);
    }

    async removeReview(id, reviewID) {
        return await axios.delete(`${this.state.route}/api/business/${id}/reviews`,
            { data: { id: reviewID } });
    }

    //Shop & MyShoppingCart Page
    async addNewProduct(id, newProduct) {
        return await axios.put(`${this.state.route}/api/business/${id}/shop`, newProduct)
            .then(response => response.data);
    }

    async removeProductFromShop(id, productID) {
        return await axios.delete(`${this.state.route}/api/business/${id}/shop`,
            { data: { productID: productID } })
            .then(response => response.data);
    }

    async getAllProducts(id) {
        return await axios.get(`${this.state.route}/api/business/${id}/shop`)
            .then(response => response);
    }

    async increaseQuantity(userID, product) {
        return await axios.put(`${this.state.route}/api/users/${userID}/increase-quantity`, product)
            .then(response => response.data);
    }

    async decreaseQuantity(userID, product) {
        return await axios.put(`${this.state.route}/api/users/${userID}/decrease-quantity`, product)
            .then(response => response.data);
    }

    async clearCart(userID) {
        return await axios.delete(`${this.state.route}/api/users/${userID}/clear-cart`)
            .then(response => response.data);
    }

    async RemoveProductFromCart(userID, productID) {
        return await axios.delete(`${this.state.route}/api/users/${userID}/remove-product-from-cart`,
            { data: { productID: productID } })
            .then(response => response.data);
    }

}

export default new ApiRoutes();