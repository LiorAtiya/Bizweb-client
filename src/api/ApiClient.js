import axios from "axios";

class ApiClient {

    // Login Page
    async login(email, password) {
        return await axios.post("https://facework-server-production.up.railway.app/api/auth/login",
            { email: email, password: password })
            .then(response => response);
    }

    // Register Page
    async register(user) {
        return await axios.post("https://facework-server-production.up.railway.app/api/auth/register", user)
            .then(response => response);
    }

    //MyApointment & Calender Page
    async getMyAppointments(userID) {
        return await axios.get(`https://facework-server-production.up.railway.app/api/users/${userID}`)
            .then(response => response);
    }

    async deleteEventFromCalender(appointment) {
        return await axios.delete('https://facework-server-production.up.railway.app/api/calender/delete-event',
            { data: appointment })
            .then(response => response);
    }

    async deleteEventFromMyAppointments(appointment) {
        return axios.delete(`https://facework-server-production.up.railway.app/api/users/${appointment.userID}/delete-appointment`,
            { data: appointment })
            .then(response => response);
    }

    async addAvailableHour(appointment) {
        return await axios.post('https://facework-server-production.up.railway.app/api/calender/create-event', appointment)
            .then(response => response);
    }

    // New Business Page
    async addNewBusiness(business) {
        return await axios.post("https://facework-server-production.up.railway.app/api/business/add", business)
            .then(response => response);
    }

    async addBusinessToUser(userID, business) {
        return axios.put(`https://facework-server-production.up.railway.app/api/users/${userID}/business`, business)
            .then(response => response);
    }

    //BusinessContext Page
    async getAllBusiness() {
        return await axios.get("https://facework-server-production.up.railway.app/api/business")
            .then(response => response);
    }

    //CategoryCard Page
    async addRecordEntry(id, record) {
        return await axios.post(`https://facework-server-production.up.railway.app/api/users/${id}/categoryEntry`, record)
            .then(response => response);
    }
    //Top5 Page
    async getTop5() {
        return await axios.get('https://facework-server-production.up.railway.app/api/business/home/top5')
            .then(response => response);
    }

    //Calender Page
    async removeExpiredEvents(id) {
        return await axios.delete('https://facework-server-production.up.railway.app/api/calender/delete-expired-events',
        { data: { businessID: id } })
        .then(response => response);
    }

    async getAllCalenders(id) {
        return await axios.post('https://facework-server-production.up.railway.app/api/calender/get-events', { businessID: id })
            .then(response => response);
    }

    async addNewEvent(appointment) {
        return await axios.post('https://facework-server-production.up.railway.app/api/calender/create-event', appointment)
            .then(response => response);
    }

    async updateEventInMyAppointment(id, appointment) {
        return await axios.put(`https://facework-server-production.up.railway.app/api/users/${id}/newappointment`, appointment)
            .then(response => response);
    }

    // BigML - Home Page
    async prediction(id, record) {
        return await axios.post(`https://facework-server-production.up.railway.app/api/users/${id}/prediction`, record)
            .then(response => response.data);
    }

    async trainModel(id) {
        return await axios.get(`https://facework-server-production.up.railway.app/api/users/${id}/trainBigML`)
            .then(response => response.data);
    }

    //Gallery Page
    async addNewImage(id, newImage) {
        return await axios.put(`https://facework-server-production.up.railway.app/api/business/${id}/gallery`, newImage)
            .then(response => response.data);
    }

    async updateBackgroundImage(id, updatedBackgroundImage) {
        return await axios.put(`https://facework-server-production.up.railway.app/api/business/${id}/background`, { backgroundPicture: updatedBackgroundImage })
            .then(response => response.data);
    }

    async removeImageFromGallery(id, removeImage) {
        return await axios.delete(`https://facework-server-production.up.railway.app/api/business/${id}/gallery`,
            { data: { id: removeImage } })
            .then(response => response.data);
    }

    //Reviews Page
    async getAllReviews(id) {
        return await axios.get(`https://facework-server-production.up.railway.app/api/business/${id}/reviews`)
            .then(response => response);
    }

    async addNewReview(id, newReview) {
        return await axios.put(`https://facework-server-production.up.railway.app/api/business/${id}/reviews`, newReview)
            .then(response => response.data);
    }

    async removeReview(id, reviewID) {
        return await axios.delete(`https://facework-server-production.up.railway.app/api/business/${id}/reviews`,
            { data: { id: reviewID } });
    }

}

export default new ApiClient();