import React, { Component } from "react";
import ApiClient from "../api/ApiRoutes";

const BusinessContext = React.createContext();

export default class BusinessProvider extends Component {
  state = {
    business: [],
    sortedBusiness: [],
    loading: false,
    city: "all",
    businessName: "",
  };

  //getData
  async componentDidMount() {
    //get all business
    ApiClient.getAllBusiness()
      .then((res) => {
        this.setState({ business: res.data, sortedBusiness: res.data });
      })
      .catch();
  }

  getBusiness = (name) => {
    let tempBusiness = [...this.state.business];
    const business = tempBusiness.find((busi) => busi.name === name);
    return business;
  };

  getAllBusinessOfUser = (idBusiness) => {
    let tempBusiness = [...this.state.business];
    let allBusiness = [];
    idBusiness.forEach((id) => {
      const business = tempBusiness.find((busi) => busi._id === id);
      if (business !== undefined) {
        allBusiness.push(business);
      }
    });
    localStorage.setItem("my-business", JSON.stringify(allBusiness));

    return allBusiness;
  };

  handleChangeFilter = (event) => {
    const target = event.target;
    const value = target.city === "checkbox" ? target.checked : target.value;

    const name = event.target.name;
    this.setState({ [name]: value }, this.filterBusiness);
  };

  filterBusiness = () => {
    let { business, city, businessName } = this.state;

    //all the business
    let tempBusiness = [...business];

    //filter by city
    if (city !== "all") {
      tempBusiness = tempBusiness.filter((busi) => busi.city === city);
    }

    if (businessName !== "") {
      //filter by business name
      tempBusiness = tempBusiness.filter((busi) =>
        busi.name.toLowerCase().includes(businessName.toLowerCase())
      );
    }

    this.setState({
      sortedBusiness: tempBusiness,
    });
  };

  getUserInfo = () => {
    return JSON.parse(localStorage.getItem("user-info"));
  };

  render() {
    return (
      //...this.state = pass whole state
      <BusinessContext.Provider
        value={{
          ...this.state,
          getBusiness: this.getBusiness,
          getAllBusinessOfUser: this.getAllBusinessOfUser,
          handleChangeFilter: this.handleChangeFilter,
          getUserInfo: this.getUserInfo,
        }}
      >
        {this.props.children}
      </BusinessContext.Provider>
    );
  }
}

const BusinessConsumer = BusinessContext.Consumer;

export function withBusinessConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <BusinessConsumer>
        {(value) => <Component {...props} context={value} />}
      </BusinessConsumer>
    );
  };
}
export { BusinessProvider, BusinessConsumer, BusinessContext };
