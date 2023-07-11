import React, { Component } from "react";
import ApiClient from "../api/ApiRoutes";

const BusinessContext = React.createContext();

export default class BusinessProvider extends Component {
  state = {
    categoryBusiness: [],
    business: [],
    sortedBusiness: [],
    featuredBusiness: [],
    loading: false,
    city: "all",
    businessName: "",
  };

  //getData
  async componentDidMount() {
    //get all business
    ApiClient.getAllBusiness()
      .then((res) => {
        if (res.status === 200) {
          this.setState({ business: res.data, sortedBusiness: res.data });
        }
      })
      .catch((err) => console.log(err));
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
    return JSON.parse(localStorage.getItem('token'))
  }

  render() {
    return (
      //...this.state = pass whole state
      <BusinessContext.Provider
        value={{
          ...this.state,
          getBusiness: this.getBusiness,
          getAllBusinessOfUser: this.getAllBusinessOfUser,
          handleChangeFilter: this.handleChangeFilter,
          getUserInfo: this.getUserInfo
        }}
      >
        {this.props.children}
      </BusinessContext.Provider>
    );
  }
}


// export default function BusinessProvider({ children }) {
//   const [categoryBusiness, setCategoryBusiness] = useState([]);
//   const [business, setBusiness] = useState([]);
//   const [sortedBusiness, setSortedBusiness] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [city, setCity] = useState("all");
//   const [businessName, setBusinessName] = useState("");

//   useEffect(() => {
//     const getResult = async () => {
//       //get all business
//       ApiClient.getAllBusiness()
//         .then((res) => {
//           if (res.status === 200) {
//             this.setState({ business: res.data, sortedBusiness: res.data });
//           }
//         })
//         .catch((err) => console.log(err));

//       // let typeBusiness = this.state.business.filter(busi => busi.category === true);
//       // console.log("typeBusiness: "+ this.state.business[0].category);

//       // let business = this.formatData(items);
//       // let maxPrice = Math.max(...business.map(item => item.price))
//       // let maxSize = Math.max(...business.map(item => item.size))
//     };
//     getResult();
//   }, []);

//   const getBusiness = (name) => {
//     let tempBusiness = [...this.state.business];
//     const business = tempBusiness.find((busi) => busi.name === name);
//     return business;
//   };

//   const getAllBusinessOfUser = (idBusiness) => {
//     let tempBusiness = [...business];
//     let allBusiness = [];
//     idBusiness.forEach((id) => {
//       const business = tempBusiness.find((busi) => busi._id === id);
//       if (business !== undefined) {
//         allBusiness.push(business);
//       }
//     });
//     return allBusiness;
//   };

//   const handleChange = (event) => {
//     const target = event.target;
//     const value = target.city === "checkbox" ? target.checked : target.value;

//     const name = event.target.name;

//     this.setState(
//       {
//         [name]: value,
//       },
//       this.filterBusiness
//     );
//   };

//   const filterBusiness = () => {
//     let {
//       business,
//       city,
//       businessName,
//     } = this.state;

//     //all the business
//     let tempBusiness = [...business];

//     //filter by city
//     if (city !== "all") {
//       tempBusiness = tempBusiness.filter((busi) => busi.city === city);
//     }

//     if (businessName !== "") {
//       //filter by business name
//       tempBusiness = tempBusiness.filter((busi) =>
//         busi.name.toLowerCase().includes(businessName.toLowerCase())
//       );
//     }

//     this.setState({
//       sortedBusiness: tempBusiness,
//     });

//   };

//   return (
//     <BusinessContext.Provider
//       value={{
//         categoryBusiness,
//         business,
//         sortedBusiness,
//         loading,
//         city,
//         businessName,
//         getBusiness: getBusiness,
//         getAllBusinessOfUser: getAllBusinessOfUser,
//         handleChange: handleChange,
//       }}
//     >
//       {children}
//     </BusinessContext.Provider>
//   );
// }

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
