import http from "../http-common";

class DataService {
  getAllUsers() {
    return http.get("/users");
  }

  getById(id) {
    return http.get(`/users/${id}`);
  }

  deleteById(id) {
    return http.delete(`/users/${id}`);
  }

  recoverById(id) {
    return http.post(`/users/${id}/restore`);
  }

  editById(id, data) {
    return http.put(`/users/${id}`, data);
  }

  getMessages() {
    return http.get("/reports/message");
  }
  getChat() {
    return http.get("/reports/message?peerType=chat");
  }
  getChannel() {
    return http.get("/reports/message?peerType=channel");
  }
}

export default new DataService();
